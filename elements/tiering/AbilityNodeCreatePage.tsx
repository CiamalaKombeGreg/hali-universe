"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import VerticalNavbar from "@/elements/home/VerticalNavbar";
import AbilityNodeCreateForm from "./AbilityNodeCreateForm";

export default function AbilityNodeCreatePage() {
  return (
    <main className="flex min-h-screen bg-[#060816] text-white">
      <VerticalNavbar />

      <div className="flex-1">
        <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-8 px-6 py-6 md:px-10">
          <div className="flex items-center justify-between">
            <Link
              href="/tiering-power/recorded-abilities/edit"
              className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white/80 transition hover:border-fuchsia-400/40 hover:bg-white/10 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Return to Edit Hub
            </Link>
          </div>

          <section className="rounded-[30px] border border-white/15 bg-white/8 p-6 backdrop-blur-xl shadow-[0_0_30px_rgba(139,92,246,0.12)]">
            <div className="mb-3 inline-flex rounded-full border border-cyan-300/20 bg-cyan-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100">
              New Ability Node
            </div>

            <h1 className="text-3xl font-black text-white md:text-4xl">
              Create a new recorded ability node
            </h1>

            <p className="mt-3 max-w-3xl text-sm leading-7 text-white/65">
              Create systems, sub-systems, recorded abilities, and association
              results. Save only becomes available when the publish rules are satisfied.
            </p>
          </section>

          <AbilityNodeCreateForm />
        </div>
      </div>
    </main>
  );
}