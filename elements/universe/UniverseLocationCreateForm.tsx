"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import UniverseContentSectionsEditor from "./UniverseContentSectionsEditor";
import type { UniverseContentSection } from "./universeContentTypes";
import type {
  LinkedLocationParentPreview,
  LocationCanonStatusValue,
  LocationEntryCreatePayload,
  LocationOriginTypeValue,
  LocationTypeValue,
} from "./locationTypes";
import type { UploadedWorldImage } from "./worldEntryTypes";

type UniverseLocationFormInitialData = {
  id: string;
  name: string;
  slug: string;
  description: string;
  locationType: LocationTypeValue;
  originType: LocationOriginTypeValue;
  canonStatus: LocationCanonStatusValue | "";
  orderIndex: string;
  coordinateNote: string;
  parent: LinkedLocationParentPreview | null;
  infoSections: UniverseContentSection[];
  notes: string[];
  bannerImage: UploadedWorldImage | null;
};

type UniverseLocationCreateFormProps = {
  mode?: "create" | "edit";
  initialData?: UniverseLocationFormInitialData;
};

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

const locationTypes: { value: LocationTypeValue; label: string }[] = [
  { value: "WORLD", label: "World" },
  { value: "PLANET", label: "Planet" },
  { value: "CONTINENT", label: "Continent" },
  { value: "COUNTRY", label: "Country" },
  { value: "REGION", label: "Region" },
  { value: "CITY", label: "City" },
  { value: "BUILDING", label: "Building" },
  { value: "ARENA", label: "Arena" },
  { value: "REALM", label: "Realm" },
  { value: "POCKET_DIMENSION", label: "Pocket Dimension" },
  { value: "CONCEPTUAL_SPACE", label: "Conceptual Space" },
];

const originTypes: { value: LocationOriginTypeValue; label: string }[] = [
  { value: "ORIGINAL", label: "Original" },
  { value: "CANON", label: "Canon" },
  { value: "SPINOFF_DERIVED", label: "Spinoff-derived" },
];

const canonOptions: { value: LocationCanonStatusValue; label: string }[] = [
  { value: "CANON", label: "Canon" },
  { value: "SEMI_CANON", label: "Semi-Canon" },
  { value: "NON_CANON", label: "Non-Canon" },
  { value: "ALTERNATE_CANON", label: "Alternate Canon" },
];

