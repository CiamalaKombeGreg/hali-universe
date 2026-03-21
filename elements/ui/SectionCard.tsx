import { ReactNode } from "react";

type SectionCardProps = {
  children: ReactNode;
  className?: string;
};

export default function SectionCard({
  children,
  className = "",
}: SectionCardProps) {
  return (
    <section
      className={[
        "rounded-[28px] border border-white/15",
        "bg-white/8 backdrop-blur-xl shadow-[0_0_30px_rgba(139,92,246,0.15)]",
        "p-6",
        className,
      ].join(" ")}
    >
      {children}
    </section>
  );
}