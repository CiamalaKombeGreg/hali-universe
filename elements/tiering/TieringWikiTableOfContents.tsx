type TocItem = {
  id: string;
  label: string;
  description?: string;
};

type TieringWikiTableOfContentsProps = {
  items: TocItem[];
};

export default function TieringWikiTableOfContents({
  items,
}: TieringWikiTableOfContentsProps) {
  return (
    <section
      id="tiering-wiki-contents"
      className="rounded-[30px] border border-white/15 bg-white/8 p-6 backdrop-blur-xl shadow-[0_0_30px_rgba(139,92,246,0.12)]"
    >
      <div className="mb-5">
        <div className="mb-3 inline-flex rounded-full border border-cyan-300/20 bg-cyan-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100">
          Table of Contents
        </div>

        <h2 className="text-2xl font-black text-white md:text-3xl">
          Navigate the full tiering wiki
        </h2>

        <p className="mt-2 max-w-3xl text-sm leading-7 text-white/65">
          Jump directly to the framework, the pyramid, or one of the major tier brackets.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {items.map((item, index) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-black/20 p-5 transition duration-300 hover:-translate-y-1 hover:border-fuchsia-400/40 hover:bg-white/10 hover:shadow-[0_0_28px_rgba(217,70,239,0.16)]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(217,70,239,0.16),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(34,211,238,0.12),transparent_26%)] opacity-80" />

            <div className="relative z-10">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-linear-to-br from-fuchsia-500/80 to-cyan-400/80 text-sm font-black text-white shadow-lg shadow-fuchsia-500/20">
                {index + 1}
              </div>

              <h3 className="text-lg font-black text-white">{item.label}</h3>

              {item.description ? (
                <p className="mt-2 text-sm leading-6 text-white/62">
                  {item.description}
                </p>
              ) : null}

              <div className="mt-5 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white/60 transition group-hover:border-cyan-300/25 group-hover:text-cyan-100">
                Open section
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}