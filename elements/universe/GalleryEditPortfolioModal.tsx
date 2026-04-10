"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ImagePlus, Link2, Search, Trash2, Upload, X } from "lucide-react";
import type {
  GalleryPortfolioSummary,
  PendingGalleryImage,
  UpdateGalleryPortfolioPayload,
} from "./galleryTypes";

type PortfolioResponse = {
  id: string;
  name: string;
  images: {
    id: string;
    title: string | null;
    altText: string | null;
    externalLink: string | null;
    sourceType: "UPLOADED" | "EXTERNAL";
    imageUrl: string;
    storageKey: string | null;
    sortOrder: number;
  }[];
};

type Props = {
  open: boolean;
  onClose: () => void;
  onSaved: () => void;
};

function uid() {
  return crypto.randomUUID();
}

export default function GalleryEditPortfolioModal({
  open,
  onClose,
  onSaved,
}: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<GalleryPortfolioSummary[]>([]);
  const [searching, setSearching] = useState(false);

  const [selectedPortfolioId, setSelectedPortfolioId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [externalUrl, setExternalUrl] = useState("");
  const [images, setImages] = useState<PendingGalleryImage[]>([]);
  const [loadingPortfolio, setLoadingPortfolio] = useState(false);
  const [saving, setSaving] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const hasContent = useMemo(
    () => name.trim().length > 0 && images.length > 0 && !!selectedPortfolioId,
    [name, images.length, selectedPortfolioId]
  );

  useEffect(() => {
    async function run() {
      if (!open) return;

      setSearching(true);
      try {
        const response = await fetch(
          `/api/gallery/portfolios/search?q=${encodeURIComponent(query)}`
        );

        if (!response.ok) {
          setResults([]);
          return;
        }

        const data = await response.json();
        setResults(data.results ?? []);
      } catch (error) {
        console.error(error);
        setResults([]);
      } finally {
        setSearching(false);
      }
    }

    void run();
  }, [query, open]);

  if (!open) return null;

  function resetState() {
    images.forEach((image) => {
      if (image.localFile && image.imageUrl.startsWith("blob:")) {
        URL.revokeObjectURL(image.imageUrl);
      }
    });

    setQuery("");
    setResults([]);
    setSelectedPortfolioId(null);
    setName("");
    setExternalUrl("");
    setImages([]);
    setLoadingPortfolio(false);
    setSaving(false);
  }

  function closeModal() {
    resetState();
    onClose();
  }

  async function loadPortfolio(portfolioId: string) {
    setLoadingPortfolio(true);

    try {
      const response = await fetch(`/api/gallery/portfolios/${portfolioId}`);
      if (!response.ok) {
        throw new Error("Failed to load portfolio");
      }

      const data = await response.json();
      const portfolio: PortfolioResponse = data.portfolio;

      setSelectedPortfolioId(portfolio.id);
      setName(portfolio.name);
      setImages(
        portfolio.images.map((image) => ({
          id: image.id,
          sourceType: image.sourceType,
          imageUrl: image.imageUrl,
          title: image.title ?? "",
          altText: image.altText ?? "",
          externalLink: image.externalLink ?? "",
          storageKey: image.storageKey ?? null,
        }))
      );
    } catch (error) {
      console.error(error);
      alert("Failed to load portfolio.");
    } finally {
      setLoadingPortfolio(false);
    }
  }

  function addFiles(files: FileList | null) {
    if (!files?.length) return;

    const next = Array.from(files).map((file) => ({
      id: uid(),
      sourceType: "UPLOADED" as const,
      localFile: file,
      imageUrl: URL.createObjectURL(file),
      title: "",
      altText: "",
      externalLink: "",
    }));

    setImages((prev) => [...prev, ...next]);
  }

  function addExternalImage() {
    const clean = externalUrl.trim();
    if (!clean) return;

    setImages((prev) => [
      ...prev,
      {
        id: uid(),
        sourceType: "EXTERNAL",
        imageUrl: clean,
        title: "",
        altText: "",
        externalLink: "",
      },
    ]);
    setExternalUrl("");
  }

  function updateImage(
    imageId: string,
    patch: Partial<PendingGalleryImage>
  ) {
    setImages((prev) =>
      prev.map((image) =>
        image.id === imageId ? { ...image, ...patch } : image
      )
    );
  }

  function removeImage(imageId: string) {
    setImages((prev) => {
      const found = prev.find((item) => item.id === imageId);
      if (found?.localFile && found.imageUrl.startsWith("blob:")) {
        URL.revokeObjectURL(found.imageUrl);
      }
      return prev.filter((item) => item.id !== imageId);
    });
  }

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

    return {
      imageUrl: data.fileUrl as string,
      storageKey: data.objectName as string,
    };
  }

  async function handleSave() {
    if (!hasContent || !selectedPortfolioId) return;

    setSaving(true);

    try {
      const finalImages: UpdateGalleryPortfolioPayload["images"] = [];

      for (let index = 0; index < images.length; index += 1) {
        const image = images[index];

        if (image.sourceType === "UPLOADED" && image.localFile) {
          const uploaded = await uploadFile(image.localFile);

          finalImages.push({
            title: image.title.trim() || null,
            altText: image.altText.trim() || null,
            externalLink: image.externalLink.trim() || null,
            sourceType: "UPLOADED",
            imageUrl: uploaded.imageUrl,
            storageKey: uploaded.storageKey,
            sortOrder: index,
          });
        } else {
          finalImages.push({
            id: image.localFile ? undefined : image.id,
            title: image.title.trim() || null,
            altText: image.altText.trim() || null,
            externalLink: image.externalLink.trim() || null,
            sourceType: image.sourceType,
            imageUrl: image.imageUrl,
            storageKey: image.storageKey ?? null,
            sortOrder: index,
          });
        }
      }

      const payload: UpdateGalleryPortfolioPayload = {
        name: name.trim(),
        images: finalImages,
      };

      const response = await fetch(
        `/api/gallery/portfolios/${selectedPortfolioId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update portfolio");
      }

      onSaved();
      closeModal();
    } catch (error) {
      console.error(error);
      alert("Failed to update portfolio.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!selectedPortfolioId) return;

    const confirmed = window.confirm(
      "Are you sure you want to permanently delete this portfolio?"
    );
    if (!confirmed) return;

    const response = await fetch(`/api/gallery/portfolios/${selectedPortfolioId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      alert("Failed to delete portfolio.");
      return;
    }

    onSaved();
    closeModal();
  }

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 px-6 py-6 backdrop-blur-md">
      <div className="max-h-[92vh] w-full max-w-[1400px] overflow-hidden rounded-[30px] border border-white/10 bg-[#07111f]/95 shadow-[0_24px_80px_rgba(0,0,0,0.55)]">
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <div>
            <h2 className="text-2xl font-black text-white">Edit Portfolio</h2>
            <p className="mt-1 text-sm text-white/55">
              Search a portfolio, then update its content.
            </p>
          </div>

          <button
            type="button"
            onClick={closeModal}
            className="rounded-full border border-white/10 bg-white/5 p-2 text-white/70 transition hover:bg-white/10 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="grid max-h-[calc(92vh-88px)] gap-6 overflow-y-auto p-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <section className="rounded-[24px] border border-white/10 bg-black/20 p-5">
              <label className="mb-2 block text-sm font-semibold text-white/75">
                Search Portfolio
              </label>
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <Search className="h-4 w-4 text-white/45" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full bg-transparent text-white outline-none"
                  placeholder="Search portfolio name"
                />
              </div>

              <div className="mt-4 max-h-[280px] space-y-2 overflow-y-auto">
                {results.length > 0 ? (
                  results.map((portfolio) => (
                    <button
                      key={portfolio.id}
                      type="button"
                      onClick={() => loadPortfolio(portfolio.id)}
                      className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left transition hover:bg-white/10"
                    >
                      <div>
                        <div className="text-sm font-semibold text-white">
                          {portfolio.name}
                        </div>
                        <div className="mt-1 text-xs uppercase tracking-[0.14em] text-white/45">
                          {portfolio.imageCount} image
                          {portfolio.imageCount > 1 ? "s" : ""}
                        </div>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="rounded-xl border border-white/10 bg-black/20 px-4 py-4 text-sm text-white/45">
                    {searching ? "Searching..." : "No portfolio found."}
                  </div>
                )}
              </div>
            </section>

            {selectedPortfolioId ? (
              <>
                <section className="rounded-[24px] border border-white/10 bg-black/20 p-5">
                  <label className="mb-2 block text-sm font-semibold text-white/75">
                    Portfolio Name
                  </label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
                    placeholder="Enter portfolio name"
                  />
                </section>

                <section className="rounded-[24px] border border-white/10 bg-black/20 p-5">
                  <div className="mb-3 flex items-center gap-2 text-lg font-black text-white">
                    <Upload className="h-5 w-5 text-cyan-100" />
                    Add Uploaded Images
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => addFiles(e.target.files)}
                    className="hidden"
                  />

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex min-h-[160px] w-full flex-col items-center justify-center rounded-[24px] border border-dashed border-cyan-300/25 bg-cyan-400/5 p-6 text-center transition hover:border-cyan-300/45 hover:bg-cyan-400/10"
                  >
                    <ImagePlus className="mb-3 h-8 w-8 text-cyan-100" />
                    <div className="text-lg font-black text-cyan-100">
                      Select New Images
                    </div>
                  </button>
                </section>

                <section className="rounded-[24px] border border-white/10 bg-black/20 p-5">
                  <div className="mb-3 flex items-center gap-2 text-lg font-black text-white">
                    <Link2 className="h-5 w-5 text-fuchsia-100" />
                    Add External Image
                  </div>

                  <div className="flex flex-col gap-3 md:flex-row">
                    <input
                      value={externalUrl}
                      onChange={(e) => setExternalUrl(e.target.value)}
                      className="flex-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
                      placeholder="Paste direct image URL"
                    />
                    <button
                      type="button"
                      onClick={addExternalImage}
                      className="rounded-2xl border border-fuchsia-300/20 bg-fuchsia-400/10 px-5 py-3 text-sm font-bold text-fuchsia-100 transition hover:bg-fuchsia-400/20"
                    >
                      Add Image
                    </button>
                  </div>
                </section>
              </>
            ) : null}
          </div>

          <div className="space-y-6">
            <section className="rounded-[24px] border border-white/10 bg-black/20 p-5">
              <h3 className="text-xl font-black text-white">Images</h3>

              <div className="mt-4 space-y-4">
                {selectedPortfolioId ? (
                  loadingPortfolio ? (
                    <div className="rounded-[20px] border border-white/10 bg-black/20 px-4 py-5 text-sm text-white/50">
                      Loading portfolio...
                    </div>
                  ) : images.length > 0 ? (
                    images.map((image) => (
                      <div
                        key={image.id}
                        className="rounded-[22px] border border-white/10 bg-white/5 p-4"
                      >
                        <div className="mb-3 flex items-start justify-between gap-3">
                          <div className="text-xs font-black uppercase tracking-[0.16em] text-white/45">
                            {image.sourceType}
                          </div>

                          <button
                            type="button"
                            onClick={() => removeImage(image.id)}
                            className="rounded-xl border border-rose-300/20 bg-rose-400/10 p-2 text-rose-100 transition hover:bg-rose-400/20"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="overflow-hidden rounded-[18px] border border-white/10 bg-black/20">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={image.imageUrl}
                            alt={image.altText || image.title || "Gallery image"}
                            className="max-h-[260px] w-full object-contain"
                          />
                        </div>

                        <div className="mt-4 space-y-3">
                          <input
                            value={image.title}
                            onChange={(e) =>
                              updateImage(image.id, { title: e.target.value })
                            }
                            className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none"
                            placeholder="Image title"
                          />

                          <input
                            value={image.altText}
                            onChange={(e) =>
                              updateImage(image.id, { altText: e.target.value })
                            }
                            className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none"
                            placeholder="Alt text"
                          />

                          <input
                            value={image.externalLink}
                            onChange={(e) =>
                              updateImage(image.id, {
                                externalLink: e.target.value,
                              })
                            }
                            className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none"
                            placeholder="Optional clickable link"
                          />
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="rounded-[20px] border border-white/10 bg-black/20 px-4 py-5 text-sm text-white/50">
                      No images in this portfolio.
                    </div>
                  )
                ) : (
                  <div className="rounded-[20px] border border-white/10 bg-black/20 px-4 py-5 text-sm text-white/50">
                    Select a portfolio to edit it.
                  </div>
                )}
              </div>
            </section>

            {selectedPortfolioId ? (
              <section className="rounded-[24px] border border-white/10 bg-black/20 p-5">
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    disabled={!hasContent || saving}
                    onClick={handleSave}
                    className="rounded-2xl border border-emerald-300/20 bg-emerald-400/10 px-5 py-3 text-sm font-bold text-emerald-100 transition disabled:opacity-40"
                  >
                    Save Portfolio
                  </button>

                  <button
                    type="button"
                    onClick={handleDelete}
                    className="rounded-2xl border border-rose-300/20 bg-rose-400/10 px-5 py-3 text-sm font-bold text-rose-100 transition hover:bg-rose-400/20"
                  >
                    Delete Portfolio
                  </button>
                </div>
              </section>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}