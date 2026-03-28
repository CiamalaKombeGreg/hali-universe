"use client";

import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import type {
  ContentSection,
  ImageBlock,
  ListBlock,
  SectionItem,
  TableBlock,
  TextBlock,
} from "./abilityEditorTypes";

function uid() {
  return crypto.randomUUID();
}

type Props = {
  sections: ContentSection[];
  onChange: (sections: ContentSection[]) => void;
};

export default function DescriptionSectionsEditor({
  sections,
  onChange,
}: Props) {
  function createTextItem(): TextBlock {
    return {
      id: uid(),
      type: "text",
      parts: [
        {
          id: uid(),
          text: "",
          bold: false,
          underline: false,
        },
      ],
    };
  }

  function createListItem(): ListBlock {
    return {
      id: uid(),
      type: "list",
      items: [
        {
          id: uid(),
          parts: [
            {
              id: uid(),
              text: "",
              bold: false,
              underline: false,
            },
          ],
        },
      ],
    };
  }

  function createImageItem(): ImageBlock {
    return {
      id: uid(),
      type: "image",
      imageId: "",
      imageUrl: "",
      caption: "",
      framed: true,
      localFile: null,
    };
  }

  function createTableItem(): TableBlock {
    return {
      id: uid(),
      type: "table",
      rows: 2,
      cols: 2,
      cells: Array.from({ length: 2 }, () =>
        Array.from({ length: 2 }, () => ({
          id: uid(),
          kind: "value" as const,
          value: "",
        }))
      ),
    };
  }

  function createSubtitleItem(): SectionItem {
    return {
      id: uid(),
      type: "subtitle",
      text: "",
    };
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

  function updateSection(
    sectionId: string,
    updater: (section: ContentSection) => ContentSection
  ) {
    onChange(
      sections.map((section) =>
        section.id === sectionId ? updater(section) : section
      )
    );
  }

  function removeSection(sectionId: string) {
    onChange(sections.filter((section) => section.id !== sectionId));
  }

  function addItem(sectionId: string, type: SectionItem["type"]) {
    const item =
      type === "text"
        ? createTextItem()
        : type === "list"
          ? createListItem()
          : type === "image"
            ? createImageItem()
            : type === "table"
              ? createTableItem()
              : createSubtitleItem();

    updateSection(sectionId, (section) => ({
      ...section,
      items: [...section.items, item],
    }));
  }

  function removeItem(sectionId: string, itemId: string) {
    updateSection(sectionId, (section) => ({
      ...section,
      items: section.items.filter((item) => item.id !== itemId),
    }));
  }

  function moveItem(sectionId: string, itemId: string, direction: "up" | "down") {
    updateSection(sectionId, (section) => {
      const index = section.items.findIndex((item) => item.id === itemId);
      if (index === -1) return section;

      const targetIndex = direction === "up" ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= section.items.length) return section;

      const nextItems = [...section.items];
      const [moved] = nextItems.splice(index, 1);
      nextItems.splice(targetIndex, 0, moved);

      return {
        ...section,
        items: nextItems,
      };
    });
  }

  function updateItem(
    sectionId: string,
    itemId: string,
    updater: (item: SectionItem) => SectionItem
  ) {
    updateSection(sectionId, (section) => ({
      ...section,
      items: section.items.map((item) =>
        item.id === itemId ? updater(item) : item
      ),
    }));
  }

  function resizeTable(block: TableBlock, rows: number, cols: number): TableBlock {
    const nextCells = Array.from({ length: rows }, (_, r) =>
      Array.from({ length: cols }, (_, c) => {
        return (
          block.cells[r]?.[c] ?? { id: uid(), kind: "value" as const, value: "" }
        );
      })
    );

    return {
      ...block,
      rows,
      cols,
      cells: nextCells,
    };
  }

  return (
    <section className="rounded-[28px] border border-white/10 bg-black/20 p-5">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-black text-white">Description sections</h3>
          <p className="mt-2 text-sm leading-6 text-white/60">
            Build the page section by section. Each section has a title, then its own
            text, subtitles, lists, images, and tables.
          </p>
        </div>
      </div>

      <div className="mb-5">
        <button
          type="button"
          onClick={addSection}
          className="inline-flex items-center gap-2 rounded-xl border border-cyan-300/20 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-400/20"
        >
          <Plus className="h-4 w-4" />
          Add section
        </button>
      </div>

      <div className="space-y-6">
        {sections.map((section, sectionIndex) => (
          <div
            key={section.id}
            className="rounded-[24px] border border-white/10 bg-white/5 p-5"
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="text-sm font-bold uppercase tracking-[0.16em] text-white/65">
                Section {sectionIndex + 1}
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
              {(["subtitle", "text", "list", "image", "table"] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => addItem(section.id, type)}
                  className="inline-flex items-center gap-2 rounded-xl border border-cyan-300/20 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-400/20"
                >
                  <Plus className="h-4 w-4" />
                  Add {type}
                </button>
              ))}
            </div>

            <div className="mt-5 space-y-5">
              {section.items.map((item, itemIndex) => (
                <div
                  key={item.id}
                  className="rounded-[20px] border border-white/10 bg-black/20 p-4"
                >
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div className="text-xs font-bold uppercase tracking-[0.14em] text-white/45">
                      Item {itemIndex + 1} — {item.type}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => moveItem(section.id, item.id, "up")}
                        disabled={itemIndex === 0}
                        className="rounded-lg border border-white/10 bg-white/5 p-2 text-white/75 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
                        title="Move up"
                      >
                        <ArrowUp className="h-4 w-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => moveItem(section.id, item.id, "down")}
                        disabled={itemIndex === section.items.length - 1}
                        className="rounded-lg border border-white/10 bg-white/5 p-2 text-white/75 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
                        title="Move down"
                      >
                        <ArrowDown className="h-4 w-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => removeItem(section.id, item.id)}
                        className="rounded-lg border border-rose-300/20 bg-rose-400/10 px-2 py-1 text-[11px] font-semibold text-rose-100 transition hover:bg-rose-400/20"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  {item.type === "subtitle" && (
                    <input
                      type="text"
                      value={item.text}
                      onChange={(e) =>
                        updateItem(section.id, item.id, (current) => ({
                          ...(current as SectionItem & { type: "subtitle"; text: string }),
                          text: e.target.value,
                        }))
                      }
                      className="w-full rounded-xl border border-white/10 bg-[#101726] px-4 py-3 text-sm text-white outline-none"
                      placeholder="Subtitle text"
                    />
                  )}

                  {item.type === "text" && (
                    <div className="space-y-4">
                      {item.parts.map((part, partIndex) => (
                        <div
                          key={part.id}
                          className="rounded-xl border border-white/10 bg-[#101726] p-4"
                        >
                          <div className="mb-3 flex items-center justify-between">
                            <span className="text-xs font-bold uppercase tracking-[0.14em] text-white/45">
                              Text part {partIndex + 1}
                            </span>

                            {item.parts.length > 1 ? (
                              <button
                                type="button"
                                onClick={() =>
                                  updateItem(section.id, item.id, (current) => ({
                                    ...(current as TextBlock),
                                    parts: (current as TextBlock).parts.filter(
                                      (p) => p.id !== part.id
                                    ),
                                  }))
                                }
                                className="rounded-lg border border-rose-300/20 bg-rose-400/10 px-2 py-1 text-[11px] font-semibold text-rose-100 transition hover:bg-rose-400/20"
                              >
                                Remove
                              </button>
                            ) : null}
                          </div>

                          <textarea
                            value={part.text}
                            onChange={(e) =>
                              updateItem(section.id, item.id, (current) => ({
                                ...(current as TextBlock),
                                parts: (current as TextBlock).parts.map((p) =>
                                  p.id === part.id
                                    ? { ...p, text: e.target.value }
                                    : p
                                ),
                              }))
                            }
                            rows={3}
                            className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none"
                            placeholder="Write this text fragment..."
                          />

                          <div className="mt-4 grid gap-4 md:grid-cols-4">
                            <label className="flex items-center gap-2 text-sm text-white/75">
                              <input
                                type="checkbox"
                                checked={Boolean(part.bold)}
                                onChange={(e) =>
                                  updateItem(section.id, item.id, (current) => ({
                                    ...(current as TextBlock),
                                    parts: (current as TextBlock).parts.map((p) =>
                                      p.id === part.id
                                        ? { ...p, bold: e.target.checked }
                                        : p
                                    ),
                                  }))
                                }
                              />
                              Bold
                            </label>

                            <label className="flex items-center gap-2 text-sm text-white/75">
                              <input
                                type="checkbox"
                                checked={Boolean(part.underline)}
                                onChange={(e) =>
                                  updateItem(section.id, item.id, (current) => ({
                                    ...(current as TextBlock),
                                    parts: (current as TextBlock).parts.map((p) =>
                                      p.id === part.id
                                        ? { ...p, underline: e.target.checked }
                                        : p
                                    ),
                                  }))
                                }
                              />
                              Underline
                            </label>

                            <input
                              type="text"
                              value={part.referenceLabel ?? ""}
                              onChange={(e) =>
                                updateItem(section.id, item.id, (current) => ({
                                  ...(current as TextBlock),
                                  parts: (current as TextBlock).parts.map((p) =>
                                    p.id === part.id
                                      ? { ...p, referenceLabel: e.target.value }
                                      : p
                                  ),
                                }))
                              }
                              className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white outline-none"
                              placeholder="Link text"
                            />

                            <input
                              type="text"
                              value={part.referencePath ?? ""}
                              onChange={(e) =>
                                updateItem(section.id, item.id, (current) => ({
                                  ...(current as TextBlock),
                                  parts: (current as TextBlock).parts.map((p) =>
                                    p.id === part.id
                                      ? {
                                          ...p,
                                          referenceType: "PAGE",
                                          referencePath: e.target.value,
                                        }
                                      : p
                                  ),
                                }))
                              }
                              className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white outline-none"
                              placeholder="Internal path / future picker"
                            />
                          </div>
                        </div>
                      ))}

                      <button
                        type="button"
                        onClick={() =>
                          updateItem(section.id, item.id, (current) => ({
                            ...(current as TextBlock),
                            parts: [
                              ...(current as TextBlock).parts,
                              {
                                id: uid(),
                                text: "",
                                bold: false,
                                underline: false,
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

                  {item.type === "list" && (
                    <div className="space-y-4">
                      {item.items.map((listItem, listItemIndex) => (
                        <div
                          key={listItem.id}
                          className="rounded-xl border border-white/10 bg-[#101726] p-4"
                        >
                          <div className="mb-3 flex items-center justify-between">
                            <span className="text-xs font-bold uppercase tracking-[0.14em] text-white/45">
                              List item {listItemIndex + 1}
                            </span>

                            {item.items.length > 1 ? (
                              <button
                                type="button"
                                onClick={() =>
                                  updateItem(section.id, item.id, (current) => ({
                                    ...(current as ListBlock),
                                    items: (current as ListBlock).items.filter(
                                      (entry) => entry.id !== listItem.id
                                    ),
                                  }))
                                }
                                className="rounded-lg border border-rose-300/20 bg-rose-400/10 px-2 py-1 text-[11px] font-semibold text-rose-100 transition hover:bg-rose-400/20"
                              >
                                Remove
                              </button>
                            ) : null}
                          </div>

                          <div className="space-y-3">
                            {listItem.parts.map((part, partIndex) => (
                              <div
                                key={part.id}
                                className="rounded-xl border border-white/10 bg-black/20 p-3"
                              >
                                <div className="mb-2 flex items-center justify-between">
                                  <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/40">
                                    Part {partIndex + 1}
                                  </span>

                                  {listItem.parts.length > 1 ? (
                                    <button
                                      type="button"
                                      onClick={() =>
                                        updateItem(section.id, item.id, (current) => ({
                                          ...(current as ListBlock),
                                          items: (current as ListBlock).items.map(
                                            (entry) =>
                                              entry.id === listItem.id
                                                ? {
                                                    ...entry,
                                                    parts: entry.parts.filter(
                                                      (p) => p.id !== part.id
                                                    ),
                                                  }
                                                : entry
                                          ),
                                        }))
                                      }
                                      className="rounded-lg border border-rose-300/20 bg-rose-400/10 px-2 py-1 text-[10px] font-semibold text-rose-100 transition hover:bg-rose-400/20"
                                    >
                                      Remove part
                                    </button>
                                  ) : null}
                                </div>

                                <textarea
                                  value={part.text}
                                  onChange={(e) =>
                                    updateItem(section.id, item.id, (current) => ({
                                      ...(current as ListBlock),
                                      items: (current as ListBlock).items.map((entry) =>
                                        entry.id === listItem.id
                                          ? {
                                              ...entry,
                                              parts: entry.parts.map((p) =>
                                                p.id === part.id
                                                  ? { ...p, text: e.target.value }
                                                  : p
                                              ),
                                            }
                                          : entry
                                      ),
                                    }))
                                  }
                                  rows={2}
                                  className="w-full rounded-xl border border-white/10 bg-[#101726] px-4 py-3 text-sm text-white outline-none"
                                  placeholder="Write this list fragment..."
                                />

                                <div className="mt-3 grid gap-4 md:grid-cols-4">
                                  <label className="flex items-center gap-2 text-sm text-white/75">
                                    <input
                                      type="checkbox"
                                      checked={Boolean(part.bold)}
                                      onChange={(e) =>
                                        updateItem(section.id, item.id, (current) => ({
                                          ...(current as ListBlock),
                                          items: (current as ListBlock).items.map((entry) =>
                                            entry.id === listItem.id
                                              ? {
                                                  ...entry,
                                                  parts: entry.parts.map((p) =>
                                                    p.id === part.id
                                                      ? { ...p, bold: e.target.checked }
                                                      : p
                                                  ),
                                                }
                                              : entry
                                          ),
                                        }))
                                      }
                                    />
                                    Bold
                                  </label>

                                  <label className="flex items-center gap-2 text-sm text-white/75">
                                    <input
                                      type="checkbox"
                                      checked={Boolean(part.underline)}
                                      onChange={(e) =>
                                        updateItem(section.id, item.id, (current) => ({
                                          ...(current as ListBlock),
                                          items: (current as ListBlock).items.map((entry) =>
                                            entry.id === listItem.id
                                              ? {
                                                  ...entry,
                                                  parts: entry.parts.map((p) =>
                                                    p.id === part.id
                                                      ? {
                                                          ...p,
                                                          underline: e.target.checked,
                                                        }
                                                      : p
                                                  ),
                                                }
                                              : entry
                                          ),
                                        }))
                                      }
                                    />
                                    Underline
                                  </label>

                                  <input
                                    type="text"
                                    value={part.referenceLabel ?? ""}
                                    onChange={(e) =>
                                      updateItem(section.id, item.id, (current) => ({
                                        ...(current as ListBlock),
                                        items: (current as ListBlock).items.map((entry) =>
                                          entry.id === listItem.id
                                            ? {
                                                ...entry,
                                                parts: entry.parts.map((p) =>
                                                  p.id === part.id
                                                    ? {
                                                        ...p,
                                                        referenceLabel: e.target.value,
                                                      }
                                                    : p
                                                ),
                                              }
                                            : entry
                                        ),
                                      }))
                                    }
                                    className="rounded-xl border border-white/10 bg-[#101726] px-3 py-2 text-sm text-white outline-none"
                                    placeholder="Link text"
                                  />

                                  <input
                                    type="text"
                                    value={part.referencePath ?? ""}
                                    onChange={(e) =>
                                      updateItem(section.id, item.id, (current) => ({
                                        ...(current as ListBlock),
                                        items: (current as ListBlock).items.map((entry) =>
                                          entry.id === listItem.id
                                            ? {
                                                ...entry,
                                                parts: entry.parts.map((p) =>
                                                  p.id === part.id
                                                    ? {
                                                        ...p,
                                                        referenceType: "PAGE",
                                                        referencePath: e.target.value,
                                                      }
                                                    : p
                                                ),
                                              }
                                            : entry
                                        ),
                                      }))
                                    }
                                    className="rounded-xl border border-white/10 bg-[#101726] px-3 py-2 text-sm text-white outline-none"
                                    placeholder="Internal path / future picker"
                                  />
                                </div>
                              </div>
                            ))}
                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              updateItem(section.id, item.id, (current) => ({
                                ...(current as ListBlock),
                                items: (current as ListBlock).items.map((entry) =>
                                  entry.id === listItem.id
                                    ? {
                                        ...entry,
                                        parts: [
                                          ...entry.parts,
                                          {
                                            id: uid(),
                                            text: "",
                                            bold: false,
                                            underline: false,
                                          },
                                        ],
                                      }
                                    : entry
                                ),
                              }))
                            }
                            className="mt-3 rounded-xl border border-cyan-300/20 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-100"
                          >
                            Add text part
                          </button>
                        </div>
                      ))}

                      <button
                        type="button"
                        onClick={() =>
                          updateItem(section.id, item.id, (current) => ({
                            ...(current as ListBlock),
                            items: [
                              ...(current as ListBlock).items,
                              {
                                id: uid(),
                                parts: [
                                  {
                                    id: uid(),
                                    text: "",
                                    bold: false,
                                    underline: false,
                                  },
                                ],
                              },
                            ],
                          }))
                        }
                        className="rounded-xl border border-cyan-300/20 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-100"
                      >
                        Add list item
                      </button>
                    </div>
                  )}

                  {item.type === "image" && (
                    <div className="space-y-4">
                      <label className="block text-sm font-semibold text-white/75">
                        Section image
                      </label>

                      <div
                        onDragOver={(e) => {
                          e.preventDefault();
                        }}
                        onDrop={(e) => {
                          e.preventDefault();
                          const file = e.dataTransfer.files?.[0] ?? null;
                          if (!file) return;

                          const preview = URL.createObjectURL(file);

                          updateItem(section.id, item.id, (current) => ({
                            ...(current as ImageBlock),
                            localFile: file,
                            imageUrl: preview,
                            imageId: (current as ImageBlock).imageId || uid(),
                          }));
                        }}
                        className="rounded-[24px] border border-dashed border-fuchsia-300/25 bg-fuchsia-400/5 p-4 transition hover:border-fuchsia-300/45 hover:bg-fuchsia-400/10"
                      >
                        <input
                          id={`section-image-${item.id}`}
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0] ?? null;
                            if (!file) return;

                            const preview = URL.createObjectURL(file);

                            updateItem(section.id, item.id, (current) => ({
                              ...(current as ImageBlock),
                              localFile: file,
                              imageUrl: preview,
                              imageId: (current as ImageBlock).imageId || uid(),
                            }));
                          }}
                          className="hidden"
                        />

                        <label
                          htmlFor={`section-image-${item.id}`}
                          className="flex min-h-[200px] w-full cursor-pointer flex-col items-center justify-center rounded-[20px] text-center"
                        >
                          {item.imageUrl ? (
                            <div className="w-full">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={item.imageUrl}
                                alt={item.caption || "Section preview"}
                                className="mx-auto max-h-[280px] rounded-2xl object-contain"
                              />
                              <p className="mt-4 text-sm font-semibold text-fuchsia-100">
                                {item.localFile?.name ?? "Existing section image"}
                              </p>
                              <p className="mt-1 text-xs text-white/50">
                                Click or drop another image to replace
                              </p>
                            </div>
                          ) : (
                            <>
                              <div className="mb-4 text-lg font-black text-fuchsia-100">
                                Add Section Image
                              </div>
                              <p className="max-w-sm text-sm leading-6 text-white/60">
                                Click to upload or drag and drop an image directly into this section.
                              </p>
                            </>
                          )}
                        </label>
                      </div>

                      <input
                        type="text"
                        value={item.caption ?? ""}
                        onChange={(e) =>
                          updateItem(section.id, item.id, (current) => ({
                            ...(current as ImageBlock),
                            caption: e.target.value,
                          }))
                        }
                        className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white outline-none"
                        placeholder="Image caption"
                      />

                      <label className="flex items-center gap-2 text-sm text-white/75">
                        <input
                          type="checkbox"
                          checked={item.framed}
                          onChange={(e) =>
                            updateItem(section.id, item.id, (current) => ({
                              ...(current as ImageBlock),
                              framed: e.target.checked,
                            }))
                          }
                        />
                        Framed
                      </label>
                    </div>
                  )}

                  {item.type === "table" && (
                    <div className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <input
                          type="number"
                          min={1}
                          value={item.rows}
                          onChange={(e) =>
                            updateItem(section.id, item.id, (current) =>
                              resizeTable(
                                current as TableBlock,
                                Number(e.target.value) || 1,
                                (current as TableBlock).cols
                              )
                            )
                          }
                          className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white outline-none"
                          placeholder="Rows"
                        />

                        <input
                          type="number"
                          min={1}
                          value={item.cols}
                          onChange={(e) =>
                            updateItem(section.id, item.id, (current) =>
                              resizeTable(
                                current as TableBlock,
                                (current as TableBlock).rows,
                                Number(e.target.value) || 1
                              )
                            )
                          }
                          className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white outline-none"
                          placeholder="Columns"
                        />
                      </div>

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
                                className="rounded-xl border border-white/10 bg-black/20 p-2"
                              >
                                <select
                                  value={cell.kind}
                                  onChange={(e) =>
                                    updateItem(section.id, item.id, (current) => {
                                      const table = current as TableBlock;
                                      return {
                                        ...table,
                                        cells: table.cells.map((existingRow) =>
                                          existingRow.map((existingCell) =>
                                            existingCell.id === cell.id
                                              ? {
                                                  ...existingCell,
                                                  kind: e.target.value as
                                                    | "value"
                                                    | "empty",
                                                  value:
                                                    e.target.value === "empty"
                                                      ? ""
                                                      : existingCell.value,
                                                }
                                              : existingCell
                                          )
                                        ),
                                      };
                                    })
                                  }
                                  className="mb-2 w-full rounded-lg border border-white/10 bg-[#101726] px-2 py-1 text-xs text-white outline-none"
                                >
                                  <option value="value">Value</option>
                                  <option value="empty">Empty</option>
                                </select>

                                <input
                                  type="text"
                                  disabled={cell.kind === "empty"}
                                  value={cell.value}
                                  onChange={(e) =>
                                    updateItem(section.id, item.id, (current) => {
                                      const table = current as TableBlock;
                                      return {
                                        ...table,
                                        cells: table.cells.map((existingRow) =>
                                          existingRow.map((existingCell) =>
                                            existingCell.id === cell.id
                                              ? {
                                                  ...existingCell,
                                                  value: e.target.value,
                                                }
                                              : existingCell
                                          )
                                        ),
                                      };
                                    })
                                  }
                                  className="w-full rounded-lg border border-white/10 bg-[#101726] px-2 py-1 text-xs text-white outline-none disabled:opacity-50"
                                  placeholder="Cell value"
                                />
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
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