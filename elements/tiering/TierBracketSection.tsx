import TierAccordionItem from "./TierAccordionItem";
import { TierBracket } from "./tieringWikiData";

type TierBracketSectionProps = {
  bracket: TierBracket;
};

export default function TierBracketSection({
  bracket,
}: TierBracketSectionProps) {
  return (
    <section
      id={bracket.id}
      className="scroll-mt-24 rounded-[28px] border border-white/15 bg-white/8 p-6 backdrop-blur-xl shadow-[0_0_28px_rgba(139,92,246,0.12)]"
    >
      <div className="mb-6">
        <div className="mb-3 inline-flex rounded-full border border-fuchsia-400/30 bg-fuchsia-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-fuchsia-200">
          {bracket.range}
        </div>

        <h3 className="text-3xl font-black text-white">{bracket.title}</h3>
        <p className="mt-3 max-w-4xl text-sm leading-7 text-white/65">
          {bracket.description}
        </p>
      </div>

      <div className="space-y-4">
        {bracket.entries.map((entry) => (
          <TierAccordionItem key={entry.fullTitle} entry={entry} />
        ))}
      </div>
    </section>
  );
}