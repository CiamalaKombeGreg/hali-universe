"use client";

import { Plus, Trash2 } from "lucide-react";
import type {
  ArchiveImageBlock,
  ArchiveSection,
  ArchiveSectionItem,
  ArchiveTextBlock,
  RichColorValue,
} from "./archiveTypes";

function uid() {
  return crypto.randomUUID();
}

type Props = {
  sections: ArchiveSection[];
  onChange: (sections: ArchiveSection[]) => void;
};

const colorOptions: { value: RichColorValue; label: string }[] = [
  { value: "default", label: "Default" },
  { value: "cyan", label: "Cyan" },
  { value: "fuchsia", label: "Fuchsia" },
  { value: "emerald", label: "Emerald" },
  { value: "amber", label: "Amber" },
  { value: "rose", label: "Rose" },
  { value: "violet", label: "Violet" },
];

function createTextBlock(): ArchiveTextBlock {
  return {
    id: uid(),
    type: "text",
    parts: [
      {
        id: uid(),
        text: "",
        bold: false,
        italic: false,
        underline: false,
        color: "default",
      },
    ],
  };
}

function createImageBlock(): ArchiveImageBlock {
  return {
    id: uid(),
    type: "image",
    imageId: "",
    imageUrl: "",
    caption: "",
    localFile: null,
  };
}

