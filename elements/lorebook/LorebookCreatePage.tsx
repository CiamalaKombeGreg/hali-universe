"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import VerticalNavbar from "@/elements/home/VerticalNavbar";
import LorebookCreateTabs from "./LorebookCreateTabs";

export default function LorebookCreatePage() {
  return (
    <main className="relative flex min-h-screen bg-[#050712] text-white">
      <VerticalNavbar />

      <div className="relative flex-1 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.12),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(217,70,239,0.12),transparent_24%),linear-gradient(to_bottom,#050712,#0a1020,#060816)]" />

        <div className="relative z-10 mx-auto w-full max-w-[1700px] px-6 py-6 md:px-10">
          <div className="mb-6">
            <Link
              href="/universe/lorebook"
              className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white/80 transition hover:border-cyan-400/40 hover:bg-white/10 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Return
            </Link>
          </div>

          <section className="rounded-[34px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm">
            <div className="inline-flex rounded-full border border-cyan-300/20 bg-cyan-400/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-cyan-100">
              Archive Creation
            </div>

            <h1 className="mt-4 text-4xl font-black text-white md:text-5xl">
              Create a lorebook or a novel
            </h1>

            <p className="mt-4 max-w-4xl text-sm leading-7 text-white/65">
              Use lorebooks for structured archive content and novels for narrative
              story entries with future chapter management.
            </p>
          </section>

          <div className="mt-8">
            <LorebookCreateTabs />
          </div>
        </div>
      </div>
    </main>
  );
}