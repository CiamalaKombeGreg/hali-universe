export default function AbilitiesFrameworkSection() {
  return (
    <section
      id="abilities-framework"
      className="rounded-[32px] border border-white/15 bg-white/8 p-6 backdrop-blur-xl shadow-[0_0_30px_rgba(139,92,246,0.14)] md:p-8"
    >
      <div className="mb-8">
        <div className="mb-3 inline-flex rounded-full border border-fuchsia-400/30 bg-fuchsia-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-fuchsia-200">
          Ability Framework
        </div>

        <h2 className="text-3xl font-black text-white md:text-4xl">
          How recorded abilities work
        </h2>

        <p className="mt-3 max-w-4xl text-sm leading-7 text-white/65 md:text-base">
          In this system, abilities are not stored as isolated entries. They are
          always linked to a source system, category, or branch, and must stay
          connected to actual usable content.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <section
            id="abilities-core-principle"
            className="rounded-[28px] border border-white/10 bg-black/20 p-5"
          >
            <h3 className="text-2xl font-black text-white">Core principle</h3>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="rounded-[22px] border border-cyan-300/15 bg-cyan-400/8 p-5">
                <h4 className="text-lg font-black text-cyan-100">System</h4>
                <p className="mt-2 text-sm leading-7 text-white/72">
                  A system is a category tree that contains real abilities. It can
                  represent things like Haki, Ki, Magic, Kendo, Chakra, or similar
                  structures.
                </p>
              </div>

              <div className="rounded-[22px] border border-fuchsia-300/15 bg-fuchsia-400/8 p-5">
                <h4 className="text-lg font-black text-fuchsia-100">Ability</h4>
                <p className="mt-2 text-sm leading-7 text-white/72">
                  An ability is an actual usable expression inside a system, such
                  as a move, technique, form, manipulation, enhancement, or named
                  power.
                </p>
              </div>
            </div>
          </section>

          <section
            id="abilities-tree-logic"
            className="rounded-[28px] border border-white/10 bg-black/20 p-5"
          >
            <h3 className="text-2xl font-black text-white">Tree logic</h3>

            <div className="mt-5 grid gap-4 md:grid-cols-3">
              <div className="rounded-[22px] border border-white/10 bg-white/5 p-4">
                <div className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-100">
                  Step 1
                </div>
                <p className="mt-2 text-sm leading-6 text-white/72">
                  A character gains access to a system.
                </p>
              </div>

              <div className="rounded-[22px] border border-white/10 bg-white/5 p-4">
                <div className="text-xs font-bold uppercase tracking-[0.18em] text-fuchsia-100">
                  Step 2
                </div>
                <p className="mt-2 text-sm leading-6 text-white/72">
                  That system can branch into sub-systems or categories.
                </p>
              </div>

              <div className="rounded-[22px] border border-white/10 bg-white/5 p-4">
                <div className="text-xs font-bold uppercase tracking-[0.18em] text-yellow-100">
                  Step 3
                </div>
                <p className="mt-2 text-sm leading-6 text-white/72">
                  Each valid node must eventually lead to at least one real ability.
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-[24px] border border-white/10 bg-white/5 p-5">
              <h4 className="text-lg font-black text-white">Example schema</h4>

              <div className="mt-4 space-y-3 font-mono text-sm text-white/75">
                <div className="rounded-xl border border-white/10 bg-black/20 px-4 py-3">
                  Ki
                </div>
                <div className="ml-6 rounded-xl border border-white/10 bg-black/20 px-4 py-3">
                  └─ God Ki
                </div>
                <div className="ml-12 rounded-xl border border-white/10 bg-black/20 px-4 py-3">
                  └─ Ultra Instinct State
                </div>
              </div>
            </div>
          </section>

          <section
            id="abilities-validation-rules"
            className="rounded-[28px] border border-white/10 bg-black/20 p-5"
          >
            <h3 className="text-2xl font-black text-white">
              Validation rules
            </h3>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="rounded-[22px] border border-emerald-300/15 bg-emerald-400/8 p-4">
                <h4 className="text-lg font-black text-emerald-100">
                  Accepted
                </h4>
                <div className="mt-3 space-y-2">
                  <p className="text-sm leading-6 text-white/72">
                    • A system with at least one real ability
                  </p>
                  <p className="text-sm leading-6 text-white/72">
                    • A sub-system nested inside another valid system
                  </p>
                  <p className="text-sm leading-6 text-white/72">
                    • A category that eventually leads to recorded abilities
                  </p>
                </div>
              </div>

              <div className="rounded-[22px] border border-rose-300/15 bg-rose-400/8 p-4">
                <h4 className="text-lg font-black text-rose-100">
                  Rejected
                </h4>
                <div className="mt-3 space-y-2">
                  <p className="text-sm leading-6 text-white/72">
                    • An empty system node with no abilities
                  </p>
                  <p className="text-sm leading-6 text-white/72">
                    • A category that exists only as a label
                  </p>
                  <p className="text-sm leading-6 text-white/72">
                    • A branch with no usable or recorded endpoint
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section
            id="abilities-structural-roles"
            className="rounded-[28px] border border-white/10 bg-black/20 p-5"
          >
            <h3 className="text-2xl font-black text-white">
              Structural roles
            </h3>

            <div className="mt-5 space-y-4">
              <div className="rounded-[22px] border border-white/10 bg-white/5 p-4">
                <div className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-100">
                  Parent System
                </div>
                <p className="mt-2 text-sm leading-6 text-white/72">
                  The broad root category that defines a major power source or
                  ruleset.
                </p>
              </div>

              <div className="rounded-[22px] border border-white/10 bg-white/5 p-4">
                <div className="text-xs font-bold uppercase tracking-[0.18em] text-fuchsia-100">
                  Sub-System
                </div>
                <p className="mt-2 text-sm leading-6 text-white/72">
                  A branch of a parent system that narrows specialization.
                </p>
              </div>

              <div className="rounded-[22px] border border-white/10 bg-white/5 p-4">
                <div className="text-xs font-bold uppercase tracking-[0.18em] text-yellow-100">
                  Recorded Ability
                </div>
                <p className="mt-2 text-sm leading-6 text-white/72">
                  The final usable power, move, form, or named technique.
                </p>
              </div>

              <div className="rounded-[22px] border border-cyan-300/15 bg-cyan-400/8 p-4">
                <div className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-100">
                  Association Ability
                </div>
                <p className="mt-2 text-sm leading-6 text-white/72">
                  A fused result where systems and/or abilities combine into one
                  new ability instead of splitting into separate branches.
                </p>
              </div>

              <div className="rounded-[22px] border border-fuchsia-300/15 bg-fuchsia-400/8 p-4">
                <div className="text-xs font-bold uppercase tracking-[0.18em] text-fuchsia-100">
                  Association System
                </div>
                <p className="mt-2 text-sm leading-6 text-white/72">
                  A fused result where mixed sources create a new system-level
                  structure that can then produce its own derived abilities.
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-[24px] border border-white/10 bg-white/5 p-5">
              <h4 className="text-lg font-black text-white">
                Example: mixed-system result
              </h4>
              <p className="mt-3 text-sm leading-7 text-white/72">
                Haki and Devil Fruit are separate systems. When they are merged
                into a unified result instead of being treated as parallel
                branches, they can form an association structure. A practical
                example is a derived system like Gear 4, which then produces
                Bounce-Man, Snake-Man, and Tank-Man as associated outcomes.
              </p>
            </div>
          </section>

          <section
            id="abilities-why-structure-matters"
            className="rounded-[28px] border border-white/10 bg-black/20 p-5"
          >
            <h3 className="text-2xl font-black text-white">
              Why this structure matters
            </h3>

            <div className="mt-5 space-y-3">
              <div className="rounded-[22px] border border-white/10 bg-white/5 p-4 text-sm leading-6 text-white/72">
                It prevents useless empty categories.
              </div>
              <div className="rounded-[22px] border border-white/10 bg-white/5 p-4 text-sm leading-6 text-white/72">
                It keeps abilities attached to a real source.
              </div>
              <div className="rounded-[22px] border border-white/10 bg-white/5 p-4 text-sm leading-6 text-white/72">
                It allows nested systems like Ki → God Ki.
              </div>
              <div className="rounded-[22px] border border-white/10 bg-white/5 p-4 text-sm leading-6 text-white/72">
                It also supports fused outputs like system+system or
                system+ability results.
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}