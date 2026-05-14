import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET() {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("brain_dumps")
    .select(`
      id,
      title,
      raw_text,
      summary,
      emotional_tone,
      urgency_level,
      burnout_level,
      categories,
      next_action_task_id,
      gentle_message,
      created_at,
      mindrift_tasks (
        id,
        title,
        category,
        urgency,
        difficulty,
        estimated_minutes,
        reason,
        tiny_steps,
        status
      ),
      planner_blocks (
        id,
        task_id,
        title,
        note,
        time_label,
        energy_level,
        status
      )
    `)
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(20);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const dumps = data.map((dump) => ({
    brainDumpId: dump.id,
    title: dump.title ?? "Untitled Mind Unload",
    rawText: dump.raw_text,
    createdAt: dump.created_at,
    summary: dump.summary,
    emotionalTone: dump.emotional_tone,
    urgencyLevel: dump.urgency_level,
    burnoutLevel: dump.burnout_level,
    categories: dump.categories ?? [],
    nextActionTaskId: dump.next_action_task_id,
    gentleMessage: dump.gentle_message,
    tasks: dump.mindrift_tasks.map((task) => ({
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
    planner: dump.planner_blocks.map((block) => ({
      id: block.id,
      taskId: block.task_id,
      time: block.time_label,
      title: block.title,
      note: block.note,
      energy: block.energy_level,
      status: block.status,
    })),
  }));

  return NextResponse.json({ dumps });
}