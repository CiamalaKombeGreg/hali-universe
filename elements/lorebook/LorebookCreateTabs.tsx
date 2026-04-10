"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import LorebookSectionsEditor from "./LorebookSectionsEditor";
import type {
  ArchiveSection,
  ArchiveVisibilityStatusValue,
  LorebookCreatePayload,
  NovelCreatePayload,
} from "./archiveTypes";

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

type SearchLinkItem = {
  id: string;
  name: string;
  slug: string;
  type: string;
};

type UploadedArchiveImage = {
  id: string;
  url: string;
  storageKey?: string;
  isPrimary: boolean;
};

type LorebookInitialData = {
  id: string;
  title: string;
  slug: string;
  description: string;
  visibilityStatus: "DRAFT" | "PUBLISHED";
  coverImage: {
    id?: string;
    url: string;
    storageKey?: string;
    isPrimary?: boolean;
  } | null;
  contentSections: ArchiveSection[];
  linkedWorldIds: string[];
  linkedLocationIds: string[];
  linkedCharacterIds: string[];
};

type NovelChapterPreview = {
  id: string;
  title: string;
  slug: string;
  subtitle: string | null;
  orderIndex: number;
  status: "DRAFT" | "PUBLISHED";
};

type NovelInitialData = {
  id: string;
  title: string;
  slug: string;
  authorName: string;
  summary: string;
  visibilityStatus: "DRAFT" | "PUBLISHED";
  coverImage: {
    id?: string;
    url: string;
    storageKey?: string;
    isPrimary?: boolean;
  } | null;
  tags: string[];
  linkedWorldId: string | null;
  chapters: NovelChapterPreview[];
};

type LorebookCreateTabsProps = {
  pageMode?: "create" | "edit-lorebook" | "edit-novel";
  initialLorebook?: LorebookInitialData;
  initialNovel?: NovelInitialData;
};

