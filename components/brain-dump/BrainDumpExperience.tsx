// "use client";

// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Brain,
//   Sparkles,
//   AlertTriangle,
//   CheckCircle2,
//   ChevronDown,
// } from "lucide-react";

// import { useMemo, useState } from "react";

// type Task = {
//   id: number;
//   title: string;

//   priority: "Urgent" | "Important" | "Medium" | "Recovery";

//   emotionalWeight: "Low" | "Medium" | "High";

//   resistance: "Low" | "Medium" | "High";

//   suggestedApproach: string;

//   estimatedTime: string;

//   bestTime: string;
// };

// type PlannerBlock = {
//   time: string;
//   title: string;
//   type: string;
// };

// type AnalysisResult = {
//   emotionalState: string;

//   urgency: "Low" | "Medium" | "High";

//   summary: string;

//   executionStrategy: {
//     phase: string;
//     description: string;
//   }[];

//   recommendation: string;

//   tasks: Task[];

//   planner: PlannerBlock[];
// };

// const processingSteps = [
//   "Analyzing emotional patterns...",
//   "Structuring cognitive load...",
//   "Detecting urgency signals...",
//   "Generating adaptive execution strategy...",
// ];

// export default function BrainDumpExperience() {
//   const [text, setText] = useState("");
//   const [processing, setProcessing] = useState(false);
//   const [result, setResult] = useState<AnalysisResult | null>(null);

//   async function handleAnalyze() {
//     if (!text.trim()) return;

//     setProcessing(true);
//     setResult(null);

//     await new Promise((r) => setTimeout(r, 3500));

//     setResult({
//       emotionalState:
//         "You appear mentally overloaded with fragmented attention, deadline pressure, and cognitive fatigue.",

//       urgency: "High",

//       summary:
//         "Your thoughts suggest mental fragmentation caused by unfinished responsibilities, emotional resistance around important tasks, and prolonged cognitive switching.",

//       executionStrategy: [
//         {
//           phase: "Reduce Mental Pressure",
//           description:
//             "Start with low-effort urgent tasks to quickly reduce emotional tension.",
//         },

//         {
//           phase: "Stabilize Focus",
//           description:
//             "Avoid deep work immediately. Build momentum with manageable wins first.",
//         },

//         {
//           phase: "Recovery Window",
//           description:
//             "Schedule lighter cognitive activity later today to prevent burnout escalation.",
//         },
//       ],

//       recommendation:
//         "Start with replying to the client email. It has high emotional resistance but low completion effort.",

//       tasks: [
//         {
//           id: 1,
//           title: "Reply to client email",

//           priority: "Urgent",

//           emotionalWeight: "High",

//           resistance: "Medium",

//           suggestedApproach:
//             "Write a rough draft first without editing.",

//           estimatedTime: "15 mins",

//           bestTime: "Now",
//         },

//         {
//           id: 2,
//           title: "Finish portfolio updates",

//           priority: "Important",

//           emotionalWeight: "High",

//           resistance: "High",

//           suggestedApproach:
//             "Break into 20-minute focused sections.",

//           estimatedTime: "1.5 hrs",

//           bestTime: "Evening Focus Window",
//         },

//         {
//           id: 3,
//           title: "Study React interview topics",

//           priority: "Medium",

//           emotionalWeight: "Medium",

//           resistance: "Medium",

//           suggestedApproach:
//             "Review only one topic at a time.",

//           estimatedTime: "45 mins",

//           bestTime: "Afternoon",
//         },

//         {
//           id: 4,
//           title: "Fix sleep schedule",

//           priority: "Recovery",

//           emotionalWeight: "Low",

//           resistance: "Low",

//           suggestedApproach:
//             "Reduce screen exposure 1 hour before sleep.",

//           estimatedTime: "Ongoing",

//           bestTime: "Night",
//         },
//       ],

//       planner: [
//         {
//           time: "10:00 AM",
//           title: "Reply to client email",
//           type: "Quick Win",
//         },

//         {
//           time: "11:00 AM",
//           title: "Recovery Break",
//           type: "Cognitive Reset",
//         },

//         {
//           time: "2:00 PM",
//           title: "Study React Interview Topics",
//           type: "Light Focus",
//         },

//         {
//           time: "6:00 PM",
//           title: "Portfolio Focus Session",
//           type: "Deep Work",
//         },
//       ],
//     });

//     setProcessing(false);
//   }

//   const urgencyColor = useMemo(() => {
//     if (!result) return "";

//     switch (result.urgency) {
//       case "High":
//         return "text-red-300";
//       case "Medium":
//         return "text-orange-300";
//       default:
//         return "text-emerald-300";
//     }
//   }, [result]);

//   return (
//     <div className="relative pb-24">
//       {/* ATMOSPHERIC GLOW */}
//       <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[700px] rounded-full bg-cyan-500/10 blur-[140px] pointer-events-none" />

//       <div className="relative z-10">
//         {/* HEADER */}
//         <div className="flex items-center gap-3">
//           <div className="h-11 w-11 rounded-2xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center">
//             <Brain className="text-cyan-300" size={22} />
//           </div>

//           <div>
//             <h1 className="text-3xl font-semibold tracking-tight">
//               Brain Dump
//             </h1>

//             <p className="text-zinc-500 mt-1">
//               Mindrift helps organize the chaos without judgment.
//             </p>
//           </div>
//         </div>

