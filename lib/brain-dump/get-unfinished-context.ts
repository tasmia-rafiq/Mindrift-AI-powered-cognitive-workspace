import { createClient } from "@/utils/supabase/server";

export async function getUnfinishedTaskContext(userId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("mindrift_tasks")
    .select(`
      id,
      title,
      category,
      urgency,
      difficulty,
      estimated_minutes,
      reason,
      tiny_steps,
      status,
      created_at
    `)
    .eq("user_id", userId)
    .in("status", ["pending", "active", "paused", "rescheduled"])
    .order("created_at", { ascending: true })
    .limit(12);

  if (error) throw error;

  return data ?? [];
}