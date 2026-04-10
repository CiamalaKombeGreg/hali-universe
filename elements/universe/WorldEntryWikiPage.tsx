"use client";

import Link from "next/link";
import { ArrowLeft, PenSquare } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import VerticalNavbar from "@/elements/home/VerticalNavbar";
import type { UniverseContentSection } from "./universeContentTypes";
import {
  formatLabel,
  getSectionTocItems,
  renderInlinePart,
} from "./universeWikiUtils";

type WorldEntryData = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  summary: string | null;
  type: string;
  canonStatus: string | null;
  cosmologyType: string | null;
  visibilityStatus: string | null;
  isPublished: boolean;
  sourceNote: string | null;
  inspirationNote: string | null;
  officialPublisher: string | null;
  creator: string | null;
  branchDescription: string | null;
  divergenceNote: string | null;
  approvalNote: string | null;
  sourceSeriesNote: string | null;
  installmentOrder: number | null;
  installmentCode: string | null;
  isStandaloneContainer: boolean | null;
  allowOriginalCreations: boolean | null;
  allowOfficialSeries: boolean | null;
  hasMultipleContinuities: boolean | null;
  isFullyIndependent: boolean | null;
  officialCrossover: boolean | null;
  infoSections: UniverseContentSection[] | null;
  notes: string[] | null;
  bannerImage: {
    url: string;
  } | null;
  parent: {
    id: string;
    name: string;
    slug: string;
    type: string;
  } | null;
  children: {
    id: string;
    name: string;
    slug: string;
    type: string;
    visibilityStatus: string | null;
    isPublished: boolean;
  }[];
  linkedAbilities: {
    abilityNode: {
      id: string;
      name: string;
      slug: string;
      type: string;
      status: string;
    };
  }[];
    relatedLorebooks: {
    id: string;
    title: string;
    slug: string;
  }[];
  relatedNovels: {
    id: string;
    title: string;
    slug: string;
  }[];
  crossoverSources: {
    sourceEntry: {
      id: string;
      name: string;
      slug: string;
      type: string;
    };
  }[];
  tags: {
    id: string;
    label: string;
  }[];
  locations: {
    id: string;
    name: string;
    slug: string;
    locationType: string;
  }[];
};

type Props = {
  slug: string;
  returnTo?: string;
  showEditButton?: boolean;
};

function MetaChip({
  label,
  value,
}: {
  label: string;
  value: string | number | null | undefined | boolean;
}) {
  if (
    value === null ||
    value === undefined ||
    value === "" ||
    value === false
  ) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 self-start">
      <div className="text-[11px] font-black uppercase tracking-[0.18em] text-cyan-100">
        {label}
      </div>
      <div className="mt-2 text-sm text-white/75">{String(value)}</div>
    </div>
  );
}

