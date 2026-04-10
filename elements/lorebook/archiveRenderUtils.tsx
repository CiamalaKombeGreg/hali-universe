import Link from "next/link";
import type { ArchiveInlinePart } from "./archiveTypes";

export function archiveTextColorClass(color?: string) {
  switch (color) {
    case "cyan":
      return "text-cyan-100";
    case "fuchsia":
      return "text-fuchsia-100";
    case "emerald":
      return "text-emerald-100";
    case "amber":
      return "text-amber-100";
    case "rose":
      return "text-rose-100";
    case "violet":
      return "text-violet-100";
    default:
      return "text-white/75";
  }
}

export function renderArchiveInlinePart(
  part: ArchiveInlinePart,
  index: number
): React.ReactNode {
  let content: React.ReactNode = (
    <span className={archiveTextColorClass(part.color)}>{part.text}</span>
  );

  if (part.referencePath) {
    content = (
      <Link
        href={part.referencePath}
        className="underline underline-offset-4"
      >
        {part.referenceLabel || content}
      </Link>
    );
  }

  if (part.bold) {
    content = <strong>{content}</strong>;
  }

  if (part.italic) {
    content = <em>{content}</em>;
  }

  if (part.underline) {
    content = <span className="underline underline-offset-4">{content}</span>;
  }

  return <span key={`${part.id}-${index}`}>{content}</span>;
}