export default function LorebookCreateTabs({
  pageMode = "create",
  initialLorebook,
  initialNovel,
}: LorebookCreateTabsProps) {
  const [mode, setMode] = useState<"lorebook" | "novel">("lorebook");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [visibilityStatus, setVisibilityStatus] =
    useState<ArchiveVisibilityStatusValue>("DRAFT");
  const [sections, setSections] = useState<ArchiveSection[]>([]);

  const [linkedWorldSearch, setLinkedWorldSearch] = useState("");
  const [linkedWorldResults, setLinkedWorldResults] = useState<SearchLinkItem[]>([]);
  const [linkedWorlds, setLinkedWorlds] = useState<SearchLinkItem[]>([]);

  const [linkedLocationSearch, setLinkedLocationSearch] = useState("");
  const [linkedLocationResults, setLinkedLocationResults] = useState<SearchLinkItem[]>([]);
  const [linkedLocations, setLinkedLocations] = useState<SearchLinkItem[]>([]);

  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);

  const [authorName, setAuthorName] = useState("");
  const [summary, setSummary] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [linkedNovelWorld, setLinkedNovelWorld] = useState<SearchLinkItem | null>(null);
  const [linkedNovelWorldSearch, setLinkedNovelWorldSearch] = useState("");
  const [linkedNovelWorldResults, setLinkedNovelWorldResults] = useState<SearchLinkItem[]>([]);

  const [saving, setSaving] = useState(false);

  const coverInputRef = useRef<HTMLInputElement | null>(null);

  const slug = useMemo(() => {
    if (pageMode === "edit-lorebook" && initialLorebook?.slug) {
      return initialLorebook.slug;
    }

    if (pageMode === "edit-novel" && initialNovel?.slug) {
      return initialNovel.slug;
    }

    return slugify(title);
  }, [title, pageMode, initialLorebook, initialNovel]);

  useEffect(() => {
    if (pageMode === "edit-lorebook" && initialLorebook) {
      setMode("lorebook");
      setTitle(initialLorebook.title ?? "");
      setDescription(initialLorebook.description ?? "");
      setVisibilityStatus(initialLorebook.visibilityStatus ?? "DRAFT");
      setSections(
        Array.isArray(initialLorebook.contentSections)
          ? initialLorebook.contentSections
          : []
      );
      setCoverPreview(initialLorebook.coverImage?.url ?? null);
      setCoverFile(null);
      return;
    }

    if (pageMode === "edit-novel" && initialNovel) {
      setMode("novel");
      setTitle(initialNovel.title ?? "");
      setAuthorName(initialNovel.authorName ?? "");
      setSummary(initialNovel.summary ?? "");
      setVisibilityStatus(initialNovel.visibilityStatus ?? "DRAFT");
      setTags(Array.isArray(initialNovel.tags) ? initialNovel.tags : []);
      setCoverPreview(initialNovel.coverImage?.url ?? null);
      setCoverFile(null);
    }
  }, [pageMode, initialLorebook, initialNovel]);

  async function uploadFile(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Upload failed");
    }

    const data = await response.json();

    const image: UploadedArchiveImage = {
      id: crypto.randomUUID(),
      url: data.fileUrl,
      storageKey: data.objectName,
      isPrimary: true,
    };

    return image;
  }

  async function uploadSectionsImages(currentSections: ArchiveSection[]) {
    const nextSections: ArchiveSection[] = [];

    for (const section of currentSections) {
      const nextItems = [];

      for (const item of section.items) {
        if (item.type === "image" && item.localFile) {
          const uploaded = await uploadFile(item.localFile);
          const { localFile: _localFile, ...rest } = item;

          nextItems.push({
            ...rest,
            imageId: uploaded.id,
            imageUrl: uploaded.url,
            storageKey: uploaded.storageKey,
          });
        } else {
          nextItems.push(item);
        }
      }

      nextSections.push({
        ...section,
        items: nextItems,
      });
    }

    return nextSections;
  }

  async function searchWorlds(
    query: string,
    setter: (items: SearchLinkItem[]) => void
  ) {
    if (!query.trim()) {
      setter([]);
      return;
    }

    const response = await fetch(
      `/api/world-entries/search?q=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
      setter([]);
      return;
    }

    const data = await response.json();
    setter(data.results ?? []);
  }

  async function searchLocations(
    query: string,
    setter: (items: SearchLinkItem[]) => void
  ) {
    if (!query.trim()) {
      setter([]);
      return;
    }

    const response = await fetch(
      `/api/location-parents/search?q=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
      setter([]);
      return;
    }

    const data = await response.json();
    const onlyLocations = (data.results ?? []).filter(
      (item: { kind: string }) => item.kind === "LOCATION"
    );
    setter(onlyLocations);
  }

  function handleCoverSelection(file: File | null) {
    if (!file) return;

    if (coverPreview) {
      URL.revokeObjectURL(coverPreview);
    }

    const preview = URL.createObjectURL(file);
    setCoverFile(file);
    setCoverPreview(preview);
  }

  async function submitLorebook() {
    if (!title.trim() || !slug || !coverFile) {
      alert("Title and cover are required.");
      return;
    }

    setSaving(true);

    try {
      const uploadedCover = await uploadFile(coverFile);
      const uploadedSections = await uploadSectionsImages(sections);

      const payload: LorebookCreatePayload = {
        title,
        slug,
        description,
        visibilityStatus,
        isPublished: visibilityStatus === "PUBLISHED",
        coverImage: uploadedCover,
        contentSections: uploadedSections,
        linkedWorldIds: linkedWorlds.map((item) => item.id),
        linkedLocationIds: linkedLocations.map((item) => item.id),
        linkedCharacterIds: [],
      };

      const response = await fetch("/api/lorebooks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to create lorebook");
      }

      window.location.href = "/universe/lorebook";
    } catch (error) {
      console.error(error);
      alert("Failed to create lorebook.");
    } finally {
      setSaving(false);
    }
  }

  async function submitNovel() {
    if (!title.trim() || !slug || !authorName.trim() || !coverFile) {
      alert("Title, author name, and cover are required.");
      return;
    }

    setSaving(true);

    try {
      const uploadedCover = await uploadFile(coverFile);

      const payload: NovelCreatePayload = {
        title,
        slug,
        authorName,
        summary,
        visibilityStatus,
        isPublished: visibilityStatus === "PUBLISHED",
        coverImage: uploadedCover,
        tags,
        linkedWorldId: linkedNovelWorld?.id ?? null,
      };

      const response = await fetch("/api/novels", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to create novel");
      }

      window.location.href = "/universe/lorebook";
    } catch (error) {
      console.error(error);
      alert("Failed to create novel.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[30px] border border-white/10 bg-black/25 p-4 backdrop-blur-xl">
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            disabled={pageMode !== "create"}
            onClick={() => setMode("lorebook")}
            className={`rounded-2xl px-5 py-3 text-sm font-bold transition ${
              mode === "lorebook"
                ? "border border-cyan-300/20 bg-cyan-400/10 text-cyan-100"
                : "border border-white/10 bg-white/5 text-white/70"
            } ${pageMode !== "create" ? "cursor-not-allowed opacity-70" : ""}`}
          >
            Lorebook
          </button>

          <button
            type="button"
            disabled={pageMode !== "create"}
            onClick={() => setMode("novel")}
            className={`rounded-2xl px-5 py-3 text-sm font-bold transition ${
              mode === "novel"
                ? "border border-fuchsia-300/20 bg-fuchsia-400/10 text-fuchsia-100"
                : "border border-white/10 bg-white/5 text-white/70"
            } ${pageMode !== "create" ? "cursor-not-allowed opacity-70" : ""}`}
          >
            Novel
          </button>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-6">
          <section className="rounded-[30px] border border-white/10 bg-black/25 p-6 backdrop-blur-xl">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-white/75">
                  Title
                </label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-white/75">
                  Slug
                </label>
                <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-cyan-100">
                  {slug || "Slug will appear here"}
                </div>
              </div>

              {mode === "lorebook" ? (
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-white/75">
                    Small Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
                  />
                </div>
              ) : (
                <>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-white/75">
                      Author Name
                    </label>
                    <input
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-white/75">
                      Visibility
                    </label>
                    <select
                      value={visibilityStatus}
                      onChange={(e) =>
                        setVisibilityStatus(
                          e.target.value as ArchiveVisibilityStatusValue
                        )
                      }
                      className="form-select-dark w-full rounded-2xl px-4 py-3 text-white outline-none"
                    >
                      <option value="DRAFT">Draft</option>
                      <option value="PUBLISHED">Published</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-semibold text-white/75">
                      Summary
                    </label>
                    <textarea
                      value={summary}
                      onChange={(e) => setSummary(e.target.value)}
                      rows={5}
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-semibold text-white/75">
                      Tags
                    </label>

                    <div className="flex gap-2">
                      <input
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        className="flex-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
                        placeholder="Add a tag"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const clean = tagInput.trim();
                          if (!clean) return;
                          if (!tags.includes(clean)) {
                            setTags((prev) => [...prev, clean]);
                          }
                          setTagInput("");
                        }}
                        className="rounded-2xl border border-fuchsia-300/20 bg-fuchsia-400/10 px-4 py-3 text-sm font-bold text-fuchsia-100"
                      >
                        Add
                      </button>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() =>
                            setTags((prev) =>
                              prev.filter((item) => item !== tag)
                            )
                          }
                          className="rounded-full border border-fuchsia-300/20 bg-fuchsia-400/10 px-3 py-1.5 text-xs font-semibold text-fuchsia-100"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-semibold text-white/75">
                      Linked World / Installment (optional)
                    </label>

                    <input
                      value={linkedNovelWorldSearch}
                      onChange={async (e) => {
                        setLinkedNovelWorldSearch(e.target.value);
                        await searchWorlds(
                          e.target.value,
                          setLinkedNovelWorldResults
                        );
                      }}
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
                      placeholder="Search world entries..."
                    />

                    <div className="mt-3 space-y-2">
                      {linkedNovelWorldResults.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => {
                            setLinkedNovelWorld(item);
                            setLinkedNovelWorldResults([]);
                            setLinkedNovelWorldSearch(item.name);
                          }}
                          className="block w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-white/75"
                        >
                          {item.name} — {item.type}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {mode === "lorebook" ? (
                <>
                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-semibold text-white/75">
                      Visibility
                    </label>
                    <select
                      value={visibilityStatus}
                      onChange={(e) =>
                        setVisibilityStatus(
                          e.target.value as ArchiveVisibilityStatusValue
                        )
                      }
                      className="form-select-dark w-full rounded-2xl px-4 py-3 text-white outline-none"
                    >
                      <option value="DRAFT">Draft</option>
                      <option value="PUBLISHED">Published</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-semibold text-white/75">
                      Linked Worlds
                    </label>

                    <input
                      value={linkedWorldSearch}
                      onChange={async (e) => {
                        setLinkedWorldSearch(e.target.value);
                        await searchWorlds(e.target.value, setLinkedWorldResults);
                      }}
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
                      placeholder="Search worlds..."
                    />

                    <div className="mt-3 space-y-2">
                      {linkedWorldResults.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => {
                            if (!linkedWorlds.some((entry) => entry.id === item.id)) {
                              setLinkedWorlds((prev) => [...prev, item]);
                            }
                            setLinkedWorldSearch("");
                            setLinkedWorldResults([]);
                          }}
                          className="block w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-white/75"
                        >
                          {item.name} — {item.type}
                        </button>
                      ))}
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {linkedWorlds.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() =>
                            setLinkedWorlds((prev) =>
                              prev.filter((entry) => entry.id !== item.id)
                            )
                          }
                          className="rounded-full border border-cyan-300/20 bg-cyan-400/10 px-3 py-1.5 text-xs font-semibold text-cyan-100"
                        >
                          {item.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-semibold text-white/75">
                      Linked Locations
                    </label>

                    <input
                      value={linkedLocationSearch}
                      onChange={async (e) => {
                        setLinkedLocationSearch(e.target.value);
                        await searchLocations(
                          e.target.value,
                          setLinkedLocationResults
                        );
                      }}
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
                      placeholder="Search locations..."
                    />

                    <div className="mt-3 space-y-2">
                      {linkedLocationResults.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => {
                            if (
                              !linkedLocations.some(
                                (entry) => entry.id === item.id
                              )
                            ) {
                              setLinkedLocations((prev) => [...prev, item]);
                            }
                            setLinkedLocationSearch("");
                            setLinkedLocationResults([]);
                          }}
                          className="block w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-white/75"
                        >
                          {item.name}
                        </button>
                      ))}
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {linkedLocations.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() =>
                            setLinkedLocations((prev) =>
                              prev.filter((entry) => entry.id !== item.id)
                            )
                          }
                          className="rounded-full border border-fuchsia-300/20 bg-fuchsia-400/10 px-3 py-1.5 text-xs font-semibold text-fuchsia-100"
                        >
                          {item.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              ) : null}
            </div>
          </section>

          {mode === "lorebook" ? (
            <LorebookSectionsEditor sections={sections} onChange={setSections} />
          ) : null}
        </div>

        <div className="space-y-6">
          <section className="rounded-[30px] border border-white/10 bg-black/25 p-6 backdrop-blur-xl">
            <h2 className="text-2xl font-black text-white">
              {mode === "lorebook" ? "Lorebook Cover" : "Novel Cover"}
            </h2>

            <div className="mt-5">
              <input
                ref={coverInputRef}
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handleCoverSelection(e.target.files?.[0] ?? null)
                }
                className="hidden"
              />

              <button
                type="button"
                onClick={() => coverInputRef.current?.click()}
                className="group flex min-h-[280px] w-full flex-col items-center justify-center rounded-[24px] border border-dashed border-cyan-300/25 bg-cyan-400/5 p-6 text-center transition hover:border-cyan-300/45 hover:bg-cyan-400/10"
              >
                {coverPreview ? (
                  <div className="w-full">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={coverPreview}
                      alt="Archive cover preview"
                      className="mx-auto max-h-[320px] rounded-2xl object-contain"
                    />
                    <p className="mt-4 text-sm font-semibold text-cyan-100">
                      {coverFile?.name ?? "Current cover"}
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="mb-4 text-lg font-black text-cyan-100">
                      Add Cover
                    </div>
                    <p className="max-w-sm text-sm leading-6 text-white/60">
                      Select the main cover image. It uploads only when you save.
                    </p>
                  </>
                )}
              </button>
            </div>
          </section>

          {pageMode === "edit-novel" && initialNovel ? (
            <section className="rounded-[30px] border border-white/10 bg-black/25 p-6 backdrop-blur-xl">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-2xl font-black text-white">Chapters</h2>

                <Link
                  href={`/universe/lorebook/edit/novel/${initialNovel.slug}/chapters/new`}
                  className="rounded-2xl border border-fuchsia-300/20 bg-fuchsia-400/10 px-5 py-3 text-sm font-bold text-fuchsia-100"
                >
                  Create New Chapter
                </Link>
              </div>

              <div className="mt-5 space-y-4">
                {initialNovel.chapters.length > 0 ? (
                  initialNovel.chapters.map((chapter) => (
                    <div
                      key={chapter.id}
                      className="flex flex-col gap-4 rounded-[24px] border border-white/10 bg-black/20 p-4 md:flex-row md:items-center md:justify-between"
                    >
                      <div>
                        <div className="text-[11px] font-black uppercase tracking-[0.18em] text-fuchsia-100">
                          Chapter {chapter.orderIndex}
                        </div>
                        <div className="mt-2 text-lg font-black text-white">
                          {chapter.title}
                        </div>
                        {chapter.subtitle ? (
                          <div className="mt-1 text-sm text-white/60">
                            {chapter.subtitle}
                          </div>
                        ) : null}
                        <div className="mt-2 text-[11px] uppercase tracking-[0.16em] text-white/40">
                          {chapter.status}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <Link
                          href={`/universe/lorebook/edit/novel/${initialNovel.slug}/chapters/${chapter.slug}`}
                          className="rounded-xl border border-cyan-300/20 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-100"
                        >
                          Edit
                        </Link>

                        <button
                          type="button"
                          onClick={async () => {
                            const confirmed = window.confirm(
                              `Delete chapter "${chapter.title}"?`
                            );
                            if (!confirmed) return;

                            const response = await fetch(
                              `/api/novels/${initialNovel.slug}/chapters/${chapter.slug}`,
                              {
                                method: "DELETE",
                              }
                            );

                            if (!response.ok) {
                              alert("Failed to delete chapter.");
                              return;
                            }

                            window.location.href = `/universe/lorebook/edit/novel/${initialNovel.slug}`;
                          }}
                          className="rounded-xl border border-rose-300/20 bg-rose-400/10 px-4 py-2 text-sm font-semibold text-rose-100"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-[24px] border border-white/10 bg-black/20 px-4 py-5 text-sm text-white/50">
                    No chapters yet.
                  </div>
                )}
              </div>
            </section>
          ) : null}

          <section className="rounded-[30px] border border-white/10 bg-black/25 p-6 backdrop-blur-xl">
            <h2 className="text-2xl font-black text-white">
              {pageMode === "edit-lorebook"
                ? "Save Lorebook Changes"
                : pageMode === "edit-novel"
                  ? "Save Novel Changes"
                  : "Save"}
            </h2>

            <div className="mt-5 flex flex-wrap gap-3">
              {pageMode === "edit-lorebook" ? (
                <>
                  <button
                    type="button"
                    disabled={saving}
                    onClick={() => {
                      console.log("Lorebook PATCH will go here next step");
                    }}
                    className="rounded-2xl border border-emerald-300/20 bg-emerald-400/10 px-5 py-3 text-sm font-bold text-emerald-100 disabled:opacity-40"
                  >
                    Save Lorebook
                  </button>

                  <button
                    type="button"
                    disabled={saving || !initialLorebook}
                    onClick={async () => {
                      if (!initialLorebook) return;

                      const confirmed = window.confirm(
                        "Are you sure you want to permanently delete this lorebook?"
                      );
                      if (!confirmed) return;

                      const response = await fetch(
                        `/api/lorebooks/${initialLorebook.slug}`,
                        {
                          method: "DELETE",
                        }
                      );

                      if (!response.ok) {
                        alert("Failed to delete lorebook.");
                        return;
                      }

                      window.location.href = "/universe/lorebook/manage";
                    }}
                    className="rounded-2xl border border-rose-300/20 bg-rose-400/10 px-5 py-3 text-sm font-bold text-rose-100 disabled:opacity-40"
                  >
                    Delete
                  </button>
                </>
              ) : pageMode === "edit-novel" ? (
                <>
                  <button
                    type="button"
                    disabled={saving}
                    onClick={() => {
                      console.log("Novel PATCH will go here next step");
                    }}
                    className="rounded-2xl border border-emerald-300/20 bg-emerald-400/10 px-5 py-3 text-sm font-bold text-emerald-100 disabled:opacity-40"
                  >
                    Save Novel
                  </button>

                  <button
                    type="button"
                    disabled={saving || !initialNovel}
                    onClick={async () => {
                      if (!initialNovel) return;

                      const confirmed = window.confirm(
                        "Are you sure you want to permanently delete this novel?"
                      );
                      if (!confirmed) return;

                      const response = await fetch(`/api/novels/${initialNovel.slug}`, {
                        method: "DELETE",
                      });

                      if (!response.ok) {
                        alert("Failed to delete novel.");
                        return;
                      }

                      window.location.href = "/universe/lorebook/manage";
                    }}
                    className="rounded-2xl border border-rose-300/20 bg-rose-400/10 px-5 py-3 text-sm font-bold text-rose-100 disabled:opacity-40"
                  >
                    Delete
                  </button>
                </>
              ) : mode === "lorebook" ? (
                <button
                  type="button"
                  disabled={saving}
                  onClick={submitLorebook}
                  className="rounded-2xl border border-emerald-300/20 bg-emerald-400/10 px-5 py-3 text-sm font-bold text-emerald-100 disabled:opacity-40"
                >
                  Create Lorebook
                </button>
              ) : (
                <button
                  type="button"
                  disabled={saving}
                  onClick={submitNovel}
                  className="rounded-2xl border border-emerald-300/20 bg-emerald-400/10 px-5 py-3 text-sm font-bold text-emerald-100 disabled:opacity-40"
                >
                  Create Novel
                </button>
              )}
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}