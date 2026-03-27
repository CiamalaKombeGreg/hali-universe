"use client";

import Link from "next/link";
import { ArrowLeft, PenSquare, PlusCircle } from "lucide-react";
import VerticalNavbar from "@/elements/home/VerticalNavbar";

export default function RecordedAbilitiesEditPage() {
  return (
    <main className="flex min-h-screen bg-[#060816] text-white">
      <VerticalNavbar />

      <div className="flex-1">
        <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-8 px-6 py-6 md:px-10">
          <div className="flex items-center justify-between">
            <Link
              href="/tiering-power/recorded-abilities"
              className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white/80 transition hover:border-fuchsia-400/40 hover:bg-white/10 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Return to Recorded Abilities
            </Link>
          </div>

          <section className="rounded-[30px] border border-white/15 bg-white/8 p-6 backdrop-blur-xl shadow-[0_0_30px_rgba(139,92,246,0.12)]">
            <div className="mb-3 inline-flex rounded-full border border-fuchsia-400/30 bg-fuchsia-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-fuchsia-200">
              Edit Mode
            </div>

            <h1 className="text-3xl font-black text-white md:text-4xl">
              Manage recorded abilities
            </h1>

            <p className="mt-3 max-w-3xl text-sm leading-7 text-white/65">
              Choose whether you want to create a new entry or edit an existing
              one. This page is only the management entry point for now.
            </p>
          </section>

          <div className="grid gap-6 md:grid-cols-2">
            <Link
              href="/tiering-power/recorded-abilities/edit/new"
              className="group rounded-[28px] border border-cyan-300/15 bg-gradient-to-br from-cyan-500/20 to-sky-400/10 p-8 text-left shadow-[0_0_28px_rgba(34,211,238,0.10)] transition duration-300 hover:-translate-y-1 hover:border-cyan-300/35 hover:shadow-[0_0_34px_rgba(34,211,238,0.18)]"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-400/10 text-cyan-100">
                <PlusCircle className="h-7 w-7" />
              </div>

              <h2 className="text-2xl font-black text-white">
                Create New Abilities
              </h2>

              <p className="mt-3 text-sm leading-7 text-white/70">
                Open the creation flow for new systems, association nodes, and
                recorded abilities.
              </p>
            </Link>

            <Link
              href="/tiering-power/recorded-abilities/edit/existing"
              className="group rounded-[28px] border border-fuchsia-300/15 bg-gradient-to-br from-fuchsia-500/20 to-pink-400/10 p-8 text-left shadow-[0_0_28px_rgba(217,70,239,0.10)] transition duration-300 hover:-translate-y-1 hover:border-fuchsia-300/35 hover:shadow-[0_0_34px_rgba(217,70,239,0.18)]"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-fuchsia-300/20 bg-fuchsia-400/10 text-fuchsia-100">
                <PenSquare className="h-7 w-7" />
              </div>

              <h2 className="text-2xl font-black text-white">
                Edit Existing Abilities
              </h2>

              <p className="mt-3 text-sm leading-7 text-white/70">
                Browse and update already recorded systems, branches, and abilities.
              </p>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}