"use client";

import { createClient } from "@/utils/supabase/client";
import AuthCard from "@/components/auth/AuthCard";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Input from "@/components/ui/input";

export default function LoginPage() {
  const supabase = createClient();

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function login() {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (!error) {
      router.push("/dashboard");
    }
  }

  async function googleAuth() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,

        queryParams: {
            prompt: "select_account",
        }
      },
    });
  }

  return (
    <AuthCard
      title="Welcome back"
      subtitle="Continue organizing your mind with adaptive AI."
    >
      <div className="space-y-4">
        {/* google */}
        <button
          onClick={googleAuth}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/3 py-4 transition hover:bg-white/5"
        >
          <Image src="/google.svg" alt="Google" width={24} height={24} />
          Continue with Google
        </button>

        {/* divider */}
        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10" />
          </div>

          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-(--bg-900) px-3 py-1 rounded-sm text-zinc-500">
              Or continue with
            </span>
          </div>
        </div>

        {/* email */}
        <Input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        />

        {/* password */}
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        />

        {/* login */}
        <button
          onClick={login}
          className="w-full rounded-2xl bg-white py-4 font-medium text-(--bg-900) transition hover:scale-[1.01]"
        >
          Sign In
        </button>

        {/* Dont have an account? */}
        <p className="text-center text-sm text-zinc-400">
          Don't have an account?{" "}
          <button
            onClick={() => router.push("/signup")}
            className="text-cyan-400 hover:underline"
          >
            Sign up
          </button>
        </p>
      </div>
    </AuthCard>
  );
}