export default function UniverseLocationCreateForm({
  mode = "create",
  initialData,
}: UniverseLocationCreateFormProps) {
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [locationType, setLocationType] = useState<LocationTypeValue>("CITY");
  const [originType, setOriginType] = useState<LocationOriginTypeValue>("CANON");
  const [canonStatus, setCanonStatus] = useState<LocationCanonStatusValue | "">("");
  const [orderIndex, setOrderIndex] = useState("");
  const [coordinateNote, setCoordinateNote] = useState("");

  const [parentSearch, setParentSearch] = useState("");
  const [parentResults, setParentResults] = useState<LinkedLocationParentPreview[]>([]);
  const [selectedParent, setSelectedParent] = useState<LinkedLocationParentPreview | null>(null);

  const [infoSections, setInfoSections] = useState<UniverseContentSection[]>([]);
  const [notes, setNotes] = useState<string[]>([""]);

  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const bannerInputRef = useRef<HTMLInputElement | null>(null);

  const slug = useMemo(() => slugify(name), [name]);

  const canPublish = useMemo(() => {
    if (!name.trim()) return false;
    if (!slug) return false;
    if (!description.trim()) return false;
    if (!selectedParent) return false;
    if (!bannerFile && !bannerPreview) return false;
    return true;
  }, [name, slug, description, selectedParent, bannerFile, bannerPreview]);

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

    const image: UploadedWorldImage = {
      id: crypto.randomUUID(),
      url: data.fileUrl,
      storageKey: data.objectName,
      isPrimary: true,
    };

    return image;
  }

  async function uploadInfoSectionImages(sections: UniverseContentSection[]) {
    const nextSections: UniverseContentSection[] = [];

    for (const section of sections) {
      const nextItems = [];

      for (const item of section.items) {
        if (item.type === "image" && item.localFile) {
          const uploaded = await uploadFile(item.localFile);
          nextItems.push({
            ...item,
            imageId: uploaded.id,
            imageUrl: uploaded.url,
            storageKey: uploaded.storageKey,
            localFile: null,
          });
        } else {
          nextItems.push(item);
        }
      }

      nextSections.push({
        ...section,
        items: nextItems,
      });
    }

    return nextSections;
  }

  function handleBannerSelection(file: File | null) {
    if (!file) return;

    if (bannerPreview) {
      URL.revokeObjectURL(bannerPreview);
    }

    const preview = URL.createObjectURL(file);
    setBannerFile(file);
    setBannerPreview(preview);
  }

  async function searchParents(query: string) {
    if (!query.trim()) {
      setParentResults([]);
      return;
    }

    const response = await fetch(
      `/api/location-parents/search?q=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
      setParentResults([]);
      return;
    }

    const data = await response.json();
    setParentResults(data.results ?? []);
  }

  async function handleDelete() {
    if (mode !== "edit" || !initialData) return;

    const confirmed = window.confirm(
      "Are you sure you want to permanently delete this location?"
    );

    if (!confirmed) return;

    const response = await fetch(`/api/location-entries/${initialData.slug}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      alert("Failed to delete location.");
      return;
    }

    router.push("/universe/manage/database");
  }

  async function submit() {
    if (!bannerFile && !bannerPreview) {
      alert("Banner image is required.");
      return;
    }

    if (!selectedParent) {
      alert("A valid parent is required.");
      return;
    }

    setSaving(true);

    try {
      const uploadedBanner =
        bannerFile != null
          ? await uploadFile(bannerFile)
          : initialData?.bannerImage ?? null;
      const uploadedInfoSections = await uploadInfoSectionImages(infoSections);

      const cleanedInfoSections = uploadedInfoSections.map((section) => ({
        ...section,
        items: section.items.map((item) => {
          if (item.type === "image") {
            const { localFile: _localFile, ...safeItem } = item;
            return safeItem;
          }
          return item;
        }),
      }));

      const payload: LocationEntryCreatePayload = {
        name,
        slug,
        description,
        locationType,
        originType,
        canonStatus: canonStatus || null,
        orderIndex: orderIndex ? Number(orderIndex) : null,
        coordinateNote: coordinateNote || null,
        parentWorldId:
          selectedParent.kind === "WORLD_ENTRY" ? selectedParent.id : null,
        parentLocationId:
          selectedParent.kind === "LOCATION" ? selectedParent.id : null,
        bannerImage: uploadedBanner,
        infoSections: cleanedInfoSections,
        notes: notes.filter((note) => note.trim().length > 0),
      };

      const endpoint =
        mode === "edit" && initialData
          ? `/api/location-entries/${initialData.slug}`
          : "/api/location-entries";

      const response = await fetch(endpoint, {
        method: mode === "edit" ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => null);
        throw new Error(error?.error || "Failed to create location");
      }

      const data = await response.json();
      router.push(`/universe/wiki/location/${data.entry.slug}`);
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "Failed to create location.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
      <section className="space-y-6">
        <section className="rounded-[30px] border border-white/10 bg-black/25 p-6 backdrop-blur-xl">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-white/75">
                Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-white/75">
                Location type
              </label>
              <select
                value={locationType}
                onChange={(e) => setLocationType(e.target.value as LocationTypeValue)}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
              >
                {locationTypes.map((option) => (
                  <option key={option.value} value={option.value} className="bg-[#081120]">
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-white/75">
                Origin type
              </label>
              <select
                value={originType}
                onChange={(e) => setOriginType(e.target.value as LocationOriginTypeValue)}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
              >
                {originTypes.map((option) => (
                  <option key={option.value} value={option.value} className="bg-[#081120]">
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-white/75">
                Canon status
              </label>
              <select
                value={canonStatus}
                onChange={(e) => setCanonStatus(e.target.value as LocationCanonStatusValue | "")}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
              >
                <option value="" className="bg-[#081120]">Optional</option>
                {canonOptions.map((option) => (
                  <option key={option.value} value={option.value} className="bg-[#081120]">
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-white/75">
                Order index
              </label>
              <input
                type="number"
                min={0}
                value={orderIndex}
                onChange={(e) => setOrderIndex(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-white/75">
                Coordinates / placement note
              </label>
              <textarea
                value={coordinateNote}
                onChange={(e) => setCoordinateNote(e.target.value)}
                rows={3}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-white/75">
                Parent *
              </label>

              <input
                value={parentSearch}
                onChange={async (e) => {
                  setParentSearch(e.target.value);
                  await searchParents(e.target.value);
                }}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
                placeholder="Search valid world entries or locations..."
              />

              <div className="mt-3 space-y-2">
                {parentResults.map((item) => (
                  <button
                    key={`${item.kind}-${item.id}`}
                    type="button"
                    onClick={() => {
                      setSelectedParent(item);
                      setParentSearch(item.name);
                      setParentResults([]);
                    }}
                    className="block w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-white/75 transition hover:bg-white/10"
                  >
                    {item.name} — {item.kind === "LOCATION" ? "Location" : item.type}
                  </button>
                ))}
              </div>

              {selectedParent ? (
                <div className="mt-4 group inline-flex items-center gap-2 rounded-full border border-fuchsia-300/20 bg-fuchsia-400/10 px-3 py-1.5 text-xs font-semibold text-fuchsia-100">
                  <span>
                    Parent: {selectedParent.name} —{" "}
                    {selectedParent.kind === "LOCATION" ? "Location" : selectedParent.type}
                  </span>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedParent(null);
                      setParentSearch("");
                    }}
                    className="hidden rounded-full p-0.5 text-fuchsia-100/80 transition hover:bg-fuchsia-300/20 hover:text-white group-hover:inline-flex"
                    aria-label="Remove selected parent"
                    title="Remove selected parent"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ) : null}
            </div>

            <div className="md:col-span-2">
              <div className="mb-3 flex items-center justify-between">
                <label className="block text-sm font-semibold text-white/75">Notes</label>
                <button
                  type="button"
                  onClick={() => setNotes((prev) => [...prev, ""])}
                  className="rounded-xl border border-cyan-300/20 bg-cyan-400/10 px-3 py-2 text-xs font-semibold text-cyan-100 transition hover:bg-cyan-400/20"
                >
                  Add note
                </button>
              </div>

              <div className="space-y-3">
                {notes.map((note, index) => (
                  <div
                    key={index}
                    className="rounded-2xl border border-white/10 bg-white/5 p-3"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-[0.16em] text-white/45">
                        Note {index + 1}
                      </span>

                      {notes.length > 1 ? (
                        <button
                          type="button"
                          onClick={() => setNotes((prev) => prev.filter((_, i) => i !== index))}
                          className="rounded-lg border border-rose-300/20 bg-rose-400/10 px-2 py-1 text-[11px] font-semibold text-rose-100 transition hover:bg-rose-400/20"
                        >
                          Remove
                        </button>
                      ) : null}
                    </div>

                    <textarea
                      value={note}
                      onChange={(e) =>
                        setNotes((prev) =>
                          prev.map((item, i) => (i === index ? e.target.value : item))
                        )
                      }
                      rows={3}
                      className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none"
                      placeholder={`Write note ${index + 1}...`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <UniverseContentSectionsEditor
          sections={infoSections}
          onChange={setInfoSections}
        />
      </section>

      <section className="space-y-6">
        <section className="rounded-[30px] border border-white/10 bg-black/25 p-6 backdrop-blur-xl">
          <h2 className="text-2xl font-black text-white">Visual</h2>

          <div className="mt-5">
            <input
              ref={bannerInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => handleBannerSelection(e.target.files?.[0] ?? null)}
              className="hidden"
            />

            <button
              type="button"
              onClick={() => bannerInputRef.current?.click()}
              className="group flex min-h-[280px] w-full flex-col items-center justify-center rounded-[24px] border border-dashed border-fuchsia-300/25 bg-fuchsia-400/5 p-6 text-center transition hover:border-fuchsia-300/45 hover:bg-fuchsia-400/10"
            >
              {bannerPreview ? (
                <div className="w-full">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={bannerPreview}
                    alt="Location preview"
                    className="mx-auto max-h-[320px] rounded-2xl object-contain"
                  />
                  <p className="mt-4 text-sm font-semibold text-fuchsia-100">
                    {bannerFile?.name}
                  </p>
                  <p className="mt-1 text-xs text-white/50">Click to replace</p>
                </div>
              ) : (
                <>
                  <div className="mb-4 text-lg font-black text-fuchsia-100">
                    Add Location Visual
                  </div>
                  <p className="max-w-sm text-sm leading-6 text-white/60">
                    Select the main visual, map, or image for this location.
                  </p>
                </>
              )}
            </button>
          </div>
        </section>

        <section className="rounded-[30px] border border-white/10 bg-black/25 p-6 backdrop-blur-xl">
          <h2 className="text-2xl font-black text-white">Validation rules</h2>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-white/65">
            <li>• A location cannot belong directly to an empty universe.</li>
            <li>• A location may belong to a valid world layer or another location.</li>
            <li>• Canon locations cannot be placed under purely fanmade sources unless adapted logically.</li>
            <li>• Nesting is infinite as long as each parent is valid.</li>
          </ul>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              disabled={saving || !canPublish}
              onClick={submit}
              className="rounded-2xl border border-emerald-300/20 bg-emerald-400/10 px-5 py-3 text-sm font-bold text-emerald-100 disabled:opacity-40"
            >
              {mode === "edit" ? "Save Location Changes" : "Create Location"}
            </button>

            {mode === "edit" ? (
              <button
                type="button"
                onClick={handleDelete}
                className="rounded-2xl border border-rose-300/20 bg-rose-400/10 px-5 py-3 text-sm font-bold text-rose-100"
              >
                Delete
              </button>
            ) : null}
          </div>
        </section>
      </section>
    </div>
  );
}