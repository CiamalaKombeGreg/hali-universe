"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import UniverseContentSectionsEditor from "./UniverseContentSectionsEditor";
import type { UniverseContentSection } from "./universeContentTypes";
import type {
  LinkedAbilityPreview,
  LinkedWorldPreview,
  UploadedWorldImage,
  WorldCanonStatusValue,
  WorldCosmologyTypeValue,
  WorldEntryCreatePayload,
  WorldEntryTypeValue,
  WorldVisibilityStatusValue,
} from "./worldEntryTypes";

type WorldEntryFormInitialData = {
  id: string;
  name: string;
  slug: string;
  description: string;
  summary: string;
  type: WorldEntryTypeValue;
  canonStatus: WorldCanonStatusValue | "";
  cosmologyType: WorldCosmologyTypeValue | "";
  visibilityStatus: WorldVisibilityStatusValue;
  isPublished: boolean;

  sourceNote: string;
  inspirationNote: string;
  officialPublisher: string;
  creator: string;
  branchDescription: string;
  divergenceNote: string;
  approvalNote: string;
  sourceSeriesNote: string;
  installmentOrder: string;
  installmentCode: string;

  isStandaloneContainer: boolean;
  allowOriginalCreations: boolean;
  allowOfficialSeries: boolean;
  hasMultipleContinuities: boolean;
  isFullyIndependent: boolean;
  officialCrossover: boolean;

  parent: LinkedWorldPreview | null;
  sourceEntries: LinkedWorldPreview[];
  linkedAbilities: LinkedAbilityPreview[];
  tags: string[];
  infoSections: UniverseContentSection[];
  notes: string[];

  bannerImage: UploadedWorldImage | null;
};

type UniverseEntryCreateFormProps = {
  mode?: "create" | "edit";
  initialData?: WorldEntryFormInitialData;
};

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

const typeOptions: { value: WorldEntryTypeValue; label: string }[] = [
  { value: "UNIVERSE", label: "Universe" },
  { value: "SERIES_COLLECTION", label: "Series Collection" },
  { value: "CONTINUITY", label: "Continuity" },
  { value: "INSTALLMENT", label: "Installment" },
  { value: "SPINOFF", label: "Spinoff" },
  { value: "FANMADE", label: "Fanmade" },
  { value: "ORIGINAL_CREATION", label: "Original Creation" },
  { value: "CROSSOVER", label: "Crossover" },
];

const canonOptions: { value: WorldCanonStatusValue; label: string }[] = [
  { value: "CANON", label: "Canon" },
  { value: "SEMI_CANON", label: "Semi-Canon" },
  { value: "NON_CANON", label: "Non-Canon" },
  { value: "ALTERNATE_CANON", label: "Alternate Canon" },
];

const cosmologyOptions: { value: WorldCosmologyTypeValue; label: string }[] = [
  { value: "SINGLE_UNIVERSE", label: "Single Universe" },
  { value: "MULTIVERSE", label: "Multiverse" },
  { value: "COMPLEX_MULTIVERSE", label: "Complex Multiverse" },
  { value: "HIGHER_DIMENSIONAL_STRUCTURE", label: "Higher-Dimensional Structure" },
];

