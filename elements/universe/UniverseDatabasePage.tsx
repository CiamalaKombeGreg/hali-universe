"use client";

import Link from "next/link";
import { Eye, PenSquare, Search } from "lucide-react";
import { useEffect, useState } from "react";
import VerticalNavbar from "@/elements/home/VerticalNavbar";

type DatabaseItem = {
  id: string;
  name: string;
  slug: string;
  entityKind: "WORLD" | "LOCATION";
  type: string;
  canonStatus?: string | null;
  visibilityStatus?: string | null;
  isPublished?: boolean;
  bannerImage?: { url: string } | null;
};

export default function UniverseDatabasePage() {
  const [query, setQuery] = useState("");
  const [entityKind, setEntityKind] = useState<"ALL" | "WORLD" | "LOCATION">("ALL");
  const [canonFilter, setCanonFilter] = useState("");
  const [items, setItems] = useState<DatabaseItem[]>([]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (entityKind !== "ALL") params.set("entityKind", entityKind);
    if (canonFilter) params.set("canonStatus", canonFilter);

    fetch(`/api/universe-database/search?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => setItems(data.results ?? []))
      .catch(() => setItems([]));
  }, [query, entityKind, canonFilter]);

  return (
    <main className="relative flex min-h-screen bg-[#02040b] text-white">
      <VerticalNavbar />

      <div className="relative flex-1 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(30,64,175,0.14),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.14),transparent_30%),linear-gradient(to_bottom,#02040b,#040816,#02040b)]" />

        <div className="relative z-10 mx-auto w-full max-w-[1650px] px-6 py-6 md:px-10">
          <section className="rounded-[30px] border border-white/10 bg-black/25 p-6 backdrop-blur-xl">
            <h1 className="text-4xl font-black text-white">World Database</h1>

            <div className="mt-6 grid gap-4 lg:grid-cols-4">
              <div className="relative lg:col-span-2">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by name..."
                  className="w-full rounded-2xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-white outline-none"
                />
              </div>

              <select
                value={entityKind}
                onChange={(e) => {
                  setEntityKind(e.target.value as "ALL" | "WORLD" | "LOCATION");
                }}
                className="form-select-dark w-full rounded-2xl px-4 py-3 text-white outline-none"
              >
                <option value="ALL">All entries</option>
                <option value="WORLD">Universe entries</option>
                <option value="LOCATION">Locations</option>
              </select>

              <select
                value={canonFilter}
                onChange={(e) => setCanonFilter(e.target.value)}
                className="form-select-dark w-full rounded-2xl px-4 py-3 text-white outline-none"
              >
                <option value="">All canon states</option>
                <option value="CANON">Canon</option>
                <option value="SEMI_CANON">Semi-Canon</option>
                <option value="NON_CANON">Non-Canon</option>
                <option value="ALTERNATE_CANON">Alternate Canon</option>
              </select>
            </div>
          </section>

          <section className="mt-6 rounded-[30px] border border-white/10 bg-black/25 p-6 backdrop-blur-xl">
            <div className="space-y-4">
              {items.length === 0 ? (
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white/55">
                  No universe or location entries found.
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={`${item.entityKind}-${item.id}`}
                    className="flex items-center gap-4 rounded-[24px] border border-white/10 bg-white/5 p-4"
                  >
                    <div className="h-20 w-20 overflow-hidden rounded-2xl border border-white/10 bg-black/20">
                      {item.bannerImage?.url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={item.bannerImage.url}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-xs text-white/35">
                          No image
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="text-lg font-black text-white">{item.name}</div>
                      <div className="mt-1 text-sm text-white/60">
                        {item.entityKind === "WORLD" ? "Universe Entry" : "Location"} · {item.type}
                        {item.canonStatus ? ` · ${item.canonStatus}` : ""}
                        {item.visibilityStatus ? ` · ${item.visibilityStatus}` : ""}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {item.isPublished ? (
                        <Link
                          href={
                            item.entityKind === "WORLD"
                              ? `/universe/wiki/${item.slug}?returnTo=${encodeURIComponent("/universe/manage/database")}`
                              : `/universe/wiki/location/${item.slug}?returnTo=${encodeURIComponent("/universe/manage/database")}`
                          }
                          className="inline-flex items-center gap-2 rounded-xl border border-cyan-300/20 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-100"
                        >
                          <Eye className="h-4 w-4" />
                          Preview
                        </Link>
                      ) : null}

                      <Link
                        href={
                          item.entityKind === "WORLD"
                            ? `/universe/manage/database/edit/world/${item.slug}`
                            : `/universe/manage/database/edit/location/${item.slug}`
                        }
                        className="inline-flex items-center gap-2 rounded-xl border border-fuchsia-300/20 bg-fuchsia-400/10 px-4 py-2 text-sm font-semibold text-fuchsia-100"
                      >
                        <PenSquare className="h-4 w-4" />
                        Edit
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}