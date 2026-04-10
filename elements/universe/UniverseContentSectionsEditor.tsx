"use client";

import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import type {
  UniverseContentSection,
  UniverseImageBlock,
  UniverseListBlock,
  UniverseSectionItem,
  UniverseSubtitleBlock,
  UniverseTableBlock,
  UniverseTableCell,
  UniverseTextBlock,
} from "./universeContentTypes";

function uid() {
  return crypto.randomUUID();
}

type Props = {
  sections: UniverseContentSection[];
  onChange: (sections: UniverseContentSection[]) => void;
};

function createTextItem(): UniverseTextBlock {
  return {
    id: uid(),
    type: "text",
    parts: [
      {
        id: uid(),
        text: "",
        bold: false,
        italic: false,
      },
    ],
  };
}

function createListItem(): UniverseListBlock {
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
            italic: false,
          },
        ],
      },
    ],
  };
}

function createImageItem(): UniverseImageBlock {
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

function createTableCell(): UniverseTableCell {
  return {
    id: uid(),
    kind: "value",
    value: "",
  };
}

function createTableItem(): UniverseTableBlock {
  return {
    id: uid(),
    type: "table",
    rows: 2,
    cols: 2,
    cells: Array.from({ length: 2 }, () =>
      Array.from({ length: 2 }, () => createTableCell())
    ),
  };
}

function createSubtitleItem(): UniverseSubtitleBlock {
  return {
    id: uid(),
    type: "subtitle",
    text: "",
  };
}

export default function UniverseContentSectionsEditor({
  sections,
  onChange,
}: Props) {
  function updateSection(
    sectionId: string,
    updater: (section: UniverseContentSection) => UniverseContentSection
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

  function addItem(sectionId: string, type: UniverseSectionItem["type"]) {
    const item: UniverseSectionItem =
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

  function updateItem(
    sectionId: string,
    itemId: string,
    updater: (item: UniverseSectionItem) => UniverseSectionItem
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

  function resizeTable(
    block: UniverseTableBlock,
    rows: number,
    cols: number
  ): UniverseTableBlock {
    return {
      ...block,
      rows,
      cols,
      cells: Array.from({ length: rows }, (_, r) =>
        Array.from({ length: cols }, (_, c) => {
          return block.cells[r]?.[c] ?? createTableCell();
        })
      ),
    };
  }

  return (
    <section className="rounded-[28px] border border-white/10 bg-black/20 p-5">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-black text-white">Info sections</h3>
          <p className="mt-2 text-sm leading-6 text-white/60">
            Build structured sections with subtitles, text, lists, images, and tables.
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
              {section.items.map((item, index) => (
                <div
                  key={item.id}
                  className="rounded-[20px] border border-white/10 bg-black/20 p-4"
                >
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div className="text-xs font-bold uppercase tracking-[0.14em] text-white/45">
                      Item {index + 1} — {item.type}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => moveItem(section.id, item.id, "up")}
                        disabled={index === 0}
                        className="rounded-lg border border-white/10 bg-white/5 p-2 text-white/75 transition hover:bg-white/10 disabled:opacity-30"
                      >
                        <ArrowUp className="h-4 w-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => moveItem(section.id, item.id, "down")}
                        disabled={index === section.items.length - 1}
                        className="rounded-lg border border-white/10 bg-white/5 p-2 text-white/75 transition hover:bg-white/10 disabled:opacity-30"
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
                          ...(current as UniverseSubtitleBlock),
                          text: e.target.value,
                        }))
                      }
                      className="w-full rounded-xl border border-white/10 bg-[#101726] px-4 py-3 text-sm text-white outline-none"
                      placeholder="Subtitle text"
                    />
                  )}

                  {item.type === "text" && (() => {
                    const textItem = item as UniverseTextBlock;

                    return (
                      <div className="space-y-4">
                        {textItem.parts.map((part) => (
                          <div
                            key={part.id}
                            className="rounded-xl border border-white/10 bg-[#101726] p-4"
                          >
                            <textarea
                              value={part.text}
                              onChange={(e) =>
                                updateItem(section.id, textItem.id, (current) => {
                                  const safe = current as UniverseTextBlock;
                                  return {
                                    ...safe,
                                    parts: safe.parts.map((p) =>
                                      p.id === part.id ? { ...p, text: e.target.value } : p
                                    ),
                                  };
                                })
                              }
                              rows={3}
                              className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none"
                              placeholder="Write text..."
                            />

                            <div className="mt-4 grid gap-4 md:grid-cols-4">
                              <label className="flex items-center gap-2 text-sm text-white/75">
                                <input
                                  type="checkbox"
                                  checked={Boolean(part.bold)}
                                  onChange={(e) =>
                                    updateItem(section.id, textItem.id, (current) => {
                                      const safe = current as UniverseTextBlock;
                                      return {
                                        ...safe,
                                        parts: safe.parts.map((p) =>
                                          p.id === part.id
                                            ? { ...p, bold: e.target.checked }
                                            : p
                                        ),
                                      };
                                    })
                                  }
                                />
                                Bold
                              </label>

                              <label className="flex items-center gap-2 text-sm text-white/75">
                                <input
                                  type="checkbox"
                                  checked={Boolean(part.italic)}
                                  onChange={(e) =>
                                    updateItem(section.id, textItem.id, (current) => {
                                      const safe = current as UniverseTextBlock;
                                      return {
                                        ...safe,
                                        parts: safe.parts.map((p) =>
                                          p.id === part.id
                                            ? { ...p, italic: e.target.checked }
                                            : p
                                        ),
                                      };
                                    })
                                  }
                                />
                                Italic
                              </label>

                              <input
                                type="text"
                                value={part.referenceLabel ?? ""}
                                onChange={(e) =>
                                  updateItem(section.id, textItem.id, (current) => {
                                    const safe = current as UniverseTextBlock;
                                    return {
                                      ...safe,
                                      parts: safe.parts.map((p) =>
                                        p.id === part.id
                                          ? { ...p, referenceLabel: e.target.value }
                                          : p
                                      ),
                                    };
                                  })
                                }
                                className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white outline-none"
                                placeholder="Link text"
                              />

                              <input
                                type="text"
                                value={part.referencePath ?? ""}
                                onChange={(e) =>
                                  updateItem(section.id, textItem.id, (current) => {
                                    const safe = current as UniverseTextBlock;
                                    return {
                                      ...safe,
                                      parts: safe.parts.map((p) =>
                                        p.id === part.id
                                          ? { ...p, referencePath: e.target.value }
                                          : p
                                      ),
                                    };
                                  })
                                }
                                className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white outline-none"
                                placeholder="Internal page path"
                              />
                            </div>
                          </div>
                        ))}

                        <button
                          type="button"
                          onClick={() =>
                            updateItem(section.id, textItem.id, (current) => {
                              const safe = current as UniverseTextBlock;
                              return {
                                ...safe,
                                parts: [
                                  ...safe.parts,
                                  {
                                    id: uid(),
                                    text: "",
                                    bold: false,
                                    italic: false,
                                  },
                                ],
                              };
                            })
                          }
                          className="rounded-xl border border-cyan-300/20 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-100"
                        >
                          Add text part
                        </button>
                      </div>
                    );
                  })()}

                  {item.type === "image" && (() => {
                    const imageItem = item as UniverseImageBlock;

                    return (
                      <div className="space-y-4">
                        <div
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={(e) => {
                            e.preventDefault();
                            const file = e.dataTransfer.files?.[0] ?? null;
                            if (!file) return;

                            const preview = URL.createObjectURL(file);

                            updateItem(section.id, imageItem.id, (current) => ({
                              ...(current as UniverseImageBlock),
                              localFile: file,
                              imageUrl: preview,
                              imageId: (current as UniverseImageBlock).imageId || uid(),
                            }));
                          }}
                          className="rounded-[24px] border border-dashed border-fuchsia-300/25 bg-fuchsia-400/5 p-4 transition hover:border-fuchsia-300/45 hover:bg-fuchsia-400/10"
                        >
                          <input
                            id={`section-image-${imageItem.id}`}
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0] ?? null;
                              if (!file) return;

                              const preview = URL.createObjectURL(file);

                              updateItem(section.id, imageItem.id, (current) => ({
                                ...(current as UniverseImageBlock),
                                localFile: file,
                                imageUrl: preview,
                                imageId: (current as UniverseImageBlock).imageId || uid(),
                              }));
                            }}
                            className="hidden"
                          />

                          <label
                            htmlFor={`section-image-${imageItem.id}`}
                            className="flex min-h-[200px] w-full cursor-pointer flex-col items-center justify-center rounded-[20px] text-center"
                          >
                            {imageItem.imageUrl ? (
                              <div className="w-full">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={imageItem.imageUrl}
                                  alt={imageItem.caption || "Section preview"}
                                  className="mx-auto max-h-[280px] rounded-2xl object-contain"
                                />
                                <p className="mt-4 text-sm font-semibold text-fuchsia-100">
                                  {imageItem.localFile?.name ?? "Existing section image"}
                                </p>
                              </div>
                            ) : (
                              <>
                                <div className="mb-4 text-lg font-black text-fuchsia-100">
                                  Add Section Image
                                </div>
                                <p className="max-w-sm text-sm leading-6 text-white/60">
                                  Click or drag and drop an image.
                                </p>
                              </>
                            )}
                          </label>
                        </div>

                        <input
                          type="text"
                          value={imageItem.caption ?? ""}
                          onChange={(e) =>
                            updateItem(section.id, imageItem.id, (current) => ({
                              ...(current as UniverseImageBlock),
                              caption: e.target.value,
                            }))
                          }
                          className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white outline-none"
                          placeholder="Image caption"
                        />

                        <label className="flex items-center gap-2 text-sm text-white/75">
                          <input
                            type="checkbox"
                            checked={imageItem.framed}
                            onChange={(e) =>
                              updateItem(section.id, imageItem.id, (current) => ({
                                ...(current as UniverseImageBlock),
                                framed: e.target.checked,
                              }))
                            }
                          />
                          Framed
                        </label>
                      </div>
                    );
                  })()}

                  {item.type === "list" && (() => {
                    const listItemBlock = item as UniverseListBlock;

                    return (
                      <div className="space-y-4">
                        {listItemBlock.items.map((listItem) => (
                          <div
                            key={listItem.id}
                            className="rounded-xl border border-white/10 bg-[#101726] p-4"
                          >
                            {listItem.parts.map((part) => (
                              <div key={part.id} className="space-y-3">
                                <textarea
                                  value={part.text}
                                  onChange={(e) =>
                                    updateItem(section.id, listItemBlock.id, (current) => {
                                      const safe = current as UniverseListBlock;
                                      return {
                                        ...safe,
                                        items: safe.items.map((entry) =>
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
                                      };
                                    })
                                  }
                                  rows={2}
                                  className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none"
                                  placeholder="List content..."
                                />

                                <div className="grid gap-4 md:grid-cols-4">
                                  <label className="flex items-center gap-2 text-sm text-white/75">
                                    <input
                                      type="checkbox"
                                      checked={Boolean(part.bold)}
                                      onChange={(e) =>
                                        updateItem(section.id, listItemBlock.id, (current) => {
                                          const safe = current as UniverseListBlock;
                                          return {
                                            ...safe,
                                            items: safe.items.map((entry) =>
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
                                          };
                                        })
                                      }
                                    />
                                    Bold
                                  </label>

                                  <label className="flex items-center gap-2 text-sm text-white/75">
                                    <input
                                      type="checkbox"
                                      checked={Boolean(part.italic)}
                                      onChange={(e) =>
                                        updateItem(section.id, listItemBlock.id, (current) => {
                                          const safe = current as UniverseListBlock;
                                          return {
                                            ...safe,
                                            items: safe.items.map((entry) =>
                                              entry.id === listItem.id
                                                ? {
                                                    ...entry,
                                                    parts: entry.parts.map((p) =>
                                                      p.id === part.id
                                                        ? { ...p, italic: e.target.checked }
                                                        : p
                                                    ),
                                                  }
                                                : entry
                                            ),
                                          };
                                        })
                                      }
                                    />
                                    Italic
                                  </label>

                                  <input
                                    type="text"
                                    value={part.referenceLabel ?? ""}
                                    onChange={(e) =>
                                      updateItem(section.id, listItemBlock.id, (current) => {
                                        const safe = current as UniverseListBlock;
                                        return {
                                          ...safe,
                                          items: safe.items.map((entry) =>
                                            entry.id === listItem.id
                                              ? {
                                                  ...entry,
                                                  parts: entry.parts.map((p) =>
                                                    p.id === part.id
                                                      ? { ...p, referenceLabel: e.target.value }
                                                      : p
                                                  ),
                                                }
                                              : entry
                                          ),
                                        };
                                      })
                                    }
                                    className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white outline-none"
                                    placeholder="Link text"
                                  />

                                  <input
                                    type="text"
                                    value={part.referencePath ?? ""}
                                    onChange={(e) =>
                                      updateItem(section.id, listItemBlock.id, (current) => {
                                        const safe = current as UniverseListBlock;
                                        return {
                                          ...safe,
                                          items: safe.items.map((entry) =>
                                            entry.id === listItem.id
                                              ? {
                                                  ...entry,
                                                  parts: entry.parts.map((p) =>
                                                    p.id === part.id
                                                      ? { ...p, referencePath: e.target.value }
                                                      : p
                                                  ),
                                                }
                                              : entry
                                          ),
                                        };
                                      })
                                    }
                                    className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white outline-none"
                                    placeholder="Internal page path"
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        ))}

                        <button
                          type="button"
                          onClick={() =>
                            updateItem(section.id, listItemBlock.id, (current) => {
                              const safe = current as UniverseListBlock;
                              return {
                                ...safe,
                                items: [
                                  ...safe.items,
                                  {
                                    id: uid(),
                                    parts: [
                                      {
                                        id: uid(),
                                        text: "",
                                        bold: false,
                                        italic: false,
                                      },
                                    ],
                                  },
                                ],
                              };
                            })
                          }
                          className="rounded-xl border border-cyan-300/20 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-100"
                        >
                          Add list item
                        </button>
                      </div>
                    );
                  })()}

                  {item.type === "table" && (() => {
                    const tableItem = item as UniverseTableBlock;

                    return (
                      <div className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                          <input
                            type="number"
                            min={1}
                            value={tableItem.rows}
                            onChange={(e) =>
                              updateItem(section.id, tableItem.id, (current) =>
                                resizeTable(
                                  current as UniverseTableBlock,
                                  Number(e.target.value) || 1,
                                  (current as UniverseTableBlock).cols
                                )
                              )
                            }
                            className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white outline-none"
                            placeholder="Rows"
                          />

                          <input
                            type="number"
                            min={1}
                            value={tableItem.cols}
                            onChange={(e) =>
                              updateItem(section.id, tableItem.id, (current) =>
                                resizeTable(
                                  current as UniverseTableBlock,
                                  (current as UniverseTableBlock).rows,
                                  Number(e.target.value) || 1
                                )
                              )
                            }
                            className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white outline-none"
                            placeholder="Columns"
                          />
                        </div>

                        <div className="space-y-2">
                          {tableItem.cells.map((row, rowIndex) => (
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
                                      updateItem(section.id, tableItem.id, (current) => {
                                        const safe = current as UniverseTableBlock;
                                        return {
                                          ...safe,
                                          cells: safe.cells.map((existingRow: UniverseTableCell[]) =>
                                            existingRow.map((existingCell: UniverseTableCell) =>
                                              existingCell.id === cell.id
                                                ? {
                                                    ...existingCell,
                                                    kind: e.target.value as "value" | "empty",
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
                                      updateItem(section.id, tableItem.id, (current) => {
                                        const safe = current as UniverseTableBlock;
                                        return {
                                          ...safe,
                                          cells: safe.cells.map((existingRow: UniverseTableCell[]) =>
                                            existingRow.map((existingCell: UniverseTableCell) =>
                                              existingCell.id === cell.id
                                                ? { ...existingCell, value: e.target.value }
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
                    );
                  })()}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}