//         {/* INPUT */}
//         <div className="mt-10">
//           <motion.div
//             layout
//             className="
//               relative
//               overflow-hidden
//               rounded-[32px]
//               border border-white/10
//               bg-white/[0.03]
//               backdrop-blur-2xl
//             "
//           >
//             <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.12),transparent_60%)] opacity-60" />

//             <div className="relative z-10 p-8">
//               <div className="mb-6">
//                 <h2 className="text-xl font-medium">
//                   What’s overwhelming your mind right now?
//                 </h2>

//                 <p className="text-zinc-400 text-sm mt-2">
//                   Write freely. Mindrift will structure everything for you.
//                 </p>
//               </div>

//               <textarea
//                 value={text}
//                 onChange={(e) => setText(e.target.value)}
//                 placeholder="Need to finish portfolio, reply to emails, attend a meeting, fix sleep schedule..."
//                 className="
//                   w-full
//                   min-h-[260px]
//                   bg-transparent
//                   resize-none
//                   outline-none
//                   text-[15px]
//                   leading-8
//                   placeholder:text-zinc-500
//                 "
//               />

//               <div className="flex flex-wrap gap-2 mt-5">
//                 {[
//                   "Work stress",
//                   "Deadlines",
//                   "Anxiety",
//                   "Overthinking",
//                   "Responsibilities",
//                   "Burnout",
//                 ].map((item) => (
//                   <div
//                     key={item}
//                     className="
//                       px-3 py-1.5
//                       rounded-full
//                       text-xs
//                       border border-white/10
//                       bg-white/[0.03]
//                       text-zinc-400
//                     "
//                   >
//                     {item}
//                   </div>
//                 ))}
//               </div>

//               <div className="mt-8 flex items-center justify-between">
//                 <div className="text-sm text-zinc-500">
//                   Your thoughts stay private and encrypted.
//                 </div>

//                 <button
//                   onClick={handleAnalyze}
//                   disabled={processing}
//                   className="
//                     h-12
//                     px-6
//                     rounded-2xl
//                     bg-white
//                     text-black
//                     font-medium
//                     hover:scale-[1.02]
//                     transition-all
//                     disabled:opacity-50
//                   "
//                 >
//                   {processing ? "Analyzing..." : "Organize Thoughts"}
//                 </button>
//               </div>
//             </div>
//           </motion.div>
//         </div>

//         {/* PROCESSING */}
//         <AnimatePresence>
//           {processing && (
//             <motion.div
//               initial={{ opacity: 0, y: 12 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0 }}
//               className="
//                 mt-8
//                 rounded-[28px]
//                 border border-cyan-400/10
//                 bg-cyan-400/[0.03]
//                 p-6
//               "
//             >
//               <div className="flex items-center gap-3">
//                 <Sparkles className="text-cyan-300 animate-pulse" />

//                 <div>
//                   <div className="font-medium">
//                     Mindrift AI is processing your thoughts
//                   </div>

//                   <div className="text-sm text-zinc-500 mt-1">
//                     Structuring cognitive patterns and generating adaptive guidance.
//                   </div>
//                 </div>
//               </div>

//               <div className="mt-6 space-y-3">
//                 {processingSteps.map((step, i) => (
//                   <motion.div
//                     key={step}
//                     initial={{ opacity: 0.3 }}
//                     animate={{ opacity: [0.3, 1, 0.3] }}
//                     transition={{
//                       duration: 2,
//                       repeat: Infinity,
//                       delay: i * 0.3,
//                     }}
//                     className="
//                       flex items-center gap-3
//                       text-sm text-zinc-300
//                     "
//                   >
//                     <div className="h-2 w-2 rounded-full bg-cyan-300" />

//                     {step}
//                   </motion.div>
//                 ))}
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* RESULTS */}
//         <AnimatePresence>
//           {result && (
//             <motion.div
//               initial={{ opacity: 0, y: 18 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="mt-10 space-y-6"
//             >
//               {/* COGNITIVE ANALYSIS */}
//               <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-7">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-3">
//                     <AlertTriangle className="text-cyan-300" />

//                     <div>
//                       <div className="font-medium">
//                         Cognitive Analysis
//                       </div>

//                       <div className="text-sm text-zinc-500 mt-1">
//                         AI emotional interpretation
//                       </div>
//                     </div>
//                   </div>

//                   <div className={`text-sm ${urgencyColor}`}>
//                     {result.urgency} Urgency
//                   </div>
//                 </div>

//                 <p className="mt-6 text-zinc-300 leading-8">
//                   {result.emotionalState}
//                 </p>

//                 <div className="mt-6 p-4 rounded-2xl border border-white/10 bg-white/[0.02]">
//                   <div className="text-sm text-zinc-400">
//                     AI Summary
//                   </div>

//                   <div className="mt-2 text-sm text-zinc-300 leading-7">
//                     {result.summary}
//                   </div>
//                 </div>
//               </div>

//               {/* EXECUTION STRATEGY */}
//               <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-7">
//                 <div>
//                   <h3 className="text-lg font-medium">
//                     AI Execution Strategy
//                   </h3>

//                   <p className="text-sm text-zinc-500 mt-1">
//                     Recovery-based cognitive guidance
//                   </p>
//                 </div>

//                 <div className="mt-7 space-y-5">
//                   {result.executionStrategy.map((item, i) => (
//                     <motion.div
//                       key={item.phase}
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: i * 0.1 }}
//                       className="
//                         rounded-2xl
//                         border border-white/10
//                         bg-white/[0.02]
//                         p-5
//                       "
//                     >
//                       <div className="text-sm text-cyan-300">
//                         Phase {i + 1}
//                       </div>

