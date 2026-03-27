"use client";

import Link from "next/link";
import { ArrowLeft, PenSquare } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import VerticalNavbar from "@/elements/home/VerticalNavbar";

type ContentBlock = {
  id: string;
  type: "text" | "list" | "image" | "table";
  title?: string;
  parts?: {
    id: string;
    text: string;
    bold?: boolean;
    underline?: boolean;
    referencePath?: string;
    referenceLabel?: string;
  }[];
  items?: {
    id: string;
    parts: {
      id: string;
      text: string;
      bold?: boolean;
      underline?: boolean;
      referencePath?: string;
      referenceLabel?: string;
    }[];
  }[];
  imageUrl?: string;
  caption?: string;
  framed?: boolean;
  rows?: number;
  cols?: number;
  cells?: {
    id: string;
    kind: "value" | "empty";
    value: string;
  }[][];
};

type AbilityNodeData = {
  id: string;
  name: string;
  slug: string;
  shortDescription: string | null;
  notes: string | null;
  contentBlocks: ContentBlock[] | null;
  mainImage: {
    url: string;
  } | null;
};

type Props = {
  slug: string;
};

function renderInlinePart(
  part: {
    id: string;
    text: string;
    bold?: boolean;
    underline?: boolean;
    referencePath?: string;
    referenceLabel?: string;
  },
  index: number
) {
  let content: React.ReactNode = part.text;

  if (part.referencePath) {
    content = (
      <Link href={part.referencePath} className="text-cyan-100 underline underline-offset-4">
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

export default function AbilityNodeWikiPage({ slug }: Props) {
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
    if (!node?.contentBlocks) return [];

    const items = node.contentBlocks
      .filter((block) => block.title && block.title.trim().length > 0)
      .map((block) => ({
        id: `block-${block.id}`,
        title: block.title as string,
      }));

    if (node.notes?.trim()) {
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
              href="/tiering-power/recorded-abilities/edit/existing"
              className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white/80 transition hover:border-cyan-400/40 hover:bg-white/10 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Go back
            </Link>

            <button
              type="button"
              className="inline-flex items-center gap-3 rounded-2xl border border-fuchsia-300/20 bg-fuchsia-400/10 px-4 py-3 text-sm font-semibold text-fuchsia-100 transition hover:bg-fuchsia-400/20"
            >
              <PenSquare className="h-4 w-4" />
              Edit
            </button>
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
                <h1 className="text-4xl font-black text-white">{node.name}</h1>
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
                    <h2 className="text-xl font-black text-white">Short Description</h2>
                    <p className="mt-4 text-sm leading-7 text-white/72">
                      {node.shortDescription || "No short description available."}
                    </p>
                  </div>
                </div>
              </section>

              <section className="rounded-[30px] border border-white/15 bg-white/8 p-6 backdrop-blur-xl shadow-[0_0_30px_rgba(139,92,246,0.10)]">
                <h2 className="text-2xl font-black text-white">Table of contents</h2>

                {tocItems.length === 0 ? (
                  <p className="mt-4 text-sm text-white/55">No sections available yet.</p>
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
                {(node.contentBlocks ?? []).map((block) => (
                  <section
                    key={block.id}
                    id={`block-${block.id}`}
                    className="rounded-[30px] border border-white/15 bg-white/8 p-6 backdrop-blur-xl shadow-[0_0_30px_rgba(139,92,246,0.08)]"
                  >
                    {block.title ? (
                      <h2 className="mb-5 text-2xl font-black text-white">{block.title}</h2>
                    ) : null}

                    {block.type === "text" && block.parts ? (
                      <p className="text-sm leading-8 text-white/75">
                        {block.parts.map(renderInlinePart)}
                      </p>
                    ) : null}

                    {block.type === "list" && block.items ? (
                      <div className="space-y-3">
                        {block.items.map((item) => (
                          <div
                            key={item.id}
                            className="rounded-[20px] border border-white/10 bg-black/20 px-4 py-3 text-sm leading-7 text-white/75"
                          >
                            • {item.parts.map(renderInlinePart)}
                          </div>
                        ))}
                      </div>
                    ) : null}

                    {block.type === "image" && block.imageUrl ? (
                      <div className="space-y-3">
                        <div
                          className={`overflow-hidden rounded-[24px] ${
                            block.framed ? "border border-white/10 bg-black/20 p-3" : ""
                          }`}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={block.imageUrl}
                            alt={block.caption || "Section image"}
                            className="max-h-[500px] w-full rounded-[18px] object-contain"
                          />
                        </div>
                        {block.caption ? (
                          <p className="text-sm text-white/55">{block.caption}</p>
                        ) : null}
                      </div>
                    ) : null}

                    {block.type === "table" && block.cells ? (
                      <div className="space-y-2">
                        {block.cells.map((row, rowIndex) => (
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
                  </section>
                ))}

                <section
                  id="notes-section"
                  className="rounded-[30px] border border-white/15 bg-white/8 p-6 backdrop-blur-xl shadow-[0_0_30px_rgba(139,92,246,0.08)]"
                >
                  <h2 className="text-2xl font-black text-white">Notes</h2>
                  <div className="mt-5 space-y-3">
                    {node.notes?.trim() ? (
                      node.notes.split("\n\n").map((note, index) => (
                        <div
                          key={`${index}-${note}`}
                          className="rounded-[20px] border border-white/10 bg-black/20 px-4 py-3 text-sm leading-7 text-white/72"
                        >
                          {note}
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-white/55">No notes available.</p>
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