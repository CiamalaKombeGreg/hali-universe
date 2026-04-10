"use client";

import Link from "next/link";
import {
  Search,
  Sparkles,
  Shield,
  Users,
  UserPlus,
  PencilLine,
  Crown,
  Swords,
  Orbit,
  ScrollText,
} from "lucide-react";
import { useMemo, useState } from "react";
import VerticalNavbar from "@/elements/home/VerticalNavbar";

type SpinnerAction = {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  accent: string;
  glow: string;
};

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
    <section className="rounded-[30px] border border-white/10 bg-black/25 p-6 backdrop-blur-xl">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-400/10 text-cyan-100">
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="text-2xl font-black text-white">{title}</h3>
      </div>

      <div className="text-sm leading-7 text-white/70">{children}</div>
    </section>
  );
}

function CharacterActionOrb({
  action,
  isActive,
  isGroup,
  onClick,
}: {
  action: SpinnerAction;
  isActive: boolean;
  isGroup: boolean;
  onClick: () => void;
}) {
  const Icon = action.icon;

  return (
    <Link
      href={action.href}
      onMouseEnter={onClick}
      className={`group relative block transition duration-300 ${isActive ? "z-30" : "z-20"} ${isGroup ? "hover:-translate-y-10" : "hover:translate-y-10"}`}
    >
      <div
        className={`absolute inset-0 rounded-full blur-2xl transition duration-500 ${action.glow} ${
          isActive ? "scale-110" : "scale-95"
        }`}
      />

      <div
        className={`
          relative flex h-[132px] w-[132px] flex-col items-center justify-center
          rounded-full border bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.22),rgba(255,255,255,0.06)_18%,rgba(8,16,30,0.96)_60%,rgba(0,0,0,0.98)_100%)]
          text-center shadow-[inset_-20px_-20px_50px_rgba(0,0,0,0.45),inset_10px_10px_24px_rgba(255,255,255,0.05)]
          transition-all duration-500 ease-out
          ${isActive
            ? "bg-[#020617] border-white/30 shadow-[0_0_40px_rgba(255,255,255,0.15)]"
            : "bg-[#020617] border-white/12"
          }
        `}
        style={{
          transform: isActive
            ? "translateZ(80px) translateY(-10px)"
            : "translateZ(-40px) translateY(20px)",
        }}
      >
        <div className="absolute inset-[12%] rounded-full border border-white/10 opacity-40" />
        <div className="absolute inset-[22%] rounded-full border border-white/5 opacity-30" />

        <div
          className={`mb-3 flex h-14 w-14 items-center justify-center rounded-2xl border ${action.accent}`}
        >
          <Icon className="h-7 w-7 text-white" />
        </div>

        <div className="max-w-[120px] text-sm font-black uppercase tracking-[0.16em] text-white">
          {action.title}
        </div>
      </div>
    </Link>
  );
}

