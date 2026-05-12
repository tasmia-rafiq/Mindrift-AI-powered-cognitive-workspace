"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Logo from "./ui/Logo";

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { label: "Features", href: "#features" },
    { label: "How it Works", href: "#how" },
    { label: "Demo", href: "#demo" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-transparent ${
          scrolled
            ? "backdrop-blur-2xl bg-black/30"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-20 flex items-center justify-between">
            {/* Logo */}
            <Logo />

            {/* Desktop Links */}
            <nav className="hidden lg:flex items-center gap-8">
              {links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-zinc-400 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <Link href="/login" className="text-sm text-zinc-400 hover:text-white transition">
                Sign In
              </Link>

              <Link href="/signup" className="group relative overflow-hidden rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black transition-all hover:scale-[1.02]">
                <span className="relative z-10">
                  Get Started
                </span>

                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-linear-to-r from-cyan-200 to-violet-200" />
              </Link>
            </div>

            {/* Mobile Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden text-white"
            >
              {mobileOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 inset-x-4 z-40 rounded-3xl border border-white/10 bg-black/80 backdrop-blur-2xl p-6 lg:hidden"
          >
            <nav className="flex flex-col gap-5">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-zinc-300 hover:text-white transition"
                >
                  {link.label}
                </a>
              ))}

              <div className="h-px bg-white/10 my-2" />

              <button className="rounded-2xl bg-white py-3 text-sm font-semibold text-black">
                Get Started
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}