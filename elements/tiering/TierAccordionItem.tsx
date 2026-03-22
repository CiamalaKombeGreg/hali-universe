"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { TierEntry } from "./tieringWikiData";

type TierAccordionItemProps = {
  entry: TierEntry;
};

function createTierId(value: string) {
  return `tier-${value.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-")}`;
}

export default function TierAccordionItem({ entry }: TierAccordionItemProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      id={createTierId(entry.fullTitle)}
      className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl scroll-mt-24"
    >
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-white/5"
      >
        <div className="flex items-center gap-4">
          <div className="flex h-12 min-w-12 items-center justify-center rounded-full border border-fuchsia-300/30 bg-fuchsia-500/15 px-3 text-sm font-black text-fuchsia-100 shadow-[0_0_20px_rgba(217,70,239,0.18)]">
            {entry.tierNumber}
          </div>

          <div>
            <h4 className="text-lg font-bold text-white">{entry.tierName}</h4>
            <p className="text-sm text-white/55">{entry.fullTitle}</p>
          </div>
        </div>

        <ChevronDown
          className={`h-5 w-5 text-white/60 transition duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`grid transition-all duration-300 ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-white/10 px-5 py-5">
            <p className="text-sm leading-7 text-white/72">{entry.description}</p>

            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <div className="rounded-2xl border border-cyan-300/15 bg-cyan-400/8 p-4">
                <h5 className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-cyan-100">
                  Key Points
                </h5>
                <div className="space-y-2">
                  {entry.keyPoints.map((point) => (
                    <p key={point} className="text-sm leading-6 text-white/72">
                      • {point}
                    </p>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-fuchsia-300/15 bg-fuchsia-400/8 p-4">
                <h5 className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-fuchsia-100">
                  Limitations
                </h5>
                <div className="space-y-2">
                  {entry.limitations.map((point) => (
                    <p key={point} className="text-sm leading-6 text-white/72">
                      • {point}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}