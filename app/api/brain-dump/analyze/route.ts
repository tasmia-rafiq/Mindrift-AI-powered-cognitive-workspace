import { NextResponse } from "next/server";
import Groq from "groq-sdk";
import { createClient } from "@/utils/supabase/server";
import {
  brainDumpJsonInstruction,
  brainDumpSystemPrompt,
} from "@/lib/brain-dump/groq-prompt";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

type GroqTask = {
  title: string;
  category: string;
  urgency: "Low" | "Medium" | "High";
  difficulty: "Low" | "Medium" | "High";
  estimatedMinutes: number;
  reason: string;
  tinySteps: string[];
};

type GroqPlannerBlock = {
  time: string;
  title: string;
  note: string;
  energy: "Low" | "Medium" | "High";
  taskTitle: string;
};

type GroqBrainDumpResult = {
  summary: string;
  emotionalTone: string;
  burnoutLevel: "Low" | "Medium" | "High";
  urgencyLevel: "Low" | "Medium" | "High";
  categories: string[];
  gentleMessage: string;
  tasks: GroqTask[];
  planner: GroqPlannerBlock[];
  nextActionTaskTitle: string;
  burnoutReport: {
    stressSignals: string[];
    reason: string;
    recommendation: string;
  };
};

export async function POST(req: Request) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: "You must be logged in." },
        { status: 401 },
      );
    }

    const body = await req.json();
    const rawText = String(body.rawText || "").trim();

    if (!rawText) {
      return NextResponse.json(
        { error: "Please write what is on your mind first." },
        { status: 400 },
      );
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0.3,
      messages: [
        {
          role: "system",
          content: brainDumpSystemPrompt,
        },
        {
          role: "user",
          content: `${brainDumpJsonInstruction}\n\nUser brain dump:\n${rawText}`,
        },
      ],
      response_format: {
        type: "json_object",
      },
    });

    const content = completion.choices[0]?.message?.content;

    if (!content) {
      return NextResponse.json(
        { error: "Mindrift could not organize this right now." },
        { status: 500 },
      );
    }

    const ai = JSON.parse(content) as GroqBrainDumpResult;

    const { data: brainDump, error: brainDumpError } = await supabase
      .from("brain_dumps")
      .insert({
        user_id: user.id,
        raw_text: rawText,
        title: ai.tasks?.[0]?.title
          ? `Mind session: ${ai.tasks[0].title}`
          : "Mind session",
        session_date: new Date().toISOString().slice(0, 10),
        summary: ai.summary,
        emotional_tone: ai.emotionalTone,
        urgency_level: ai.urgencyLevel,
        burnout_level: ai.burnoutLevel,
        categories: ai.categories,
        gentle_message: ai.gentleMessage,
      })
      .select()
      .single();

    if (brainDumpError) throw brainDumpError;

    const taskRows = ai.tasks.map((task) => ({
      user_id: user.id,
      brain_dump_id: brainDump.id,
      title: task.title,
      category: task.category,
      urgency: task.urgency,
      difficulty: task.difficulty,
      estimated_minutes: task.estimatedMinutes,
      reason: task.reason,
      tiny_steps: task.tinySteps,
      status: "pending",
    }));

    const { data: insertedTasks, error: tasksError } = await supabase
      .from("mindrift_tasks")
      .insert(taskRows)
      .select();

    if (tasksError) throw tasksError;

    const taskByTitle = new Map(
      insertedTasks.map((task) => [task.title.toLowerCase(), task]),
    );

    const plannerRows = ai.planner.map((block) => {
      const matchedTask = taskByTitle.get(block.taskTitle.toLowerCase());

      return {
        user_id: user.id,
        brain_dump_id: brainDump.id,
        task_id: matchedTask?.id ?? null,
        title: block.title,
        note: block.note,
        time_label: block.time,
        energy_level: block.energy,
        status: "pending",
      };
    });

    const { data: insertedPlanner, error: plannerError } = await supabase
      .from("planner_blocks")
      .insert(plannerRows)
      .select();

    if (plannerError) throw plannerError;

    const nextTask =
      taskByTitle.get(ai.nextActionTaskTitle.toLowerCase()) ?? insertedTasks[0];

    await supabase
      .from("brain_dumps")
      .update({
        next_action_task_id: nextTask?.id ?? null,
      })
      .eq("id", brainDump.id);

    const { error: burnoutError } = await supabase
      .from("burnout_reports")
      .insert({
        user_id: user.id,
        brain_dump_id: brainDump.id,
        burnout_level: ai.burnoutLevel,
        stress_signals: ai.burnoutReport.stressSignals,
        reason: ai.burnoutReport.reason,
        recommendation: ai.burnoutReport.recommendation,
      });

    if (burnoutError) throw burnoutError;

    return NextResponse.json({
      brainDumpId: brainDump.id,
      title: brainDump.title,
      rawText: brainDump.raw_text,
      createdAt: brainDump.created_at,
      sessionDate: brainDump.session_date,
      summary: ai.summary,
      emotionalTone: ai.emotionalTone,
      burnoutLevel: ai.burnoutLevel,
      urgencyLevel: ai.urgencyLevel,
      categories: ai.categories,
      gentleMessage: ai.gentleMessage,
      nextActionTaskId: nextTask?.id ?? insertedTasks[0]?.id,
      tasks: insertedTasks.map((task) => ({
        id: task.id,
        title: task.title,
        category: task.category,
        urgency: task.urgency,
        difficulty: task.difficulty,
        estimatedMinutes: task.estimated_minutes,
        status: task.status,
        reason: task.reason,
        tinySteps: task.tiny_steps,
      })),
      planner: insertedPlanner.map((block) => ({
        id: block.id,
        taskId: block.task_id,
        time: block.time_label,
        title: block.title,
        note: block.note,
        energy: block.energy_level,
        status: block.status,
      })),
    });
  } catch (error) {
    console.error("Brain dump analyze error:", error);

    return NextResponse.json(
      {
        error: "Mindrift could not organize this right now. Please try again.",
      },
      { status: 500 },
    );
  }
}
