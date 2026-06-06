"use client";

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function RegisterRepresentative() {
  return (
    <main className="min-h-screen bg-[#f4f1ea] px-4 py-10 text-gray-900 md:px-6">
      <section className="mx-auto max-w-4xl rounded-3xl border border-[#e8ddc8] bg-white p-10 shadow-sm">
        <div className="flex flex-col gap-6 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#9b762f] text-white shadow-lg">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-bold text-gray-950">Registration Is Closed</h1>
          <p className="text-sm leading-7 text-gray-600">
            Palace account creation is not available through this public site. All Title Holder and Super Admin accounts are issued directly by Palace Administration.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-[#e8ddc8] bg-[#fffaf0] p-6 text-left">
              <p className="text-sm font-semibold text-[#9b762f] uppercase tracking-[0.22em]">What this means</p>
              <p className="mt-3 text-sm text-gray-700 leading-7">
                New profile submissions are managed through internal Palace workflows. If you are a legitimate representative, contact Palace Admin to request access and onboarding.
              </p>
            </div>
            <div className="rounded-2xl border border-[#e8ddc8] bg-[#fffaf0] p-6 text-left">
              <p className="text-sm font-semibold text-[#9b762f] uppercase tracking-[0.22em]">Need support?</p>
              <p className="mt-3 text-sm text-gray-700 leading-7">
                Email the palace registry, or use your issued credentials to sign in at the secure portal.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/portal"
              className="rounded-xl bg-[#9b762f] px-6 py-3 text-sm font-semibold text-white hover:bg-[#7f6027] transition"
            >
              Go to Secure Portal
            </Link>
            <Link
              href="/"
              className="rounded-xl border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