//                       <div className="mt-2 font-medium">
//                         {item.phase}
//                       </div>

//                       <p className="mt-2 text-sm text-zinc-400 leading-7">
//                         {item.description}
//                       </p>
//                     </motion.div>
//                   ))}
//                 </div>
//               </div>

//               {/* GENERATED TASKS */}
//               <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-7">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <h3 className="text-lg font-medium">
//                       AI Action Hub
//                     </h3>

//                     <p className="text-sm text-zinc-500 mt-1">
//                       AI-generated adaptive execution tasks
//                     </p>
//                   </div>

//                   <CheckCircle2 className="text-cyan-300" />
//                 </div>

//                 <div className="mt-7 space-y-4">
//                   {result.tasks.map((task, i) => (
//                     <motion.div
//                       key={task.id}
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: i * 0.08 }}
//                       className="
//                         rounded-3xl
//                         border border-white/10
//                         bg-white/[0.02]
//                         p-6
//                       "
//                     >
//                       <div className="flex items-start justify-between gap-6">
//                         <div className="flex-1">
//                           <div className="flex items-center gap-3 flex-wrap">
//                             <h4 className="font-medium text-lg">
//                               {task.title}
//                             </h4>

//                             <div className="
//                               px-3 py-1
//                               rounded-full
//                               text-xs
//                               bg-cyan-400/10
//                               border border-cyan-400/20
//                               text-cyan-200
//                             ">
//                               {task.priority}
//                             </div>
//                           </div>

//                           {/* AI metrics */}
//                           <div className="mt-5 grid grid-cols-2 lg:grid-cols-4 gap-3">
//                             <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
//                               <div className="text-xs text-zinc-500">
//                                 Emotional Weight
//                               </div>

//                               <div className="mt-1 text-sm font-medium">
//                                 {task.emotionalWeight}
//                               </div>
//                             </div>

//                             <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
//                               <div className="text-xs text-zinc-500">
//                                 Resistance
//                               </div>

//                               <div className="mt-1 text-sm font-medium">
//                                 {task.resistance}
//                               </div>
//                             </div>

//                             <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
//                               <div className="text-xs text-zinc-500">
//                                 Estimated Time
//                               </div>

//                               <div className="mt-1 text-sm font-medium">
//                                 {task.estimatedTime}
//                               </div>
//                             </div>

//                             <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
//                               <div className="text-xs text-zinc-500">
//                                 Best Time
//                               </div>

//                               <div className="mt-1 text-sm font-medium">
//                                 {task.bestTime}
//                               </div>
//                             </div>
//                           </div>

//                           {/* approach */}
//                           <div className="mt-5 rounded-2xl border border-white/10 bg-cyan-400/[0.03] p-4">
//                             <div className="text-xs text-zinc-500">
//                               Suggested Approach
//                             </div>

//                             <div className="mt-2 text-sm text-zinc-300">
//                               {task.suggestedApproach}
//                             </div>
//                           </div>
//                         </div>
//                       </div>

//                       {/* ACTION HUB */}
//                       <div className="mt-6 flex flex-wrap gap-3">
//                         <button className="
//                           h-11 px-5 rounded-2xl
//                           bg-white text-black
//                           text-sm font-medium
//                         ">
//                           Start Focus Session
//                         </button>

//                         <button className="
//                           h-11 px-5 rounded-2xl
//                           border border-white/10
//                           bg-white/5
//                           text-sm
//                         ">
//                           Add to Planner
//                         </button>

//                         <button className="
//                           h-11 px-5 rounded-2xl
//                           border border-white/10
//                           bg-white/5
//                           text-sm
//                         ">
//                           Break Into Steps
//                         </button>

//                         <button className="
//                           h-11 px-5 rounded-2xl
//                           border border-white/10
//                           bg-white/5
//                           text-sm
//                         ">
//                           Schedule Later
//                         </button>
//                       </div>
//                     </motion.div>
//                   ))}
//                 </div>
//               </div>

//               {/* ADAPTIVE PLANNER */}
//               <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-7">
//                 <div>
//                   <h3 className="text-lg font-medium">
//                     Adaptive Recovery Planner
//                   </h3>

//                   <p className="text-sm text-zinc-500 mt-1">
//                     AI-generated schedule based on your cognitive state
//                   </p>
//                 </div>

//                 <div className="mt-8 space-y-4">
//                   {result.planner.map((item, i) => (
//                     <motion.div
//                       key={item.time}
//                       initial={{ opacity: 0, x: -10 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       transition={{ delay: i * 0.08 }}
//                       className="
//                         flex items-center gap-5
//                         rounded-2xl
//                         border border-white/10
//                         bg-black/20
//                         p-5
//                       "
//                     >
//                       <div className="min-w-[90px] text-cyan-300 font-medium">
//                         {item.time}
//                       </div>

//                       <div className="flex-1">
//                         <div className="font-medium">
//                           {item.title}
//                         </div>

//                         <div className="text-sm text-zinc-500 mt-1">
//                           {item.type}
//                         </div>
//                       </div>

//                       <button className="
//                         h-10 px-4 rounded-xl
//                         border border-white/10
//                         bg-white/5
//                         text-sm
//                       ">
//                         Start
//                       </button>
//                     </motion.div>
//                   ))}
//                 </div>
//               </div>

