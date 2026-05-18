import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { getUnfinishedTaskContext } from "@/lib/brain-dump/get-unfinished-context";
import { analyzeWithGroq } from "@/lib/brain-dump/grok-analyze";
import { analyzeWithGemini } from "@/lib/brain-dump/gemini-analyze";

type Priority = "Low" | "Medium" | "High";

type GroqTask = {
  existingTaskId: string | null;
  title: string;
  category: string;
  urgency: Priority;
  difficulty: Priority;
  estimatedMinutes: number;
  reason: string;
  tinySteps: string[];
};

type GroqPlannerBlock = {
  time: string;
  title: string;
  note: string;
  energy: Priority;
  taskTitle: string;
  existingTaskId: string | null;
};

type GroqBrainDumpResult = {
  title: string;
  summary: string;
  emotionalTone: string;
  burnoutLevel: Priority;
  urgencyLevel: Priority;
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

    const unfinishedTasks = await getUnfinishedTaskContext(user.id);

    const USE_GEMINI = true;

    const ai: GroqBrainDumpResult = USE_GEMINI
      ? await analyzeWithGemini(rawText, unfinishedTasks)
      : await analyzeWithGroq(rawText, unfinishedTasks);

    const { data: brainDump, error: brainDumpError } = await supabase
      .from("brain_dumps")
      .insert({
        user_id: user.id,
        raw_text: rawText,
        title: ai.title,
        summary: ai.summary,
        emotional_tone: ai.emotionalTone,
        urgency_level: ai.urgencyLevel,
        burnout_level: ai.burnoutLevel,
        categories: ai.categories ?? [],
        gentle_message: ai.gentleMessage,
      })
      .select()
      .single();

    if (brainDumpError) throw brainDumpError;

    const existingTasksFromAI = ai.tasks.filter(
      (task) => task.existingTaskId,
    );

    const newTasksFromAI = ai.tasks.filter(
      (task) => !task.existingTaskId,
    );

    const existingTaskIds = existingTasksFromAI
      .map((task) => task.existingTaskId)
      .filter((id): id is string => Boolean(id));

    let reusedTasks: any[] = [];

    if (existingTaskIds.length) {
      await supabase
        .from("mindrift_tasks")
        .update({
          status: "pending",
          updated_at: new Date().toISOString(),
        })
        .in("id", existingTaskIds)
        .neq("status", "completed");

      const { data, error } = await supabase
        .from("mindrift_tasks")
        .select("*")
        .eq("user_id", user.id)
        .in("id", existingTaskIds);

      if (error) throw error;

      reusedTasks = data ?? [];
    }

    let insertedNewTasks: any[] = [];

    if (newTasksFromAI.length) {
      const newTaskRows = newTasksFromAI.map((task) => ({
        user_id: user.id,
        brain_dump_id: brainDump.id,
        title: task.title,
        category: task.category,
        urgency: task.urgency,
        difficulty: task.difficulty,
        estimated_minutes: task.estimatedMinutes,
        reason: task.reason,
        tiny_steps: task.tinySteps ?? [],
        status: "pending",
        source: "ai_generated",
      }));

      const { data, error } = await supabase
        .from("mindrift_tasks")
        .insert(newTaskRows)
        .select();

      if (error) throw error;

      insertedNewTasks = data ?? [];
    }

    const allTasks = [...reusedTasks, ...insertedNewTasks];

    const taskById = new Map(
      allTasks.map((task) => [task.id, task]),
    );

    const taskByTitle = new Map(
      allTasks.map((task) => [
        String(task.title).toLowerCase(),
        task,
      ]),
    );

    const plannerRows = ai.planner.map((block) => {
      const matchedTask =
        (block.existingTaskId
          ? taskById.get(block.existingTaskId)
          : null) ??
        taskByTitle.get(
          String(block.taskTitle).toLowerCase(),
        ) ??
        taskByTitle.get(String(block.title).toLowerCase());

      return {
        user_id: user.id,
        brain_dump_id: brainDump.id,
        task_id: matchedTask?.id ?? null,
        title: block.title,
        note: block.note,
        time_label: block.time,
        energy_level: block.energy,
        status: matchedTask?.status ?? "pending",
        source: "ai_generated",
      };
    });

    const { data: insertedPlanner, error: plannerError } =
      plannerRows.length
        ? await supabase
            .from("planner_blocks")
            .insert(plannerRows)
            .select()
        : { data: [], error: null };

    if (plannerError) throw plannerError;

    const nextTask =
      taskByTitle.get(
        String(ai.nextActionTaskTitle).toLowerCase(),
      ) ??
      allTasks.find((task) => task.status === "pending") ??
      allTasks[0];

    if (nextTask) {
      await supabase
        .from("brain_dumps")
        .update({
          next_action_task_id: nextTask.id,
          updated_at: new Date().toISOString(),
        })
        .eq("id", brainDump.id)
        .eq("user_id", user.id);
    }

    const { error: burnoutError } = await supabase
      .from("burnout_reports")
      .insert({
        user_id: user.id,
        brain_dump_id: brainDump.id,
        burnout_level: ai.burnoutLevel,
        stress_signals:
          ai.burnoutReport?.stressSignals ?? [],
        reason: ai.burnoutReport?.reason ?? "",
        recommendation:
          ai.burnoutReport?.recommendation ?? "",
      });

    if (burnoutError) throw burnoutError;

    return NextResponse.json({
      brainDumpId: brainDump.id,
      title: ai.title,
      rawText,
      createdAt: brainDump.created_at,
      summary: ai.summary,
      emotionalTone: ai.emotionalTone,
      burnoutLevel: ai.burnoutLevel,
      urgencyLevel: ai.urgencyLevel,
      categories: ai.categories ?? [],
      gentleMessage: ai.gentleMessage,
      nextActionTaskId: nextTask?.id ?? null,

      tasks: allTasks.map((task) => ({
        id: task.id,
        title: task.title,
        category: task.category,
        urgency: task.urgency,
        difficulty: task.difficulty,
        estimatedMinutes: task.estimated_minutes,
        status: task.status,
        reason: task.reason,
        tinySteps: task.tiny_steps ?? [],
      })),

      planner: (insertedPlanner ?? []).map((block) => ({
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
        error:
          "Mindrift could not organize this right now. Please try again.",
      },
      { status: 500 },
    );
  }
}