export default function UniverseEntryCreateForm({
  mode = "create",
  initialData,
}: UniverseEntryCreateFormProps) {
  const router = useRouter();

  const [type, setType] = useState<WorldEntryTypeValue>("UNIVERSE");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [summary, setSummary] = useState("");
  const [canonStatus, setCanonStatus] = useState<WorldCanonStatusValue | "">("");
  const [cosmologyType, setCosmologyType] = useState<WorldCosmologyTypeValue | "">("");
  const [visibilityStatus, setVisibilityStatus] =
    useState<WorldVisibilityStatusValue>("DRAFT");

  const [sourceNote, setSourceNote] = useState("");
  const [inspirationNote, setInspirationNote] = useState("");
  const [officialPublisher, setOfficialPublisher] = useState("");
  const [creator, setCreator] = useState("");
  const [branchDescription, setBranchDescription] = useState("");
  const [divergenceNote, setDivergenceNote] = useState("");
  const [approvalNote, setApprovalNote] = useState("");
  const [sourceSeriesNote, setSourceSeriesNote] = useState("");
  const [installmentOrder, setInstallmentOrder] = useState("");
  const [installmentCode, setInstallmentCode] = useState("");

  const [isStandaloneContainer, setIsStandaloneContainer] = useState(true);
  const [allowOriginalCreations, setAllowOriginalCreations] = useState(true);
  const [allowOfficialSeries, setAllowOfficialSeries] = useState(true);
  const [hasMultipleContinuities, setHasMultipleContinuities] = useState(false);
  const [isFullyIndependent, setIsFullyIndependent] = useState(true);
  const [officialCrossover, setOfficialCrossover] = useState(false);

  const [parentSearch, setParentSearch] = useState("");
  const [parentResults, setParentResults] = useState<LinkedWorldPreview[]>([]);
  const [selectedParent, setSelectedParent] = useState<LinkedWorldPreview | null>(null);

  const [sourceSearch, setSourceSearch] = useState("");
  const [sourceResults, setSourceResults] = useState<LinkedWorldPreview[]>([]);
  const [sourceEntries, setSourceEntries] = useState<LinkedWorldPreview[]>([]);

  const [abilitySearch, setAbilitySearch] = useState("");
  const [abilityResults, setAbilityResults] = useState<LinkedAbilityPreview[]>([]);
  const [linkedAbilities, setLinkedAbilities] = useState<LinkedAbilityPreview[]>([]);

  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const [infoSections, setInfoSections] = useState<UniverseContentSection[]>([]);
  const [notes, setNotes] = useState<string[]>([""]);

  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const bannerInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (mode !== "edit" || !initialData) return;

    setType(initialData.type);
    setName(initialData.name);
    setDescription(initialData.description);
    setSummary(initialData.summary);
    setCanonStatus(initialData.canonStatus);
    setCosmologyType(initialData.cosmologyType);
    setVisibilityStatus(initialData.visibilityStatus);

    setSourceNote(initialData.sourceNote);
    setInspirationNote(initialData.inspirationNote);
    setOfficialPublisher(initialData.officialPublisher);
    setCreator(initialData.creator);
    setBranchDescription(initialData.branchDescription);
    setDivergenceNote(initialData.divergenceNote);
    setApprovalNote(initialData.approvalNote);
    setSourceSeriesNote(initialData.sourceSeriesNote);
    setInstallmentOrder(initialData.installmentOrder);
    setInstallmentCode(initialData.installmentCode);

    setIsStandaloneContainer(initialData.isStandaloneContainer);
    setAllowOriginalCreations(initialData.allowOriginalCreations);
    setAllowOfficialSeries(initialData.allowOfficialSeries);
    setHasMultipleContinuities(initialData.hasMultipleContinuities);
    setIsFullyIndependent(initialData.isFullyIndependent);
    setOfficialCrossover(initialData.officialCrossover);

    setSelectedParent(initialData.parent);
    setParentSearch(initialData.parent?.name ?? "");
    setSourceEntries(initialData.sourceEntries);
    setLinkedAbilities(initialData.linkedAbilities);
    setTags(initialData.tags);
    setInfoSections(initialData.infoSections);
    setNotes(initialData.notes.length > 0 ? initialData.notes : [""]);

    if (initialData.bannerImage?.url) {
      setBannerPreview(initialData.bannerImage.url);
    }
  }, [mode, initialData]);

  const slug = useMemo(() => slugify(name), [name]);

  const requiresParent =
    type === "CONTINUITY" ||
    type === "INSTALLMENT" ||
    type === "SPINOFF" ||
    type === "FANMADE";

  const canHaveOptionalParent =
    type === "SERIES_COLLECTION" || type === "ORIGINAL_CREATION";

  const canPublish = useMemo(() => {
    if (!name.trim()) return false;
    if (!slug) return false;
    if (!description.trim()) return false;
    if (!bannerFile && !bannerPreview) return false;

    if (requiresParent && !selectedParent) return false;
    if (type === "CROSSOVER" && sourceEntries.length < 2) return false;
    if (type === "FANMADE" && !creator.trim()) return false;
    if (type === "SPINOFF" && !officialPublisher.trim()) return false;
    if (type === "CONTINUITY" && !branchDescription.trim()) return false;
    if (type === "INSTALLMENT" && !installmentCode.trim()) return false;

    return true;
  }, [
    name,
    slug,
    description,
    bannerFile,
    bannerPreview,
    requiresParent,
    selectedParent,
    type,
    sourceEntries.length,
    creator,
    officialPublisher,
    branchDescription,
    installmentCode,
  ]);

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

  async function handleDelete() {
    if (mode !== "edit" || !initialData) return;

    const confirmed = window.confirm(
      "Are you sure you want to permanently delete this world entry?"
    );

    if (!confirmed) return;

    const response = await fetch(`/api/world-entries/${initialData.slug}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      alert("Failed to delete world entry.");
      return;
    }

    router.push("/universe/manage/database");
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

  async function searchWorldEntries(
    query: string,
    setter: (rows: LinkedWorldPreview[]) => void
  ) {
    if (!query.trim()) {
      setter([]);
      return;
    }

    const response = await fetch(
      `/api/world-entries/search?q=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
      setter([]);
      return;
    }

    const data = await response.json();
    setter(data.results ?? []);
  }

  async function searchAbilities(query: string) {
    if (!query.trim()) {
      setAbilityResults([]);
      return;
    }

    const response = await fetch(
      `/api/ability-nodes/search?q=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
      setAbilityResults([]);
      return;
    }

    const data = await response.json();
    setAbilityResults(data.results ?? []);
  }

  async function submit(status: WorldVisibilityStatusValue) {
    if (!bannerFile && !bannerPreview) {
      alert("Banner image is required.");
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

      const payload: WorldEntryCreatePayload = {
        name,
        slug,
        description,
        summary,
        type,
        canonStatus: canonStatus || null,
        cosmologyType: cosmologyType || null,
        visibilityStatus: status,
        isPublished: status === "PUBLISHED",

        sourceNote,
        inspirationNote,
        officialPublisher,
        creator,
        branchDescription,
        divergenceNote,
        approvalNote,
        sourceSeriesNote,
        installmentOrder: installmentOrder ? Number(installmentOrder) : null,
        installmentCode: installmentCode || null,

        isStandaloneContainer,
        allowOriginalCreations,
        allowOfficialSeries,
        hasMultipleContinuities,
        isFullyIndependent,
        officialCrossover,

        parentId: selectedParent?.id ?? null,
        sourceEntryIds: sourceEntries.map((entry) => entry.id),
        tags,
        bannerImage: uploadedBanner,
        linkedAbilityIds: linkedAbilities.map((item) => item.id),
        infoSections: cleanedInfoSections,
        notes: notes.filter((note) => note.trim().length > 0),
      };

      const endpoint =
        mode === "edit" && initialData
          ? `/api/world-entries/${initialData.slug}`
          : "/api/world-entries";

      const response = await fetch(endpoint, {
        method: mode === "edit" ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => null);
        throw new Error(error?.error || "Failed to create world entry");
      }

      const data = await response.json();

      if (status === "DRAFT") {
        router.push("/universe/manage/database");
      } else {
        router.push(`/universe/wiki/${data.entry.slug}`);
      }
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "Failed to create world entry.");
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
              <label className="mb-2 block text-sm font-semibold text-white/75">Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as WorldEntryTypeValue)}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
              >
                {typeOptions.map((option) => (
                  <option key={option.value} value={option.value} className="bg-[#081120]">
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-white/75">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-white/75">Slug</label>
              <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-cyan-100">
                {slug || "Slug will appear here"}
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-white/75">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-white/75">Summary</label>
              <textarea
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                rows={3}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-white/75">Canon status</label>
              <select
                value={canonStatus}
                onChange={(e) => setCanonStatus(e.target.value as WorldCanonStatusValue | "")}
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
              <label className="mb-2 block text-sm font-semibold text-white/75">Visibility</label>
              <select
                value={visibilityStatus}
                onChange={(e) => setVisibilityStatus(e.target.value as WorldVisibilityStatusValue)}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
              >
                <option value="DRAFT" className="bg-[#081120]">Draft</option>
                <option value="PUBLISHED" className="bg-[#081120]">Published</option>
              </select>
            </div>

            {(type === "UNIVERSE" || type === "ORIGINAL_CREATION") && (
              <div>
                <label className="mb-2 block text-sm font-semibold text-white/75">Cosmology type</label>
                <select
                  value={cosmologyType}
                  onChange={(e) => setCosmologyType(e.target.value as WorldCosmologyTypeValue | "")}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
                >
                  <option value="" className="bg-[#081120]">Optional</option>
                  {cosmologyOptions.map((option) => (
                    <option key={option.value} value={option.value} className="bg-[#081120]">
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {(requiresParent || canHaveOptionalParent) && (
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-white/75">
                  Parent {requiresParent ? "*" : "(optional)"}{" "}
                  {type === "CONTINUITY"
                    ? "— must be a Series Collection or a Original Creation"
                    : type === "INSTALLMENT"
                      ? "— must be a Continuity, a Spinoff or a Fanmade"
                      : type === "SPINOFF"
                        ? "— must be a Series Collection or an Original Creation"
                        : type === "FANMADE"
                          ? "— must be a Series Collection"
                          : ""}
                </label>

                <input
                  value={parentSearch}
                  onChange={async (e) => {
                    setParentSearch(e.target.value);
                    await searchWorldEntries(e.target.value, setParentResults);
                  }}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
                  placeholder="Search parent world entry..."
                />

                <div className="mt-3 space-y-2">
                  {parentResults.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setSelectedParent(item);
                        setParentSearch(item.name);
                        setParentResults([]);
                      }}
                      className="block w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-white/75 transition hover:bg-white/10"
                    >
                      {item.name} — {item.type}
                    </button>
                  ))}
                </div>

                {selectedParent ? (
                  <div className="mt-3 rounded-xl border border-cyan-300/20 bg-cyan-400/10 px-4 py-3 text-sm text-cyan-100">
                    Selected parent: {selectedParent.name}
                  </div>
                ) : null}
              </div>
            )}

            {type === "UNIVERSE" && (
              <>
                <label className="flex items-center gap-3 text-sm text-white/75">
                  <input
                    type="checkbox"
                    checked={isStandaloneContainer}
                    onChange={(e) => setIsStandaloneContainer(e.target.checked)}
                  />
                  Is standalone container?
                </label>

                <label className="flex items-center gap-3 text-sm text-white/75">
                  <input
                    type="checkbox"
                    checked={allowOriginalCreations}
                    onChange={(e) => setAllowOriginalCreations(e.target.checked)}
                  />
                  Allow original creations?
                </label>

                <label className="flex items-center gap-3 text-sm text-white/75">
                  <input
                    type="checkbox"
                    checked={allowOfficialSeries}
                    onChange={(e) => setAllowOfficialSeries(e.target.checked)}
                  />
                  Allow official series?
                </label>
              </>
            )}

            {type === "SERIES_COLLECTION" && (
              <>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-white/75">Official publisher / company</label>
                  <input
                    value={officialPublisher}
                    onChange={(e) => setOfficialPublisher(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
                  />
                </div>

                <label className="flex items-center gap-3 text-sm text-white/75">
                  <input
                    type="checkbox"
                    checked={hasMultipleContinuities}
                    onChange={(e) => setHasMultipleContinuities(e.target.checked)}
                  />
                  Has multiple continuities?
                </label>
              </>
            )}

            {type === "CONTINUITY" && (
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-white/75">Timeline / branch description</label>
                <textarea
                  value={branchDescription}
                  onChange={(e) => setBranchDescription(e.target.value)}
                  rows={4}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
                />
              </div>
            )}

            {type === "INSTALLMENT" && (
              <>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-white/75">
                    Installment code / short label
                  </label>
                  <input
                    value={installmentCode}
                    onChange={(e) => setInstallmentCode(e.target.value)}
                    placeholder="DBZ, Arc-01, Book I..."
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-white/75">
                    Installment order
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={installmentOrder}
                    onChange={(e) => setInstallmentOrder(e.target.value)}
                    placeholder="1"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-white/75">
                    Installment note
                  </label>
                  <textarea
                    value={branchDescription}
                    onChange={(e) => setBranchDescription(e.target.value)}
                    rows={4}
                    placeholder="Describe what this installment represents inside the continuity."
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
                  />
                </div>
              </>
            )}

            {type === "SPINOFF" && (
              <>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-white/75">Official source / publisher</label>
                  <input
                    value={officialPublisher}
                    onChange={(e) => setOfficialPublisher(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-white/75">Divergence note</label>
                  <textarea
                    value={divergenceNote}
                    onChange={(e) => setDivergenceNote(e.target.value)}
                    rows={4}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
                  />
                </div>
              </>
            )}

            {type === "FANMADE" && (
              <>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-white/75">Creator / author</label>
                  <input
                    value={creator}
                    onChange={(e) => setCreator(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-white/75">Based on which source</label>
                  <input
                    value={sourceSeriesNote}
                    onChange={(e) => setSourceSeriesNote(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
                  />
                </div>
              </>
            )}

            {type === "ORIGINAL_CREATION" && (
              <>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-white/75">Creator</label>
                  <input
                    value={creator}
                    onChange={(e) => setCreator(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
                  />
                </div>

                <label className="flex items-center gap-3 text-sm text-white/75">
                  <input
                    type="checkbox"
                    checked={isFullyIndependent}
                    onChange={(e) => setIsFullyIndependent(e.target.checked)}
                  />
                  Is fully independent?
                </label>
              </>
            )}

            {type === "CROSSOVER" && (
              <>
                <label className="flex items-center gap-3 text-sm text-white/75">
                  <input
                    type="checkbox"
                    checked={officialCrossover}
                    onChange={(e) => setOfficialCrossover(e.target.checked)}
                  />
                  Official crossover?
                </label>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-white/75">Approval note</label>
                  <textarea
                    value={approvalNote}
                    onChange={(e) => setApprovalNote(e.target.value)}
                    rows={3}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-white/75">
                    Source series list *
                  </label>

                  <input
                    value={sourceSearch}
                    onChange={async (e) => {
                      setSourceSearch(e.target.value);
                      await searchWorldEntries(e.target.value, setSourceResults);
                    }}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
                    placeholder="Search source series..."
                  />

                  <div className="mt-3 space-y-2">
                    {sourceResults.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          if (!sourceEntries.some((entry) => entry.id === item.id)) {
                            setSourceEntries((prev) => [...prev, item]);
                          }
                          setSourceSearch("");
                          setSourceResults([]);
                        }}
                        className="block w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-white/75 transition hover:bg-white/10"
                      >
                        {item.name} — {item.type}
                      </button>
                    ))}
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {sourceEntries.map((entry) => (
                      <div
                        key={entry.id}
                        className="group inline-flex items-center gap-2 rounded-full border border-fuchsia-300/20 bg-fuchsia-400/10 px-3 py-1.5 text-xs font-semibold text-fuchsia-100"
                      >
                        <span>{entry.name}</span>
                        <button
                          type="button"
                          onClick={() =>
                            setSourceEntries((prev) =>
                              prev.filter((item) => item.id !== entry.id)
                            )
                          }
                          className="hidden rounded-full p-0.5 text-fuchsia-100/80 transition hover:bg-fuchsia-300/20 hover:text-white group-hover:inline-flex"
                          title="Remove source"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-white/75">Source / inspiration note</label>
              <textarea
                value={sourceNote}
                onChange={(e) => setSourceNote(e.target.value)}
                rows={3}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-white/75">Tags</label>
              <div className="flex gap-2">
                <input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  className="flex-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
                  placeholder="Add a tag"
                />
                <button
                  type="button"
                  onClick={() => {
                    const clean = tagInput.trim();
                    if (!clean) return;
                    if (!tags.includes(clean)) {
                      setTags((prev) => [...prev, clean]);
                    }
                    setTagInput("");
                  }}
                  className="rounded-2xl border border-cyan-300/20 bg-cyan-400/10 px-4 py-3 text-sm font-bold text-cyan-100"
                >
                  Add
                </button>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <div
                    key={tag}
                    className="group inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-400/10 px-3 py-1.5 text-xs font-semibold text-cyan-100"
                  >
                    <span>{tag}</span>
                    <button
                      type="button"
                      onClick={() => setTags((prev) => prev.filter((item) => item !== tag))}
                      className="hidden rounded-full p-0.5 text-cyan-100/80 transition hover:bg-cyan-300/20 hover:text-white group-hover:inline-flex"
                      aria-label={`Remove tag ${tag}`}
                      title="Remove tag"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-white/75">
                Linked power systems / abilities
              </label>

              <input
                value={abilitySearch}
                onChange={async (e) => {
                  setAbilitySearch(e.target.value);
                  await searchAbilities(e.target.value);
                }}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
                placeholder="Search ability nodes..."
              />

              <div className="mt-3 space-y-2">
                {abilityResults.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      if (!linkedAbilities.some((entry) => entry.id === item.id)) {
                        setLinkedAbilities((prev) => [...prev, item]);
                      }
                      setAbilitySearch("");
                      setAbilityResults([]);
                    }}
                    className="block w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-white/75 transition hover:bg-white/10"
                  >
                    {item.name} — {item.type}
                  </button>
                ))}
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {linkedAbilities.map((item) => (
                  <div
                    key={item.id}
                    className="group inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-violet-400/10 px-3 py-1.5 text-xs font-semibold text-violet-100"
                  >
                    <span>{item.name}</span>
                    <button
                      type="button"
                      onClick={() =>
                        setLinkedAbilities((prev) => prev.filter((entry) => entry.id !== item.id))
                      }
                      className="hidden rounded-full p-0.5 text-violet-100/80 transition hover:bg-violet-300/20 hover:text-white group-hover:inline-flex"
                      aria-label={`Remove linked ability ${item.name}`}
                      title="Remove linked ability"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
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
          <h2 className="text-2xl font-black text-white">Banner image</h2>

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
              className="group flex min-h-[280px] w-full flex-col items-center justify-center rounded-[24px] border border-dashed border-cyan-300/25 bg-cyan-400/5 p-6 text-center transition hover:border-cyan-300/45 hover:bg-cyan-400/10"
            >
              {bannerPreview ? (
                <div className="w-full">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={bannerPreview}
                    alt="Banner preview"
                    className="mx-auto max-h-[320px] rounded-2xl object-contain"
                  />
                  <p className="mt-4 text-sm font-semibold text-cyan-100">
                    {bannerFile?.name}
                  </p>
                  <p className="mt-1 text-xs text-white/50">Click to replace</p>
                </div>
              ) : (
                <>
                  <div className="mb-4 text-lg font-black text-cyan-100">
                    Add World Banner
                  </div>
                  <p className="max-w-sm text-sm leading-6 text-white/60">
                    Select the main image for this world entry. It will upload only when
                    you save the form.
                  </p>
                </>
              )}
            </button>
          </div>
        </section>

        <section className="rounded-[30px] border border-white/10 bg-black/25 p-6 backdrop-blur-xl">
          <h2 className="text-2xl font-black text-white">Save state</h2>
          <p className="mt-3 text-sm leading-7 text-white/65">
            Draft lets you preserve incomplete work. Published entries become visible in
            the database immediately.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              disabled={saving || !name.trim() || !slug}
              onClick={() => submit("DRAFT")}
              className="rounded-2xl border border-cyan-300/20 bg-cyan-400/10 px-5 py-3 text-sm font-bold text-cyan-100 disabled:opacity-40"
            >
              {mode === "edit" ? "Save Draft Changes" : "Save Draft"}
            </button>

            <button
              type="button"
              disabled={saving || !canPublish}
              onClick={() => submit("PUBLISHED")}
              className="rounded-2xl border border-emerald-300/20 bg-emerald-400/10 px-5 py-3 text-sm font-bold text-emerald-100 disabled:opacity-40"
            >
              {mode === "edit" ? "Save Changes" : "Publish Entry"}
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