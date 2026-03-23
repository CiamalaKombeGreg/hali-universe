"use client";

import { X } from "lucide-react";
import type { StatModalData } from "./statModalTypes";
import StatValueTable from "./StatValueTable";

type StatDetailsModalProps = {
  stat: StatModalData | null;
  open: boolean;
  onClose: () => void;
};

export default function StatDetailsModal({
  stat,
  open,
  onClose,
}: StatDetailsModalProps) {
  if (!open || !stat) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-2000 flex items-center justify-center bg-black/70 px-4 py-6 backdrop-blur-md">
      <div className="relative max-h-[92vh] w-full max-w-6xl overflow-y-auto rounded-4xl border border-white/15 bg-[#0b1020] p-6 shadow-[0_0_40px_rgba(0,0,0,0.45)] custom-scroll md:p-8">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/70 transition hover:bg-white/10 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mb-8">
          <div className="mb-3 inline-flex rounded-full border border-fuchsia-400/30 bg-fuchsia-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-fuchsia-200">
            {stat.category}
          </div>

          <h2 className="text-3xl font-black text-white md:text-4xl">
            {stat.title}
          </h2>

          <div className="mt-4 inline-flex rounded-full border border-cyan-300/20 bg-cyan-400/10 px-4 py-2 text-sm font-black text-cyan-100">
            Relevancy: {stat.relevancy}
          </div>
        </div>

        <div className="space-y-6">
          <section className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-xl font-black text-white">Description</h3>
            <p className="mt-3 text-sm leading-7 text-white/75">
              {stat.description}
            </p>
          </section>

          {stat.specialExplanation?.length ? (
            <section className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <h3 className="text-xl font-black text-white">
                Special Explanation
              </h3>

              <div className="mt-4 space-y-3">
                {stat.specialExplanation.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-sm leading-7 text-white/72"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ) : null}

          {stat.specialLists?.length ? (
            <section className="grid gap-5 md:grid-cols-2">
              {stat.specialLists.map((list) => (
                <div
                  key={list.title}
                  className="rounded-3xl border border-white/10 bg-white/5 p-5"
                >
                  <h3 className="text-xl font-black text-white">
                    {list.title}
                  </h3>

                  <div className="mt-4 space-y-2">
                    {list.items.map((item) => (
                      <p key={item} className="text-sm leading-6 text-white/72">
                        • {item}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </section>
          ) : null}

          <StatValueTable table={stat.table} />
        </div>
      </div>
    </div>
  );
}