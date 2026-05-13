"use server";

import { createClient } from "@/utils/supabase/server";

export async function updateMindriftTaskStatus(
  taskId: string,
  status:
    | "pending"
    | "active"
    | "completed"
    | "paused"
    | "rescheduled"
    | "skipped"
) {
  const supabase = await createClient();

  const timestampField =
    status === "active"
      ? "started_at"
      : status === "completed"
      ? "completed_at"
      : status === "paused"
      ? "paused_at"
      : status === "rescheduled"
      ? "rescheduled_at"
      : null;

  const updatePayload: Record<string, unknown> = {
    status,
    updated_at: new Date().toISOString(),
  };

  if (timestampField) {
    updatePayload[timestampField] = new Date().toISOString();
  }

  const { error } = await supabase
    .from("mindrift_tasks")
    .update(updatePayload)
    .eq("id", taskId);

  if (error) {
    throw new Error(error.message);
  }

  await supabase
    .from("planner_blocks")
    .update({
      status,
      updated_at: new Date().toISOString(),
    })
    .eq("task_id", taskId);
}

export async function createGuidedSession({
  brainDumpId,
  taskId,
  durationSeconds = 900,
}: {
  brainDumpId: string;
  taskId: string;
  durationSeconds?: number;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("You must be logged in.");
  }

  const { data, error } = await supabase
    .from("guided_sessions")
    .insert({
      user_id: user.id,
      brain_dump_id: brainDumpId,
      task_id: taskId,
      duration_seconds: durationSeconds,
      remaining_seconds: durationSeconds,
      status: "active",
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function updateGuidedSessionStep({
  sessionId,
  currentStep,
}: {
  sessionId: string;
  currentStep: number;
}) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("guided_sessions")
    .update({
      current_step: currentStep,
    })
    .eq("id", sessionId);

  if (error) {
    throw new Error(error.message);
  }
}

export async function completeGuidedSession(sessionId: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("guided_sessions")
    .update({
      status: "completed",
      completed_at: new Date().toISOString(),
    })
    .eq("id", sessionId);

  if (error) {
    throw new Error(error.message);
  }
}