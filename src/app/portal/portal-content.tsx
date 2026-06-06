"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Playfair_Display, Poppins } from "next/font/google";
import { Mail, Lock, ShieldCheck, Crown } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["700"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600"] });

export function PortalGatewayContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialRole = (() => {
    const param = searchParams?.get("role");
    return (param === "admin" || param === "holder") ? param : "holder";
  })() as "admin" | "holder";

  const [role, setRole] = useState<"admin" | "holder">(initialRole);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
      role,
    });

    setLoading(false);

    if (!result || result.error) {
      setError("Invalid credentials or role. Please confirm your login details with Palace Admin.");
      return;
    }

    router.push(role === "admin" ? "/admin" : "/portal/dashboard");
  };

  return (
    <main
      className={`${poppins.className} min-h-screen relative overflow-hidden`}
      style={{ background: "#0c0a09" }}
    >
      {/* Cinematic background — same pattern as homepage hero */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: "url(/royal_palace.jpeg)" }}
      />
      <div className="absolute inset-0 bg-linear-to-br from-[#191714]/95 via-[#0c0a09]/90 to-[#191714]/95" />
      {/* Gold radial shimmer */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(214,177,91,0.08),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(214,177,91,0.05),transparent_55%)]" />

      {/* Top brand bar */}
      <div className="relative z-10 border-b border-white/5 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center gap-3">
          <div className="relative h-9 w-9 rounded-full overflow-hidden ring-2 ring-[#d6b15b]/40">
            <Image src="/the king.jpeg" alt="Olubadan" fill className="object-cover" />
          </div>
          <span className={`${playfair.className} text-xl font-bold text-[#d6b15b]`}>
            Olubadan Palace
          </span>
          <span className="ml-auto text-xs font-semibold tracking-[0.18em] uppercase text-white/30">
            Secure Console
          </span>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex min-h-[calc(100vh-65px)] items-center justify-center px-4 py-12">
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">

          {/* Left — Brand Pillar */}
          <motion.aside
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col justify-between rounded-2xl border border-white/8 bg-white/3 p-8 backdrop-blur-sm"
          >
            <div>
              {/* Crown icon */}
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-[#d6b15b]/10 border border-[#d6b15b]/20">
                <Crown className="h-7 w-7 text-[#d6b15b]" />
              </div>

              <h1 className={`${playfair.className} text-3xl font-bold leading-tight text-white`}>
                Palace Console
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-white/50">
                The secure gateway for Palace Administrators and Title Holder
                Representatives. Accounts are issued and managed exclusively by the Palace Office.
              </p>

              <ul className="mt-8 space-y-3 text-sm text-white/45">
                {[
                  "Admin approval required for profile publication",
                  "No public registration — invite only",
                  "All console activity is logged and audited",
                  "Field-level privacy redaction always active",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#d6b15b]/60" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 rounded-xl border border-[#d6b15b]/15 bg-[#d6b15b]/5 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#d6b15b]/70">
                Security Status
              </p>
              <p className="mt-1 text-xs text-white/40 leading-relaxed">
                Encrypted session · Field-level redaction active · Palace-managed access
              </p>
            </div>
          </motion.aside>

          {/* Right — Login Card */}
          <motion.section
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md"
          >
            <div className="mb-7">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#d6b15b]/70">
                Secure Access
              </p>
              <h2 className={`${playfair.className} mt-2 text-3xl font-bold text-white`}>
                Sign In
              </h2>
              <p className="mt-1.5 text-sm text-white/40">
                Enter your Palace-issued credentials to access the console.
              </p>
            </div>

            {/* Role Toggle */}
            <div className="mb-7 flex gap-2 rounded-xl bg-black/25 p-1 border border-white/8">
              {(["holder", "admin"] as const).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`flex-1 flex items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-xs font-semibold transition-all duration-200 ${
                    role === r
                      ? "bg-[#d6b15b] text-[#191714] shadow-lg shadow-[#d6b15b]/20"
                      : "text-white/50 hover:text-white"
                  }`}
                >
                  <ShieldCheck className="h-3.5 w-3.5" />
                  {r === "holder" ? "Title Holder" : "Super Admin"}
                </button>
              ))}
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email */}
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">
                  <Mail className="h-4 w-4" />
                </span>
                <input
                  aria-label="Email address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@olubadan-palace.local"
                  className="w-full rounded-xl border border-white/10 bg-black/20 pl-11 pr-4 py-3 text-sm text-white placeholder:text-white/25 outline-none transition focus:border-[#d6b15b]/60 focus:ring-1 focus:ring-[#d6b15b]/20"
                />
              </div>

              {/* Password */}
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">
                  <Lock className="h-4 w-4" />
                </span>
                <input
                  aria-label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-white/10 bg-black/20 pl-11 pr-4 py-3 text-sm text-white placeholder:text-white/25 outline-none transition focus:border-[#d6b15b]/60 focus:ring-1 focus:ring-[#d6b15b]/20"
                />
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-lg bg-red-500/10 border border-red-400/20 px-3 py-2 text-xs text-red-300"
                >
                  {error}
                </motion.p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="group w-full rounded-xl bg-linear-to-r from-[#c9a444] to-[#d6b15b] px-5 py-3.5 text-sm font-bold text-[#191714] shadow-lg shadow-[#d6b15b]/15 transition-all duration-300 hover:shadow-xl hover:shadow-[#d6b15b]/25 hover:scale-[1.01] disabled:opacity-60"
              >
                {loading
                  ? "Signing in..."
                  : role === "admin"
                  ? "Enter Admin Console →"
                  : "Enter Representative Console →"}
              </button>
            </form>

            <div className="mt-6 border-t border-white/8 pt-5 text-xs text-white/30">
              Need access?{" "}
              <span className="text-[#d6b15b]/70">Contact the Palace Admin office</span>
            </div>
          </motion.section>
        </div>
      </div>
    </main>
  );
}
