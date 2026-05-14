"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

type GeneratedPlan = {
  mood_label: string;
  simple_summary: string;
  next_best_action: string;
  gentle_message: string;
  tasks: {
    title: string;
    reason: string;
    priority: "Now" | "Next" | "Later" | "Rest";
    energy: "Low" | "Medium" | "High";
    estimated_time: string;
  }[];
};

export async function createBrainDumpPlan(rawText: string) {
  if (!rawText.trim()) {
    return {
      success: false,
      error: "Please write what is on your mind first.",
    };
  }

  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return {
      success: false,
      error: "You must be logged in.",
    };
  }

  const aiResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      temperature: 0.4,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `
You are Miri, a calm Adaptive AI planner for overwhelmed people.

Your job:
- Read the user's messy Mind Unload.
- Use simple, easy English.
- Do NOT sound clinical.
- Do NOT use words like cognitive, diagnosis, disorder, therapy.
- Create a calm automatic plan.
- Choose what the user should do first.
- Include rest/recovery if needed.

Return ONLY valid JSON in this shape:

{
  "mood_label": "short simple emotional state",
  "simple_summary": "simple explanation of what is going on",
  "next_best_action": "the first thing user should do and why",
  "gentle_message": "kind encouraging message",
  "tasks": [
    {
      "title": "clear task title",
      "reason": "why this task matters",
      "priority": "Now | Next | Later | Rest",
      "energy": "Low | Medium | High",
      "estimated_time": "10 min"
    }
  ]
}

Rules:
- 3 to 6 tasks only.
- At least one task should be priority "Now".
- If sleep, exhaustion, burnout, anxiety, or overwhelm appears, include one "Rest" task.
- Keep task titles short.
          `,
        },
        {
          role: "user",
          content: rawText,
        },
      ],
    }),
  });

  if (!aiResponse.ok) {
    return {
      success: false,
      error: "Mindrift could not generate your plan right now.",
    };
  }

  const aiData = await aiResponse.json();
  const content = aiData.choices?.[0]?.message?.content;

  if (!content) {
    return {
      success: false,
      error: "AI response was empty.",
    };
  }

  let plan: GeneratedPlan;

  try {
    plan = JSON.parse(content);
  } catch {
    return {
      success: false,
      error: "AI returned an invalid plan. Try again.",
    };
  }

  const { data: brainDump, error: dumpError } = await supabase
    .from("brain_dumps")
    .insert({
      user_id: user.id,
      raw_text: rawText,
      mood_label: plan.mood_label,
      simple_summary: plan.simple_summary,
      next_best_action: plan.next_best_action,
      gentle_message: plan.gentle_message,
    })
    .select()
    .single();

  if (dumpError || !brainDump) {
    return {
      success: false,
      error: "Could not save Mind Unload.",
    };
  }

  const { data: planDay, error: planError } = await supabase
    .from("plan_days")
    .insert({
      user_id: user.id,
      brain_dump_id: brainDump.id,
      title: "Today’s Auto Plan",
      status: "active",
    })
    .select()
    .single();

  if (planError || !planDay) {
    return {
      success: false,
      error: "Could not create today’s plan.",
    };
  }

  const tasksToInsert = plan.tasks.map((task, index) => ({
    user_id: user.id,
    brain_dump_id: brainDump.id,
    plan_day_id: planDay.id,
    title: task.title,
    reason: task.reason,
    priority: task.priority,
    energy: task.energy,
    estimated_time: task.estimated_time,
    status: "pending",
    sort_order: index,
  }));

  const { data: tasks, error: tasksError } = await supabase
    .from("plan_tasks")
    .insert(tasksToInsert)
    .select();

  if (tasksError) {
    return {
      success: false,
      error: "Could not save generated tasks.",
    };
  }

  revalidatePath("/dashboard/brain-dump");

  return {
    success: true,
    data: {
      brainDump,
      planDay,
      tasks,
    },
  };
}

export async function updatePlanTaskStatus(
  taskId: string,
  status: "pending" | "active" | "done" | "later"
) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      success: false,
      error: "You must be logged in.",
    };
  }

  const updateData: Record<string, string | null> = {
    status,
  };

  if (status === "active") {
    updateData.started_at = new Date().toISOString();
  }

  if (status === "done") {
    updateData.completed_at = new Date().toISOString();
  }

  const { error } = await supabase
    .from("plan_tasks")
    .update(updateData)
    .eq("id", taskId)
    .eq("user_id", user.id);

  if (error) {
    return {
      success: false,
      error: "Could not update task.",
    };
  }

  revalidatePath("/dashboard/brain-dump");

  return {
    success: true,
  };
}