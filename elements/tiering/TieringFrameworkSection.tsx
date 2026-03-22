export default function TieringFrameworkSection() {
  const subTierCards = [
    {
      title: "Low Tier",
      color:
        "from-emerald-500/25 to-teal-400/10 border-emerald-300/20 text-emerald-100",
      accent: "bg-emerald-400/20 text-emerald-100 border-emerald-300/25",
      summary: "Partial interaction with the tier.",
      points: [
        "Cannot fully match the scale of the tier",
        "Capabilities are limited, restricted, or situational",
        "Interaction is localized, incomplete, or unstable",
      ],
      range: "1/10 → 3/10",
    },
    {
      title: "Medium Tier",
      color:
        "from-yellow-500/25 to-amber-400/10 border-yellow-300/20 text-yellow-100",
      accent: "bg-yellow-400/20 text-yellow-100 border-yellow-300/25",
      summary: "Standard capability within the tier.",
      points: [
        "Can match and interact with the tier",
        "Does not require total destruction capability",
        "Can rival the tier across multiple aspects",
      ],
      range: "4/10 → 7/10",
    },
    {
      title: "High Tier",
      color:
        "from-rose-500/25 to-fuchsia-400/10 border-rose-300/20 text-rose-100",
      accent: "bg-rose-400/20 text-rose-100 border-rose-300/25",
      summary: "Clear superiority over the tier.",
      points: [
        "Above the standard level of the tier",
        "Multiple abilities exceed the baseline",
        "Still does not require every single ability to surpass the tier",
      ],
      range: "8/10 → 10/10",
    },
  ];

  const plusExamples = [
    "Low Universal+",
    "Universal+",
    "Planetary+",
    "Low Outerversal+",
  ];

  const philosophyPoints = [
    "Scaling is based on interaction and capability, not just destruction.",
    "A tier represents what an entity can match or rival, not necessarily obliterate.",
    "Characters can excel in some aspects of a tier without mastering all of them.",
    "The system prioritizes flexibility and nuance over rigid classification.",
  ];

  return (
    <section
      id="tiering-framework"
      className="rounded-4xl border border-white/15 bg-white/8 p-6 backdrop-blur-xl shadow-[0_0_30px_rgba(139,92,246,0.14)] md:p-8"
    >
      <div className="mb-8">
        <div className="mb-3 inline-flex rounded-full border border-fuchsia-400/30 bg-fuchsia-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-fuchsia-200">
          System Framework
        </div>

        <h2 className="text-3xl font-black text-white md:text-4xl">
          How our tiering system actually works
        </h2>

        <p className="mt-3 max-w-4xl text-sm leading-7 text-white/65 md:text-base">
          This framework defines how characters are placed in tiers, how
          sub-tier ranking is interpreted, and why scaling in this system is
          based on what a character can consistently match, interact with, or
          rival rather than on raw destruction alone.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.9fr]">
        <div className="space-y-6">
          <section
            id="framework-subdivisions"
            className="rounded-[28px] border border-white/10 bg-black/20 p-5 scroll-mt-24"
          >
            <h3 className="text-2xl font-black text-white">
              Tier subdivisions
            </h3>
            <p className="mt-2 text-sm leading-7 text-white/65">
              Every tier is split into three levels:
              <span className="ml-2 font-semibold text-white">Low</span>,
              <span className="ml-2 font-semibold text-white">Medium</span>,
              and
              <span className="ml-2 font-semibold text-white">High</span>.
              This gives you nuance inside one tier instead of forcing every
              character into a hard all-or-nothing jump.
            </p>

            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {subTierCards.map((card) => (
                <div
                  key={card.title}
                  className={`rounded-3xl border bg-linear-to-br p-5 ${card.color}`}
                >
                  <div
                    className={`mb-4 inline-flex rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] ${card.accent}`}
                  >
                    {card.range}
                  </div>

                  <h4 className="text-lg font-black text-white">
                    {card.title}
                  </h4>
                  <p className="mt-2 text-sm text-white/75">{card.summary}</p>

                  <div className="mt-4 space-y-2">
                    {card.points.map((point) => (
                      <p key={point} className="text-sm leading-6 text-white/72">
                        • {point}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section
            id="framework-relative-scale"
            className="rounded-[28px] border border-white/10 bg-black/20 p-5 scroll-mt-24"
          >
            <h3 className="text-2xl font-black text-white">
              Relative scale of capability
            </h3>
            <p className="mt-2 text-sm leading-7 text-white/65">
              The sub-tier scale works like a progression band, not a hard power
              wall. It helps you place characters more precisely inside the same
              bracket.
            </p>

            <div className="mt-6 space-y-4">
              <div>
                <div className="mb-2 flex items-center justify-between text-xs font-bold uppercase tracking-[0.16em] text-white/70">
                  <span>Low</span>
                  <span>1/10 → 3/10</span>
                </div>
                <div className="h-4 overflow-hidden rounded-full bg-white/8">
                  <div className="h-full w-[30%] rounded-full bg-linear-to-r from-emerald-500 to-teal-400" />
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between text-xs font-bold uppercase tracking-[0.16em] text-white/70">
                  <span>Medium</span>
                  <span>4/10 → 7/10</span>
                </div>
                <div className="h-4 overflow-hidden rounded-full bg-white/8">
                  <div className="h-full w-[70%] rounded-full bg-linear-to-r from-yellow-500 to-amber-400" />
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between text-xs font-bold uppercase tracking-[0.16em] text-white/70">
                  <span>High</span>
                  <span>8/10 → 10/10</span>
                </div>
                <div className="h-4 overflow-hidden rounded-full bg-white/8">
                  <div className="h-full w-full rounded-full bg-linear-to-r from-rose-500 to-fuchsia-500" />
                </div>
              </div>
            </div>
          </section>

          <section
            id="framework-interaction-vs-destruction"
            className="rounded-[28px] border border-white/10 bg-black/20 p-5 scroll-mt-24"
          >
            <h3 className="text-2xl font-black text-white">
              Interaction vs destruction
            </h3>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-cyan-300/15 bg-cyan-400/8 p-5">
                <h4 className="text-lg font-black text-cyan-100">
                  What the system values
                </h4>
                <div className="mt-3 space-y-2">
                  <p className="text-sm leading-6 text-white/72">
                    • Matching a tier’s structure
                  </p>
                  <p className="text-sm leading-6 text-white/72">
                    • Interacting with its laws or phenomena
                  </p>
                  <p className="text-sm leading-6 text-white/72">
                    • Rivalling it across multiple aspects
                  </p>
                  <p className="text-sm leading-6 text-white/72">
                    • Consistency over one-time output
                  </p>
                </div>
              </div>

              <div className="rounded-3xl border border-rose-300/15 bg-rose-400/8 p-5">
                <h4 className="text-lg font-black text-rose-100">
                  What the system does not require
                </h4>
                <div className="mt-3 space-y-2">
                  <p className="text-sm leading-6 text-white/72">
                    • Total destruction of the full tier
                  </p>
                  <p className="text-sm leading-6 text-white/72">
                    • Perfect mastery of every aspect
                  </p>
                  <p className="text-sm leading-6 text-white/72">
                    • Maximum one-shot output as the only metric
                  </p>
                  <p className="text-sm leading-6 text-white/72">
                    • A rigid, all-or-nothing classification
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 rounded-3xl border border-white/10 bg-white/5 p-5">
              <h4 className="text-lg font-black text-white">
                Key idea
              </h4>
              <p className="mt-3 text-sm leading-7 text-white/70">
                Being in a tier does not automatically mean being able to fully
                destroy that tier. A galaxy-level entity can still belong in the
                galaxy bracket by matching galaxy-scale phenomena and competing
                with them in multiple ways, even if it cannot erase an entire
                galaxy outright.
              </p>
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section
            id="framework-plus-modifier"
            className="rounded-[28px] border border-white/10 bg-black/20 p-5 scroll-mt-24"
          >
            <h3 className="text-2xl font-black text-white">
              The `+` modifier
            </h3>
            <p className="mt-2 text-sm leading-7 text-white/65">
              The plus modifier exists to mark standout entities inside the same
              sub-tier.
            </p>

            <div className="mt-5 rounded-3xl border border-fuchsia-300/15 bg-fuchsia-400/8 p-5">
              <div className="mb-4 inline-flex rounded-full border border-fuchsia-300/20 bg-fuchsia-500/15 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-fuchsia-100">
                What it means
              </div>

              <div className="space-y-2">
                <p className="text-sm leading-6 text-white/72">
                  • Unique abilities
                </p>
                <p className="text-sm leading-6 text-white/72">
                  • Situational advantages
                </p>
                <p className="text-sm leading-6 text-white/72">
                  • Superior efficiency in specific aspects
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-3xl border border-yellow-300/15 bg-yellow-400/8 p-5">
              <div className="mb-3 inline-flex rounded-full border border-yellow-300/20 bg-yellow-500/15 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-yellow-100">
                Important rule
              </div>
              <p className="text-sm leading-7 text-white/72">
                `+` does not move a character into the next sub-tier. It only
                means the character stands out within the current one.
              </p>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {plusExamples.map((example) => (
                <span
                  key={example}
                  className="rounded-full border border-cyan-300/20 bg-cyan-400/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-cyan-100"
                >
                  {example}
                </span>
              ))}
            </div>
          </section>

          <section
            id="framework-reading-guide"
            className="rounded-[28px] border border-white/10 bg-black/20 p-5 scroll-mt-24"
          >
            <h3 className="text-2xl font-black text-white">
              Quick reading guide
            </h3>

            <div className="mt-5 space-y-4">
              <div className="rounded-[22px] border border-white/10 bg-white/5 p-4">
                <div className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-100">
                  Step 1
                </div>
                <p className="mt-2 text-sm leading-6 text-white/72">
                  Identify the largest scale the entity can consistently
                  interact with.
                </p>
              </div>

              <div className="rounded-[22px] border border-white/10 bg-white/5 p-4">
                <div className="text-xs font-bold uppercase tracking-[0.18em] text-fuchsia-100">
                  Step 2
                </div>
                <p className="mt-2 text-sm leading-6 text-white/72">
                  Decide whether the interaction is Low, Medium, or High.
                </p>
              </div>

              <div className="rounded-[22px] border border-white/10 bg-white/5 p-4">
                <div className="text-xs font-bold uppercase tracking-[0.18em] text-yellow-100">
                  Step 3
                </div>
                <p className="mt-2 text-sm leading-6 text-white/72">
                  Add `+` only if the character has notable advantages while
                  remaining in the same sub-tier.
                </p>
              </div>

              <div className="rounded-[22px] border border-white/10 bg-white/5 p-4">
                <div className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-100">
                  Step 4
                </div>
                <p className="mt-2 text-sm leading-6 text-white/72">
                  Check the actual tier page below for the practical meaning,
                  limitations, and examples.
                </p>
              </div>
            </div>
          </section>

          <section
            id="framework-core-philosophy"
            className="rounded-[28px] border border-white/10 bg-black/20 p-5 scroll-mt-24"
          >
            <h3 className="text-2xl font-black text-white">
              Core philosophy
            </h3>
            <div className="mt-5 space-y-3">
              {philosophyPoints.map((point, index) => (
                <div
                  key={point}
                  className="flex items-start gap-3 rounded-[22px] border border-white/10 bg-white/5 p-4"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-fuchsia-500/80 to-cyan-400/80 text-xs font-black text-white">
                    {index + 1}
                  </div>
                  <p className="text-sm leading-6 text-white/72">{point}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}