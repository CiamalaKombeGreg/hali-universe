type TieringSectionHeaderProps = {
  title: string;
  description: string;
};

export default function TieringSectionHeader({
  title,
  description,
}: TieringSectionHeaderProps) {
  return (
    <section className="rounded-[28px] border border-white/15 bg-white/8 p-6 backdrop-blur-xl shadow-[0_0_30px_rgba(139,92,246,0.15)]">
      <div className="max-w-4xl">
        <p className="mb-3 inline-flex rounded-full border border-fuchsia-400/30 bg-fuchsia-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-fuchsia-200">
          Tiering Power
        </p>

        <h1 className="text-3xl font-black tracking-tight text-white md:text-4xl">
          {title}
        </h1>

        <p className="mt-3 text-sm leading-7 text-white/65 md:text-base">
          {description}
        </p>
      </div>
    </section>
  );
}