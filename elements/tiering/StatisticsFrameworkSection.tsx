export default function StatisticsFrameworkSection() {
  const relevancyLevels = [
    { level: 1, label: "Very low impact", width: "w-[14%]" },
    { level: 2, label: "Minor factor", width: "w-[28%]" },
    { level: 3, label: "Situationally useful", width: "w-[42%]" },
    { level: 4, label: "Solid but not decisive", width: "w-[56%]" },
    { level: 5, label: "Important in most fights", width: "w-[70%]" },
    { level: 6, label: "Major deciding factor", width: "w-[84%]" },
    { level: 7, label: "Critical / game-breaking", width: "w-full" },
  ];

  return (
    <section
      id="statistics-framework"
      className="rounded-4xl border border-white/15 bg-white/8 p-6 backdrop-blur-xl shadow-[0_0_30px_rgba(139,92,246,0.14)] md:p-8"
    >
      <div className="mb-8">
        <div className="mb-3 inline-flex rounded-full border border-fuchsia-400/30 bg-fuchsia-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-fuchsia-200">
          Stat Framework
        </div>

        <h2 className="text-3xl font-black text-white md:text-4xl">
          How stats are evaluated
        </h2>

        <p className="mt-3 max-w-4xl text-sm leading-7 text-white/65 md:text-base">
          Our stat system uses two independent components: <strong>Level</strong>,
          which measures how strong a stat is, and <strong>Relevancy</strong>,
          which measures how much that stat matters in matchups and scaling. 
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <section
            id="statistics-core-concept"
            className="rounded-[28px] border border-white/10 bg-black/20 p-5"
          >
            <h3 className="text-2xl font-black text-white">Core concept</h3>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="rounded-[22px] border border-cyan-300/15 bg-cyan-400/8 p-5">
                <h4 className="text-lg font-black text-cyan-100">
                  Level (Magnitude)
                </h4>
                <p className="mt-2 text-sm leading-7 text-white/72">
                  Measures how strong the stat is. It can be built from tier-based
                  levels or from a range-based level system.
                </p>
              </div>

              <div className="rounded-[22px] border border-fuchsia-300/15 bg-fuchsia-400/8 p-5">
                <h4 className="text-lg font-black text-fuchsia-100">
                  Relevancy (Importance)
                </h4>
                <p className="mt-2 text-sm leading-7 text-white/72">
                  Measures how much the stat affects the actual outcome of a fight
                  or matchup. It is impact, not raw strength.
                </p>
              </div>
            </div>
          </section>

          <section
            id="statistics-level-system"
            className="rounded-[28px] border border-white/10 bg-black/20 p-5"
          >
            <h3 className="text-2xl font-black text-white">Level system</h3>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="rounded-[22px] border border-white/10 bg-white/5 p-5">
                <h4 className="text-lg font-black text-white">
                  Tier-based levels
                </h4>
                <p className="mt-2 text-sm leading-7 text-white/72">
                  Uses our tiering system directly. The default rule is that a stat
                  equals the highest scale it can consistently interact with, and each
                  stat can use Low, Medium, High, and optional `+`. 
                </p>
                <div className="mt-4 rounded-xl border border-cyan-300/15 bg-cyan-400/8 p-4 text-sm text-cyan-100">
                  Level Value = Tier Rank + Subtier Modifier
                </div>
              </div>

              <div className="rounded-[22px] border border-white/10 bg-white/5 p-5">
                <h4 className="text-lg font-black text-white">
                  Range-based levels
                </h4>
                <p className="mt-2 text-sm leading-7 text-white/72">
                  Used for stats like speed or intelligence. A range is defined from
                  one tier to another, and the level can be interpreted from the
                  average.
                </p>
                <div className="mt-4 rounded-xl border border-fuchsia-300/15 bg-fuchsia-400/8 p-4 text-sm text-fuchsia-100">
                  Level Range = [Min Tier → Max Tier]
                </div>
              </div>
            </div>
          </section>

          <section
            id="statistics-relevancy-system"
            className="rounded-[28px] border border-white/10 bg-black/20 p-5"
          >
            <h3 className="text-2xl font-black text-white">Relevancy system</h3>
            <p className="mt-2 text-sm leading-7 text-white/65">
              Relevancy runs from 1 to 7, from very low impact to critical /
              game-breaking. 
            </p>

            <div className="mt-5 space-y-4">
              {relevancyLevels.map((item) => (
                <div key={item.level}>
                  <div className="mb-2 flex items-center justify-between text-xs font-bold uppercase tracking-[0.16em] text-white/70">
                    <span>Level {item.level}</span>
                    <span>{item.label}</span>
                  </div>
                  <div className="h-4 overflow-hidden rounded-full bg-white/8">
                    <div className={`h-full rounded-full bg-linear-to-r from-cyan-500 to-fuchsia-500 ${item.width}`} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section
            id="statistics-advanced-rules"
            className="rounded-[28px] border border-white/10 bg-black/20 p-5"
          >
            <h3 className="text-2xl font-black text-white">Advanced rules</h3>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="rounded-[22px] border border-white/10 bg-white/5 p-4">
                <h4 className="text-lg font-black text-white">Consistency {'>'} Peak</h4>
                <p className="mt-2 text-sm leading-6 text-white/72">
                  Stats are based on consistent performance, not one-time feats.
                </p>
              </div>

              <div className="rounded-[22px] border border-white/10 bg-white/5 p-4">
                <h4 className="text-lg font-black text-white">Independent stats</h4>
                <p className="mt-2 text-sm leading-6 text-white/72">
                  High AP does not imply high durability, and high speed does not
                  imply high reaction.
                </p>
              </div>

              <div className="rounded-[22px] border border-white/10 bg-white/5 p-4">
                <h4 className="text-lg font-black text-white">Interaction-based scaling</h4>
                <p className="mt-2 text-sm leading-6 text-white/72">
                  A stat scales by what it can affect, resist, or react to. 
                </p>
              </div>

              <div className="rounded-[22px] border border-white/10 bg-white/5 p-4">
                <h4 className="text-lg font-black text-white">Cross-stat influence</h4>
                <p className="mt-2 text-sm leading-6 text-white/72">
                  Speed affects combat effectiveness, intelligence affects ability
                  usage, and hax can bypass durability.
                </p>
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section
            id="statistics-effective-value"
            className="rounded-[28px] border border-white/10 bg-black/20 p-5"
          >
            <h3 className="text-2xl font-black text-white">Effective value</h3>
            <p className="mt-2 text-sm leading-7 text-white/65">
              Effective value is defined as Level × Relevancy and is meant for
              comparison and UI ranking, not hard victory math.
            </p>

            <div className="mt-5 rounded-3xl border border-yellow-300/15 bg-yellow-400/8 p-5">
              <div className="text-center text-lg font-black text-yellow-100">
                Effective Value = Level × Relevancy
              </div>
            </div>
          </section>

          <section
            id="statistics-special-cases"
            className="rounded-[28px] border border-white/10 bg-black/20 p-5"
          >
            <h3 className="text-2xl font-black text-white">Special cases</h3>

            <div className="mt-5 space-y-4">

              <div className="rounded-[22px] border border-emerald-300/15 bg-emerald-400/8 p-4">
                <h4 className="text-lg font-black text-emerald-100">Inanimate</h4>
                <p className="mt-2 text-sm leading-6 text-white/72">
                  Level don&apos;t make any sense at the bottom.
                </p>
              </div>

              <div className="rounded-[22px] border border-fuchsia-300/15 bg-fuchsia-400/8 p-4">
                <h4 className="text-lg font-black text-fuchsia-100">Outerversal</h4>
                <p className="mt-2 text-sm leading-6 text-white/72">
                  Level becomes irrelevant and breaks the scaling system.
                </p>
              </div>

              <div className="rounded-[22px] border border-cyan-300/15 bg-cyan-400/8 p-4">
                <h4 className="text-lg font-black text-cyan-100">Boundless</h4>
                <p className="mt-2 text-sm leading-6 text-white/72">
                  Level becomes absolute and is not comparable.
                </p>
              </div>

              <div className="rounded-[22px] border border-rose-300/15 bg-rose-400/8 p-4">
                <h4 className="text-lg font-black text-rose-100">Bypass system</h4>
                <p className="mt-2 text-sm leading-6 text-white/72">
                  Some abilities ignore normal scaling, such as universal hax with
                  bypass enabled. 
                </p>
              </div>
            </div>
          </section>

          <section
            id="statistics-core-vs-support"
            className="rounded-[28px] border border-white/10 bg-black/20 p-5"
          >
            <h3 className="text-2xl font-black text-white">Core vs support stats</h3>

            <div className="mt-5 grid gap-4">
              <div className="rounded-[22px] border border-red-300/15 bg-red-400/8 p-4">
                <h4 className="text-lg font-black text-red-100">Core stats</h4>
                <p className="mt-2 text-sm leading-6 text-white/72">
                  Attack Potency, Durability, and Range define tier and raw scaling.
                </p>
              </div>

              <div className="rounded-[22px] border border-cyan-300/15 bg-cyan-400/8 p-4">
                <h4 className="text-lg font-black text-cyan-100">Support stats</h4>
                <p className="mt-2 text-sm leading-6 text-white/72">
                  Speed, Intelligence, Hax, and Versatility define outcomes and
                  matchup behavior.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}