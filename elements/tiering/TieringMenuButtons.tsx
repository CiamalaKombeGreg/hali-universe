import Link from "next/link";
import { BookOpen, BarChart3, WandSparkles } from "lucide-react";

const buttons = [
  {
    title: "Tiering Wiki",
    description:
      "Galaxy, Multiversal, City, Star Cluster, Universal, and the rest of the scaling system.",
    href: "/tiering-power/tiering-wiki",
    icon: BookOpen,
  },
  {
    title: "Statistiques Wiki",
    description:
      "Speed, Attack potency, Destructive capabilities, Endurance, Agility, Dexterity, Reflexes, and other core statistics.",
    href: "/tiering-power/statistics-wiki",
    icon: BarChart3,
  },
  {
    title: "Recorded Abilities",
    description:
      "Store and browse registered abilities, powers, hax, resistances, and special traits.",
    href: "/tiering-power/recorded-abilities",
    icon: WandSparkles,
  },
];

export default function TieringMenuButtons() {
  return (
    <section className="grid gap-5 md:grid-cols-3">
      {buttons.map((button) => {
        const Icon = button.icon;

        return (
          <Link
            key={button.title}
            href={button.href}
            className="group relative overflow-hidden rounded-[28px] border border-white/15 bg-white/8 p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-fuchsia-400/40 hover:bg-white/10 hover:shadow-[0_0_35px_rgba(217,70,239,0.18)]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(217,70,239,0.18),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(34,211,238,0.16),transparent_28%)] opacity-80" />

            <div className="relative z-10 flex h-full flex-col">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-fuchsia-500/80 to-cyan-400/80 text-white shadow-lg shadow-fuchsia-500/20">
                <Icon className="h-7 w-7 transition group-hover:scale-110 group-hover:rotate-3" />
              </div>

              <h2 className="text-2xl font-black text-white">
                {button.title}
              </h2>

              <p className="mt-3 flex-1 text-sm leading-7 text-white/65">
                {button.description}
              </p>

              <div className="mt-6 inline-flex w-fit rounded-full border border-white/10 bg-black/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/70 transition group-hover:border-fuchsia-300/30 group-hover:text-white">
                Open section
              </div>
            </div>
          </Link>
        );
      })}
    </section>
  );
}