import type { StatisticsSection } from "./statisticsWikiData";

type StatisticsBigSectionProps = {
  section: StatisticsSection;
};

export default function StatisticsBigSection({
  section,
}: StatisticsBigSectionProps) {
  return (
    <section
      id={section.id}
      className="scroll-mt-24 rounded-[28px] border border-white/15 bg-white/8 p-6 backdrop-blur-xl shadow-[0_0_28px_rgba(139,92,246,0.12)]"
    >
      <div className="mb-6">
        <div className={`mb-3 inline-flex rounded-full border px-4 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-white ${section.color}`}>
          {section.shortTitle}
        </div>

        <h3 className="text-3xl font-black text-white">{section.title}</h3>
        <p className="mt-3 max-w-4xl text-sm leading-7 text-white/65">
          {section.description}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {section.subSections.map((sub) => (
          <div
            key={sub.id}
            className="rounded-[22px] border border-white/10 bg-black/20 p-5"
          >
            <h4 className="text-lg font-black text-white">{sub.title}</h4>
            <p className="mt-3 text-sm leading-6 text-white/50">
              Content coming next.
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}