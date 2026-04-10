"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import NovelChapterBlocksEditor from "./NovelChapterBlocksEditor";
import type {
  ChapterContentBlock,
  NovelChapterCreatePayload,
  NovelChapterStatusValue,
} from "./novelChapterTypes";

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

type UploadedArchiveImage = {
  id: string;
  url: string;
  storageKey?: string;
  isPrimary: boolean;
};

type Props = {
  novelSlug: string;
  mode?: "create" | "edit";
  initialChapter?: {
    id: string;
    title: string;
    slug: string;
    subtitle: string;
    orderIndex: number;
    status: NovelChapterStatusValue;
    coverImage: {
      url: string;
      storageKey?: string;
    } | null;
    contentBlocks: ChapterContentBlock[];
  };
  novelCoverUrl?: string | null;
};

export default function NovelChapterForm({
  novelSlug,
  mode = "create",
  initialChapter,
  novelCoverUrl,
}: Props) {
  const [title, setTitle] = useState(initialChapter?.title ?? "");
  const [subtitle, setSubtitle] = useState(initialChapter?.subtitle ?? "");
  const [orderIndex, setOrderIndex] = useState(
    initialChapter ? String(initialChapter.orderIndex) : "1"
  );
  const [status, setStatus] = useState<NovelChapterStatusValue>(
    initialChapter?.status ?? "DRAFT"
  );
  const [blocks, setBlocks] = useState<ChapterContentBlock[]>(
    initialChapter?.contentBlocks ?? []
  );

  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(
    initialChapter?.coverImage?.url ?? novelCoverUrl ?? null
  );

  const [saving, setSaving] = useState(false);
  const coverInputRef = useRef<HTMLInputElement | null>(null);

  const slug = useMemo(() => {
    if (mode === "edit" && initialChapter?.slug) {
      return initialChapter.slug;
    }

    return slugify(title);
  }, [title, mode, initialChapter]);

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

  function handleCoverSelection(file: File | null) {
    if (!file) return;

    if (coverPreview && coverPreview.startsWith("blob:")) {
      URL.revokeObjectURL(coverPreview);
    }

    const preview = URL.createObjectURL(file);
    setCoverFile(file);
    setCoverPreview(preview);
  }

  async function submit() {
    if (!title.trim() || !slug) {
      alert("Title is required.");
      return;
    }

    setSaving(true);

    try {
      const uploadedCover =
        coverFile != null
          ? await uploadFile(coverFile)
          : initialChapter?.coverImage ?? null;

      const payload: NovelChapterCreatePayload = {
        title,
        slug,
        subtitle: subtitle || undefined,
        orderIndex: Number(orderIndex) || 1,
        status,
        coverImage: uploadedCover,
        contentBlocks: blocks,
      };

      const endpoint =
        mode === "edit"
          ? `/api/novels/${novelSlug}/chapters/${initialChapter?.slug}`
          : `/api/novels/${novelSlug}/chapters`;

      const response = await fetch(endpoint, {
        method: mode === "edit" ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to save chapter");
      }

      window.location.href = `/universe/lorebook/edit/novel/${novelSlug}`;
    } catch (error) {
      console.error(error);
      alert("Failed to save chapter.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[30px] border border-white/10 bg-black/25 p-6 backdrop-blur-xl">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-white/75">
              Chapter Title
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

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-white/75">
              Subtitle (optional)
            </label>
            <input
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-white/75">
              Chapter Order
            </label>
            <input
              type="number"
              min={1}
              value={orderIndex}
              onChange={(e) => setOrderIndex(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-white/75">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as NovelChapterStatusValue)}
              className="form-select-dark w-full rounded-2xl px-4 py-3 text-white outline-none"
            >
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
            </select>
          </div>
        </div>
      </section>

      <NovelChapterBlocksEditor blocks={blocks} onChange={setBlocks} />

      <section className="rounded-[30px] border border-white/10 bg-black/25 p-6 backdrop-blur-xl">
        <h2 className="text-2xl font-black text-white">Chapter Cover</h2>

        <div className="mt-5">
          <input
            ref={coverInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => handleCoverSelection(e.target.files?.[0] ?? null)}
            className="hidden"
          />

          <button
            type="button"
            onClick={() => coverInputRef.current?.click()}
            className="group flex min-h-[280px] w-full flex-col items-center justify-center rounded-[24px] border border-dashed border-fuchsia-300/25 bg-fuchsia-400/5 p-6 text-center transition hover:border-fuchsia-300/45 hover:bg-fuchsia-400/10"
          >
            {coverPreview ? (
              <div className="w-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={coverPreview}
                  alt="Chapter cover preview"
                  className="mx-auto max-h-[320px] rounded-2xl object-contain"
                />
                <p className="mt-4 text-sm font-semibold text-fuchsia-100">
                  {coverFile?.name ?? "Current chapter cover"}
                </p>
              </div>
            ) : (
              <>
                <div className="mb-4 text-lg font-black text-fuchsia-100">
                  Add Chapter Cover
                </div>
                <p className="max-w-sm text-sm leading-6 text-white/60">
                  If no cover is selected, the novel cover will be used visually.
                </p>
              </>
            )}
          </button>
        </div>
      </section>

      <section className="rounded-[30px] border border-white/10 bg-black/25 p-6 backdrop-blur-xl">
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            disabled={saving}
            onClick={submit}
            className="rounded-2xl border border-emerald-300/20 bg-emerald-400/10 px-5 py-3 text-sm font-bold text-emerald-100 disabled:opacity-40"
          >
            {mode === "edit" ? "Save Chapter" : "Create Chapter"}
          </button>

          <Link
            href={`/universe/lorebook/edit/novel/${novelSlug}`}
            className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-white/80"
          >
            Cancel
          </Link>

          {mode === "edit" && initialChapter ? (
            <button
              type="button"
              disabled={saving}
              onClick={async () => {
                const confirmed = window.confirm(
                  "Are you sure you want to delete this chapter?"
                );
                if (!confirmed) return;

                const response = await fetch(
                  `/api/novels/${novelSlug}/chapters/${initialChapter.slug}`,
                  {
                    method: "DELETE",
                  }
                );

                if (!response.ok) {
                  alert("Failed to delete chapter.");
                  return;
                }

                window.location.href = `/universe/lorebook/edit/novel/${novelSlug}`;
              }}
              className="rounded-2xl border border-rose-300/20 bg-rose-400/10 px-5 py-3 text-sm font-bold text-rose-100 disabled:opacity-40"
            >
              Delete Chapter
            </button>
          ) : null}
        </div>
      </section>
    </div>
  );
}