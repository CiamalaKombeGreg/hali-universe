const tierRankRows = [
  { tierCode: "Tier 24", name: "Inanimate", rank: "1.0", href: "/tiering-power/tiering-wiki#inert-basic-life" },
  { tierCode: "Tier 23", name: "Sub-Human", rank: "2.0", href: "/tiering-power/tiering-wiki#inert-basic-life" },
  { tierCode: "Tier 22", name: "Human", rank: "3.0", href: "/tiering-power/tiering-wiki#inert-basic-life" },
  { tierCode: "Tier 21", name: "Superhuman", rank: "4.0", href: "/tiering-power/tiering-wiki#enhanced" },
  { tierCode: "Tier 20", name: "Structural", rank: "5.0", href: "/tiering-power/tiering-wiki#enhanced" },
  { tierCode: "Tier 19", name: "Regional", rank: "6.0", href: "/tiering-power/tiering-wiki#planetary" },
  { tierCode: "Tier 18", name: "Planetary", rank: "7.0", href: "/tiering-power/tiering-wiki#planetary" },
  { tierCode: "Tier 17", name: "Star", rank: "8.0", href: "/tiering-power/tiering-wiki#cosmic" },
  { tierCode: "Tier 16", name: "Star System", rank: "9.0", href: "/tiering-power/tiering-wiki#cosmic" },
  { tierCode: "Tier 15", name: "Star Cluster", rank: "10.0", href: "/tiering-power/tiering-wiki#cosmic" },
  { tierCode: "Tier 14", name: "Galaxy", rank: "11.0", href: "/tiering-power/tiering-wiki#galactic" },
  { tierCode: "Tier 13", name: "Galaxy Cluster", rank: "12.0", href: "/tiering-power/tiering-wiki#galactic" },
  { tierCode: "Tier 12", name: "Supercluster Complex", rank: "13.0", href: "/tiering-power/tiering-wiki#galactic" },
  { tierCode: "Tier 11", name: "Small / Observable Universe", rank: "14.0", href: "/tiering-power/tiering-wiki#universal" },
  { tierCode: "Tier 10", name: "Universal", rank: "15.0", href: "/tiering-power/tiering-wiki#universal" },
  { tierCode: "Tier 9", name: "Complex Universal", rank: "16.0", href: "/tiering-power/tiering-wiki#dimensional" },
  { tierCode: "Tier 8", name: "Multiversal", rank: "17.0", href: "/tiering-power/tiering-wiki#dimensional" },
  { tierCode: "Tier 7", name: "Complex Multiversal", rank: "18.0", href: "/tiering-power/tiering-wiki#dimensional" },
  { tierCode: "Tier 6", name: "Inferior Order Megaversal", rank: "19.0", href: "/tiering-power/tiering-wiki#dimensional" },
  { tierCode: "Tier 5", name: "Megaversal", rank: "20.0", href: "/tiering-power/tiering-wiki#dimensional" },
  { tierCode: "Tier 4", name: "Superior Order Megaversal", rank: "21.0", href: "/tiering-power/tiering-wiki#dimensional" },
  { tierCode: "Tier 3", name: "Complex Megaversal", rank: "22.0", href: "/tiering-power/tiering-wiki#dimensional" },
  { tierCode: "Tier 2", name: "Hyperversal", rank: "23.0", href: "/tiering-power/tiering-wiki#dimensional" },
  { tierCode: "Tier 1", name: "Omniversal", rank: "24.0", href: "/tiering-power/tiering-wiki#transcendental" },
  { tierCode: "Tier 0", name: "Outerversal", rank: "99.0", href: "/tiering-power/tiering-wiki#transcendental" },
  { tierCode: "Tier Ω", name: "Boundless", rank: "999.0", href: "/tiering-power/tiering-wiki#transcendental" },
];

const modifierRows = [
  { label: "Low", value: "+0.0", description: "No added subtier modifier" },
  { label: "Medium / Average", value: "+0.3", description: "Standard subtier modifier" },
  { label: "High", value: "+0.6", description: "High subtier modifier" },
];

