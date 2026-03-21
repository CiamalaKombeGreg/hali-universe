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
} from "lucide-react";
import { FaDiscord, FaYoutube } from "react-icons/fa";

const navItems = [
  { label: "Tiering Power", href: "/tiering-power", icon: Flame },
  { label: "Universe", href: "/universe", icon: Orbit },
  { label: "Characters", href: "/characters", icon: Users },
  { label: "Battle Mode", href: "/battle-mode", icon: Swords },
  { label: "Leaderboard", href: "/leaderboard", icon: Trophy },
];

export default function VerticalNavbar() {
  const pathname = usePathname();

  return (
    <aside className="relative z-30 flex h-screen w-[110px] flex-col items-center justify-between border-r border-white/10 bg-black/20 py-6 backdrop-blur-2xl">
      <div className="flex flex-col items-center gap-4">
        <Link
          href="/"
          className={`group relative z-30 flex h-14 w-14 items-center justify-center rounded-2xl transition duration-300 hover:scale-105 ${
            pathname === "/"
              ? "bg-gradient-to-br from-fuchsia-500 via-violet-500 to-cyan-400 shadow-lg shadow-fuchsia-500/40"
              : "bg-gradient-to-br from-fuchsia-500 via-violet-500 to-cyan-400 shadow-lg shadow-fuchsia-500/30"
          }`}
          title="Home"
        >
          <Sparkles className="h-7 w-7 text-white transition duration-300 group-hover:rotate-12 group-hover:scale-110" />

          <span className="pointer-events-none absolute left-[74px] top-1/2 z-[100] -translate-y-1/2 whitespace-nowrap rounded-full border border-fuchsia-400/40 bg-[#120b24] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-fuchsia-100 opacity-0 shadow-[0_0_24px_rgba(217,70,239,0.28)] transition-all duration-300 group-hover:left-[82px] group-hover:opacity-100">
            Home
          </span>
        </Link>

        <div className="mt-4 flex flex-col gap-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`group relative z-30 flex h-14 w-14 items-center justify-center rounded-2xl border text-white/80 transition duration-300 hover:scale-105 ${
                  isActive
                    ? "border-fuchsia-400/60 bg-gradient-to-br from-fuchsia-500/30 to-cyan-400/20 text-white shadow-[0_0_24px_rgba(217,70,239,0.25)]"
                    : "border-white/10 bg-white/5 hover:border-fuchsia-400/50 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon
                  className={`h-6 w-6 transition duration-300 ${
                    isActive ? "scale-110 text-fuchsia-100" : "group-hover:rotate-6"
                  }`}
                />

                <span className="pointer-events-none absolute left-[74px] top-1/2 z-[100] -translate-y-1/2 whitespace-nowrap rounded-full border border-fuchsia-400/40 bg-[#120b24] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-fuchsia-100 opacity-0 shadow-[0_0_24px_rgba(217,70,239,0.28)] transition-all duration-300 group-hover:left-[82px] group-hover:opacity-100">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <button
          className="group relative z-30 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-red-500/15 text-red-300 transition duration-300 hover:scale-105 hover:bg-red-500/25"
          title="YouTube"
          type="button"
        >
          <FaYoutube className="h-5 w-5" />
          <span className="pointer-events-none absolute left-[68px] top-1/2 z-[100] -translate-y-1/2 whitespace-nowrap rounded-full border border-red-400/40 bg-[#120b24] px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-red-100 opacity-0 shadow-[0_0_20px_rgba(239,68,68,0.22)] transition-all duration-300 group-hover:left-[76px] group-hover:opacity-100">
            YouTube
          </span>
        </button>

        <button
          className="group relative z-30 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-indigo-500/15 text-indigo-300 transition duration-300 hover:scale-105 hover:bg-indigo-500/25"
          title="Discord"
          type="button"
        >
          <FaDiscord className="h-5 w-5" />
          <span className="pointer-events-none absolute left-[68px] top-1/2 z-[100] -translate-y-1/2 whitespace-nowrap rounded-full border border-indigo-400/40 bg-[#120b24] px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-indigo-100 opacity-0 shadow-[0_0_20px_rgba(99,102,241,0.22)] transition-all duration-300 group-hover:left-[76px] group-hover:opacity-100">
            Discord
          </span>
        </button>
      </div>
    </aside>
  );
}