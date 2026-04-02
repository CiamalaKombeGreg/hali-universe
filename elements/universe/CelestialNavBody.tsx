"use client";

import Link from "next/link";
import { Orbit, BookOpen, Library, Images } from "lucide-react";

type PlanetKind = "universe" | "wiki" | "lorebook" | "gallery";
type PlanetSize = "small" | "medium" | "large";

type Props = {
  kind: PlanetKind;
  title: string;
  description: string;
  href: string;
  size: PlanetSize;
  className?: string;
};

const iconMap = {
  universe: Orbit,
  wiki: BookOpen,
  lorebook: Library,
  gallery: Images,
};

const sizeMap = {
  small: "h-40 w-40",
  medium: "h-56 w-56",
  large: "h-72 w-72",
};

const glowMap = {
  universe:
    "from-fuchsia-500/70 via-violet-500/60 to-cyan-400/60 hover:shadow-[0_0_60px_rgba(217,70,239,0.35)]",
  wiki:
    "from-cyan-500/70 via-sky-500/60 to-indigo-400/60 hover:shadow-[0_0_60px_rgba(34,211,238,0.35)]",
  lorebook:
    "from-amber-400/70 via-orange-500/60 to-rose-500/60 hover:shadow-[0_0_60px_rgba(251,191,36,0.32)]",
  gallery:
    "from-emerald-400/70 via-teal-500/60 to-blue-500/60 hover:shadow-[0_0_60px_rgba(16,185,129,0.32)]",
};

export default function CelestialNavBody({
  kind,
  title,
  description,
  href,
  size,
  className = "",
}: Props) {
  const Icon = iconMap[kind];

  return (
    <Link
      href={href}
      className={`group absolute ${className}`}
    >
      <div className="relative">
        <div
          className={`absolute inset-0 rounded-full bg-gradient-to-br ${glowMap[kind]} blur-2xl transition duration-500 group-hover:scale-110`}
        />

        <div
          className={`relative ${sizeMap[size]} rounded-full border border-white/15 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.35),rgba(255,255,255,0.08)_20%,rgba(10,20,40,0.95)_65%,rgba(0,0,0,0.98)_100%)] shadow-[inset_-20px_-20px_50px_rgba(0,0,0,0.45),inset_10px_10px_30px_rgba(255,255,255,0.08)] transition duration-500 group-hover:scale-105`}
        >
          <div className="absolute inset-[8%] rounded-full border border-white/8 opacity-40" />
          <div className="absolute inset-[16%] rounded-full border border-white/6 opacity-20" />

          <div className="absolute left-1/2 top-1/2 flex w-[78%] -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/8 text-white/90 backdrop-blur-md">
              <Icon className="h-6 w-6" />
            </div>

            <div className="text-sm font-black uppercase tracking-[0.18em] text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.25)]">
              {title}
            </div>

            <p className="mt-2 text-xs leading-5 text-white/65 opacity-0 transition duration-300 group-hover:opacity-100">
              {description}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}