//               {/* RECOMMENDATION */}
//               <div className="rounded-[28px] border border-cyan-400/10 bg-cyan-400/[0.03] p-7">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <h3 className="text-lg font-medium">
//                       AI Recommendation
//                     </h3>

//                     <p className="text-sm text-zinc-500 mt-1">
//                       Suggested next cognitive action
//                     </p>
//                   </div>

//                   <ChevronDown className="text-cyan-300" />
//                 </div>

//                 <p className="mt-5 text-zinc-300 leading-8">
//                   {result.recommendation}
//                 </p>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// }

// "use client";

// import { AnimatePresence, motion } from "framer-motion";
// import {
//   Brain,
//   Sparkles,
//   CheckCircle2,
//   Clock3,
//   Coffee,
//   Play,
//   Wand2,
//   CalendarPlus,
//   RotateCcw,
//   Bot,
// } from "lucide-react";
// import { useState } from "react";

// type Task = {
//   id: number;
//   title: string;
//   why: string;
//   priority: "Do first" | "Do next" | "Can wait" | "Recovery";
//   time: string;
//   energy: "Low" | "Medium" | "High";
//   status: "pending" | "doing" | "done" | "snoozed";
// };

// const samplePlan: Task[] = [
//   {
//     id: 1,
//     title: "Reply to the client",
//     why: "This is small but mentally heavy, so finishing it will reduce pressure fast.",
//     priority: "Do first",
//     time: "10 min",
//     energy: "Low",
//     status: "pending",
//   },
//   {
//     id: 2,
//     title: "Fix one small portfolio section",
//     why: "Do only one section today. No need to finish the whole portfolio.",
//     priority: "Do next",
//     time: "25 min",
//     energy: "Medium",
//     status: "pending",
//   },
//   {
//     id: 3,
//     title: "Study 3 React interview questions",
//     why: "Keep it small so you do not burn out.",
//     priority: "Can wait",
//     time: "20 min",
//     energy: "Medium",
//     status: "pending",
//   },
//   {
//     id: 4,
//     title: "Sleep reset step",
//     why: "Tonight, reduce screen time 30 minutes before bed.",
//     priority: "Recovery",
//     time: "30 min",
//     energy: "Low",
//     status: "pending",
//   },
// ];

// const processingSteps = [
//   "Reading your thoughts gently...",
//   "Finding what is urgent...",
//   "Splitting big tasks into smaller steps...",
//   "Building a calm plan for you...",
// ];

// export default function BrainDumpExperience() {
//   const [text, setText] = useState("");
//   const [processing, setProcessing] = useState(false);
//   const [plan, setPlan] = useState<Task[]>([]);
//   const [buddyMessage, setBuddyMessage] = useState(
//     "I'm here. Just write whatever feels heavy right now.",
//   );

//   async function handleAnalyze() {
//     if (!text.trim()) return;

//     setProcessing(true);
//     setPlan([]);

//     await new Promise((r) => setTimeout(r, 3200));

//     setPlan(samplePlan);
//     setBuddyMessage(
//       "I made a gentle plan for you. Start with the first tiny step — no pressure.",
//     );

//     setProcessing(false);
//   }

//   function updateTask(id: number, status: Task["status"]) {
//     setPlan((prev) =>
//       prev.map((task) => (task.id === id ? { ...task, status } : task)),
//     );

//     if (status === "done") {
//       setBuddyMessage("Good. That’s one thing out of your head now.");
//     }

//     if (status === "snoozed") {
//       setBuddyMessage("That’s okay. I moved it out of your way for now.");
//     }

//     if (status === "doing") {
//       setBuddyMessage(
//         "Stay with only this task. You don’t need to think about everything else.",
//       );
//     }
//   }

//   function makeEasier(id: number) {
//     setPlan((prev) =>
//       prev.map((task) =>
//         task.id === id
//           ? {
//               ...task,
//               title: `Tiny step: ${task.title}`,
//               time: "5 min",
//               energy: "Low",
//               why: "I made this smaller so it feels easier to start.",
//             }
//           : task,
//       ),
//     );

//     setBuddyMessage("I made it smaller. Tiny progress still counts.");
//   }

//   const completed = plan.filter((t) => t.status === "done").length;

//   return (
//     <div className="relative pb-20">
//       <div className="absolute left-1/2 top-0 -z-10 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-white/[0.04] blur-[140px]" />

//       {/* Header */}
//       <div className="flex items-center justify-between gap-6">
//         <div>
//           <div className="flex items-center gap-3">
//             <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
//               <Brain className="text-cyan-300" size={22} />
//             </div>

//             <div>
//               <h1 className="text-3xl! font-semibold tracking-tight">
//                 Brain Dump
//               </h1>
//               <p className="mt-1 text-zinc-300">
//                 Drop everything here. Mindrift will turn it into a calm plan.
//               </p>
//             </div>
//           </div>
//         </div>

//         {plan.length > 0 && (
//           <div className="hidden rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm text-zinc-400 md:block">
//             {completed}/{plan.length} done today
//           </div>
//         )}
//       </div>

//       <div className="grid grid-cols-[68%_30%] gap-4">
//         {/* Input */}
//         <motion.div
//           layout
//           className="mt-8 overflow-hidden rounded-[34px] border border-white/10 bg-white/[0.03] backdrop-blur-2xl"
//         >
//           <div className="p-7">
//             <h2 className="text-2xl! font-medium">
//               What's overwhelming your mind right now?
//             </h2>

