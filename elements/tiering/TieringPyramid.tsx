"use client";

import { useState } from "react";
import { tierBrackets } from "./tieringWikiData";

export default function TieringPyramid() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const reversedBrackets = [...tierBrackets].reverse();

  const layerGradients = [
    "linear-gradient(135deg, rgba(244,63,94,0.34), rgba(236,72,153,0.16))",
    "linear-gradient(135deg, rgba(251,191,36,0.34), rgba(249,115,22,0.16))",
    "linear-gradient(135deg, rgba(217,70,239,0.34), rgba(168,85,247,0.16))",
    "linear-gradient(135deg, rgba(139,92,246,0.34), rgba(99,102,241,0.16))",
    "linear-gradient(135deg, rgba(59,130,246,0.34), rgba(34,211,238,0.16))",
    "linear-gradient(135deg, rgba(34,211,238,0.34), rgba(16,185,129,0.16))",
    "linear-gradient(135deg, rgba(74,222,128,0.34), rgba(45,212,191,0.16))",
    "linear-gradient(135deg, rgba(156,163,175,0.28), rgba(229,231,235,0.12))",
  ];

  return (
    <section id="tiering-pyramid" className="rounded-[30px] border border-white/15 bg-white/8 p-6 backdrop-blur-xl shadow-[0_0_30px_rgba(139,92,246,0.15)]">
      <div className="mb-5">
        <p className="mb-2 inline-flex rounded-full border border-cyan-300/20 bg-cyan-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100">
          Tier Brackets
        </p>
        <h2 className="text-3xl font-black text-white">
          Navigate the scaling pyramid
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-white/65">
          Hover a layer to highlight its bracket. Click it to jump to the full section below.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[560px_1fr] lg:items-center">
        <div className="mx-auto flex w-full max-w-140 justify-center">
          <div
            className="relative flex w-full max-w-107.5 flex-col items-center gap-0.75 py-6"
            style={{
              perspective: "1400px",
            }}
          >
            <div
              className="relative flex w-full flex-col items-center gap-0.75"
              style={{
                transform: "rotateX(16deg) rotateY(12deg)",
                transformStyle: "preserve-3d",
              }}
            >
              {reversedBrackets.map((bracket, index) => {
                const isHovered = hoveredId === bracket.id;
                const width = 30 + index * 10;
                const background = layerGradients[index] ?? layerGradients[layerGradients.length - 1];

                return (
                  <a
                    key={bracket.id}
                    href={`#${bracket.id}`}
                    onMouseEnter={() => setHoveredId(bracket.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    className="group relative flex h-16 items-center justify-center overflow-hidden border transition-all duration-300"
                    style={{
                      width: `${width}%`,
                      clipPath: "polygon(8% 0%, 92% 0%, 100% 100%, 0% 100%)",
                      borderColor: isHovered
                        ? "rgba(255,255,255,0.6)"
                        : "rgba(255,255,255,0.12)",
                      background,
                      transform: isHovered
                        ? "translateZ(28px) translateY(-4px) scale(1.03)"
                        : "translateZ(0px) translateY(0px) scale(1)",
                      boxShadow: isHovered
                        ? "0 0 40px rgba(255,255,255,0.25)"
                        : "0 10px 20px rgba(0,0,0,0.2)",
                    }}
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.15),transparent_45%)]" />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2.5 bg-black/15 blur-[2px]" />

                    <div className="relative z-10 flex w-full flex-col items-center justify-center px-3 text-center">
                      <div
                        className="w-full font-black uppercase text-white"
                        style={{
                          fontSize: "clamp(0.6rem, 1.1vw, 0.9rem)",
                          letterSpacing: "0.12em",
                          lineHeight: "1.1",
                        }}
                        title={bracket.title}
                      >
                        {bracket.title}
                      </div>

                      <div
                        className="mt-1 w-full uppercase text-white/70"
                        style={{
                          fontSize: "clamp(0.5rem, 0.9vw, 0.7rem)",
                          letterSpacing: "0.14em",
                          lineHeight: "1.1",
                        }}
                        title={bracket.range}
                      >
                        {bracket.range}
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
          <h3 className="text-xl font-black text-white">
            {hoveredId
              ? tierBrackets.find((item) => item.id === hoveredId)?.title
              : "Hover a bracket"}
          </h3>

          <p className="mt-3 text-sm leading-7 text-white/65">
            {hoveredId
              ? tierBrackets.find((item) => item.id === hoveredId)?.description
              : "Each layer groups multiple tiers together. Use the pyramid as a quick navigation map for the full wiki below."}
          </p>
        </div>
      </div>
    </section>
  );
}