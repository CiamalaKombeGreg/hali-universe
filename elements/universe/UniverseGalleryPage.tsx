"use client";

import Link from "next/link";
import {
  Images,
  Plus,
  PencilLine,
  Search,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import VerticalNavbar from "@/elements/home/VerticalNavbar";
import GalleryCreatePortfolioModal from "./GalleryCreatePortfolioModal";
import GalleryEditPortfolioModal from "./GalleryEditPortfolioModal";
import GalleryLightboxModal from "./GalleryLightBoxModal";
import type {
  GalleryDisplayImage,
  GalleryPortfolioSummary,
} from "./galleryTypes";

type BrowseMode = "random" | "search" | "portfolio";

type PreviousBrowseState = {
  mode: "random" | "search";
  query: string;
  images: GalleryDisplayImage[];
  offset: number;
  hasMore: boolean;
};

export default function UniverseGalleryPage() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState<GalleryDisplayImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [browseMode, setBrowseMode] = useState<BrowseMode>("random");
  const [hasMore, setHasMore] = useState(false);
  const [offset, setOffset] = useState(0);

  const [selectedPortfolio, setSelectedPortfolio] =
    useState<GalleryPortfolioSummary | null>(null);
  const [selectedImage, setSelectedImage] = useState<GalleryDisplayImage | null>(null);

  const [previousBrowseState, setPreviousBrowseState] =
    useState<PreviousBrowseState | null>(null);

  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  async function loadRandomImages() {
    setLoading(true);

    try {
      const response = await fetch("/api/gallery/random?limit=30");
      if (!response.ok) {
        throw new Error("Failed to load random images");
      }

      const data = await response.json();
      setImages(data.images ?? []);
      setBrowseMode("random");
      setHasMore(false);
      setOffset(0);
      setSelectedPortfolio(null);
    } catch (error) {
      console.error(error);
      setImages([]);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadRandomImages();
  }, []);

  useEffect(() => {
    async function run() {
      if (!query.trim()) {
        if (browseMode !== "portfolio") {
          await loadRandomImages();
        }
        return;
      }

      if (browseMode === "portfolio") return;

      setLoading(true);

      try {
        const response = await fetch(
          `/api/gallery/search?q=${encodeURIComponent(query)}&limit=50&offset=0`
        );

        if (!response.ok) {
          throw new Error("Failed to search gallery");
        }

        const data = await response.json();
        setImages(data.images ?? []);
        setBrowseMode("search");
        setOffset(50);
        setHasMore(Boolean(data.hasMore));
      } catch (error) {
        console.error(error);
        setImages([]);
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    }

    void run();
  }, [query]);

  async function handleLoadMore() {
    if (loading) return;

    setLoading(true);

    try {
      let response: Response;

      if (browseMode === "search") {
        response = await fetch(
          `/api/gallery/search?q=${encodeURIComponent(query)}&limit=50&offset=${offset}`
        );
      } else if (browseMode === "portfolio" && selectedPortfolio) {
        response = await fetch(
          `/api/gallery/portfolio/${selectedPortfolio.id}?limit=50&offset=${offset}`
        );
      } else {
        setLoading(false);
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to load more images");
      }

      const data = await response.json();
      setImages((prev) => [...prev, ...(data.images ?? [])]);
      setOffset((prev) => prev + 50);
      setHasMore(Boolean(data.hasMore));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function openPortfolioFromImage(image: GalleryDisplayImage) {
    setPreviousBrowseState({
      mode: browseMode === "portfolio" ? "random" : (browseMode as "random" | "search"),
      query,
      images,
      offset,
      hasMore,
    });

    setSelectedImage(null);
    setLoading(true);

    try {
      const response = await fetch(
        `/api/gallery/portfolio/${image.portfolioId}?limit=50&offset=0`
      );

      if (!response.ok) {
        throw new Error("Failed to load portfolio");
      }

      const data = await response.json();

      setSelectedPortfolio({
        id: data.portfolio.id,
        name: data.portfolio.name,
        imageCount: data.total ?? 0,
      });
      setImages(data.images ?? []);
      setBrowseMode("portfolio");
      setOffset(50);
      setHasMore(Boolean(data.hasMore));
    } catch (error) {
      console.error(error);
      alert("Failed to open portfolio.");
    } finally {
      setLoading(false);
    }
  }

  function closePortfolioMode() {
    if (!previousBrowseState) {
      void loadRandomImages();
      setQuery("");
      return;
    }

    setBrowseMode(previousBrowseState.mode);
    setQuery(previousBrowseState.query);
    setImages(previousBrowseState.images);
    setOffset(previousBrowseState.offset);
    setHasMore(previousBrowseState.hasMore);
    setSelectedPortfolio(null);
    setPreviousBrowseState(null);
  }

  const searchDisabled = browseMode === "portfolio";

  return (
    <main className="relative flex min-h-screen bg-[#02040b] text-white">
      <VerticalNavbar />

      <div className="relative flex-1 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(30,64,175,0.14),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.14),transparent_30%),linear-gradient(to_bottom,#02040b,#040816,#02040b)]" />

        <div className="pointer-events-none absolute inset-0 opacity-70">
          <div className="absolute left-[8%] top-[12%] h-1 w-1 rounded-full bg-white/80 shadow-[0_0_10px_rgba(255,255,255,0.8)] animate-pulse" />
          <div className="absolute left-[18%] top-[28%] h-1.5 w-1.5 rounded-full bg-cyan-200/80 shadow-[0_0_12px_rgba(103,232,249,0.8)] animate-pulse" />
          <div className="absolute left-[32%] top-[18%] h-1 w-1 rounded-full bg-white/70 animate-pulse" />
          <div className="absolute left-[44%] top-[34%] h-1 w-1 rounded-full bg-fuchsia-200/70 animate-pulse" />
          <div className="absolute left-[58%] top-[20%] h-1.5 w-1.5 rounded-full bg-white/80 animate-pulse" />
          <div className="absolute left-[70%] top-[12%] h-1 w-1 rounded-full bg-cyan-200/80 animate-pulse" />
          <div className="absolute left-[82%] top-[26%] h-1 w-1 rounded-full bg-white/70 animate-pulse" />
          <div className="absolute left-[12%] top-[62%] h-1 w-1 rounded-full bg-white/80 animate-pulse" />
          <div className="absolute left-[24%] top-[74%] h-1.5 w-1.5 rounded-full bg-indigo-200/70 animate-pulse" />
          <div className="absolute left-[39%] top-[66%] h-1 w-1 rounded-full bg-white/70 animate-pulse" />
          <div className="absolute left-[55%] top-[78%] h-1 w-1 rounded-full bg-cyan-100/70 animate-pulse" />
          <div className="absolute left-[68%] top-[64%] h-1.5 w-1.5 rounded-full bg-white/80 animate-pulse" />
          <div className="absolute left-[78%] top-[82%] h-1 w-1 rounded-full bg-fuchsia-200/70 animate-pulse" />
          <div className="absolute left-[90%] top-[58%] h-1 w-1 rounded-full bg-white/60 animate-pulse" />
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-[1700px] flex-col gap-8 px-6 py-6 md:px-10">
          <section className="rounded-[34px] border border-white/10 bg-white/[0.04] px-6 py-8 backdrop-blur-sm">
            <div className="grid gap-8 xl:grid-cols-[1fr_620px] xl:items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-400/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-cyan-100">
                  <Images className="h-4 w-4" />
                  Universe Gallery
                </div>

                <h1 className="mt-5 text-4xl font-black text-white md:text-6xl">
                  Portfolios & Visual Archives
                </h1>
              </div>

              <div className="space-y-4">
                <div className="rounded-[28px] border border-white/10 bg-black/25 p-4 backdrop-blur-xl">
                  <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0b1020]/90 px-4 py-4">
                    <Search className="h-5 w-5 text-white/45" />
                    <input
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      disabled={searchDisabled}
                      placeholder={
                        searchDisabled
                          ? "Portfolio mode active"
                          : "Search portfolio or image metadata..."
                      }
                      className="w-full bg-transparent text-sm text-white placeholder:text-white/35 outline-none disabled:cursor-not-allowed disabled:opacity-50"
                    />

                    {browseMode === "portfolio" ? (
                      <button
                        type="button"
                        onClick={closePortfolioMode}
                        className="rounded-full border border-white/10 bg-white/5 p-2 text-white/70 transition hover:bg-white/10 hover:text-white"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    ) : query ? (
                      <button
                        type="button"
                        onClick={() => setQuery("")}
                        className="rounded-full p-1 text-white/45 transition hover:bg-white/10 hover:text-white/80"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    ) : null}
                  </div>

                  {selectedPortfolio ? (
                    <div className="mt-3 rounded-[20px] border border-fuchsia-300/15 bg-fuchsia-400/8 px-4 py-3 text-sm text-fuchsia-100">
                      Viewing portfolio: {selectedPortfolio.name}
                    </div>
                  ) : null}
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => setCreateOpen(true)}
                    className="inline-flex items-center justify-center gap-3 rounded-[24px] border border-cyan-300/20 bg-cyan-400/10 px-5 py-4 text-sm font-bold text-cyan-100 transition hover:bg-cyan-400/20"
                  >
                    <Plus className="h-5 w-5" />
                    Create Portfolio
                  </button>

                  <button
                    type="button"
                    onClick={() => setEditOpen(true)}
                    className="inline-flex items-center justify-center gap-3 rounded-[24px] border border-fuchsia-300/20 bg-fuchsia-400/10 px-5 py-4 text-sm font-bold text-fuchsia-100 transition hover:bg-fuchsia-400/20"
                  >
                    <PencilLine className="h-5 w-5" />
                    Edit Portfolio
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-[34px] border border-white/10 bg-black/25 p-6 backdrop-blur-xl">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <div className="text-xs font-black uppercase tracking-[0.2em] text-cyan-100">
                  {browseMode === "random"
                    ? "Random Portfolio Wall"
                    : browseMode === "search"
                      ? "Search Results"
                      : "Portfolio Images"}
                </div>
                <p className="mt-2 text-sm leading-7 text-white/60">
                  {browseMode === "random"
                    ? "Displaying up to 30 random images from random portfolios."
                    : browseMode === "search"
                      ? "Displaying matching gallery images in batches of 50."
                      : "Displaying images from the selected portfolio."}
                </p>
              </div>
            </div>

            {loading && images.length === 0 ? (
              <div className="rounded-[24px] border border-white/10 bg-black/20 px-4 py-8 text-sm text-white/50">
                Loading gallery...
              </div>
            ) : images.length > 0 ? (
              <>
                <div className="columns-1 gap-4 sm:columns-2 md:columns-3 xl:columns-4">
                  {images.map((image) => (
                    <div key={image.id} className="mb-4 break-inside-avoid">
                      <button
                        type="button"
                        onClick={() => setSelectedImage(image)}
                        className="group block w-full overflow-hidden rounded-[26px] border border-white/10 bg-black/20 text-left"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={image.imageUrl}
                          alt={image.altText || image.title || "Gallery image"}
                          className="w-full h-auto object-contain transition duration-500 group-hover:scale-[1.02]"
                        />
                      </button>
                    </div>
                  ))}
                </div>

                {hasMore ? (
                  <div className="mt-6 flex justify-center">
                    <button
                      type="button"
                      disabled={loading}
                      onClick={handleLoadMore}
                      className="rounded-2xl border border-cyan-300/20 bg-cyan-400/10 px-6 py-3 text-sm font-bold text-cyan-100 transition hover:bg-cyan-400/20 disabled:opacity-40"
                    >
                      {loading ? "Loading..." : "Display 50 More Images"}
                    </button>
                  </div>
                ) : null}
              </>
            ) : (
              <div className="rounded-[24px] border border-white/10 bg-black/20 px-4 py-8 text-sm text-white/50">
                No images found.
              </div>
            )}
          </section>
        </div>
      </div>

      <GalleryCreatePortfolioModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onSaved={() => {
          void loadRandomImages();
        }}
      />

      <GalleryEditPortfolioModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        onSaved={() => {
          if (browseMode === "portfolio" && selectedPortfolio) {
            void openPortfolioFromImage({
              id: "",
              portfolioId: selectedPortfolio.id,
              portfolioName: selectedPortfolio.name,
              title: null,
              altText: null,
              externalLink: null,
              sourceType: "EXTERNAL",
              imageUrl: "",
              storageKey: null,
              sortOrder: 0,
            });
          } else {
            void loadRandomImages();
          }
        }}
      />

      <GalleryLightboxModal
        image={selectedImage}
        onClose={() => setSelectedImage(null)}
        onOpenPortfolio={(image) => {
          void openPortfolioFromImage(image);
        }}
      />
    </main>
  );
}