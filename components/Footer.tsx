"use client";

import React from "react";

const footerLinks = {
  Product: ["Features", "AI Demo", "Pricing", "Roadmap"],
  Company: ["About", "Blog", "Careers", "Contact"],
  Resources: ["Documentation", "Privacy", "Terms", "Support"],
};

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/5 px-6 py-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-5">
          {/* brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10">
                <div className="h-4 w-4 rounded-full bg-linear-to-br from-cyan-300 to-violet-400" />
              </div>

              <div>
                <div className="text-xl font-semibold text-white">
                  Mindrift
                </div>

                <div className="text-xs uppercase tracking-[0.3em] text-zinc-500">
                  Cognitive OS
                </div>
              </div>
            </div>

            <p className="mt-6 max-w-md leading-7 text-zinc-500">
              AI-powered cognitive clarity for overwhelmed minds.
              Organize thoughts, reduce burnout, and regain focus with
              adaptive intelligence.
            </p>
          </div>

          {/* links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                {category}
              </h3>

              <div className="mt-6 space-y-4">
                {links.map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="block text-zinc-500 transition hover:text-white"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* bottom */}
        <div className="mt-20 flex flex-col items-center justify-between gap-6 border-t border-white/5 pt-8 text-sm text-zinc-600 md:flex-row">
          <div>
            © 2026 Mindrift. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <a
              href="#"
              className="transition hover:text-white"
            >
              Twitter
            </a>

            <a
              href="#"
              className="transition hover:text-white"
            >
              LinkedIn
            </a>

            <a
              href="#"
              className="transition hover:text-white"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}