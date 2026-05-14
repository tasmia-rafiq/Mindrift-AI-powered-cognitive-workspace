import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

function getRiskScore(level?: string | null) {
  if (level === "High") return 85;
  if (level === "Medium") return 55;
  return 25;
}

function getMentalLoad({
  pendingTasks,
  highUrgencyTasks,
  burnoutRisk,
}: {
  pendingTasks: number;
  highUrgencyTasks: number;
  burnoutRisk: "Low" | "Medium" | "High";
}) {
  const taskPressure = Math.min(pendingTasks * 10, 45);
  const urgencyPressure = Math.min(highUrgencyTasks * 12, 35);
  const burnoutPressure =
    burnoutRisk === "High" ? 20 : burnoutRisk === "Medium" ? 12 : 5;

  return Math.min(taskPressure + urgencyPressure + burnoutPressure, 100);
}

function getFocusStability(completed: number, pending: number) {
  if (completed >= pending) return "High";
  if (completed > 0) return "Moderate";
  return "Low";
}

function getState(load: number) {
  if (load >= 75) {
    return {
      state: "Heavy mental load",
      explanation:
        "Mindrift noticed many unfinished or urgent tasks. A lighter plan may help today.",
    };
  }

  if (load >= 45) {
    return {
      state: "Stable, but slightly overloaded",
      explanation:
        "You have some pressure, but your plan is still manageable if you move one step at a time.",
    };
  }

  return {
    state: "Clear and manageable",
    explanation:
      "Your current workload looks light. This is a good time for steady progress or rest.",
  };
}

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

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const { data: tasks, error: tasksError } = await supabase
      .from("mindrift_tasks")
      .select("*")
      .eq("user_id", user.id)
      .gte("created_at", todayStart.toISOString())
      .order("created_at", { ascending: false });

    if (tasksError) throw tasksError;

    const { data: burnoutReports, error: burnoutError } = await supabase
      .from("burnout_reports")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(7);

    if (burnoutError) throw burnoutError;

    const { data: sessions, error: sessionsError } = await supabase
      .from("guided_sessions")
      .select("*")
      .eq("user_id", user.id)
      .gte("created_at", todayStart.toISOString());

    if (sessionsError) throw sessionsError;

    const pendingTasks = tasks.filter(
      (task) => task.status !== "completed" && task.status !== "skipped"
    );

    const completedTasks = tasks.filter((task) => task.status === "completed");

    const highUrgencyTasks = pendingTasks.filter(
      (task) => task.urgency === "High"
    );

    const latestBurnout = burnoutReports[0]?.burnout_level ?? "Low";

    const mentalLoad = getMentalLoad({
      pendingTasks: pendingTasks.length,
      highUrgencyTasks: highUrgencyTasks.length,
      burnoutRisk: latestBurnout,
    });

    const state = getState(mentalLoad);

    const focusStability = getFocusStability(
      completedTasks.length,
      pendingTasks.length
    );

    const recommendations = [];

    if (highUrgencyTasks.length > 0) {
      recommendations.push("Start with one small urgent task first.");
    }

    if (latestBurnout === "High" || latestBurnout === "Medium") {
      recommendations.push("Keep today lighter and use shorter focus sessions.");
    }

    if (pendingTasks.length >= 5) {
      recommendations.push("Move non-urgent tasks later to reduce pressure.");
    }

    if (completedTasks.length > 0) {
      recommendations.push("You already made progress. Continue gently.");
    }

    if (recommendations.length === 0) {
      recommendations.push("Your day looks manageable. Start with the easiest task.");
    }

    const last7Days = Array.from({ length: 7 }).map((_, index) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - index));

      const label = date.toLocaleDateString("en", { weekday: "short" });

      const dayTasks = tasks.filter((task) => {
        const taskDate = new Date(task.created_at);
        return taskDate.toDateString() === date.toDateString();
      });

      const dayBurnout = burnoutReports.find((report) => {
        const reportDate = new Date(report.created_at);
        return reportDate.toDateString() === date.toDateString();
      });

      const dayPending = dayTasks.filter(
        (task) => task.status !== "completed" && task.status !== "skipped"
      ).length;

      const dayHighUrgency = dayTasks.filter(
        (task) => task.urgency === "High"
      ).length;

      return {
        day: label,
        load: Math.min(dayPending * 12 + dayHighUrgency * 15, 100),
        risk: getRiskScore(dayBurnout?.burnout_level),
      };
    });

    const activeTask =
      pendingTasks.find((task) => task.status === "active") ??
      pendingTasks.find((task) => task.status === "paused") ??
      pendingTasks[0];

    const completedSessions = sessions.filter(
      (session) => session.status === "completed"
    );

    const totalFocusMinutes = Math.round(
      completedSessions.reduce(
        (total, session) => total + (session.duration_seconds ?? 0),
        0
      ) / 60
    );

    return NextResponse.json({
      intelligence: {
        state: state.state,
        explanation: state.explanation,
        mentalLoad,
        focusStability,
        burnoutRisk: latestBurnout,
      },
      recommendations,
      todayTasks: tasks.slice(0, 8).map((task) => ({
        id: task.id,
        title: task.title,
        status: task.status,
        urgency: task.urgency,
        difficulty: task.difficulty,
        category: task.category,
      })),
      cognitiveTrend: last7Days.map((day) => ({
        day: day.day,
        load: day.load,
      })),
      burnoutTrend: last7Days.map((day) => ({
        day: day.day,
        risk: day.risk,
      })),
      focus: {
        activeTaskTitle: activeTask?.title ?? null,
        completedSessions: completedSessions.length,
        totalFocusMinutes,
      },
    });
  } catch (error) {
    console.error("Dashboard summary error:", error);

    return NextResponse.json(
      { error: "Could not load dashboard summary." },
      { status: 500 }
    );
  }
}