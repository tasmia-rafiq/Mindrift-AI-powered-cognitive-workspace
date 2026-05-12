import * as React from "react"

import { cn } from "@/lib/utils"

export default function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "w-full rounded-xl border border-white/10 bg-white/3 text-base placeholder:text-zinc-500 px-4 py-3 outline-none focus:border-cyan-400/40",
        className
      )}
      {...props}
    />
  )
}