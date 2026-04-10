"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import VerticalNavbar from "@/elements/home/VerticalNavbar";
import UniverseLocationCreateForm from "./UniverseLocationCreateForm";

export default function UniverseLocationCreatePage() {
  return (
    <main className="relative flex min-h-screen bg-[#02040b] text-white">
      <VerticalNavbar />

      <div className="relative flex-1 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(30,64,175,0.14),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.14),transparent_30%),linear-gradient(to_bottom,#02040b,#040816,#02040b)]" />

        <div className="relative z-10 mx-auto w-full max-w-[1650px] px-6 py-6 md:px-10">
          <div className="mb-6">
            <Link
              href="/universe/manage"
              className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white/80 transition hover:border-cyan-400/40 hover:bg-white/10 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Return
            </Link>
          </div>

          <section className="rounded-[34px] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm">
            <div className="inline-flex rounded-full border border-fuchsia-300/20 bg-fuchsia-400/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-fuchsia-100">
              Location Creation
            </div>

            <h1 className="mt-4 text-4xl font-black text-white md:text-5xl">
              Create a new location or sub-location
            </h1>

            <p className="mt-4 max-w-4xl text-sm leading-7 text-white/65">
              Create canon locations, spinoff locations, and original locations.
              Locations must belong to a valid world layer or another location.
            </p>
          </section>

          <div className="mt-8">
            <UniverseLocationCreateForm />
          </div>
        </div>
      </div>
    </main>
  );
}