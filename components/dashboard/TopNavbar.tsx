"use client";

import { Bell, Search, Sparkles, ChevronDown } from "lucide-react";

import { motion } from "framer-motion";

export default function TopNavbar({ user }: any) {
  return (
    <header className="h-19.5 border-b border-white/10 bg-[#0a0a0a]/80 backdrop-blur-2xl px-6 lg:px-10 flex items-center justify-between">
      {/* LEFT */}
      <div className="flex items-center gap-4">
        {/* SEARCH */}
        <div className="relative w-85 hidden md:block">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
          />

          <input
            placeholder="Search thoughts, tasks, memories..."
            className="
              w-full
              h-11
              rounded-xl
              bg-white/3
              border border-white/10
              pl-11
              pr-4
              text-sm
              outline-none
              focus:border-cyan-400/40
              transition-all
            "
          />
        </div>

        {/* AI STATUS */}
        <motion.div
          animate={{
            boxShadow: [
              "0 0 0px rgba(34,211,238,0.2)",
              "0 0 20px rgba(34,211,238,0.35)",
              "0 0 0px rgba(34,211,238,0.2)",
            ],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
          }}
          className="
            hidden lg:flex
            items-center
            gap-2
            px-4
            h-11
            rounded-xl
            border border-cyan-400/20
            bg-cyan-400/10
          "
        >
          <div className="h-2 w-2 rounded-full bg-cyan-300" />

          <span className="text-sm text-cyan-200">Miro Active</span>
        </motion.div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3">
        {/* MOOD INDICATOR */}
        <div className="hidden md:flex items-center gap-2 px-4 h-11 rounded-xl bg-white/3 border border-white/10">
          <Sparkles size={16} className="text-cyan-300" />

          <div>
            <div className="text-xs text-zinc-500 leading-none">Mood</div>

            <div className="text-sm text-white leading-none mt-1">Focused</div>
          </div>
        </div>

        {/* NOTIFICATIONS */}
        <button
          className="
            relative
            h-11
            w-11
            rounded-xl
            bg-white/3
            border border-white/10
            flex items-center justify-center
            hover:bg-white/5
          "
        >
          <Bell size={18} />

          {/* notification dot */}
          <span
            className="
            absolute
            top-3
            right-3
            h-2
            w-2
            rounded-full
            bg-cyan-300
          "
          />
        </button>

        {/* USER */}
        <button
          className="
              flex items-center gap-2 p-1.5
              rounded-xl
              bg-white/3
              border border-white/10
              hover:bg-white/5
              transition-all
            "
        >
          {/* AVATAR */}
          <div className="h-8 w-8 rounded-full overflow-hidden bg-white/10">
            {user?.user_metadata?.avatar_url ? (
              <img
                src={user.user_metadata.avatar_url}
                alt="avatar"
                className="h-full w-full object-cover"
              />
            ) : (
              <div
                className="
            h-8
            w-8
            rounded-full
            bg-linear-to-br
            from-cyan-400
            to-violet-500
            flex items-center justify-center
            text-sm font-semibold text-black
          "
              >
                {user?.email?.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          {/* USER INFO */}
          <div className="hidden sm:block text-left">
            <div className="text-sm leading-none">
                {user?.user_metadata?.full_name
                  ? user.user_metadata.full_name.split(' ').map((n: string) => n[0]).join('')
                  : user?.email?.split('@')[0]?.charAt(0).toUpperCase()}
            </div>
          </div>

          <ChevronDown size={16} className="text-zinc-500" />
        </button>
      </div>
    </header>
  );
}