//             <p className="mt-2 text-sm text-zinc-400">
//               No need to organize it. Write it messy.
//             </p>

//             <textarea
//               value={text}
//               onChange={(e) => setText(e.target.value)}
//               placeholder="Need to finish portfolio, reply to client, study React interview questions, fix sleep schedule, complete assignment..."
//               className="mt-6 min-h-[230px] w-full resize-none bg-transparent text-[15px] leading-8 text-zinc-200 outline-none placeholder:text-zinc-600"
//             />

//             <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//               <div className="flex flex-wrap gap-2">
//                 {[
//                   "Work",
//                   "Study",
//                   "Stress",
//                   "Sleep",
//                   "Deadlines",
//                   "Life stuff",
//                 ].map((item) => (
//                   <span
//                     key={item}
//                     className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-zinc-400"
//                   >
//                     {item}
//                   </span>
//                 ))}
//               </div>

//               <button
//                 onClick={handleAnalyze}
//                 disabled={processing || !text.trim()}
//                 className="rounded-2xl bg-white px-6 py-3 font-medium text-black transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-40"
//               >
//                 {processing ? "Building your plan..." : "Organize my mind"}
//               </button>
//             </div>
//           </div>
//         </motion.div>

//         {/* AI Buddy */}
//         <motion.div
//           animate={{ y: [0, -6, 0] }}
//           transition={{ duration: 4, repeat: Infinity }}
//           className="mt-8 flex items-start gap-4 rounded-[28px]"
//         >
//           <div className="relative flex h-14 w-14 shrink-0 items-center border border-cyan-300/5 justify-center rounded-2xl">
//             <Bot size={34} />
//             <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-emerald-300" />
//           </div>

//           <div className="bg-white/3 p-4 rounded-2xl border border-white/10">
//             <div className="text-sm font-medium text-white">
//               Miri, your mind assistant
//             </div>
//             <p className="mt-1 text-sm leading-6 text-zinc-400">
//               {buddyMessage}
//             </p>
//           </div>
//         </motion.div>
//       </div>

//       {/* Processing */}
//       <AnimatePresence>
//         {processing && (
//           <motion.div
//             initial={{ opacity: 0, y: 14 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0 }}
//             className="mt-8 rounded-[30px] border border-cyan-400/10 bg-cyan-400/[0.03] p-6"
//           >
//             <div className="flex items-center gap-3">
//               <Sparkles className="animate-pulse text-cyan-300" />
//               <div>
//                 <div className="font-medium">Mindrift is making your plan</div>
//                 <div className="mt-1 text-sm text-zinc-500">
//                   It is turning your messy thoughts into small next steps.
//                 </div>
//               </div>
//             </div>

//             <div className="mt-6 grid gap-3">
//               {processingSteps.map((step, index) => (
//                 <motion.div
//                   key={step}
//                   animate={{ opacity: [0.35, 1, 0.35] }}
//                   transition={{
//                     duration: 1.8,
//                     repeat: Infinity,
//                     delay: index * 0.25,
//                   }}
//                   className="flex items-center gap-3 text-sm text-zinc-300"
//                 >
//                   <div className="h-2 w-2 rounded-full bg-cyan-300" />
//                   {step}
//                 </motion.div>
//               ))}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Generated Planner */}
//       <AnimatePresence>
//         {plan.length > 0 && (
//           <motion.div
//             initial={{ opacity: 0, y: 18 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="mt-10 grid grid-cols-1 gap-6 xl:grid-cols-[1.4fr_0.8fr]"
//           >
//             {/* Today Plan */}
//             <div className="rounded-[34px] border border-white/10 bg-white/[0.03] p-7">
//               <div className="flex items-start justify-between gap-4">
//                 <div>
//                   <h2 className="text-2xl! font-semibold tracking-tight">
//                     Your calm plan for today
//                   </h2>
//                   <p className="mt-2 text-sm text-zinc-500">
//                     Mindrift created this automatically. Start from the top.
//                   </p>
//                 </div>

//                 <button className="hidden rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-zinc-300 md:flex">
//                   <CalendarPlus size={16} className="mr-2" />
//                   Saved to Planner
//                 </button>
//               </div>

//               <div className="mt-7 space-y-4">
//                 {plan.map((task, index) => (
//                   <motion.div
//                     key={task.id}
//                     initial={{ opacity: 0, y: 12 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: index * 0.08 }}
//                     className={`rounded-[26px] border p-5 transition ${
//                       task.status === "done"
//                         ? "border-emerald-400/20 bg-emerald-400/[0.04]"
//                         : task.status === "doing"
//                           ? "border-cyan-400/30 bg-cyan-400/[0.05]"
//                           : "border-white/10 bg-white/[0.025]"
//                     }`}
//                   >
//                     <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
//                       <div>
//                         <div className="flex flex-wrap items-center gap-2">
//                           <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-zinc-400">
//                             {task.priority}
//                           </span>

//                           <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-zinc-400">
//                             {task.time}
//                           </span>

//                           <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-zinc-400">
//                             {task.energy} energy
//                           </span>
//                         </div>

//                         <h3 className="mt-4 text-lg font-medium text-white">
//                           {task.title}
//                         </h3>

//                         <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-500">
//                           {task.why}
//                         </p>
//                       </div>

//                       <div className="flex flex-wrap gap-2">
//                         <button
//                           onClick={() => updateTask(task.id, "doing")}
//                           className="rounded-xl bg-white px-3 py-2 text-sm font-medium text-black"
//                         >
//                           <Play size={15} className="mr-1 inline" />
//                           Start
//                         </button>

