"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { AnimatePresence, motion } from "framer-motion";

import type {
  BrainDumpAIResult,
  MindriftTask,
  PlannerBlock,
  TaskStatus,
} from "@/lib/brain-dump/types";

import {
  completeGuidedSession,
  createGuidedSession,
  updateGuidedSessionStep,
  updateMindriftTaskStatus,
} from "@/lib/brain-dump/actions";

import BrainDumpHeader from "@/components/brain-dump/BrainDumpHeader";
import BrainDumpInput from "@/components/brain-dump/BrainDumpInput";
import ThinkingPanel from "@/components/brain-dump/ThinkingPanel";
import GuidedActionCenter from "@/components/brain-dump/GuidedActionCenter";
import GeneratedTasks from "@/components/brain-dump/GeneratedTasks";
import AdaptivePlanner from "@/components/brain-dump/AdaptivePlanner";
import TaskFocusSession from "@/components/brain-dump/TaskFocusSession";
import BrainDumpHistory from "@/components/brain-dump/BrainDumpHistory";
import {
  CurrentFlowSkeleton,
  HistorySkeleton,
} from "@/components/brain-dump/BrainDumpSkeletons";
import EmptyGeneratedFlow from "@/components/brain-dump/EmptyGeneratedFlow";
import AiInsights from "@/components/brain-dump/AiInsights";
import { Plus, Sparkles } from "lucide-react";