export default function CharactersMainPage() {
  const [query, setQuery] = useState("");
  const [activeId, setActiveId] = useState("create-character");

  const actions = useMemo<SpinnerAction[]>(
    () => [
      {
        id: "create-character",
        title: "Create Character",
        description:
          "Open the creation flow for a new character profile, identity, lore links, and custom values.",
        href: "/characters/create",
        icon: UserPlus,
        accent: "border-cyan-300/20 bg-cyan-400/10",
        glow: "bg-cyan-400/20",
      },
      {
        id: "edit-character",
        title: "Edit Character",
        description:
          "Search and update an existing character entry, linked systems, summary, and custom sections.",
        href: "/characters/edit",
        icon: PencilLine,
        accent: "border-violet-300/20 bg-violet-400/10",
        glow: "bg-violet-400/20",
      },
      {
        id: "create-group",
        title: "Create Group",
        description:
          "Create a new organization, crew, faction, empire, team, or any custom group structure.",
        href: "/characters/groups/create",
        icon: Users,
        accent: "border-fuchsia-300/20 bg-fuchsia-400/10",
        glow: "bg-fuchsia-400/20",
      },
      {
        id: "edit-group",
        title: "Edit Group",
        description:
          "Modify an existing group, its members, metadata, and any custom user-defined categories.",
        href: "/characters/groups/edit",
        icon: Crown,
        accent: "border-amber-300/20 bg-amber-400/10",
        glow: "bg-amber-400/20",
      },
    ],
    []
  );

  const activeAction =
    actions.find((action) => action.id === activeId) ?? actions[0];

  return (
    <main className="relative flex min-h-screen bg-[#030511] text-white">
      <VerticalNavbar />

      <div className="relative flex-1 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.12),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.14),transparent_28%),radial-gradient(circle_at_center,rgba(34,211,238,0.06),transparent_22%),linear-gradient(to_bottom,#030511,#05091a,#030511)]" />

        <div className="pointer-events-none absolute inset-0 opacity-75">
          <div className="absolute left-[7%] top-[10%] h-1 w-1 rounded-full bg-white/75 shadow-[0_0_10px_rgba(255,255,255,0.8)] animate-pulse" />
          <div className="absolute left-[15%] top-[24%] h-1.5 w-1.5 rounded-full bg-cyan-200/80 shadow-[0_0_12px_rgba(103,232,249,0.8)] animate-pulse" />
          <div className="absolute left-[31%] top-[14%] h-1 w-1 rounded-full bg-white/70 animate-pulse" />
          <div className="absolute left-[46%] top-[29%] h-1 w-1 rounded-full bg-fuchsia-200/70 animate-pulse" />
          <div className="absolute left-[58%] top-[12%] h-1.5 w-1.5 rounded-full bg-white/75 animate-pulse" />
          <div className="absolute left-[71%] top-[18%] h-1 w-1 rounded-full bg-cyan-200/80 animate-pulse" />
          <div className="absolute left-[85%] top-[27%] h-1 w-1 rounded-full bg-white/70 animate-pulse" />
          <div className="absolute left-[10%] top-[67%] h-1 w-1 rounded-full bg-white/75 animate-pulse" />
          <div className="absolute left-[23%] top-[79%] h-1.5 w-1.5 rounded-full bg-indigo-200/70 animate-pulse" />
          <div className="absolute left-[39%] top-[70%] h-1 w-1 rounded-full bg-white/70 animate-pulse" />
          <div className="absolute left-[56%] top-[81%] h-1 w-1 rounded-full bg-cyan-100/70 animate-pulse" />
          <div className="absolute left-[69%] top-[65%] h-1.5 w-1.5 rounded-full bg-white/75 animate-pulse" />
          <div className="absolute left-[79%] top-[84%] h-1 w-1 rounded-full bg-fuchsia-200/70 animate-pulse" />
          <div className="absolute left-[91%] top-[58%] h-1 w-1 rounded-full bg-white/60 animate-pulse" />
        </div>

        <div className="pointer-events-none absolute inset-0 opacity-25">
          <div className="absolute left-[16%] top-[26%] h-[320px] w-[320px] rounded-full border border-cyan-300/10" />
          <div className="absolute left-[21%] top-[31%] h-[210px] w-[210px] rounded-full border border-white/10" />
          <div className="absolute right-[14%] top-[20%] h-[260px] w-[260px] rounded-full border border-fuchsia-300/10" />
          <div className="absolute left-[42%] bottom-[18%] h-[280px] w-[280px] rounded-full border border-violet-300/10" />
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-[1700px] flex-col gap-8 px-6 py-6 md:px-10">
          <section className="rounded-[34px] border border-white/10 bg-white/[0.04] px-6 py-8 backdrop-blur-sm">
            <div className="grid gap-8 xl:grid-cols-[1fr_620px] xl:items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-400/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-cyan-100">
                  <Sparkles className="h-4 w-4" />
                  Character Nexus
                </div>

                <h1 className="mt-5 text-4xl font-black text-white md:text-6xl">
                  Characters, Groups, and Identity Archives
                </h1>

                <p className="mt-5 max-w-4xl text-sm leading-8 text-white/68 md:text-base">
                  This page is the command hub for your character registry. From here,
                  you will create and edit individual characters, define groups and
                  organizations, and later connect them to the rest of your worldbuilding,
                  statistics, lorebooks, and custom user-defined systems.
                </p>
              </div>

              <div className="rounded-[28px] border border-white/10 bg-black/25 p-4 backdrop-blur-xl">
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0b1020]/90 px-4 py-4">
                  <Search className="h-5 w-5 text-white/45" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search characters or groups..."
                    className="w-full bg-transparent text-sm text-white placeholder:text-white/35 outline-none"
                  />
                </div>

                <div className="mt-3 rounded-[20px] border border-white/10 bg-black/20 px-4 py-4 text-sm text-white/45">
                  Main search logic can be connected later to characters and groups once
                  their creation/edit flows are ready.
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-[34px] border border-white/10 bg-black/25 px-6 py-8 backdrop-blur-xl">
            <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr] xl:items-center">
              <div className="relative flex min-h-[720px] items-center justify-center overflow-hidden rounded-[30px] border border-white/10 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.08),transparent_25%),radial-gradient(circle_at_70%_25%,rgba(168,85,247,0.12),transparent_24%),rgba(0,0,0,0.18)] px-4 py-10">
                <div className="absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/10" />
                <div className="absolute left-1/2 top-1/2 h-[250px] w-[250px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />
                <div className="absolute left-1/2 top-1/2 h-[140px] w-[140px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-fuchsia-300/10" />

                <div className="relative flex w-full max-w-[1100px] items-center justify-center [perspective:1200px]">
                  <div className="absolute left-[4%] top-[0%]">
                    <CharacterActionOrb
                      action={actions[0]}
                      isActive={activeAction.id === actions[0].id}
                      isGroup={true}
                      onClick={() => setActiveId(actions[0].id)}
                    />
                  </div>

                  <div className="absolute right-[4%] top-[0%]">
                    <CharacterActionOrb
                      action={actions[1]}
                      isActive={activeAction.id === actions[1].id}
                      isGroup={true}
                      onClick={() => setActiveId(actions[1].id)}
                    />
                  </div>

                  <div className="absolute left-[4%] bottom-[0%]">
                    <CharacterActionOrb
                      action={actions[2]}
                      isActive={activeAction.id === actions[2].id}
                      isGroup={false}
                      onClick={() => setActiveId(actions[2].id)}
                    />
                  </div>

                  <div className="absolute right-[4%] bottom-[0%]">
                    <CharacterActionOrb
                      action={actions[3]}
                      isActive={activeAction.id === actions[3].id}
                      isGroup={false}
                      onClick={() => setActiveId(actions[3].id)}
                    />
                  </div>

                  <div
                    className="relative z-30 flex h-[200px] w-[200px] flex-col items-center justify-center rounded-full border border-white/15 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.26),rgba(255,255,255,0.06)_18%,rgba(8,16,30,0.95)_60%,rgba(0,0,0,0.98)_100%)] text-center shadow-[inset_-20px_-20px_50px_rgba(0,0,0,0.45),inset_10px_10px_24px_rgba(255,255,255,0.05)] transition-all duration-500"
                    style={{ transform: "translateZ(40px)" }}
                  >
                    <div className="absolute inset-[12%] rounded-full border border-white/10 opacity-40" />
                    <div className="absolute inset-[22%] rounded-full border border-white/5 opacity-25" />

                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-400/10 text-cyan-100">
                      <Orbit className="h-7 w-7" />
                    </div>

                    <div className="text-sm font-black uppercase tracking-[0.2em] text-white">
                      Character Core
                    </div>

                    <p className="mt-3 max-w-[150px] text-xs leading-6 text-white/60">
                      Select one path to enter the identity archive system.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-[30px] border border-white/10 bg-black/20 p-6 backdrop-blur-xl">
                <div className="text-xs font-black uppercase tracking-[0.2em] text-cyan-100">
                  Active Selection
                </div>

                <h2 className="mt-4 text-3xl font-black text-white">
                  {activeAction.title}
                </h2>

                <p className="mt-4 text-sm leading-8 text-white/68">
                  {activeAction.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href={activeAction.href}
                    className="rounded-2xl border border-cyan-300/20 bg-cyan-400/10 px-5 py-3 text-sm font-bold text-cyan-100 transition hover:bg-cyan-400/20"
                  >
                    Open
                  </Link>
                </div>

                <div className="mt-8 grid gap-4">
                  <div className="rounded-[22px] border border-white/10 bg-white/5 p-4">
                    <div className="text-xs font-black uppercase tracking-[0.16em] text-white/50">
                      Scope
                    </div>
                    <div className="mt-2 text-sm text-white/75">
                      Characters and groups can later connect to lorebooks, world layers,
                      statistics, and user-defined metadata.
                    </div>
                  </div>

                  <div className="rounded-[22px] border border-white/10 bg-white/5 p-4">
                    <div className="text-xs font-black uppercase tracking-[0.16em] text-white/50">
                      Restriction Logic
                    </div>
                    <div className="mt-2 text-sm text-white/75">
                      Characters and groups can link to universe and series-related
                      structures, but not to locations directly.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <InfoCard icon={Shield} title="Character Logic">
              Characters are built from both fixed identity data and user-defined systems.
              They can later reference lorebooks, statistics, races, summaries, origins,
              affiliations, and any structured fields you decide to add.
            </InfoCard>

            <InfoCard icon={Users} title="Group Logic">
              Groups work like flexible entities: crews, organizations, empires, factions,
              titles, councils, or custom collections. They can hold characters without
              forcing any same-series restriction.
            </InfoCard>
          </section>

          <section className="grid gap-6 lg:grid-cols-3">
            <InfoCard icon={ScrollText} title="Baseline Identity">
              Characters start from a core identity layer such as name, surname, summary,
              race, origin link, and custom descriptors added by the user.
            </InfoCard>

            <InfoCard icon={Swords} title="System Integration">
              This area will later connect character pages to statistics, abilities,
              lorebooks, and all the structured systems already created elsewhere.
            </InfoCard>

            <InfoCard icon={Crown} title="Free Grouping">
              Groups are intentionally broad. A user can build canon teams, fanmade
              alliances, ranking groups, themed collections, or totally custom
              cross-series structures.
            </InfoCard>
          </section>
        </div>
      </div>
    </main>
  );
}