//                         <button
//                           onClick={() => updateTask(task.id, "done")}
//                           className="rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 text-sm text-emerald-200"
//                         >
//                           <CheckCircle2 size={15} className="mr-1 inline" />
//                           Done
//                         </button>

//                         <button
//                           onClick={() => makeEasier(task.id)}
//                           className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-zinc-300"
//                         >
//                           <Wand2 size={15} className="mr-1 inline" />
//                           Make easier
//                         </button>

//                         <button
//                           onClick={() => updateTask(task.id, "snoozed")}
//                           className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-zinc-300"
//                         >
//                           <Clock3 size={15} className="mr-1 inline" />
//                           Later
//                         </button>
//                       </div>
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>
//             </div>

//             {/* Right Guide Panel */}
//             <div className="space-y-6">
//               <div className="rounded-[34px] border border-white/10 bg-white/[0.03] p-7">
//                 <h3 className="text-lg font-medium">What to do now</h3>

//                 <div className="mt-5 space-y-4">
//                   <GuideStep number="1" text="Start only the first task." />
//                   <GuideStep number="2" text="Do it for the suggested time." />
//                   <GuideStep
//                     number="3"
//                     text="Mark it done or make it easier."
//                   />
//                   <GuideStep number="4" text="Mindrift will adjust the plan." />
//                 </div>
//               </div>

//               <div className="rounded-[34px] border border-violet-400/10 bg-violet-400/[0.04] p-7">
//                 <Coffee className="text-violet-300" />

//                 <h3 className="mt-4 text-lg font-medium">Gentle reminder</h3>

//                 <p className="mt-3 text-sm leading-7 text-zinc-400">
//                   You do not need to finish everything today. Mindrift is here
//                   to help you lower the pressure, not increase it.
//                 </p>

//                 <button className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-zinc-300">
//                   <RotateCcw size={15} className="mr-2 inline" />
//                   Make today lighter
//                 </button>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// function GuideStep({ number, text }: { number: string; text: string }) {
//   return (
//     <div className="flex gap-3">
//       <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-xs font-semibold text-black">
//         {number}
//       </div>
//       <p className="text-sm leading-7 text-zinc-400">{text}</p>
//     </div>
//   );
// }

"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  createBrainDumpPlan,
  updatePlanTaskStatus,
} from "@/app/dashboard/brain-dump/actions";
import {
  Brain,
  Sparkles,
  CheckCircle2,
  Clock3,
  Moon,
  ArrowRight,
  RotateCcw,
  Play,
  CalendarDays,
  Bot,
  WandSparkles,
} from "lucide-react";
import { useState } from "react";

type PlanTask = {
  id: string;
  title: string;
  reason: string;
  priority: "Now" | "Next" | "Later" | "Rest";
  time: string;
  energy: "Low" | "Medium" | "High";
  status: "pending" | "active" | "done" | "later";
};

type MindriftPlan = {
  mood: string;
  simpleSummary: string;
  nextBestAction: string;
  gentleMessage: string;
  tasks: PlanTask[];
};

const mockPlan: MindriftPlan = {
  mood: "Overwhelmed, but manageable",
  simpleSummary:
    "You have many small unfinished things. Mindrift has turned them into a simple plan so you only need to focus on one step at a time.",
  nextBestAction:
    "Reply to the client first. It is urgent and should take less energy than studying.",
  gentleMessage:
    "You don’t need to fix everything right now. Start with one small action, then Mindrift will guide the next one.",
  tasks: [
    {
      id: "1",
      title: "Reply to client",
      reason: "Urgent and quick to finish",
      priority: "Now",
      time: "10 min",
      energy: "Low",
      status: "pending",
    },
    {
      id: "2",
      title: "Finish portfolio updates",
      reason: "Important for your career progress",
      priority: "Next",
      time: "45 min",
      energy: "Medium",
      status: "pending",
    },
    {
      id: "3",
      title: "Study React interview questions",
      reason: "Useful, but needs focus",
      priority: "Later",
      time: "35 min",
      energy: "Medium",
      status: "pending",
    },
    {
      id: "4",
      title: "Fix sleep schedule",
      reason: "Your body needs recovery",
      priority: "Rest",
      time: "Tonight",
      energy: "Low",
      status: "pending",
    },
  ],
};

const processingSteps = [
  "Reading your thoughts gently...",
  "Finding what feels urgent...",
  "Turning messy thoughts into tasks...",
  "Creating a calm plan for today...",
  "Choosing your first step...",
];

