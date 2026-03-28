"use client";

import Link from "next/link";
import { ArrowLeft, PenSquare } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import VerticalNavbar from "@/elements/home/VerticalNavbar";
import type { ContentSection, InlineTextPart } from "./abilityEditorTypes";

type AbilityNodeData = {
  id: string;
  name: string;
  slug: string;
  status?: "DRAFT" | "PUBLISHED";
  shortDescriptionParts: InlineTextPart[] | null;
  notes: string[] | null;
  contentSections: ContentSection[] | null;
  mainImage: {
    url: string;
  } | null;
  parent?: {
    id: string;
    name: string;
    slug: string;
    type: string;
  } | null;
  children?: {
    id: string;
    name: string;
    slug: string;
    type: string;
  }[];
};

type Props = {
  slug: string;
  publicView?: boolean;
};

function renderInlinePart(part: InlineTextPart, index: number) {
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

  if (part.underline) {
    content = <span className="underline underline-offset-4">{content}</span>;
  }

  return <span key={`${part.id}-${index}`}>{content}</span>;
}

export default function AbilityNodeWikiPage({
  slug,
  publicView = false,
}: Props) {
  const [node, setNode] = useState<AbilityNodeData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function run() {
      try {
        const response = await fetch(`/api/ability-nodes/${slug}`);

        if (!response.ok) {
          throw new Error("Failed to load node");
        }

        const data = await response.json();
        setNode(data.node);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    void run();
  }, [slug]);

  const tocItems = useMemo(() => {
    if (!node?.contentSections) return [];

    const items = node.contentSections
      .filter((section) => section.title && section.title.trim().length > 0)
      .map((section) => ({
        id: `section-${section.id}`,
        title: section.title,
      }));

    if (node.notes && node.notes.length > 0) {
      items.push({
        id: "notes-section",
        title: "Notes",
      });
    }

    return items;
  }, [node]);

  return (
    <main className="flex min-h-screen bg-[#060816] text-white">
      <VerticalNavbar />

      <div className="flex-1">
        <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-8 px-6 py-6 md:px-10">
          <div className="flex items-center justify-end gap-3">
            <Link
              href={
                publicView
                  ? "/tiering-power/recorded-abilities"
                  : "/tiering-power/recorded-abilities/edit/existing"
              }
              className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white/80 transition hover:border-cyan-400/40 hover:bg-white/10 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Go back
            </Link>

            {!publicView ? (
              <Link
                href={`/tiering-power/recorded-abilities/edit/${slug}/edit`}
                className="inline-flex items-center gap-3 rounded-2xl border border-fuchsia-300/20 bg-fuchsia-400/10 px-4 py-3 text-sm font-semibold text-fuchsia-100 transition hover:bg-fuchsia-400/20"
              >
                <PenSquare className="h-4 w-4" />
                Edit
              </Link>
            ) : null}
          </div>

          {loading ? (
            <div className="rounded-[30px] border border-white/10 bg-white/5 p-8 text-white/55">
              Loading node...
            </div>
          ) : !node ? (
            <div className="rounded-[30px] border border-white/10 bg-white/5 p-8 text-white/55">
              Ability node not found.
            </div>
          ) : (
            <>
              <section className="rounded-[30px] border border-white/15 bg-white/8 p-6 backdrop-blur-xl shadow-[0_0_30px_rgba(139,92,246,0.12)]">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <h1 className="text-4xl font-black text-white">{node.name}</h1>

                  {!publicView && node.status ? (
                    <div
                      className={`inline-flex rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] ${
                        node.status === "DRAFT"
                          ? "border-yellow-300/20 bg-yellow-400/10 text-yellow-100"
                          : "border-emerald-300/20 bg-emerald-400/10 text-emerald-100"
                      }`}
                    >
                      {node.status}
                    </div>
                  ) : null}
                </div>
              </section>

              <section className="rounded-[30px] border border-white/15 bg-white/8 p-6 backdrop-blur-xl shadow-[0_0_30px_rgba(139,92,246,0.10)]">
                <div className="grid gap-6 md:grid-cols-[260px_1fr]">
                  <div className="overflow-hidden rounded-[24px] border border-white/10 bg-black/20">
                    {node.mainImage?.url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={node.mainImage.url}
                        alt={node.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-[240px] items-center justify-center text-white/35">
                        No image
                      </div>
                    )}
                  </div>

                  <div className="rounded-[24px] border border-white/10 bg-black/20 p-5">
                    <h2 className="text-xl font-black text-white">
                      Short Description
                    </h2>

                    {node.shortDescriptionParts &&
                    node.shortDescriptionParts.length > 0 ? (
                      <p className="mt-4 text-sm leading-7 text-white/72">
                        {node.shortDescriptionParts.map(renderInlinePart)}
                      </p>
                    ) : (
                      <p className="mt-4 text-sm leading-7 text-white/55">
                        No short description available.
                      </p>
                    )}
                  </div>
                </div>
              </section>

              {(node.parent || (node.children && node.children.length > 0)) ? (
                <section className="rounded-[30px] border border-purple-300/20 bg-purple-500/10 p-6 backdrop-blur-xl shadow-[0_0_30px_rgba(168,85,247,0.12)]">
                  <h2 className="text-xl font-black text-purple-100">Relationships</h2>

                  <div className="mt-4 flex flex-wrap gap-3">
                    {node.parent ? (
                      <Link
                        href={`/tiering-power/recorded-abilities/${node.parent.slug}`}
                        className="rounded-full border border-purple-300/25 bg-purple-400/10 px-4 py-2 text-sm font-semibold text-purple-100 transition hover:bg-purple-400/20"
                      >
                        {node.parent.type === "ABILITY" || node.parent.type === "ASSOCIATION_ABILITY"
                          ? `Sub-Skill of ${node.parent.name}`
                          : `Founded from ${node.parent.name}`}
                      </Link>
                    ) : null}

                    {node.children?.map((child) => (
                      <Link
                        key={child.id}
                        href={`/tiering-power/recorded-abilities/${child.slug}`}
                        className="rounded-full border border-fuchsia-300/25 bg-fuchsia-400/10 px-4 py-2 text-sm font-semibold text-fuchsia-100 transition hover:bg-fuchsia-400/20"
                      >
                        {child.type === "ABILITY" || child.type === "ASSOCIATION_ABILITY"
                          ? `Sub-Skill: ${child.name}`
                          : `Derived System: ${child.name}`}
                      </Link>
                    ))}
                  </div>
                </section>
              ) : null}

              <section className="rounded-[30px] border border-white/15 bg-white/8 p-6 backdrop-blur-xl shadow-[0_0_30px_rgba(139,92,246,0.10)]">
                <h2 className="text-2xl font-black text-white">
                  Table of contents
                </h2>

                {tocItems.length === 0 ? (
                  <p className="mt-4 text-sm text-white/55">
                    No sections available yet.
                  </p>
                ) : (
                  <div className="mt-5 grid gap-3 md:grid-cols-2">
                    {tocItems.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className="rounded-[20px] border border-white/10 bg-black/20 px-4 py-3 text-sm font-semibold text-white/80 transition hover:bg-white/10"
                      >
                        {item.title}
                      </a>
                    ))}
                  </div>
                )}
              </section>

              <section className="space-y-6">
                {(node.contentSections ?? []).map((section) => (
                  <section
                    key={section.id}
                    id={`section-${section.id}`}
                    className="rounded-[30px] border border-white/15 bg-white/8 p-6 backdrop-blur-xl shadow-[0_0_30px_rgba(139,92,246,0.08)]"
                  >
                    <h2 className="mb-5 text-2xl font-black text-white">
                      {section.title || "Untitled Section"}
                    </h2>

                    <div className="space-y-5">
                      {section.items.map((item) => (
                        <div key={item.id}>
                          {item.type === "subtitle" ? (
                            <h3 className="text-xl font-black text-cyan-100">
                              {item.text}
                            </h3>
                          ) : null}

                          {item.type === "text" ? (
                            <p className="text-sm leading-8 text-white/75">
                              {item.parts.map(renderInlinePart)}
                            </p>
                          ) : null}

                          {item.type === "list" ? (
                            <div className="space-y-3">
                              {item.items.map((listItem) => (
                                <div
                                  key={listItem.id}
                                  className="rounded-[20px] border border-white/10 bg-black/20 px-4 py-3 text-sm leading-7 text-white/75"
                                >
                                  • {listItem.parts.map(renderInlinePart)}
                                </div>
                              ))}
                            </div>
                          ) : null}

                          {item.type === "image" && item.imageUrl ? (
                            <div className="space-y-3">
                              <div
                                className={`overflow-hidden rounded-[24px] ${
                                  item.framed
                                    ? "border border-white/10 bg-black/20 p-3"
                                    : ""
                                }`}
                              >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={item.imageUrl}
                                  alt={item.caption || "Section image"}
                                  className="max-h-[500px] w-full rounded-[18px] object-contain"
                                />
                              </div>

                              {item.caption ? (
                                <p className="text-sm text-white/55">
                                  {item.caption}
                                </p>
                              ) : null}
                            </div>
                          ) : null}

                          {item.type === "table" ? (
                            <div className="space-y-2">
                              {item.cells.map((row, rowIndex) => (
                                <div
                                  key={rowIndex}
                                  className="grid gap-2"
                                  style={{
                                    gridTemplateColumns: `repeat(${row.length}, minmax(0, 1fr))`,
                                  }}
                                >
                                  {row.map((cell) => (
                                    <div
                                      key={cell.id}
                                      className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white/75"
                                    >
                                      {cell.kind === "empty" ? "" : cell.value}
                                    </div>
                                  ))}
                                </div>
                              ))}
                            </div>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  </section>
                ))}

                <section
                  id="notes-section"
                  className="rounded-[30px] border border-white/15 bg-white/8 p-6 backdrop-blur-xl shadow-[0_0_30px_rgba(139,92,246,0.08)]"
                >
                  <h2 className="text-2xl font-black text-white">Notes</h2>

                  <div className="mt-5 space-y-3">
                    {node.notes && node.notes.length > 0 ? (
                      node.notes.map((note, index) => (
                        <div
                          key={`${index}-${note}`}
                          className="rounded-[20px] border border-white/10 bg-black/20 px-4 py-3 text-sm leading-7 text-white/72"
                        >
                          {note}
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-white/55">
                        No notes available.
                      </p>
                    )}
                  </div>
                </section>
              </section>
            </>
          )}
        </div>
      </div>
    </main>
  );
}