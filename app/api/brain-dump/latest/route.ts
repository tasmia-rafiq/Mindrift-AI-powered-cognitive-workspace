import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: brainDump, error: brainDumpError } = await supabase
      .from("brain_dumps")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (brainDumpError) throw brainDumpError;

    if (!brainDump) {
      return NextResponse.json({ session: null });
    }

    const { data: tasks, error: tasksError } = await supabase
      .from("mindrift_tasks")
      .select("*")
      .eq("brain_dump_id", brainDump.id)
      .order("created_at", { ascending: true });

    if (tasksError) throw tasksError;

    const { data: planner, error: plannerError } = await supabase
      .from("planner_blocks")
      .select("*")
      .eq("brain_dump_id", brainDump.id)
      .order("created_at", { ascending: true });

    if (plannerError) throw plannerError;

    return NextResponse.json({
      session: {
        brainDumpId: brainDump.id,
        title: brainDump.title,
        rawText: brainDump.raw_text,
        createdAt: brainDump.created_at,
        sessionDate: brainDump.session_date,
        summary: brainDump.summary,
        emotionalTone: brainDump.emotional_tone,
        burnoutLevel: brainDump.burnout_level,
        urgencyLevel: brainDump.urgency_level,
        categories: brainDump.categories,
        nextActionTaskId: brainDump.next_action_task_id,
        gentleMessage: brainDump.gentle_message,
        tasks: tasks.map((task) => ({
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
        planner: planner.map((block) => ({
          id: block.id,
          taskId: block.task_id,
          time: block.time_label,
          title: block.title,
          note: block.note,
          energy: block.energy_level,
          status: block.status,
        })),
      },
    });
  } catch (error) {
    console.error("Load latest Mind Unload error:", error);

    return NextResponse.json(
      { error: "Could not load saved session." },
      { status: 500 }
    );
  }
}