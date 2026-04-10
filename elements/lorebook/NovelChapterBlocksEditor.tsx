"use client";

import { Plus, Trash2 } from "lucide-react";
import type {
  ChapterContentBlock,
  ChapterConversationBlock,
  ChapterParagraphBlock,
  ChapterSubtitleBlock,
} from "./novelChapterTypes";

function uid() {
  return crypto.randomUUID();
}

type Props = {
  blocks: ChapterContentBlock[];
  onChange: (blocks: ChapterContentBlock[]) => void;
};

export default function NovelChapterBlocksEditor({ blocks, onChange }: Props) {
  function addBlock(type: ChapterContentBlock["type"]) {
    const nextBlock: ChapterContentBlock =
      type === "subtitle"
        ? {
            id: uid(),
            type: "subtitle",
            text: "",
          }
        : {
            id: uid(),
            type,
            parts: [
              {
                id: uid(),
                text: "",
                italic: false,
              },
            ],
          };

    onChange([...blocks, nextBlock]);
  }

  function updateBlock(
    blockId: string,
    updater: (block: ChapterContentBlock) => ChapterContentBlock
  ) {
    onChange(blocks.map((block) => (block.id === blockId ? updater(block) : block)));
  }

  function removeBlock(blockId: string) {
    onChange(blocks.filter((block) => block.id !== blockId));
  }

  return (
    <section className="rounded-[28px] border border-white/10 bg-black/20 p-5">
      <div className="mb-5">
        <h3 className="text-2xl font-black text-white">Chapter Content</h3>
        <p className="mt-2 text-sm leading-6 text-white/60">
          Build the chapter using subtitles, paragraph blocks, and conversation blocks.
        </p>
      </div>

      <div className="mb-5 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => addBlock("subtitle")}
          className="rounded-xl border border-fuchsia-300/20 bg-fuchsia-400/10 px-4 py-2 text-sm font-semibold text-fuchsia-100"
        >
          <Plus className="mr-2 inline h-4 w-4" />
          Add Subtitle
        </button>

        <button
          type="button"
          onClick={() => addBlock("paragraph")}
          className="rounded-xl border border-cyan-300/20 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-100"
        >
          <Plus className="mr-2 inline h-4 w-4" />
          Add Paragraph
        </button>

        <button
          type="button"
          onClick={() => addBlock("conversation")}
          className="rounded-xl border border-amber-300/20 bg-amber-400/10 px-4 py-2 text-sm font-semibold text-amber-100"
        >
          <Plus className="mr-2 inline h-4 w-4" />
          Add Conversation
        </button>
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

            {block.type === "subtitle" ? (
              <input
                type="text"
                value={(block as ChapterSubtitleBlock).text}
                onChange={(e) =>
                  updateBlock(block.id, (current) => ({
                    ...(current as ChapterSubtitleBlock),
                    text: e.target.value,
                  }))
                }
                className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none"
                placeholder="Subtitle text"
              />
            ) : (
              <div className="space-y-4">
                {(block as ChapterParagraphBlock | ChapterConversationBlock).parts.map(
                  (part) => (
                    <div
                      key={part.id}
                      className="rounded-2xl border border-white/10 bg-black/20 p-4"
                    >
                      <textarea
                        value={part.text}
                        onChange={(e) =>
                          updateBlock(block.id, (current) => ({
                            ...(current as ChapterParagraphBlock | ChapterConversationBlock),
                            parts: (
                              current as ChapterParagraphBlock | ChapterConversationBlock
                            ).parts.map((p) =>
                              p.id === part.id ? { ...p, text: e.target.value } : p
                            ),
                          }))
                        }
                        rows={3}
                        className="w-full rounded-xl border border-white/10 bg-[#101726] px-4 py-3 text-sm text-white outline-none"
                        placeholder={
                          block.type === "conversation"
                            ? "Write spoken dialogue..."
                            : "Write paragraph text..."
                        }
                      />

                      <div className="mt-3">
                        <label className="flex items-center gap-2 text-sm text-white/75">
                          <input
                            type="checkbox"
                            checked={Boolean(part.italic)}
                            onChange={(e) =>
                              updateBlock(block.id, (current) => ({
                                ...(current as ChapterParagraphBlock | ChapterConversationBlock),
                                parts: (
                                  current as ChapterParagraphBlock | ChapterConversationBlock
                                ).parts.map((p) =>
                                  p.id === part.id
                                    ? { ...p, italic: e.target.checked }
                                    : p
                                ),
                              }))
                            }
                          />
                          Italic
                        </label>
                      </div>
                    </div>
                  )
                )}

                <button
                  type="button"
                  onClick={() =>
                    updateBlock(block.id, (current) => ({
                      ...(current as ChapterParagraphBlock | ChapterConversationBlock),
                      parts: [
                        ...(current as ChapterParagraphBlock | ChapterConversationBlock).parts,
                        {
                          id: uid(),
                          text: "",
                          italic: false,
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
          </div>
        ))}
      </div>
    </section>
  );
}