export default function LorebookSectionsEditor({ sections, onChange }: Props) {
  function updateSection(
    sectionId: string,
    updater: (section: ArchiveSection) => ArchiveSection
  ) {
    onChange(
      sections.map((section) =>
        section.id === sectionId ? updater(section) : section
      )
    );
  }

  function addSection() {
    onChange([
      ...sections,
      {
        id: uid(),
        title: "",
        items: [],
      },
    ]);
  }

  function removeSection(sectionId: string) {
    onChange(sections.filter((section) => section.id !== sectionId));
  }

  function addItem(sectionId: string, type: ArchiveSectionItem["type"]) {
    const item = type === "text" ? createTextBlock() : createImageBlock();

    updateSection(sectionId, (section) => ({
      ...section,
      items: [...section.items, item],
    }));
  }

  function updateItem(
    sectionId: string,
    itemId: string,
    updater: (item: ArchiveSectionItem) => ArchiveSectionItem
  ) {
    updateSection(sectionId, (section) => ({
      ...section,
      items: section.items.map((item) =>
        item.id === itemId ? updater(item) : item
      ),
    }));
  }

  function removeItem(sectionId: string, itemId: string) {
    updateSection(sectionId, (section) => ({
      ...section,
      items: section.items.filter((item) => item.id !== itemId),
    }));
  }

  return (
    <section className="rounded-[28px] border border-white/10 bg-black/20 p-5">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-black text-white">Lorebook sections</h3>
          <p className="mt-2 text-sm leading-6 text-white/60">
            Build lorebook sections with rich text and images.
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={addSection}
        className="mb-5 inline-flex items-center gap-2 rounded-xl border border-cyan-300/20 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-400/20"
      >
        <Plus className="h-4 w-4" />
        Add section
      </button>

      <div className="space-y-6">
        {sections.map((section) => (
          <div
            key={section.id}
            className="rounded-[24px] border border-white/10 bg-white/5 p-5"
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="text-sm font-bold uppercase tracking-[0.16em] text-white/65">
                Section
              </div>

              <button
                type="button"
                onClick={() => removeSection(section.id)}
                className="rounded-xl border border-rose-300/20 bg-rose-400/10 p-2 text-rose-200 transition hover:bg-rose-400/20"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            <input
              type="text"
              value={section.title}
              onChange={(e) =>
                updateSection(section.id, (current) => ({
                  ...current,
                  title: e.target.value,
                }))
              }
              className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none"
              placeholder="Section title"
            />

            <div className="mt-4 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => addItem(section.id, "text")}
                className="rounded-xl border border-cyan-300/20 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-100"
              >
                Add text
              </button>

              <button
                type="button"
                onClick={() => addItem(section.id, "image")}
                className="rounded-xl border border-fuchsia-300/20 bg-fuchsia-400/10 px-4 py-2 text-sm font-semibold text-fuchsia-100"
              >
                Add image
              </button>
            </div>

            <div className="mt-5 space-y-5">
              {section.items.map((item) => (
                <div
                  key={item.id}
                  className="rounded-[20px] border border-white/10 bg-black/20 p-4"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div className="text-xs font-bold uppercase tracking-[0.14em] text-white/45">
                      {item.type}
                    </div>

                    <button
                      type="button"
                      onClick={() => removeItem(section.id, item.id)}
                      className="rounded-lg border border-rose-300/20 bg-rose-400/10 px-2 py-1 text-[11px] font-semibold text-rose-100"
                    >
                      Remove
                    </button>
                  </div>

                  {item.type === "text" && (
                    <div className="space-y-4">
                      {item.parts.map((part) => (
                        <div
                          key={part.id}
                          className="rounded-xl border border-white/10 bg-[#101726] p-4"
                        >
                          <textarea
                            value={part.text}
                            onChange={(e) =>
                              updateItem(section.id, item.id, (current) => ({
                                ...(current as ArchiveTextBlock),
                                parts: (current as ArchiveTextBlock).parts.map((p) =>
                                  p.id === part.id ? { ...p, text: e.target.value } : p
                                ),
                              }))
                            }
                            rows={3}
                            className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none"
                            placeholder="Write text..."
                          />

                          <div className="mt-4 grid gap-4 md:grid-cols-5">
                            <label className="flex items-center gap-2 text-sm text-white/75">
                              <input
                                type="checkbox"
                                checked={Boolean(part.bold)}
                                onChange={(e) =>
                                  updateItem(section.id, item.id, (current) => ({
                                    ...(current as ArchiveTextBlock),
                                    parts: (current as ArchiveTextBlock).parts.map((p) =>
                                      p.id === part.id ? { ...p, bold: e.target.checked } : p
                                    ),
                                  }))
                                }
                              />
                              Bold
                            </label>

                            <label className="flex items-center gap-2 text-sm text-white/75">
                              <input
                                type="checkbox"
                                checked={Boolean(part.italic)}
                                onChange={(e) =>
                                  updateItem(section.id, item.id, (current) => ({
                                    ...(current as ArchiveTextBlock),
                                    parts: (current as ArchiveTextBlock).parts.map((p) =>
                                      p.id === part.id ? { ...p, italic: e.target.checked } : p
                                    ),
                                  }))
                                }
                              />
                              Italic
                            </label>

                            <label className="flex items-center gap-2 text-sm text-white/75">
                              <input
                                type="checkbox"
                                checked={Boolean(part.underline)}
                                onChange={(e) =>
                                  updateItem(section.id, item.id, (current) => ({
                                    ...(current as ArchiveTextBlock),
                                    parts: (current as ArchiveTextBlock).parts.map((p) =>
                                      p.id === part.id ? { ...p, underline: e.target.checked } : p
                                    ),
                                  }))
                                }
                              />
                              Underline
                            </label>

                            <select
                              value={part.color ?? "default"}
                              onChange={(e) =>
                                updateItem(section.id, item.id, (current) => ({
                                  ...(current as ArchiveTextBlock),
                                  parts: (current as ArchiveTextBlock).parts.map((p) =>
                                    p.id === part.id
                                      ? { ...p, color: e.target.value as RichColorValue }
                                      : p
                                  ),
                                }))
                              }
                              className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white outline-none"
                            >
                              {colorOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>

                            <input
                              type="text"
                              value={part.referencePath ?? ""}
                              onChange={(e) =>
                                updateItem(section.id, item.id, (current) => ({
                                  ...(current as ArchiveTextBlock),
                                  parts: (current as ArchiveTextBlock).parts.map((p) =>
                                    p.id === part.id
                                      ? { ...p, referencePath: e.target.value }
                                      : p
                                  ),
                                }))
                              }
                              className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white outline-none"
                              placeholder="Internal link path"
                            />
                          </div>
                        </div>
                      ))}

                      <button
                        type="button"
                        onClick={() =>
                          updateItem(section.id, item.id, (current) => ({
                            ...(current as ArchiveTextBlock),
                            parts: [
                              ...(current as ArchiveTextBlock).parts,
                              {
                                id: uid(),
                                text: "",
                                bold: false,
                                italic: false,
                                underline: false,
                                color: "default",
                              },
                            ],
                          }))
                        }
                        className="rounded-xl border border-cyan-300/20 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-100"
                      >
                        Add text part
                      </button>
                    </div>
                  )}

                  {item.type === "image" && (
                    <div className="space-y-4">
                      <input
                        id={`lorebook-image-${item.id}`}
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0] ?? null;
                          if (!file) return;

                          const preview = URL.createObjectURL(file);

                          updateItem(section.id, item.id, (current) => ({
                            ...(current as ArchiveImageBlock),
                            localFile: file,
                            imageUrl: preview,
                            imageId: (current as ArchiveImageBlock).imageId || uid(),
                          }));
                        }}
                        className="hidden"
                      />

                      <label
                        htmlFor={`lorebook-image-${item.id}`}
                        className="flex min-h-[220px] cursor-pointer flex-col items-center justify-center rounded-[24px] border border-dashed border-fuchsia-300/25 bg-fuchsia-400/5 p-6 text-center"
                      >
                        {item.imageUrl ? (
                          <>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={item.imageUrl}
                              alt={item.caption || "Lorebook section image"}
                              className="mx-auto max-h-[260px] rounded-2xl object-contain"
                            />
                            <p className="mt-4 text-sm font-semibold text-fuchsia-100">
                              {item.localFile?.name ?? "Selected image"}
                            </p>
                          </>
                        ) : (
                          <>
                            <div className="text-lg font-black text-fuchsia-100">
                              Add Section Image
                            </div>
                            <p className="mt-2 text-sm text-white/60">
                              Click to choose an image
                            </p>
                          </>
                        )}
                      </label>

                      <input
                        type="text"
                        value={item.caption ?? ""}
                        onChange={(e) =>
                          updateItem(section.id, item.id, (current) => ({
                            ...(current as ArchiveImageBlock),
                            caption: e.target.value,
                          }))
                        }
                        className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none"
                        placeholder="Image caption"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}