export default function BrainDumpPage() {
  const [input, setInput] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [result, setResult] = useState<BrainDumpAIResult | null>(null);

  const [tasks, setTasks] = useState<MindriftTask[]>([]);
  const [planner, setPlanner] = useState<PlannerBlock[]>([]);

  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
  const [guidedMode, setGuidedMode] = useState(false);
  const [rescueMode, setRescueMode] = useState(false);
  const [expandedTaskId, setExpandedTaskId] = useState<string | null>(null);

  const [focusSessionOpen, setFocusSessionOpen] = useState(false);
  const [guidedSessionId, setGuidedSessionId] = useState<string | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [sessionSeconds, setSessionSeconds] = useState(15 * 60);
  const [isSessionRunning, setIsSessionRunning] = useState(false);

  const [isPending, startTransition] = useTransition();

  const [history, setHistory] = useState<BrainDumpAIResult[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);

  const completedCount = tasks.filter(
    (task) => task.status === "completed",
  ).length;

  const progress = tasks.length
    ? Math.round((completedCount / tasks.length) * 100)
    : 0;

  const activeTask = tasks.find((task) => task.id === activeTaskId);

  const nextTask =
    activeTask ??
    tasks.find((task) => task.status === "active") ??
    tasks.find((task) => task.status === "pending");

  const pressureLevel = useMemo(() => {
    if (!tasks.length) return "Not started";
    if (progress >= 80) return "Light";
    if (progress >= 40) return "Moderate";
    return "Heavy";
  }, [progress, tasks.length]);

  useEffect(() => {
    async function loadHistory() {
      const response = await fetch("/api/brain-dump/history");
      const data = await response.json();

      setIsLoadingHistory(false);

      if (!response.ok) return;

      setHistory(data.dumps);

      const latest = data.dumps[0];

      if (latest) {
        loadDumpIntoView(latest);
        setShowInput(false);
      } else {
        setShowInput(true);
      }
    }

    loadHistory();
  }, []);

  function loadDumpIntoView(dump: BrainDumpAIResult) {
    setResult(dump);
    setTasks(dump.tasks);
    setPlanner(dump.planner);
    setActiveTaskId(
      dump.nextActionTaskId ??
        dump.tasks.find((task) => task.status === "pending")?.id ??
        null,
    );
    setGuidedMode(false);
    setRescueMode(false);
    setFocusSessionOpen(false);
  }

  async function handleAnalyze() {
    if (!input.trim()) return;

    setIsThinking(true);
    setResult(null);
    setTasks([]);
    setPlanner([]);
    setActiveTaskId(null);
    setGuidedMode(false);
    setRescueMode(false);

    const response = await fetch("/api/brain-dump/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ rawText: input }),
    });

    const data = await response.json();

    setIsThinking(false);

    if (!response.ok) {
      alert(data.error || "Something went wrong.");
      return;
    }

    setResult(data);
    setTasks(data.tasks);
    setPlanner(data.planner);
    setActiveTaskId(data.nextActionTaskId);
    setHistory((prev) => [data, ...prev]);
    setInput("");
    setShowInput(false);
  }

  function formatSessionDate(value?: string) {
    if (!value) return "";

    return new Intl.DateTimeFormat("en", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(value));
  }

  function syncTaskStatus(taskId: string, status: TaskStatus) {
    setTasks((prev) =>
      prev.map((task) => (task.id === taskId ? { ...task, status } : task)),
    );

    setPlanner((prev) =>
      prev.map((block) =>
        block.taskId === taskId ? { ...block, status } : block,
      ),
    );

    startTransition(async () => {
      await updateMindriftTaskStatus(taskId, status);
    });
  }

  function startGuidedFlow(taskId?: string) {
    const taskToStart = tasks.find((task) => task.id === taskId) ?? nextTask;

    if (!taskToStart || !result) return;

    setGuidedMode(true);
    setRescueMode(false);
    setActiveTaskId(taskToStart.id);
    setCurrentStepIndex(0);
    setSessionSeconds(15 * 60);
    setFocusSessionOpen(true);
    setIsSessionRunning(true);

    syncTaskStatus(taskToStart.id, "active");

    startTransition(async () => {
      const session = await createGuidedSession({
        brainDumpId: result.brainDumpId,
        taskId: taskToStart.id,
      });

      setGuidedSessionId(session.id);
    });
  }

  function completeCurrentStep() {
    if (!activeTask) return;

    const isLastStep = currentStepIndex >= activeTask.tinySteps.length - 1;

    if (isLastStep) {
      syncTaskStatus(activeTask.id, "completed");

      if (guidedSessionId) {
        startTransition(async () => {
          await completeGuidedSession(guidedSessionId);
        });
      }

      setFocusSessionOpen(false);
      setIsSessionRunning(false);
      setCurrentStepIndex(0);

      const next = tasks.find(
        (task) => task.id !== activeTask.id && task.status === "pending",
      );

      setActiveTaskId(next?.id ?? null);
      return;
    }

    const nextStep = currentStepIndex + 1;
    setCurrentStepIndex(nextStep);

    if (guidedSessionId) {
      startTransition(async () => {
        await updateGuidedSessionStep({
          sessionId: guidedSessionId,
          currentStep: nextStep,
        });
      });
    }
  }

  function pauseFocusSession() {
    if (!activeTask) return;

    setIsSessionRunning(false);
    syncTaskStatus(activeTask.id, "paused");
  }

  function resumeFocusSession() {
    if (!activeTask) return;

    setIsSessionRunning(true);
    syncTaskStatus(activeTask.id, "active");
  }

  function rescheduleTask(taskId: string) {
    syncTaskStatus(taskId, "rescheduled");

    setPlanner((prev) => {
      const current = prev.find((block) => block.taskId === taskId);
      const others = prev.filter((block) => block.taskId !== taskId);

      if (!current) return prev;

      return [
        ...others,
        {
          ...current,
          time: "Later",
          note: "Moved later because your energy may be lower right now.",
          status: "rescheduled",
        },
      ];
    });

    const next = tasks.find(
      (task) => task.id !== taskId && task.status === "pending",
    );

    if (next) setActiveTaskId(next.id);
  }

  function activateRescueMode() {
    setRescueMode(true);

    if (nextTask) {
      setActiveTaskId(nextTask.id);
      syncTaskStatus(nextTask.id, "active");
    }
  }

  function resetInput() {
    setInput("");
    // setResult(null);
    // setTasks([]);
    // setPlanner([]);
    // setActiveTaskId(null);
    // setGuidedMode(false);
    // setRescueMode(false);
    // setFocusSessionOpen(false);
  }

  useEffect(() => {
    if (!isSessionRunning || !focusSessionOpen) return;

    const interval = setInterval(() => {
      setSessionSeconds((prev) => {
        if (prev <= 1) {
          setIsSessionRunning(false);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isSessionRunning, focusSessionOpen]);

  return (
    <div className="relative min-h-full overflow-hidden pb-10">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-8 h-105 w-105 -translate-x-1/2 rounded-full bg-white/[0.035] blur-[120px]" />
        <div className="absolute right-10 top-1/3 h-80 w-[320px] rounded-full bg-violet-500/[0.07] blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl space-y-8">
        <BrainDumpHeader progress={progress} pressureLevel={pressureLevel} />

        <div className="space-y-8">
          {showInput ? (
            <BrainDumpInput
              input={input}
              setInput={setInput}
              onAnalyze={handleAnalyze}
              onReset={resetInput}
              isThinking={isThinking || isPending}
            />
          ) : (
            !isLoadingHistory && (
              <NewMindUnloadButton onClick={() => setShowInput(true)} />
            )
          )}

          <AnimatePresence>{isThinking && <ThinkingPanel />}</AnimatePresence>

          {isLoadingHistory ? (
            <CurrentFlowSkeleton />
          ) : result ? (
            <>
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  <AiInsights result={result} tasks={tasks} />

                  <GuidedActionCenter
                    result={result}
                    nextTask={nextTask}
                    guidedMode={guidedMode}
                    rescueMode={rescueMode}
                    onStart={() => startGuidedFlow()}
                    onRescue={activateRescueMode}
                    onReschedule={rescheduleTask}
                  />

                  <div className="grid grid-cols-1 gap-8 xl:grid-cols-[0.95fr_1.05fr]">
                    <GeneratedTasks
                      tasks={tasks}
                      expandedTaskId={expandedTaskId}
                      setExpandedTaskId={setExpandedTaskId}
                      onStart={(id) => startGuidedFlow(id)}
                      onReschedule={rescheduleTask}
                    />

                    <AdaptivePlanner planner={planner} progress={progress} />
                  </div>
                </motion.div>
              </AnimatePresence>
            </>
          ) : (
            <EmptyGeneratedFlow />
          )}

          {isLoadingHistory ? (
            <HistorySkeleton />
          ) : (
            <BrainDumpHistory
              dumps={history}
              selectedDumpId={result?.brainDumpId}
              onSelect={loadDumpIntoView}
            />
          )}
        </div>
      </div>

      <AnimatePresence>
        {focusSessionOpen && activeTask && (
          <TaskFocusSession
            task={activeTask}
            currentStepIndex={currentStepIndex}
            sessionSeconds={sessionSeconds}
            isRunning={isSessionRunning}
            onCompleteStep={completeCurrentStep}
            onPause={pauseFocusSession}
            onResume={resumeFocusSession}
            onExit={() => {
              setFocusSessionOpen(false);
              setIsSessionRunning(false);
            }}
            onRescue={activateRescueMode}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function NewMindUnloadButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group flex w-full items-center justify-between rounded-[28px] border border-white/10 bg-white/3 p-5 text-left transition hover:border-cyan-400/20 hover:bg-white/5"
    >
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
          <Sparkles size={20} />
        </div>

        <div>
          <div className="font-medium text-white">New Mind Unload</div>
          <div className="mt-1 text-sm text-zinc-500">
            Add a new messy thought and let Mindrift organize it.
          </div>
        </div>
      </div>

      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-black transition group-hover:scale-105">
        <Plus size={18} />
      </div>
    </button>
  );
}
