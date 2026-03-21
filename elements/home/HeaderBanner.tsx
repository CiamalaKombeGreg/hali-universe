import { ReactNode } from "react";
import SectionCard from "@/elements/ui/SectionCard";

type HeaderBannerProps = {
  children: ReactNode;
};

export default function HeaderBanner({ children }: HeaderBannerProps) {
  return (
    <SectionCard className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(217,70,239,0.28),transparent_28%),radial-gradient(circle_at_left,rgba(59,130,246,0.18),transparent_22%),radial-gradient(circle_at_bottom,rgba(16,185,129,0.14),transparent_26%)]" />
      <div className="relative z-10">{children}</div>
    </SectionCard>
  );
}