"use client";

import Link from "next/link";
import { ExternalLink, FolderOpen, X } from "lucide-react";
import type { GalleryDisplayImage } from "./galleryTypes";

type Props = {
  image: GalleryDisplayImage | null;
  onClose: () => void;
  onOpenPortfolio: (image: GalleryDisplayImage) => void;
};

export default function GalleryLightboxModal({
  image,
  onClose,
  onOpenPortfolio,
}: Props) {
  if (!image) return null;

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center bg-black/80 px-4 py-6 backdrop-blur-md">
      <div className="relative max-h-full w-full max-w-6xl overflow-hidden rounded-[30px] border border-white/10 bg-[#07111f]/95 shadow-[0_24px_80px_rgba(0,0,0,0.55)]">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-20 rounded-full border border-white/10 bg-black/35 p-2 text-white/75 transition hover:bg-white/10 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="max-h-[78vh] overflow-auto p-4 md:p-6">
          <div className="overflow-hidden rounded-[24px] border border-white/10 bg-black/25">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image.imageUrl}
              alt={image.altText || image.title || "Gallery image"}
              className="mx-auto max-h-[72vh] w-auto max-w-full object-contain"
            />
          </div>

          <div className="mt-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-black text-white">
                {image.title || "Untitled Image"}
              </h2>
              <p className="mt-1 text-sm text-white/55">
                Portfolio: {image.portfolioName}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {image.externalLink ? (
                <Link
                  href={image.externalLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-2xl border border-cyan-300/20 bg-cyan-400/10 px-4 py-3 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-400/20"
                >
                  <ExternalLink className="h-4 w-4" />
                  Open Link
                </Link>
              ) : null}

              <button
                type="button"
                onClick={() => onOpenPortfolio(image)}
                className="inline-flex items-center gap-2 rounded-2xl border border-fuchsia-300/20 bg-fuchsia-400/10 px-4 py-3 text-sm font-semibold text-fuchsia-100 transition hover:bg-fuchsia-400/20"
              >
                <FolderOpen className="h-4 w-4" />
                Open Portfolio
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}