"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  BrainCircuit,
  Calendar,
  Focus,
  Bot,
  FileText,
  Database,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";
import Logo from "../ui/Logo";

const items = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "Brain Dump", icon: BrainCircuit },
  { name: "Planner", icon: Calendar },
  { name: "Focus Mode", icon: Focus },
  { name: "AI Mentor", icon: Bot },
  { name: "Reflections", icon: FileText },
  { name: "Memories", icon: Database },
  { name: "Settings", icon: Settings },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={`h-full border-r border-white/10 bg-white/2 backdrop-blur-2xl flex flex-col transition-all duration-300 ${
        collapsed ? "w-20" : "w-65"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        {!collapsed && (
            <Logo />
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-xl hover:bg-white/10 transition"
        >
          {collapsed ? (
            <ChevronRight size={18} />
          ) : (
            <ChevronLeft size={18} />
          )}
        </button>
      </div>

      {/* Menu */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.name}
              whileHover={{ x: 4 }}
              className={`
                group flex items-center gap-3 py-3 rounded-2xl cursor-pointer hover:bg-white/4 transition
                  ${collapsed ? "px-0" : "px-3"}
                `}
            >
              <div className="h-10 w-10 p-2 flex items-center justify-center rounded-xl border border-white/10 bg-white/3 group-hover:border-cyan-400/30 group-hover:bg-cyan-400/10 transition">
                <Icon size={18} className="text-zinc-300" />
              </div>

              {!collapsed && (
                <span className="text-sm text-zinc-300 group-hover:text-white transition">
                  {item.name}
                </span>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-white/10 shrink-0">
        <div className="rounded-2xl bg-white/3 border border-white/10 p-3">
          {!collapsed ? (
            <>
              <div className="text-xs text-zinc-400">
                Cognitive Load
              </div>
              <div className="text-lg font-semibold text-white">
                Moderate
              </div>
            </>
          ) : (
            <div className="h-2 w-2 rounded-full bg-cyan-400 mx-auto" />
          )}
        </div>
      </div>
    </div>
  );
}