import { statisticsSections } from "./statisticsWikiData";

export default function StatisticsTreeContents() {
  return (
    <section
      id="statistics-tree-contents"
      className="rounded-[30px] border border-white/15 bg-white/8 p-6 backdrop-blur-xl shadow-[0_0_30px_rgba(139,92,246,0.12)]"
    >
      <div className="mb-6">
        <div className="mb-3 inline-flex rounded-full border border-cyan-300/20 bg-cyan-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100">
          Statistics Tree
        </div>
        <h2 className="text-2xl font-black text-white md:text-3xl">
          Navigate the stat system
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-white/65">
          Browse the full hierarchy of stat families and their future subpages.
        </p>
      </div>

      <a
        href="#statistics-tier-rank-reference"
        className="mb-4 block rounded-3xl border border-white/10 bg-black/20 p-5 transition hover:border-fuchsia-400/40 hover:bg-white/10"
      >
        <h3 className="text-lg font-black text-white">Tier Rank Reference</h3>
        <p className="mt-2 text-sm leading-6 text-white/62">
          Representative rank values from Tier 24 to Tier Ω, plus subtier modifiers.
        </p>
      </a>

      <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
        {statisticsSections.map((section) => (
          <div
            key={section.id}
            className={`rounded-3xl border bg-linear-to-br p-5 ${section.color}`}
          >
            <a
              href={`#${section.id}`}
              className="block text-xl font-black text-white transition hover:opacity-90"
            >
              {section.title}
            </a>

            <p className="mt-2 text-sm leading-6 text-white/72">
              {section.description}
            </p>

            <div className="mt-4 border-l border-white/15 pl-4">
              <div className="space-y-2">
                {section.subSections.map((sub) => (
                  <a
                    key={sub.id}
                    href={`#${section.id}`}
                    className="block text-sm text-white/70 transition hover:text-white"
                  >
                    ├─ {sub.title}
                  </a>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}