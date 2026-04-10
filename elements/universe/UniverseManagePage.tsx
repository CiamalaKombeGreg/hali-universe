"use client";

import Link from "next/link";
import { Orbit, MapPinned, Rocket, Sparkles, Database, GitBranch } from "lucide-react";
import VerticalNavbar from "@/elements/home/VerticalNavbar";

function TreeLine({
  title,
  description,
  level = 0,
}: {
  title: string;
  description?: string;
  level?: number;
}) {
  return (
    <div
      className="relative rounded-2xl border border-white/10 bg-black/20 px-4 py-3"
      style={{ marginLeft: `${level * 22}px` }}
    >
      {level > 0 ? (
        <div className="absolute -left-4 top-1/2 h-px w-4 -translate-y-1/2 bg-cyan-300/30" />
      ) : null}

      <div className="text-sm font-black text-white">{title}</div>
      {description ? (
        <p className="mt-1 text-xs leading-6 text-white/60">{description}</p>
      ) : null}
    </div>
  );
}

function InfoCard({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[26px] border border-white/10 bg-black/25 p-5 backdrop-blur-xl">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-400/10 text-cyan-100">
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="text-xl font-black text-white">{title}</h3>
      </div>
      <div className="text-sm leading-7 text-white/70">{children}</div>
    </div>
  );
}

