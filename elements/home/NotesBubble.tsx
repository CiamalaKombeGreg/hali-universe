import { ReactNode } from "react";
import SectionCard from "@/elements/ui/SectionCard";
import { ScrollText } from "lucide-react";

type NotesBubbleProps = {
  children: ReactNode;
};

export default function NotesBubble({ children }: NotesBubbleProps) {
  return (
    <SectionCard className="relative">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cyan-400/15 text-cyan-200">
          <ScrollText className="h-6 w-6" />
        </div>

        <div className="flex-1">{children}</div>
      </div>
    </SectionCard>
  );
}