export default function BrainDumpExperience() {
  const [text, setText] = useState("");
  const [processing, setProcessing] = useState(false);
  const [plan, setPlan] = useState<MindriftPlan | null>(null);
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);

  async function handleOrganize() {
    if (!text.trim()) return;

    setProcessing(true);
    setPlan(null);

    const res = await createBrainDumpPlan(text);

    if (!res.success || !res.data) {
      setProcessing(false);
      alert(res.error || "Something went wrong.");
      return;
    }

    const { brainDump, tasks } = res.data;

    setPlan({
      mood: brainDump.mood_label,
      simpleSummary: brainDump.simple_summary,
      nextBestAction: brainDump.next_best_action,
      gentleMessage: brainDump.gentle_message,
      tasks: tasks.map((task: any) => ({
        id: task.id,
        title: task.title,
        reason: task.reason,
        priority: task.priority,
        time: task.estimated_time,
        energy: task.energy,
        status: task.status,
      })),
    });

    setActiveTaskId(tasks[0]?.id || null);
    setProcessing(false);
  }

  async function handleTaskStatus(
    taskId: string,
    status: "pending" | "active" | "done" | "later",
  ) {
    const res = await updatePlanTaskStatus(taskId, status);

    if (!res.success) {
      alert(res.error || "Could not update task.");
      return;
    }

    if (!plan) return;

    const updatedTasks = plan.tasks.map((task) =>
      task.id === taskId ? { ...task, status } : task,
    );

    const nextTask = updatedTasks.find((task) => task.status === "pending");

    setPlan({
      ...plan,
      tasks: updatedTasks,
      nextBestAction:
        status === "active"
          ? "Good. Stay with this one task. You do not need to think about the rest yet."
          : nextTask
            ? `Next, Mindrift suggests: ${nextTask.title}.`
            : "You handled the important things for now. Rest is allowed.",
    });

    setActiveTaskId(nextTask?.id || null);
  }

  function updateTaskStatus(
    taskId: string,
    status: "done" | "snoozed" | "pending",
  ) {
    if (!plan) return;

    const updatedTasks = plan.tasks.map((task) =>
      task.id === taskId ? { ...task, status } : task,
    );

    const nextPending = updatedTasks.find((task) => task.status === "pending");

    setPlan({
      ...plan,
      tasks: updatedTasks,
      nextBestAction: nextPending
        ? `Next, work on: ${nextPending.title}. Mindrift picked this because it matches your current energy.`
        : "Everything important is handled for now. You can rest.",
    });

    setActiveTaskId(nextPending?.id || null);
  }

  function createLighterPlan() {
    if (!plan) return;

    setPlan({
      ...plan,
      gentleMessage:
        "Mindrift made your plan lighter. Only the most important task stays for now.",
      tasks: plan.tasks.map((task, index) =>
        index === 0
          ? task
          : {
              ...task,
              status: "snoozed",
            },
      ),
    });
  }

  return (
    <div className="relative min-h-full">
      {/* soft background */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[760px] -translate-x-1/2 rounded-full bg-white/[0.04] blur-[150px]" />

      <div className="relative z-10 space-y-10">
        {/* Header */}
        <section className="flex items-start justify-between gap-6">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
                <Brain className="text-cyan-200" size={24} />
              </div>

              <div>
                <h1 className="text-3xl font-semibold tracking-tight">
                  Brain Dump
                </h1>
                <p className="mt-1 text-zinc-500">
                  Drop your messy thoughts. Mindrift will turn them into a calm
                  plan.
                </p>
              </div>
            </div>
          </div>

          {plan && (
            <div className="hidden rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-zinc-400 md:block">
              Plan auto-created
            </div>
          )}
        </section>

        {/* Input */}
        <AnimatePresence>
          {!plan && !processing && (
            <motion.section
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              className="mx-auto max-w-5xl"
            >
              <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.035] p-8 backdrop-blur-2xl">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_55%)]" />

                <div className="relative z-10">
                  <div className="mb-7 flex items-center gap-3">
                    <Bot className="text-cyan-200" size={22} />
                    <div>
                      <h2 className="text-xl font-medium">
                        What’s overwhelming your mind right now?
                      </h2>
                      <p className="mt-1 text-sm text-zinc-500">
                        No need to organize it. Just write it as it is.
                      </p>
                    </div>
                  </div>

                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Need to finish portfolio, reply to client, study React interview questions, fix sleep schedule, complete assignment..."
                    className="min-h-[300px] w-full resize-none bg-transparent text-[16px] leading-8 text-zinc-200 outline-none placeholder:text-zinc-600"
                  />

                  <div className="mt-6 flex flex-wrap gap-2">
                    {[
                      "Tasks",
                      "Stress",
                      "Deadlines",
                      "Ideas",
                      "Things I forgot",
                      "Life stuff",
                    ].map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-zinc-500"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-zinc-500">
                      Mindrift will create your plan automatically.
                    </p>

                    <button
                      onClick={handleOrganize}
                      className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3 font-medium text-black transition hover:scale-[1.02]"
                    >
                      Organize my mind
                      <WandSparkles size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Processing */}
        <AnimatePresence>
          {processing && (
            <motion.section
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mx-auto max-w-4xl rounded-[36px] border border-white/10 bg-white/[0.035] p-10 text-center backdrop-blur-2xl"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="mx-auto flex h-20 w-20 items-center justify-center rounded-[28px] border border-cyan-200/20 bg-cyan-200/10"
              >
                <Bot className="text-cyan-200" size={34} />
              </motion.div>

              <h2 className="mt-8 text-2xl font-semibold">
                Mindrift is sorting this for you
              </h2>
              <p className="mx-auto mt-3 max-w-md text-zinc-500">
                You can breathe. The messy part is being turned into a clear
                next step.
              </p>

              <div className="mx-auto mt-8 max-w-md space-y-3 text-left">
                {processingSteps.map((step, index) => (
                  <motion.div
                    key={step}
                    animate={{ opacity: [0.35, 1, 0.35] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.25,
                    }}
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.025] px-4 py-3 text-sm text-zinc-300"
                  >
                    <Sparkles size={15} className="text-cyan-200" />
                    {step}
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Result Flow */}
        <AnimatePresence>
          {plan && (
            <motion.section
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Mindrift Guide Card */}
              <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.035] p-8 backdrop-blur-2xl">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(125,211,252,0.08),transparent_45%)]" />

                <div className="relative z-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
                  <div>
                    <div className="flex items-center gap-3">
                      <motion.div
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-200/20 bg-cyan-200/10"
                      >
                        <Bot className="text-cyan-200" size={26} />
                      </motion.div>

                      <div>
                        <p className="text-sm text-zinc-500">Mindrift says</p>
                        <h2 className="text-2xl font-semibold">
                          I made a simple plan for you.
                        </h2>
                      </div>
                    </div>

                    <p className="mt-6 max-w-2xl text-zinc-400 leading-7">
                      {plan.simpleSummary}
                    </p>

                    <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.025] p-5">
                      <p className="text-sm text-zinc-500">
                        Your current state
                      </p>
                      <p className="mt-2 text-lg font-medium text-white">
                        {plan.mood}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-[28px] border border-cyan-200/10 bg-cyan-200/[0.045] p-6">
                    <p className="text-sm text-cyan-100">Next best step</p>
                    <p className="mt-3 text-zinc-200 leading-7">
                      {plan.nextBestAction}
                    </p>

                    <div className="mt-6 flex flex-col gap-3">
                      <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 font-medium text-black transition hover:scale-[1.02]">
                        Start guided step
                        <Play size={17} />
                      </button>

                      <button
                        onClick={createLighterPlan}
                        className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3 text-zinc-300 transition hover:bg-white/[0.05]"
                      >
                        Make today lighter
                        <Moon size={17} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Auto Planner */}
              <div className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
                <div className="rounded-[32px] border border-white/10 bg-white/[0.03] p-7">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold">
                        Today’s Auto Plan
                      </h3>
                      <p className="mt-1 text-sm text-zinc-500">
                        Created from your brain dump. No manual adding needed.
                      </p>
                    </div>

                    <div className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-zinc-400">
                      {plan.tasks.filter((t) => t.status === "done").length}/
                      {plan.tasks.length} done
                    </div>
                  </div>

                  <div className="mt-7 space-y-4">
                    {plan.tasks.map((task, index) => {
                      const isActive = activeTaskId === task.id;

                      return (
                        <motion.div
                          key={task.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.06 }}
                          className={`rounded-3xl border p-5 transition ${
                            isActive
                              ? "border-cyan-200/30 bg-cyan-200/[0.06]"
                              : "border-white/10 bg-white/[0.025]"
                          }`}
                        >
                          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                            <div>
                              <div className="flex items-center gap-3">
                                <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-sm text-zinc-400">
                                  {index + 1}
                                </span>

                                <div>
                                  <h4
                                    className={`font-medium ${
                                      task.status === "done" ||
                                      task.status === "later"
                                        ? "text-zinc-500 line-through"
                                        : "text-white"
                                    }`}
                                  >
                                    {task.title}
                                  </h4>

                                  <p className="mt-1 text-sm text-zinc-500">
                                    {task.reason}
                                  </p>
                                </div>
                              </div>

                              <div className="mt-4 flex flex-wrap gap-2">
                                <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-zinc-400">
                                  {task.status === "active"
                                    ? "In progress"
                                    : task.status === "done"
                                      ? "Done"
                                      : task.status === "later"
                                        ? "Moved later"
                                        : task.priority}
                                </span>
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-2">
                              {task.status !== "active" &&
                                task.status !== "done" && (
                                  <button
                                    onClick={() =>
                                      handleTaskStatus(task.id, "active")
                                    }
                                    className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-2 text-sm font-medium text-black"
                                  >
                                    Start
                                    <Play size={16} />
                                  </button>
                                )}

                              {task.status !== "done" && (
                                <button
                                  onClick={() =>
                                    handleTaskStatus(task.id, "done")
                                  }
                                  className="inline-flex items-center gap-2 rounded-2xl border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-sm text-emerald-200"
                                >
                                  Done
                                  <CheckCircle2 size={16} />
                                </button>
                              )}

                              {task.status !== "later" &&
                                task.status !== "done" && (
                                  <button
                                    onClick={() =>
                                      handleTaskStatus(task.id, "later")
                                    }
                                    className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-zinc-300"
                                  >
                                    Later
                                    <Clock3 size={16} />
                                  </button>
                                )}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Guide Panel */}
                <div className="space-y-6">
                  <div className="rounded-[32px] border border-white/10 bg-white/[0.03] p-7">
                    <div className="flex items-center gap-3">
                      <CalendarDays className="text-cyan-200" size={22} />
                      <h3 className="text-lg font-semibold">
                        What happens next?
                      </h3>
                    </div>

                    <div className="mt-6 space-y-4">
                      {[
                        "Mindrift saves this as today’s plan.",
                        "Your next step stays highlighted.",
                        "If you finish or snooze something, the plan adjusts.",
                        "Focus Mode can start from any task.",
                      ].map((item) => (
                        <div
                          key={item}
                          className="rounded-2xl border border-white/10 bg-white/[0.025] p-4 text-sm text-zinc-400"
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[32px] border border-white/10 bg-white/[0.03] p-7">
                    <p className="text-sm text-zinc-500">Gentle note</p>
                    <p className="mt-3 leading-7 text-zinc-300">
                      {plan.gentleMessage}
                    </p>

                    <button className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 font-medium text-black">
                      Continue in Focus Mode
                      <ArrowRight size={17} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