export default function StatisticsTierRankReference() {
  return (
    <section
      id="statistics-tier-rank-reference"
      className="rounded-[30px] border border-white/15 bg-white/8 p-6 backdrop-blur-xl shadow-[0_0_28px_rgba(139,92,246,0.12)]"
    >
      <div className="mb-6">
        <div className="mb-3 inline-flex rounded-full border border-cyan-300/20 bg-cyan-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100">
          Tier Rank Reference
        </div>

        <h2 className="text-2xl font-black text-white md:text-3xl">
          Representative tier values for stat comparison
        </h2>

        <p className="mt-3 max-w-4xl text-sm leading-7 text-white/65">
          These values are representative tools used to compare stats and build
          internal references. They are not demonstrative proof of scale, and
          they are not meant to replace actual tiering analysis.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[24px] border border-white/10 bg-black/20 p-5">
          <h3 className="text-xl font-black text-white">Tier rank table</h3>
          <p className="mt-2 text-sm leading-6 text-white/60">
            Click a tier name to jump back to the corresponding section of the Tiering Wiki.
          </p>

          <div className="mt-5 overflow-hidden rounded-[20px] border border-white/10">
            <div className="grid grid-cols-[0.9fr_1.5fr_0.7fr] border-b border-white/10 bg-white/5 px-4 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white/60">
              <div>Tier</div>
              <div>Name</div>
              <div>Rank</div>
            </div>

            <div className="max-h-[520px] overflow-y-auto custom-scroll">
              {tierRankRows.map((row) => (
                <div
                  key={row.tierCode}
                  className="grid grid-cols-[0.9fr_1.5fr_0.7fr] items-center border-b border-white/5 px-4 py-3 text-sm text-white/80"
                >
                  <div className="font-semibold text-white/70">{row.tierCode}</div>

                  <a
                    href={row.href}
                    className="font-semibold text-cyan-100 transition hover:text-white hover:underline"
                  >
                    {row.name}
                  </a>

                  <div className="font-black text-fuchsia-100">{row.rank}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[24px] border border-white/10 bg-black/20 p-5">
            <h3 className="text-xl font-black text-white">Subtier modifiers</h3>
            <p className="mt-2 text-sm leading-6 text-white/60">
              Once a base tier rank is set, the subtier modifier is added on top.
            </p>

            <div className="mt-5 space-y-3">
              {modifierRows.map((row) => (
                <div
                  key={row.label}
                  className="rounded-[20px] border border-white/10 bg-white/5 p-4"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="text-sm font-bold uppercase tracking-[0.14em] text-white">
                      {row.label}
                    </div>
                    <div className="rounded-full border border-fuchsia-300/20 bg-fuchsia-400/10 px-3 py-1 text-sm font-black text-fuchsia-100">
                      {row.value}
                    </div>
                  </div>

                  <p className="mt-2 text-sm leading-6 text-white/65">
                    {row.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[24px] border border-yellow-300/15 bg-yellow-400/8 p-5">
            <h3 className="text-xl font-black text-yellow-100">
              Important clarification
            </h3>
            <p className="mt-3 text-sm leading-7 text-white/75">
              These values are comparison values, not direct proof values.
              They help order, compare, and discuss stats in a readable internal
              system, but they do not independently demonstrate scaling.
            </p>
          </div>

          <div className="rounded-[24px] border border-cyan-300/15 bg-cyan-400/8 p-5">
            <h3 className="text-xl font-black text-cyan-100">
              Example formula
            </h3>
            <p className="mt-3 text-sm leading-7 text-white/75">
              A High Universal stat would use:
            </p>
            <div className="mt-4 rounded-[18px] border border-cyan-300/20 bg-black/20 p-4 text-center text-lg font-black text-white">
              Universal Rank (15.0) + High Modifier (0.6) = <span className="text-cyan-100">15.6</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}