"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Swords,
  Sparkles,
  Users,
  Trophy,
  Flame,
  Orbit,
  BookOpen,
  BarChart3,
  WandSparkles,
  MessagesSquare,
  Library,
  Images,
} from "lucide-react";
import { FaDiscord, FaYoutube } from "react-icons/fa";

const navItems = [
  {
    label: "Tiering Power",
    href: "/tiering-power",
    icon: Flame,
    subItems: [
      { label: "Tiering Wiki", href: "/tiering-power/tiering-wiki", icon: BookOpen },
      { label: "Statistiques Wiki", href: "/tiering-power/statistics-wiki", icon: BarChart3 },
      { label: "Recorded Abilities", href: "/tiering-power/recorded-abilities", icon: WandSparkles },
    ],
  },
  { label: "Universe",
    href: "/universe",
    icon: Orbit,
    subItems: [
      { label: "Universes Manager", href: "/universe/manage", icon: Orbit },
      { label: "Lorebook & stories", href: "/universe/lorebook", icon: Library },
      { label: "Wiki", href: "/universe/wiki", icon: BookOpen },
      { label: "Gallery", href: "/universe/gallery", icon: Images },
    ],
  },
  { label: "Characters", href: "/characters", icon: Users },
  { label: "Battle Mode", href: "/battle-mode", icon: Swords },
  { label: "Leaderboard", href: "/leaderboard", icon: Trophy },
  { label: "Community", href: "/community", icon: MessagesSquare },
];

export default function VerticalNavbar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 z-[500] flex h-screen w-[132px] shrink-0 flex-col items-center justify-between border-r border-white/10 bg-black/20 py-6 backdrop-blur-2xl">
      <div className="flex flex-col items-center gap-2">
        <Link
          href="/"
          className={`group relative z-[520] flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500 via-violet-500 to-cyan-400 shadow-lg transition duration-300 hover:scale-105 ${
            pathname === "/" ? "shadow-fuchsia-500/45" : "shadow-fuchsia-500/30"
          }`}
          title="Home"
        >
          <Sparkles className="h-5 w-5 text-white transition duration-300 group-hover:rotate-12 group-hover:scale-110" />
          <span className="pointer-events-none absolute left-[74px] top-1/2 z-[9999] -translate-y-1/2 whitespace-nowrap rounded-full border border-fuchsia-400/40 bg-[#120b24] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-fuchsia-100 opacity-0 shadow-[0_0_24px_rgba(217,70,239,0.28)] transition-all duration-300 group-hover:left-[82px] group-hover:opacity-100">
            Home
          </span>
        </Link>

        <div className="mt-4 flex flex-col gap-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <div key={item.label} className="flex flex-col items-center gap-2">
                <Link
                  href={item.href}
                  className={`group relative z-[520] flex h-10 w-10 items-center justify-center rounded-2xl border text-white/80 transition duration-300 hover:scale-105 ${
                    isActive
                      ? "border-fuchsia-400/60 bg-gradient-to-br from-fuchsia-500/30 to-cyan-400/20 text-white shadow-[0_0_24px_rgba(217,70,239,0.25)]"
                      : "border-white/10 bg-white/5 hover:border-fuchsia-400/50 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon
                    className={`h-5 w-5 transition duration-300 ${
                      isActive ? "scale-110 text-fuchsia-100" : "group-hover:rotate-6"
                    }`}
                  />
                  <span className="pointer-events-none absolute left-[74px] top-1/2 z-[9999] -translate-y-1/2 whitespace-nowrap rounded-full border border-fuchsia-400/40 bg-[#120b24] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-fuchsia-100 opacity-0 shadow-[0_0_24px_rgba(217,70,239,0.28)] transition-all duration-300 group-hover:left-[82px] group-hover:opacity-100">
                    {item.label}
                  </span>
                </Link>

                {item.subItems && isActive ? (
                  <div className="relative flex w-full flex-col items-center gap-2 pt-1">
                    <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-fuchsia-400/30 via-cyan-300/20 to-transparent" />
                    {item.subItems.map((subItem) => {
                      const SubIcon = subItem.icon;
                      const isSubActive = pathname === subItem.href;

                      return (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className={`group relative z-[520] flex h-9 w-9 items-center justify-center rounded-xl border text-white/75 transition duration-300 hover:scale-105 ${
                            isSubActive
                              ? "border-cyan-300/50 bg-cyan-400/15 text-cyan-100 shadow-[0_0_20px_rgba(34,211,238,0.18)]"
                              : "border-white/10 bg-white/5 hover:border-cyan-300/40 hover:bg-white/10"
                          }`}
                        >
                          <SubIcon className="h-3.5 w-3.5" />
                          <span className="pointer-events-none absolute left-[58px] top-1/2 z-[9999] -translate-y-1/2 whitespace-nowrap rounded-full border border-cyan-300/40 bg-[#0f1427] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-cyan-100 opacity-0 shadow-[0_0_20px_rgba(34,211,238,0.22)] transition-all duration-300 group-hover:left-[66px] group-hover:opacity-100">
                            {subItem.label}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3 pb-2">
        <button
          className="group relative z-[520] flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-red-500/15 text-red-300 transition duration-300 hover:scale-105 hover:bg-red-500/25"
          title="YouTube"
          type="button"
        >
          <FaYoutube className="h-3.5 w-3.5" />
          <span className="pointer-events-none absolute left-[52px] top-1/2 z-[9999] -translate-y-1/2 whitespace-nowrap rounded-full border border-red-400/40 bg-[#120b24] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-red-100 opacity-0 shadow-[0_0_20px_rgba(239,68,68,0.22)] transition-all duration-300 group-hover:left-[60px] group-hover:opacity-100">
            YouTube
          </span>
        </button>

        <button
          className="group relative z-[520] flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-indigo-500/15 text-indigo-300 transition duration-300 hover:scale-105 hover:bg-indigo-500/25"
          title="Discord"
          type="button"
        >
          <FaDiscord className="h-3.5 w-3.5" />
          <span className="pointer-events-none absolute left-[52px] top-1/2 z-[9999] -translate-y-1/2 whitespace-nowrap rounded-full border border-indigo-400/40 bg-[#120b24] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-indigo-100 opacity-0 shadow-[0_0_20px_rgba(99,102,241,0.22)] transition-all duration-300 group-hover:left-[60px] group-hover:opacity-100">
            Discord
          </span>
        </button>
      </div>
    </aside>
  );
}