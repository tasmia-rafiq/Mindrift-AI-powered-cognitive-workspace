export type TaskStatus =
  | "pending"
  | "active"
  | "completed"
  | "paused"
  | "rescheduled"
  | "skipped";

export type Energy = "Low" | "Medium" | "High";
export type Urgency = "Low" | "Medium" | "High";

export type MindriftTask = {
  id: string;
  title: string;
  category: string;
  urgency: Urgency;
  difficulty: Energy;
  estimatedMinutes: number;
  status: TaskStatus;
  reason: string;
  tinySteps: string[];
};

export type PlannerBlock = {
  id: string;
  time: string;
  title: string;
  note: string;
  energy: Energy;
  taskId?: string;
  status: TaskStatus;
};

export type BrainDumpAIResult = {
  brainDumpId: string;
  title?: string;
  rawText?: string;
  createdAt?: string;
  sessionDate?: string;

  summary: string;
  emotionalTone: string;
  burnoutLevel: Urgency;
  urgencyLevel: Urgency;
  categories: string[];
  tasks: MindriftTask[];
  planner: PlannerBlock[];
  nextActionTaskId: string;
  gentleMessage: string;
};