export type DashboardSummary = {
  intelligence: {
    state: string;
    explanation: string;
    mentalLoad: number;
    focusStability: "Low" | "Moderate" | "High";
    burnoutRisk: "Low" | "Medium" | "High";
  };
  recommendations: string[];
  todayTasks: {
    id: string;
    title: string;
    status: string;
    urgency: string;
    difficulty: string;
    category: string | null;
  }[];
  cognitiveTrend: {
    day: string;
    load: number;
  }[];
  burnoutTrend: {
    day: string;
    risk: number;
  }[];
  focus: {
    activeTaskTitle: string | null;
    completedSessions: number;
    totalFocusMinutes: number;
  };
};

export type Point = {
  day: string;
  risk: number;
};