export default function WorldEntryWikiPage({
  slug,
  returnTo = "/universe/wiki",
  showEditButton = true,
}: Props) {
  const [entry, setEntry] = useState<WorldEntryData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function run() {
      try {
        const response = await fetch(`/api/world-entries/${slug}`);
        if (!response.ok) {
          throw new Error("Failed to load world entry");
        }

        const data = await response.json();
        setEntry(data.entry);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    void run();
  }, [slug]);

  const tocItems = useMemo(() => {
    if (!entry) return [];

    const items: { id: string; title: string }[] = [];

    items.push({
      id: "summary-metadata-section",
      title: "Summary & metadata",
    });

    if (Array.isArray(entry.infoSections) && entry.infoSections.length > 0) {
      entry.infoSections.forEach((section, index) => {
        const fallbackTitle =
          section.title?.trim() ||
          section.items.find((item) => item.type === "subtitle")?.text?.trim() ||
          `Info Section ${index + 1}`;

        items.push({
          id: `section-${section.id}`,
          title: fallbackTitle,
        });
      });
    }

    items.push({
      id: "relationships-section",
      title: "Relationships",
    });

    if (entry.crossoverSources?.length > 0) {
      items.push({
        id: "crossover-sources-section",
        title: "Crossover Sources",
      });
    }

    if (entry.linkedAbilities?.length > 0) {
      items.push({
        id: "linked-abilities-section",
        title: "Linked Abilities",
      });
    }

    const hasNotes =
      Array.isArray(entry.notes) &&
      entry.notes.some((note) => String(note).trim().length > 0);

    if (hasNotes) {
      items.push({
        id: "notes-section",
        title: "Notes",
      });
    }

    return items;
  }, [entry]);

  return (
    <main className="flex min-h-screen bg-[#02040b] text-white">
      <VerticalNavbar />

      <div className="flex-1">
        <div className="mx-auto flex w-full max-w-[1650px] flex-col gap-8 px-6 py-6 md:px-10">
          <div className="flex items-center justify-end gap-3">
            <Link
              href={returnTo}
              className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white/80 transition hover:border-cyan-400/40 hover:bg-white/10 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Return
            </Link>

            {showEditButton ? (
              <Link
                href={`/universe/manage/database/edit/world/${slug}`}
                className="inline-flex items-center gap-3 rounded-2xl border border-fuchsia-300/20 bg-fuchsia-400/10 px-4 py-3 text-sm font-semibold text-fuchsia-100 transition hover:bg-fuchsia-400/20"
              >
                <PenSquare className="h-4 w-4" />
                Edit
              </Link>
            ) : null}
          </div>

          {loading ? (
            <div className="rounded-[30px] border border-white/10 bg-white/5 p-8 text-white/55">
              Loading world entry...
            </div>
          ) : !entry ? (
            <div className="rounded-[30px] border border-white/10 bg-white/5 p-8 text-white/55">
              World entry not found.
            </div>
          ) : (
            <>
              <section className="overflow-hidden rounded-[30px] border border-white/15 bg-white/8 backdrop-blur-xl shadow-[0_0_30px_rgba(139,92,246,0.12)]">
                <div className="grid gap-0 md:grid-cols-[1.15fr_0.85fr]">
                  <div className="min-h-[280px] border-b border-white/10 bg-black/20 md:border-b-0 md:border-r">
                    {entry.bannerImage?.url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={entry.bannerImage.url}
                        alt={entry.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full min-h-[280px] items-center justify-center text-white/35">
                        No banner
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="inline-flex rounded-full border border-cyan-300/20 bg-cyan-400/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-cyan-100">
                      {formatLabel(entry.type)}
                    </div>

                    <h1 className="mt-4 text-4xl font-black text-white">
                      {entry.name}
                    </h1>

                    <p className="mt-4 text-sm leading-7 text-white/72">
                      {entry.description || "No description available."}
                    </p>

                    {entry.parent ? (
                      <div className="mt-5 rounded-2xl border border-fuchsia-300/15 bg-fuchsia-400/8 px-4 py-3 text-sm text-fuchsia-100">
                        Parent:{" "}
                        <Link
                          href={`/universe/wiki/${entry.parent.slug}`}
                          className="underline underline-offset-4"
                        >
                          {entry.parent.name}
                        </Link>
                      </div>
                    ) : null}
                  </div>
                </div>
              </section>

              <section className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
                <section className="rounded-[30px] border border-white/15 bg-white/8 p-6 backdrop-blur-xl">
                  <h2 className="text-2xl font-black text-white">Table of contents</h2>

                  {tocItems.length === 0 ? (
                    <p className="mt-4 text-sm text-white/55">No sections available yet.</p>
                  ) : (
                    <div className="mt-5 grid gap-3">
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

                <section id="summary-metadata-section" className="rounded-[30px] border border-white/15 bg-white/8 p-6 backdrop-blur-xl">
                  <h2 className="text-2xl font-black text-white">Summary & metadata</h2>

                  <div className="mt-5 grid gap-3 md:grid-cols-2">
                    {entry.summary ? (
                      <div className="md:col-span-2 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                        <div className="text-[11px] font-black uppercase tracking-[0.18em] text-cyan-100">
                          Summary
                        </div>
                        <div className="mt-2 text-sm leading-7 text-white/75">{entry.summary}</div>
                      </div>
                    ) : null}

                    <MetaChip label="Type" value={formatLabel(entry.type)} />
                    <MetaChip label="Canon Status" value={formatLabel(entry.canonStatus)} />
                    <MetaChip label="Cosmology Type" value={formatLabel(entry.cosmologyType)} />
                    <MetaChip label="Visibility" value={formatLabel(entry.visibilityStatus)} />
                    <MetaChip label="Official Publisher" value={entry.officialPublisher} />
                    <MetaChip label="Creator" value={entry.creator} />
                    <MetaChip label="Branch Description" value={entry.branchDescription} />
                    <MetaChip label="Divergence Note" value={entry.divergenceNote} />
                    <MetaChip label="Approval Note" value={entry.approvalNote} />
                    <MetaChip label="Source Note" value={entry.sourceNote} />
                    <MetaChip label="Inspiration Note" value={entry.inspirationNote} />
                    <MetaChip label="Source Series Note" value={entry.sourceSeriesNote} />
                    <MetaChip label="Installment Code" value={entry.installmentCode} />
                    <MetaChip label="Installment Order" value={entry.installmentOrder} />
                    <MetaChip
                      label="Standalone Container"
                      value={entry.isStandaloneContainer ? "Yes" : null}
                    />
                    <MetaChip
                      label="Allows Original Creations"
                      value={entry.allowOriginalCreations ? "Yes" : null}
                    />
                    <MetaChip
                      label="Allows Official Series"
                      value={entry.allowOfficialSeries ? "Yes" : null}
                    />
                    <MetaChip
                      label="Multiple Continuities"
                      value={entry.hasMultipleContinuities ? "Yes" : null}
                    />
                    <MetaChip
                      label="Fully Independent"
                      value={entry.isFullyIndependent ? "Yes" : null}
                    />
                    <MetaChip
                      label="Official Crossover"
                      value={entry.officialCrossover ? "Yes" : null}
                    />
                  </div>

                  {entry.tags.length > 0 ? (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {entry.tags.map((tag) => (
                        <div
                          key={tag.id}
                          className="rounded-full border border-cyan-300/20 bg-cyan-400/10 px-3 py-1.5 text-xs font-semibold text-cyan-100"
                        >
                          {tag.label}
                        </div>
                      ))}
                    </div>
                  ) : null}
                </section>
              </section>

              <section className="space-y-6">
                {(entry.infoSections ?? []).map((section) => (
                  <section
                    key={section.id}
                    id={`section-${section.id}`}
                    className="rounded-[30px] border border-white/15 bg-white/8 p-6 backdrop-blur-xl"
                  >
                    <h2 className="mb-5 text-2xl font-black text-white">
                      {section.title}
                    </h2>

                    <div className="space-y-5">
                      {section.items.map((item) => {
                        if (item.type === "subtitle") {
                          return (
                            <h3
                              key={item.id}
                              className="text-xl font-black text-cyan-100"
                            >
                              {item.text}
                            </h3>
                          );
                        }

                        if (item.type === "text") {
                          return (
                            <p
                              key={item.id}
                              className="text-sm leading-8 text-white/75"
                            >
                              {item.parts.map(renderInlinePart)}
                            </p>
                          );
                        }

                        if (item.type === "list") {
                          return (
                            <div key={item.id} className="space-y-3">
                              {item.items.map((entryItem) => (
                                <div
                                  key={entryItem.id}
                                  className="rounded-[20px] border border-white/10 bg-black/20 px-4 py-3 text-sm leading-7 text-white/75"
                                >
                                  • {entryItem.parts.map(renderInlinePart)}
                                </div>
                              ))}
                            </div>
                          );
                        }

                        if (item.type === "image") {
                          return (
                            <div key={item.id} className="space-y-3">
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
                                  className="max-h-[520px] w-full rounded-[18px] object-contain"
                                />
                              </div>
                              {item.caption ? (
                                <p className="text-sm text-white/55">{item.caption}</p>
                              ) : null}
                            </div>
                          );
                        }

                        if (item.type === "table") {
                          return (
                            <div key={item.id} className="space-y-2">
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
                          );
                        }

                        return null;
                      })}
                    </div>
                  </section>
                ))}

                <section className="grid gap-6 xl:grid-cols-3">
                  <section id="relationships-section" className="rounded-[30px] border border-white/15 bg-white/8 p-6 backdrop-blur-xl">
                    <h2 className="text-2xl font-black text-white">Relationships</h2>

                    <div className="mt-5 space-y-4">
                      <div>
                        <div className="text-xs font-black uppercase tracking-[0.18em] text-cyan-100">
                          Parent
                        </div>
                        <div className="mt-2 text-sm text-white/72">
                          {entry.parent ? (
                            <Link
                              href={`/universe/wiki/${entry.parent.slug}`}
                              className="underline underline-offset-4"
                            >
                              {entry.parent.name}
                            </Link>
                          ) : (
                            "No parent"
                          )}
                        </div>
                      </div>

                      <div>
                        <div className="text-xs font-black uppercase tracking-[0.18em] text-cyan-100">
                          Children
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {entry.children.length > 0 ? (
                            entry.children.map((child) => (
                              <Link
                                key={child.id}
                                href={`/universe/wiki/${child.slug}`}
                                className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-xs font-semibold text-white/75"
                              >
                                {child.name}
                              </Link>
                            ))
                          ) : (
                            <span className="text-sm text-white/55">No children</span>
                          )}
                        </div>
                      </div>

                      <div>
                        <div className="text-xs font-black uppercase tracking-[0.18em] text-cyan-100">
                          Locations
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {entry.locations.length > 0 ? (
                            entry.locations.map((location) => (
                              <Link
                                key={location.id}
                                href={`/universe/wiki/location/${location.slug}`}
                                className="rounded-full border border-fuchsia-300/15 bg-fuchsia-400/8 px-3 py-1.5 text-xs font-semibold text-fuchsia-100"
                              >
                                {location.name}
                              </Link>
                            ))
                          ) : (
                            <span className="text-sm text-white/55">No linked locations</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </section>

                  <section id="crossover-sources-section" className="rounded-[30px] border border-white/15 bg-white/8 p-6 backdrop-blur-xl">
                    <h2 className="text-2xl font-black text-white">Crossover Sources</h2>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {entry.crossoverSources.length > 0 ? (
                        entry.crossoverSources.map((source) => (
                          <Link
                            key={source.sourceEntry.id}
                            href={`/universe/wiki/${source.sourceEntry.slug}`}
                            className="rounded-full border border-fuchsia-300/20 bg-fuchsia-400/10 px-3 py-1.5 text-xs font-semibold text-fuchsia-100"
                          >
                            {source.sourceEntry.name}
                          </Link>
                        ))
                      ) : (
                        <span className="text-sm text-white/55">No crossover sources</span>
                      )}
                    </div>
                  </section>

                  <section id="linked-abilities-section" className="rounded-[30px] border border-white/15 bg-white/8 p-6 backdrop-blur-xl">
                    <h2 className="text-2xl font-black text-white">Linked Abilities</h2>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {entry.linkedAbilities.length > 0 ? (
                        entry.linkedAbilities.map((item) => (
                          <Link
                            key={item.abilityNode.id}
                            href={`/tiering-power/recorded-abilities/${item.abilityNode.slug}`}
                            className="rounded-full border border-violet-300/20 bg-violet-400/10 px-3 py-1.5 text-xs font-semibold text-violet-100"
                          >
                            {item.abilityNode.name}
                          </Link>
                        ))
                      ) : (
                        <span className="text-sm text-white/55">No linked abilities</span>
                      )}
                    </div>
                  </section>

                  <section className="rounded-[30px] border border-white/15 bg-white/8 p-6 backdrop-blur-xl">
                    <h2 className="text-2xl font-black text-white">Related Archive</h2>

                    <div className="mt-5 grid gap-6 md:grid-cols-2">
                      <div>
                        <div className="text-xs font-black uppercase tracking-[0.18em] text-cyan-100">
                          Lorebooks
                        </div>

                        <div className="mt-3 flex flex-wrap gap-2">
                          {entry.relatedLorebooks.length > 0 ? (
                            entry.relatedLorebooks.map((item) => (
                              <Link
                                key={item.id}
                                href={`/universe/lorebook/${item.slug}`}
                                className="rounded-full border border-cyan-300/20 bg-cyan-400/10 px-3 py-1.5 text-xs font-semibold text-cyan-100"
                              >
                                {item.title}
                              </Link>
                            ))
                          ) : (
                            <span className="text-sm text-white/55">No related lorebooks</span>
                          )}
                        </div>
                      </div>

                      <div>
                        <div className="text-xs font-black uppercase tracking-[0.18em] text-fuchsia-100">
                          Novels
                        </div>

                        <div className="mt-3 flex flex-wrap gap-2">
                          {entry.relatedNovels.length > 0 ? (
                            entry.relatedNovels.map((item) => (
                              <Link
                                key={item.id}
                                href={`/universe/lorebook/novels/${item.slug}`}
                                className="rounded-full border border-fuchsia-300/20 bg-fuchsia-400/10 px-3 py-1.5 text-xs font-semibold text-fuchsia-100"
                              >
                                {item.title}
                              </Link>
                            ))
                          ) : (
                            <span className="text-sm text-white/55">No related novels</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </section>
                </section>

                <section
                  id="notes-section"
                  className="rounded-[30px] border border-white/15 bg-white/8 p-6 backdrop-blur-xl"
                >
                  <h2 className="text-2xl font-black text-white">Notes</h2>

                  <div className="mt-5 space-y-3">
                    {entry.notes && entry.notes.length > 0 ? (
                      entry.notes.map((note, index) => (
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