export default function UniverseManagePage() {
  return (
    <main className="relative flex min-h-screen ml-33 overflow-hidden bg-[#02040b] text-white">
      <div className="fixed left-0 top-0 z-40 h-screen">
        <VerticalNavbar />
      </div>

      <div className="relative flex-1 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(30,64,175,0.14),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.14),transparent_30%),linear-gradient(to_bottom,#02040b,#040816,#02040b)]" />

        <div className="pointer-events-none absolute inset-0 opacity-70">
          <div className="absolute left-[8%] top-[12%] h-1 w-1 rounded-full bg-white/80 shadow-[0_0_10px_rgba(255,255,255,0.8)] animate-pulse" />
          <div className="absolute left-[18%] top-[28%] h-1.5 w-1.5 rounded-full bg-cyan-200/80 shadow-[0_0_12px_rgba(103,232,249,0.8)] animate-pulse" />
          <div className="absolute left-[32%] top-[18%] h-1 w-1 rounded-full bg-white/70 animate-pulse" />
          <div className="absolute left-[44%] top-[34%] h-1 w-1 rounded-full bg-fuchsia-200/70 animate-pulse" />
          <div className="absolute left-[58%] top-[20%] h-1.5 w-1.5 rounded-full bg-white/80 animate-pulse" />
          <div className="absolute left-[70%] top-[12%] h-1 w-1 rounded-full bg-cyan-200/80 animate-pulse" />
          <div className="absolute left-[82%] top-[26%] h-1 w-1 rounded-full bg-white/70 animate-pulse" />
          <div className="absolute left-[12%] top-[62%] h-1 w-1 rounded-full bg-white/80 animate-pulse" />
          <div className="absolute left-[24%] top-[74%] h-1.5 w-1.5 rounded-full bg-indigo-200/70 animate-pulse" />
          <div className="absolute left-[39%] top-[66%] h-1 w-1 rounded-full bg-white/70 animate-pulse" />
          <div className="absolute left-[55%] top-[78%] h-1 w-1 rounded-full bg-cyan-100/70 animate-pulse" />
          <div className="absolute left-[68%] top-[64%] h-1.5 w-1.5 rounded-full bg-white/80 animate-pulse" />
          <div className="absolute left-[78%] top-[82%] h-1 w-1 rounded-full bg-fuchsia-200/70 animate-pulse" />
          <div className="absolute left-[90%] top-[58%] h-1 w-1 rounded-full bg-white/60 animate-pulse" />
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-[1700px] flex-col gap-8 px-6 py-6 md:px-10">
          <section className="rounded-[34px] border border-white/10 bg-white/[0.03] px-6 py-8 backdrop-blur-sm">
            <div className="mb-6">
              <div className="inline-flex rounded-full border border-cyan-300/20 bg-cyan-400/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-cyan-100">
                Universe Management Hub
              </div>
              <h1 className="mt-4 text-4xl font-black text-white md:text-5xl">
                Build and organize the world database
              </h1>
              <p className="mt-4 max-w-4xl text-sm leading-7 text-white/65">
                This sector controls universe creation, location structuring, and
                long-term management. Universes, series collections, continuities,
                crossovers, and locations all belong to the same navigational logic.
              </p>
            </div>

            <div className="relative min-h-[620px] overflow-hidden rounded-[30px] border border-white/10 bg-black/20">
              <div className="absolute left-[12%] top-[22%] h-28 w-28 rounded-full bg-cyan-400/10 blur-3xl" />
              <div className="absolute right-[18%] top-[18%] h-32 w-32 rounded-full bg-fuchsia-500/10 blur-3xl" />
              <div className="absolute bottom-[12%] left-[42%] h-28 w-28 rounded-full bg-violet-500/10 blur-3xl" />

              <div className="absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400/40 via-fuchsia-500/20 to-violet-500/30 blur-3xl" />
                <div className="relative flex h-[250px] w-[250px] items-center justify-center rounded-full border border-white/15 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.35),rgba(255,255,255,0.08)_20%,rgba(10,20,40,0.95)_65%,rgba(0,0,0,0.98)_100%)] shadow-[inset_-20px_-20px_50px_rgba(0,0,0,0.45),inset_10px_10px_30px_rgba(255,255,255,0.08)]">
                  <div className="absolute inset-[10%] rounded-full border border-white/10 opacity-50" />
                  <div className="absolute inset-[18%] rounded-full border border-white/8 opacity-25" />

                  <div className="flex w-[80%] flex-col items-center text-center">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-cyan-100">
                      <Orbit className="h-7 w-7" />
                    </div>

                    <div className="text-sm font-black uppercase tracking-[0.2em] text-white">
                      Creation Core
                    </div>

                    <p className="mt-3 text-xs leading-6 text-white/65">
                      Enter the creation flow for Universes and Locations.
                    </p>

                    <div className="relative z-20 mt-5 flex flex-wrap items-center justify-center gap-3">
                      <Link
                        href="/universe/manage/create-universe"
                        className="rounded-full border border-cyan-300/20 bg-cyan-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-cyan-100 transition hover:bg-cyan-400/20"
                      >
                        New Universe
                      </Link>

                      <Link
                        href="/universe/manage/create-location"
                        className="rounded-full border border-fuchsia-300/20 bg-fuchsia-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-fuchsia-100 transition hover:bg-fuchsia-400/20"
                      >
                        New Location
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <Link
                href="/universe/manage/database"
                className="group absolute right-[10%] top-[18%] block transition hover:-translate-y-1"
              >
                <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-2xl transition group-hover:bg-fuchsia-400/20" />
                <div className="relative flex h-[150px] w-[150px] items-center justify-center rounded-full border border-white/15 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.25),rgba(255,255,255,0.06)_18%,rgba(8,16,30,0.95)_60%,rgba(0,0,0,0.98)_100%)]">
                  <div className="absolute inset-[12%] rounded-full border border-white/10 opacity-40" />
                  <Rocket className="h-12 w-12 text-cyan-100 transition group-hover:text-fuchsia-100" />
                </div>

                <div className="mt-3 text-center">
                  <div className="text-xs font-black uppercase tracking-[0.2em] text-white">
                    Management Ship
                  </div>
                  <div className="mt-1 text-[11px] text-white/60">
                    Manage universes and locations
                  </div>
                </div>
              </Link>

              <div className="pointer-events-none absolute bottom-8 left-8 max-w-[360px] rounded-[24px] border border-white/10 bg-black/30 px-5 py-4 backdrop-blur-xl">
                <div className="text-xs font-black uppercase tracking-[0.2em] text-cyan-100/80">
                  Navigation Logic
                </div>
                <p className="mt-2 text-sm leading-7 text-white/60">
                  Central planet = creation flow. Floating ship = management hub.
                  This page is the operational command room for Our world structure.
                </p>
              </div>
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-3">
            <InfoCard icon={Database} title="Category Logic">
              Universes, Series Collections, Continuities, Crossovers, and
              Locations are not the same kind of object. Each fills a different
              structural role inside the world database.
            </InfoCard>

            <InfoCard icon={GitBranch} title="Inheritance Logic">
              Series can branch into continuities, spinoffs, or fanmade works.
              Locations inherit their placement from the work they belong to,
              and sub-locations can continue infinitely.
            </InfoCard>

            <InfoCard icon={Sparkles} title="Creation Decision Rule">
              When creating a new entry, the key question is not only what it
              is, but also what it belongs to, whether it is official, and
              whether it is part of one source or multiple sources.
            </InfoCard>
          </section>

          <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-[30px] border border-white/10 bg-black/25 p-6 backdrop-blur-xl">
              <h2 className="text-2xl font-black text-white">
                Universe System — Structural Overview
              </h2>
              <p className="mt-3 text-sm leading-7 text-white/65">
                Our world database is a hierarchy-driven registry. Universes act
                as broad containers, Series Collections define official works,
                Continuities isolate canon branches, Installments represent the
                major internal parts of a continuity, and Locations build the
                physical or conceptual geography inside either a continuity or an installment.
              </p>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-[24px] border border-cyan-300/15 bg-cyan-400/8 p-4">
                  <div className="text-xs font-black uppercase tracking-[0.18em] text-cyan-100">
                    Official main work
                  </div>
                  <div className="mt-2 text-sm font-semibold text-white">
                    Series Collection
                  </div>
                </div>

                <div className="rounded-[24px] border border-sky-300/15 bg-sky-400/8 p-4">
                  <div className="text-xs font-black uppercase tracking-[0.18em] text-sky-100">
                    Chapter / saga / major part
                  </div>
                  <div className="mt-2 text-sm font-semibold text-white">
                    Installment
                  </div>
                </div>

                <div className="rounded-[24px] border border-rose-300/15 bg-rose-400/8 p-4">
                  <div className="text-xs font-black uppercase tracking-[0.18em] text-rose-100">
                    Timeline inside a collection
                  </div>
                  <div className="mt-2 text-sm font-semibold text-white">
                    Timeline / Continuity
                  </div>
                </div>

                <div className="rounded-[24px] border border-fuchsia-300/15 bg-fuchsia-400/8 p-4">
                  <div className="text-xs font-black uppercase tracking-[0.18em] text-fuchsia-100">
                    Alternate work
                  </div>
                  <div className="mt-2 text-sm font-semibold text-white">
                    Spinoff
                  </div>
                </div>

                <div className="rounded-[24px] border border-violet-300/15 bg-violet-400/8 p-4">
                  <div className="text-xs font-black uppercase tracking-[0.18em] text-violet-100">
                    Unofficial derived work
                  </div>
                  <div className="mt-2 text-sm font-semibold text-white">
                    Fanmade
                  </div>
                </div>

                <div className="rounded-[24px] border border-amber-300/15 bg-amber-400/8 p-4">
                  <div className="text-xs font-black uppercase tracking-[0.18em] text-amber-100">
                    Unofficial independent work
                  </div>
                  <div className="mt-2 text-sm font-semibold text-white">
                    Original Creation
                  </div>
                </div>

                <div className="rounded-[24px] border border-emerald-300/15 bg-emerald-400/8 p-4">
                  <div className="text-xs font-black uppercase tracking-[0.18em] text-emerald-100">
                    Multi-source work
                  </div>
                  <div className="mt-2 text-sm font-semibold text-white">
                    Crossover
                  </div>
                </div>

                <div className="rounded-[24px] border border-white/15 bg-white/8 p-4">
                  <div className="text-xs font-black uppercase tracking-[0.18em] text-white/70">
                    Place inside a work / place
                  </div>
                  <div className="mt-2 text-sm font-semibold text-white">
                    Location / Sub-location
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[30px] border border-white/10 bg-black/25 p-6 backdrop-blur-xl">
              <h2 className="text-2xl font-black text-white">
                Cosmology & Canon Dimensions
              </h2>
              <div className="mt-5 space-y-4">
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="text-xs font-black uppercase tracking-[0.16em] text-cyan-100">
                    Canon Status
                  </div>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {["Canon", "Semi-Canon", "Non-Canon", "Alternate Canon"].map((item) => (
                      <div
                        key={item}
                        className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/75"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="text-xs font-black uppercase tracking-[0.16em] text-fuchsia-100">
                    Cosmology Type
                  </div>
                  <div className="mt-3 grid gap-2">
                    {[
                      "Single Universe",
                      "Multiverse",
                      "Complex Multiverse",
                      "Higher-Dimensional Structure",
                    ].map((item) => (
                      <div
                        key={item}
                        className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/75"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="text-xs font-black uppercase tracking-[0.16em] text-violet-100">
                    Location Types
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {[
                      "Planet",
                      "City",
                      "Realm",
                      "Dimension",
                      "Structure",
                      "Conceptual Space",
                    ].map((item) => (
                      <div
                        key={item}
                        className="rounded-full border border-violet-300/15 bg-violet-400/10 px-3 py-1.5 text-xs font-semibold text-violet-100"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-[30px] border border-white/10 bg-black/25 p-6 backdrop-blur-xl">
            <h2 className="text-2xl font-black text-white">
              WORLD DATABASE — Complete Structural Tree
            </h2>

            <div className="mt-6 space-y-3">
              <TreeLine
                title="WORLD DATABASE"
                description="Master registry for world structures, derivative works, canon branches, and nested locations."
              />

              <TreeLine
                level={1}
                title="Universe"
                description="Can be empty. Can contain Series Collections and Original Creations. Does not directly contain Crossovers or Locations."
              />
              <TreeLine
                level={2}
                title="Can contain → Series Collection / Original Creation"
              />
              <TreeLine
                level={2}
                title="Cannot directly contain → Crossover / Location"
              />

              <TreeLine
                level={1}
                title="Series Collection"
                description="Official work from editor / company / publisher. Can exist inside a Universe or standalone."
              />
              <TreeLine
                level={2}
                title="Can contain → Continuity / Locations"
              />
              <TreeLine
                level={2}
                title="Derived forms → Spinoff / Fanmade"
              />

              <TreeLine
                level={1}
                title="Continuity"
                description="Specific canon branch or timeline of a Series Collection or Original creation. Used when multiple official or alternate paths exist."
              />
              <TreeLine
                level={2}
                title="Can contain → Locations / Installments"
              />

              <TreeLine
                level={1}
                title="Installment"
                description="A major chapter, saga, or internal part of a continuity. Installments are part of continuities and can contain locations."
              />
              <TreeLine
                level={2}
                title="Must have parent → Continuity / Spinoff / Fanmade"
              />
              <TreeLine
                level={2}
                title="Can contain → Locations"
              />

              <TreeLine
                level={1}
                title="Spinoff"
                description="Derivative of a Series Collection or Original Creation. Must have a parent Series Collection. Is not main canon continuity."
              />
              <TreeLine
                level={2}
                title="Can contain → Locations / Installments"
              />

              <TreeLine
                level={1}
                title="Fanmade"
                description="Unofficial derivative of a Series Collection. Must have a parent Series Collection."
              />
              <TreeLine
                level={2}
                title="Can contain → Locations / Installments"
              />

              <TreeLine
                level={1}
                title="Original Creation"
                description="Independent non-official creation. Can be standalone or inside a Universe made for original creations."
              />
              <TreeLine
                level={2}
                title="Can contain → Continuity / Locations"
              />
              <TreeLine
                level={2}
                title="Derived forms → Spinoff"
              />
              <TreeLine
                level={2}
                title="Cannot contain → Fanmade"
              />

              <TreeLine
                level={1}
                title="Crossover"
                description="Must be outside any Universe. Is its own Series Collection-type entry. Must reference multiple source materials."
              />
              <TreeLine
                level={2}
                title="Types → Official / Unofficial"
              />
              <TreeLine
                level={2}
                title="Can contain → Locations"
              />

              <TreeLine
                level={1}
                title="Location"
                description="Can only be created inside Series Collection, Continuity, Spinoff, Fanmade, Original Creation, or Crossover."
              />
              <TreeLine
                level={2}
                title="Cannot exist directly in an empty Universe"
              />
              <TreeLine
                level={2}
                title="Origin type → Original Location / Canon Location / Spinoff Location"
              />
              <TreeLine
                level={2}
                title="Structure → Location → Sub-location → Sub-location → ..."
              />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}