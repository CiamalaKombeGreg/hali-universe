"use client";

import { Plus, Trash2 } from "lucide-react";
import { useMemo } from "react";
import type {
  ContentBlock,
  ImageBlock,
  ListBlock,
  TableBlock,
  TextBlock,
  UploadedImage,
} from "./abilityEditorTypes";

function uid() {
  return crypto.randomUUID();
}

type Props = {
  blocks: ContentBlock[];
  onChange: (blocks: ContentBlock[]) => void;
  availableImages: UploadedImage[];
};

export default function DescriptionBlocksEditor({
  blocks,
  onChange,
  availableImages,
}: Props) {
  const imageOptions = useMemo(() => availableImages, [availableImages]);

  function addBlock(type: ContentBlock["type"]) {
    const next: ContentBlock =
      type === "text"
        ? {
            id: uid(),
            type: "text",
            title: "",
            parts: [
              {
                id: uid(),
                text: "",
                bold: false,
                underline: false,
              },
            ],
          }
        : type === "list"
          ? {
              id: uid(),
              type: "list",
              title: "",
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
            }
          : type === "image"
            ? {
                id: uid(),
                type: "image",
                title: "",
                imageId: "",
                imageUrl: "",
                caption: "",
                framed: true,
              }
            : {
                id: uid(),
                type: "table",
                title: "",
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

    onChange([...blocks, next]);
  }

  function updateBlock(
    id: string,
    updater: (block: ContentBlock) => ContentBlock
  ) {
    onChange(blocks.map((block) => (block.id === id ? updater(block) : block)));
  }

  function removeBlock(id: string) {
    onChange(blocks.filter((block) => block.id !== id));
  }

  function resizeTable(
    block: TableBlock,
    rows: number,
    cols: number
  ): TableBlock {
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
          <h3 className="text-2xl font-black text-white">Description blocks</h3>
          <p className="mt-2 text-sm leading-6 text-white/60">
            Build the page section by section using text, lists, images, and
            tables.
          </p>
        </div>
      </div>

      <div className="mb-5 flex flex-wrap gap-3">
        {(["text", "list", "image", "table"] as const).map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => addBlock(type)}
            className="inline-flex items-center gap-2 rounded-xl border border-cyan-300/20 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-400/20"
          >
            <Plus className="h-4 w-4" />
            Add {type}
          </button>
        ))}
      </div>

      <div className="space-y-5">
        {blocks.map((block, index) => (
          <div
            key={block.id}
            className="rounded-[24px] border border-white/10 bg-white/5 p-5"
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="text-sm font-bold uppercase tracking-[0.16em] text-white/65">
                Block {index + 1} — {block.type}
              </div>

              <button
                type="button"
                onClick={() => removeBlock(block.id)}
                className="rounded-xl border border-rose-300/20 bg-rose-400/10 p-2 text-rose-200 transition hover:bg-rose-400/20"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            {block.type === "text" && (
              <div className="space-y-4">
                <input
                  type="text"
                  value={block.title ?? ""}
                  onChange={(e) =>
                    updateBlock(block.id, (b) => ({
                      ...(b as TextBlock),
                      title: e.target.value,
                    }))
                  }
                  className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none"
                  placeholder="Section title (optional)"
                />

                <div className="space-y-4">
                  {block.parts.map((part, partIndex) => (
                    <div
                      key={part.id}
                      className="rounded-2xl border border-white/10 bg-black/20 p-4"
                    >
                      <div className="mb-3 flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-[0.14em] text-white/45">
                          Text part {partIndex + 1}
                        </span>

                        {block.parts.length > 1 ? (
                          <button
                            type="button"
                            onClick={() =>
                              updateBlock(block.id, (b) => ({
                                ...(b as TextBlock),
                                parts: (b as TextBlock).parts.filter(
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
                          updateBlock(block.id, (b) => ({
                            ...(b as TextBlock),
                            parts: (b as TextBlock).parts.map((p) =>
                              p.id === part.id
                                ? { ...p, text: e.target.value }
                                : p
                            ),
                          }))
                        }
                        rows={3}
                        className="w-full rounded-xl border border-white/10 bg-[#101726] px-4 py-3 text-sm text-white outline-none"
                        placeholder="Write this text fragment..."
                      />

                      <div className="mt-4 grid gap-4 md:grid-cols-4">
                        <label className="flex items-center gap-2 text-sm text-white/75">
                          <input
                            type="checkbox"
                            checked={Boolean(part.bold)}
                            onChange={(e) =>
                              updateBlock(block.id, (b) => ({
                                ...(b as TextBlock),
                                parts: (b as TextBlock).parts.map((p) =>
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
                              updateBlock(block.id, (b) => ({
                                ...(b as TextBlock),
                                parts: (b as TextBlock).parts.map((p) =>
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
                            updateBlock(block.id, (b) => ({
                              ...(b as TextBlock),
                              parts: (b as TextBlock).parts.map((p) =>
                                p.id === part.id
                                  ? {
                                      ...p,
                                      referenceLabel: e.target.value,
                                    }
                                  : p
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
                            updateBlock(block.id, (b) => ({
                              ...(b as TextBlock),
                              parts: (b as TextBlock).parts.map((p) =>
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
                    updateBlock(block.id, (b) => ({
                      ...(b as TextBlock),
                      parts: [
                        ...(b as TextBlock).parts,
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

            {block.type === "list" && (
              <div className="space-y-4">
                <input
                  type="text"
                  value={block.title ?? ""}
                  onChange={(e) =>
                    updateBlock(block.id, (b) => ({
                      ...(b as ListBlock),
                      title: e.target.value,
                    }))
                  }
                  className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none"
                  placeholder="List section title (optional)"
                />

                <div className="space-y-4">
                  {block.items.map((item, itemIndex) => (
                    <div
                      key={item.id}
                      className="rounded-2xl border border-white/10 bg-black/20 p-4"
                    >
                      <div className="mb-3 flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-[0.14em] text-white/45">
                          List item {itemIndex + 1}
                        </span>

                        {block.items.length > 1 ? (
                          <button
                            type="button"
                            onClick={() =>
                              updateBlock(block.id, (b) => ({
                                ...(b as ListBlock),
                                items: (b as ListBlock).items.filter(
                                  (i) => i.id !== item.id
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
                        {item.parts.map((part, partIndex) => (
                          <div
                            key={part.id}
                            className="rounded-xl border border-white/10 bg-[#101726] p-3"
                          >
                            <div className="mb-2 flex items-center justify-between">
                              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/40">
                                Part {partIndex + 1}
                              </span>

                              {item.parts.length > 1 ? (
                                <button
                                  type="button"
                                  onClick={() =>
                                    updateBlock(block.id, (b) => ({
                                      ...(b as ListBlock),
                                      items: (b as ListBlock).items.map(
                                        (existingItem) =>
                                          existingItem.id === item.id
                                            ? {
                                                ...existingItem,
                                                parts: existingItem.parts.filter(
                                                  (p) => p.id !== part.id
                                                ),
                                              }
                                            : existingItem
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
                                updateBlock(block.id, (b) => ({
                                  ...(b as ListBlock),
                                  items: (b as ListBlock).items.map(
                                    (existingItem) =>
                                      existingItem.id === item.id
                                        ? {
                                            ...existingItem,
                                            parts: existingItem.parts.map((p) =>
                                              p.id === part.id
                                                ? {
                                                    ...p,
                                                    text: e.target.value,
                                                  }
                                                : p
                                            ),
                                          }
                                        : existingItem
                                  ),
                                }))
                              }
                              rows={2}
                              className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none"
                              placeholder="Write this list fragment..."
                            />

                            <div className="mt-3 grid gap-4 md:grid-cols-4">
                              <label className="flex items-center gap-2 text-sm text-white/75">
                                <input
                                  type="checkbox"
                                  checked={Boolean(part.bold)}
                                  onChange={(e) =>
                                    updateBlock(block.id, (b) => ({
                                      ...(b as ListBlock),
                                      items: (b as ListBlock).items.map(
                                        (existingItem) =>
                                          existingItem.id === item.id
                                            ? {
                                                ...existingItem,
                                                parts: existingItem.parts.map(
                                                  (p) =>
                                                    p.id === part.id
                                                      ? {
                                                          ...p,
                                                          bold: e.target.checked,
                                                        }
                                                      : p
                                                ),
                                              }
                                            : existingItem
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
                                    updateBlock(block.id, (b) => ({
                                      ...(b as ListBlock),
                                      items: (b as ListBlock).items.map(
                                        (existingItem) =>
                                          existingItem.id === item.id
                                            ? {
                                                ...existingItem,
                                                parts: existingItem.parts.map(
                                                  (p) =>
                                                    p.id === part.id
                                                      ? {
                                                          ...p,
                                                          underline:
                                                            e.target.checked,
                                                        }
                                                      : p
                                                ),
                                              }
                                            : existingItem
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
                                  updateBlock(block.id, (b) => ({
                                    ...(b as ListBlock),
                                    items: (b as ListBlock).items.map(
                                      (existingItem) =>
                                        existingItem.id === item.id
                                          ? {
                                              ...existingItem,
                                              parts: existingItem.parts.map(
                                                (p) =>
                                                  p.id === part.id
                                                    ? {
                                                        ...p,
                                                        referenceLabel:
                                                          e.target.value,
                                                      }
                                                    : p
                                              ),
                                            }
                                          : existingItem
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
                                  updateBlock(block.id, (b) => ({
                                    ...(b as ListBlock),
                                    items: (b as ListBlock).items.map(
                                      (existingItem) =>
                                        existingItem.id === item.id
                                          ? {
                                              ...existingItem,
                                              parts: existingItem.parts.map(
                                                (p) =>
                                                  p.id === part.id
                                                    ? {
                                                        ...p,
                                                        referenceType: "PAGE",
                                                        referencePath:
                                                          e.target.value,
                                                      }
                                                    : p
                                              ),
                                            }
                                          : existingItem
                                    ),
                                  }))
                                }
                                className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white outline-none"
                                placeholder="Internal path / future picker"
                              />
                            </div>
                          </div>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          updateBlock(block.id, (b) => ({
                            ...(b as ListBlock),
                            items: (b as ListBlock).items.map((existingItem) =>
                              existingItem.id === item.id
                                ? {
                                    ...existingItem,
                                    parts: [
                                      ...existingItem.parts,
                                      {
                                        id: uid(),
                                        text: "",
                                        bold: false,
                                        underline: false,
                                      },
                                    ],
                                  }
                                : existingItem
                            ),
                          }))
                        }
                        className="mt-3 rounded-xl border border-cyan-300/20 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-100"
                      >
                        Add text part
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() =>
                    updateBlock(block.id, (b) => ({
                      ...(b as ListBlock),
                      items: [
                        ...(b as ListBlock).items,
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

            {block.type === "image" && (
              <div className="space-y-4">
                <input
                  type="text"
                  value={(block as ImageBlock).title ?? ""}
                  onChange={(e) =>
                    updateBlock(block.id, (b) => ({
                      ...(b as ImageBlock),
                      title: e.target.value,
                    }))
                  }
                  className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none"
                  placeholder="Image section title (optional)"
                />

                <div className="grid gap-4 md:grid-cols-2">
                  <select
                    value={(block as ImageBlock).imageId}
                    onChange={(e) => {
                      const image = imageOptions.find(
                        (img) => img.id === e.target.value
                      );
                      updateBlock(block.id, (b) => ({
                        ...(b as ImageBlock),
                        imageId: image?.id ?? "",
                        imageUrl: image?.url ?? "",
                      }));
                    }}
                    className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white outline-none"
                  >
                    <option value="">Select a secondary image</option>
                    {imageOptions.map((image) => (
                      <option key={image.id} value={image.id}>
                        {image.url}
                      </option>
                    ))}
                  </select>

                  <input
                    type="text"
                    value={(block as ImageBlock).caption ?? ""}
                    onChange={(e) =>
                      updateBlock(block.id, (b) => ({
                        ...(b as ImageBlock),
                        caption: e.target.value,
                      }))
                    }
                    className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white outline-none"
                    placeholder="Image caption"
                  />

                  <label className="flex items-center gap-2 text-sm text-white/75">
                    <input
                      type="checkbox"
                      checked={(block as ImageBlock).framed}
                      onChange={(e) =>
                        updateBlock(block.id, (b) => ({
                          ...(b as ImageBlock),
                          framed: e.target.checked,
                        }))
                      }
                    />
                    Framed
                  </label>
                </div>
              </div>
            )}

            {block.type === "table" && (
              <div className="space-y-4">
                <input
                  type="text"
                  value={(block as TableBlock).title ?? ""}
                  onChange={(e) =>
                    updateBlock(block.id, (b) => ({
                      ...(b as TableBlock),
                      title: e.target.value,
                    }))
                  }
                  className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none"
                  placeholder="Table section title (optional)"
                />

                <div className="grid gap-4 md:grid-cols-2">
                  <input
                    type="number"
                    min={1}
                    value={(block as TableBlock).rows}
                    onChange={(e) =>
                      updateBlock(block.id, (b) =>
                        resizeTable(
                          b as TableBlock,
                          Number(e.target.value) || 1,
                          (b as TableBlock).cols
                        )
                      )
                    }
                    className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white outline-none"
                    placeholder="Rows"
                  />

                  <input
                    type="number"
                    min={1}
                    value={(block as TableBlock).cols}
                    onChange={(e) =>
                      updateBlock(block.id, (b) =>
                        resizeTable(
                          b as TableBlock,
                          (b as TableBlock).rows,
                          Number(e.target.value) || 1
                        )
                      )
                    }
                    className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white outline-none"
                    placeholder="Columns"
                  />
                </div>

                <div className="space-y-2">
                  {(block as TableBlock).cells.map((row, rowIndex) => (
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
                              updateBlock(block.id, (b) => {
                                const table = b as TableBlock;
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
                              updateBlock(block.id, (b) => {
                                const table = b as TableBlock;
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
    </section>
  );
}