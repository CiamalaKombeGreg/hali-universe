import { abilityHierarchy } from "./recordedAbilitiesData";

export default function AbilitiesHierarchyDisplay() {
  return (
    <section
      id="abilities-hierarchy"
      className="rounded-[30px] border border-white/15 bg-white/8 p-6 backdrop-blur-xl shadow-[0_0_28px_rgba(139,92,246,0.12)]"
    >
      <div className="mb-6">
        <div className="mb-3 inline-flex rounded-full border border-fuchsia-400/30 bg-fuchsia-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-fuchsia-200">
          Ability Hierarchy
        </div>

        <h2 className="text-2xl font-black text-white md:text-3xl">
          Planned hierarchy scale
        </h2>

        <p className="mt-2 max-w-3xl text-sm leading-7 text-white/65">
          This is the current draft hierarchy used to visualize how ability
          classes can escalate from basic physical effects to ultimate-level
          abstractions.
        </p>
      </div>

      <div className="flex flex-col items-center gap-3">
        {abilityHierarchy.map((item, index) => (
          <div
            key={item}
            className="flex w-full max-w-[760px] items-center gap-4"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-500/80 to-cyan-400/80 text-sm font-black text-white">
              {index + 1}
            </div>

            <div
              className="rounded-[22px] border border-white/10 bg-black/20 px-5 py-4 text-white shadow-[0_0_16px_rgba(217,70,239,0.08)]"
              style={{
                width: `${46 + index * 4.8}%`,
                minWidth: "260px",
              }}
            >
              <span className="text-base font-bold">{item}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}