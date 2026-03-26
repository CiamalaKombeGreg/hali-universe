"use client";

import { abilityTypes } from "./recordedAbilitiesData";

const colors = [
  "from-red-500/30 to-rose-400/10 border-red-300/20",
  "from-orange-500/30 to-amber-400/10 border-orange-300/20",
  "from-yellow-500/30 to-amber-300/10 border-yellow-300/20",
  "from-emerald-500/30 to-green-400/10 border-emerald-300/20",
  "from-cyan-500/30 to-sky-400/10 border-cyan-300/20",
  "from-blue-500/30 to-indigo-400/10 border-blue-300/20",
  "from-violet-500/30 to-purple-400/10 border-violet-300/20",
  "from-fuchsia-500/30 to-pink-400/10 border-fuchsia-300/20",
  "from-slate-400/30 to-zinc-300/10 border-slate-300/20",
  "from-teal-500/30 to-cyan-300/10 border-teal-300/20",
];

export default function AbilitiesTypeWheel() {
  return (
    <section
      id="abilities-type-wheel"
      className="rounded-[30px] border border-white/15 bg-white/8 p-6 backdrop-blur-xl shadow-[0_0_30px_rgba(139,92,246,0.15)]"
    >
      <div className="mb-6">
        <div className="mb-3 inline-flex rounded-full border border-cyan-300/20 bg-cyan-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100">
          Ability Types
        </div>
        <h2 className="text-2xl font-black text-white md:text-3xl">
          Recorded ability families
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-white/65">
          These are the major categories abilities will be organized into.
        </p>
      </div>

      <div className="flex justify-center">
        <div className="relative flex h-170 w-170 items-center justify-center max-md:h-130 max-md:w-130 max-sm:h-95 max-sm:w-95">
          <div className="absolute h-55 w-55 rounded-full border border-white/15 bg-black/25 backdrop-blur-xl shadow-[0_0_25px_rgba(217,70,239,0.18)] max-md:h-45 max-md:w-45 max-sm:h-32.5 max-sm:w-32.5" />
          <div className="absolute z-10 flex h-55 w-55 items-center justify-center rounded-full text-center max-md:h-45 max-md:w-45 max-sm:h-32.5 max-sm:w-32.5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-fuchsia-200 max-sm:text-[10px]">
                Core Structure
              </p>
              <h3 className="mt-2 text-2xl font-black text-white max-md:text-xl max-sm:text-base">
                Ability Systems
              </h3>
              <p className="mt-2 px-5 text-sm leading-6 text-white/60 max-md:text-xs max-sm:hidden">
                Tree-based recorded abilities
              </p>
            </div>
          </div>

          {abilityTypes.map((type, index) => {
            const angle = (index / abilityTypes.length) * Math.PI * 2 - Math.PI / 2;
            const radius = 250;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            return (
              <div
                key={type}
                className={`absolute flex h-35 w-42.5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[26px] border bg-linear-to-br p-4 text-center backdrop-blur-xl transition duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(217,70,239,0.16)] max-md:h-27.5 max-md:w-35 max-sm:h-21 max-sm:w-27 max-sm:rounded-[18px] ${colors[index % colors.length]}`}
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                }}
              >
                <span className="text-sm font-bold leading-5 text-white max-md:text-xs max-md:leading-4 max-sm:text-[10px] max-sm:leading-3">
                  {type}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}