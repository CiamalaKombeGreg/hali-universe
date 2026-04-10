import Link from "next/link";
import type {
  UniverseContentSection,
  UniverseInlinePart,
} from "./universeContentTypes";

export function formatLabel(value: string | null | undefined) {
  if (!value) return "";
  return value
    .toLowerCase()
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function renderInlinePart(
  part: UniverseInlinePart,
  index: number
): React.ReactNode {
  let content: React.ReactNode = part.text;

  if (part.referencePath) {
    content = (
      <Link
        href={part.referencePath}
        className="text-cyan-100 underline underline-offset-4"
      >
        {part.referenceLabel || part.text}
      </Link>
    );
  }

  if (part.bold) {
    content = <strong>{content}</strong>;
  }

  if (part.italic) {
    content = <em>{content}</em>;
  }

  return <span key={`${part.id}-${index}`}>{content}</span>;
}

export function getSectionTocItems(
  sections: UniverseContentSection[] | null | undefined,
  notes: unknown
) {
  const items =
    sections
      ?.filter((section) => section.title?.trim().length > 0)
      .map((section) => ({
        id: `section-${section.id}`,
        title: section.title,
      })) ?? [];

  const normalizedNotes =
    Array.isArray(notes) && notes.some((note) => String(note).trim().length > 0);

  if (normalizedNotes) {
    items.push({
      id: "notes-section",
      title: "Notes",
    });
  }

  return items;
}