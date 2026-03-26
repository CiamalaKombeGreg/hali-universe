"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import DescriptionBlocksEditor from "./DescriptionBlocksEditor";
import { abilityHierarchy } from "./recordedAbilitiesData";
import type {
  AbilityFamilyValue,
  AbilityNodeCreatePayload,
  AbilityNodeTypeValue,
  ContentBlock,
  LinkedNodePreview,
  UploadedImage,
} from "./abilityEditorTypes";

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

const nodeTypes: { value: AbilityNodeTypeValue; label: string }[] = [
  { value: "SYSTEM", label: "System" },
  { value: "SUBSYSTEM", label: "Sub-System" },
  { value: "ABILITY", label: "Ability" },
  { value: "ASSOCIATION_SYSTEM", label: "Association System" },
  { value: "ASSOCIATION_ABILITY", label: "Association Ability" },
];

const families: { value: AbilityFamilyValue; label: string }[] = [
  { value: "BODY_ALTERATION", label: "Body Alteration" },
  { value: "EXTERNAL_MANIPULATION", label: "External Manipulation" },
  { value: "MENTAL_PERCEPTUAL", label: "Mental & Perceptual Powers" },
  { value: "SPIRITUAL_SOUL", label: "Spiritual & Soul Powers" },
  { value: "CREATION_SUMMONING", label: "Creation & Summoning" },
  { value: "CONCEPTUAL_ABSTRACT", label: "Conceptual & Abstract Powers" },
  { value: "METAPOWER", label: "Metapower" },
  { value: "DIMENSIONAL_MOVEMENT", label: "Dimensional & Movement Powers" },
  { value: "DEFENSE_NEGATION", label: "Defense & Negation" },
  { value: "UTILITY_SUPPORT", label: "Utility & Support" },
];

export default function AbilityNodeCreateForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [type, setType] = useState<AbilityNodeTypeValue>("ABILITY");
  const [family, setFamily] = useState<AbilityFamilyValue | "">("");
  const [shortDescription, setShortDescription] = useState("");
  const [notes, setNotes] = useState<string[]>([""]);
  const [hierarchyLevel, setHierarchyLevel] = useState("");
  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([]);
  const [mainImage, setMainImage] = useState<UploadedImage | null>(null);
  const [secondaryImages, setSecondaryImages] = useState<UploadedImage[]>([]);
  const [parentSearch, setParentSearch] = useState("");
  const [parentResults, setParentResults] = useState<LinkedNodePreview[]>([]);
  const [selectedParent, setSelectedParent] = useState<LinkedNodePreview | null>(null);
  const [childSearch, setChildSearch] = useState("");
  const [childResults, setChildResults] = useState<LinkedNodePreview[]>([]);
  const [childNodes, setChildNodes] = useState<LinkedNodePreview[]>([]);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);

  const slug = useMemo(() => slugify(name), [name]);

  const isAbilityType = type === "ABILITY" || type === "ASSOCIATION_ABILITY";
  const requiresChildAbility =
    type === "SYSTEM" || type === "SUBSYSTEM" || type === "ASSOCIATION_SYSTEM";

  const canPublish = useMemo(() => {
    if (!name.trim()) return false;
    if (!slug) return false;
    if (!mainImage) return false;
    if (isAbilityType && !family) return false;
    if (requiresChildAbility && childNodes.length === 0) return false;
    return true;
  }, [name, slug, mainImage, isAbilityType, family, requiresChildAbility, childNodes]);

  async function uploadFile(file: File, isPrimary: boolean) {
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

    const image: UploadedImage = {
      id: crypto.randomUUID(),
      url: data.fileUrl,
      storageKey: data.objectName,
      isPrimary,
    };

    return image;
  }

  async function handleMainImageChange(file: File | null) {
    if (!file) return;
    const uploaded = await uploadFile(file, true);
    setMainImage(uploaded);
    setDirty(true);
  }

  async function handleSecondaryImagesChange(files: FileList | null) {
    if (!files?.length) return;

    const uploaded = await Promise.all(
      Array.from(files).map((file) => uploadFile(file, false))
    );

    setSecondaryImages((prev) => [...prev, ...uploaded]);
    setDirty(true);
  }

  async function searchNodes(query: string, setter: (rows: LinkedNodePreview[]) => void) {
    if (!query.trim()) {
      setter([]);
      return;
    }

    const response = await fetch(`/api/ability-nodes/search?q=${encodeURIComponent(query)}`);
    if (!response.ok) {
      setter([]);
      return;
    }

    const data = await response.json();
    setter(data.results ?? []);
  }

  async function submit(status: "DRAFT" | "PUBLISHED") {
    const payload: AbilityNodeCreatePayload = {
      name,
      slug,
      type,
      family: isAbilityType ? (family || null) : null,
      shortDescription,
      notes: notes.filter((note) => note.trim().length > 0).join("\n\n"),
      hierarchyLevel: hierarchyLevel || null,
      status,
      isActive: status === "PUBLISHED",
      mainImage,
      secondaryImages,
      parentId: selectedParent?.id ?? null,
      childIds: childNodes.map((item) => item.id),
      contentBlocks,
    };

    setSaving(true);

    try {
      const response = await fetch("/api/ability-nodes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to save ability node");
      }

      setDirty(false);
      router.push("/tiering-power/recorded-abilities/edit");
    } catch (error) {
      console.error(error);
      alert("Failed to save the node.");
    } finally {
      setSaving(false);
    }
  }

  function handleDiscard() {
    if (!dirty) {
      router.push("/tiering-power/recorded-abilities/edit");
      return;
    }

    const confirmed = window.confirm(
      "You started writing. Are you sure you want to discard and leave?"
    );

    if (confirmed) {
      router.push("/tiering-power/recorded-abilities/edit");
    }
  }

  return (
    <div className="space-y-6">
      <section className="sticky top-6 z-[200] rounded-[24px] border border-white/15 bg-[#0b1020]/90 p-4 backdrop-blur-xl">
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            disabled={!canPublish || saving}
            onClick={() => submit("PUBLISHED")}
            className="rounded-xl border border-emerald-300/20 bg-emerald-400/10 px-5 py-3 text-sm font-bold text-emerald-100 transition disabled:cursor-not-allowed disabled:opacity-40"
          >
            Save
          </button>

          <button
            type="button"
            disabled={!name.trim() || !slug || saving}
            onClick={() => submit("DRAFT")}
            className="rounded-xl border border-cyan-300/20 bg-cyan-400/10 px-5 py-3 text-sm font-bold text-cyan-100 transition disabled:cursor-not-allowed disabled:opacity-40"
          >
            Draft
          </button>

          <button
            type="button"
            onClick={handleDiscard}
            className="rounded-xl border border-rose-300/20 bg-rose-400/10 px-5 py-3 text-sm font-bold text-rose-100 transition"
          >
            Discard
          </button>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-white/10 bg-black/20 p-5">
            <h2 className="text-2xl font-black text-white">Core data</h2>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-white/75">
                  Name
                </label>
                <input
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setDirty(true);
                  }}
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

              <div>
                <label className="mb-2 block text-sm font-semibold text-white/75">
                  Node Type *
                </label>
                <select
                  value={type}
                  onChange={(e) => {
                    setType(e.target.value as AbilityNodeTypeValue);
                    setDirty(true);
                  }}
                  className="form-select-dark w-full rounded-2xl px-4 py-3 text-white outline-none"
                >
                  {nodeTypes.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  className={`text-sm transition ${
                    isAbilityType ? "text-white/70" : "text-white/30"
                  }`}
                >
                  Family {isAbilityType ? "*" : "(disabled for systems)"}
                </label>
                <div className="relative">
                  <select
                    value={family}
                    disabled={!isAbilityType}
                    onChange={(e) => {
                      setFamily(e.target.value as AbilityFamilyValue);
                      setDirty(true);
                    }}
                    className={`form-select-dark w-full rounded-2xl px-4 py-3 outline-none transition
                                ${!isAbilityType
                                  ? "opacity-40 cursor-not-allowed bg-white/5 text-white/40 border-white/5"
                                  : "text-white hover:border-fuchsia-400/40"}
                              `}
                  >
                    <option value="">Select a family</option>
                    {families.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  </div>
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-white/75">
                  Short Description
                </label>
                <textarea
                  value={shortDescription}
                  onChange={(e) => {
                    setShortDescription(e.target.value);
                    setDirty(true);
                  }}
                  rows={3}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
                />
              </div>

              <div className="md:col-span-2">
  <div className="mb-3 flex items-center justify-between">
    <label className="block text-sm font-semibold text-white/75">
      Notes
    </label>

    <button
      type="button"
      onClick={() => {
        setNotes((prev) => [...prev, ""]);
        setDirty(true);
      }}
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
              onClick={() => {
                setNotes((prev) => prev.filter((_, i) => i !== index));
                setDirty(true);
              }}
              className="rounded-lg border border-rose-300/20 bg-rose-400/10 px-2 py-1 text-[11px] font-semibold text-rose-100 transition hover:bg-rose-400/20"
            >
              Remove
            </button>
          ) : null}
        </div>

        <textarea
          value={note}
          onChange={(e) => {
            const value = e.target.value;
            setNotes((prev) => prev.map((item, i) => (i === index ? value : item)));
            setDirty(true);
          }}
          rows={3}
          className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none"
          placeholder={`Write note ${index + 1}...`}
        />
      </div>
    ))}
  </div>
</div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-white/75">
                  Hierarchy Level (optional)
                </label>
                <select
                  value={hierarchyLevel}
                  onChange={(e) => {
                    setHierarchyLevel(e.target.value);
                    setDirty(true);
                  }}
                  className="form-select-dark w-full rounded-2xl px-4 py-3 text-white outline-none"
                >
                  <option value="">Optional</option>
                  {abilityHierarchy.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          <DescriptionBlocksEditor
            blocks={contentBlocks}
            onChange={(next) => {
              setContentBlocks(next);
              setDirty(true);
            }}
            availableImages={secondaryImages}
          />
        </div>

        <div className="space-y-6">
          <section className="rounded-[28px] border border-white/10 bg-black/20 p-5">
            <h2 className="text-2xl font-black text-white">Images</h2>

            <div className="mt-5 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-white/75">
                  Main image (required)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => void handleMainImageChange(e.target.files?.[0] ?? null)}
                  className="block w-full text-sm text-white/80"
                />
                {mainImage ? (
                  <p className="mt-2 text-xs text-cyan-100">{mainImage.url}</p>
                ) : null}
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-white/75">
                  Secondary images
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => void handleSecondaryImagesChange(e.target.files)}
                  className="block w-full text-sm text-white/80"
                />

                <div className="mt-4 space-y-2">
                  {secondaryImages.map((image) => (
                    <div
                      key={image.id}
                      className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/70"
                    >
                      {image.url}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-[28px] border border-white/10 bg-black/20 p-5">
            <h2 className="text-2xl font-black text-white">Parent link</h2>
            <p className="mt-2 text-sm leading-6 text-white/60">
              Optional. Link this node as a child of an existing system or ability.
            </p>

            <input
              value={parentSearch}
              onChange={async (e) => {
                setParentSearch(e.target.value);
                await searchNodes(e.target.value, setParentResults);
              }}
              className="mt-4 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
              placeholder="Search existing nodes..."
            />

            <div className="mt-3 space-y-2">
              {parentResults.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setSelectedParent(item);
                    setParentResults([]);
                    setParentSearch(item.name);
                    setDirty(true);
                  }}
                  className="block w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-white/75 transition hover:bg-white/10"
                >
                  {item.name} — {item.type}
                </button>
              ))}
            </div>

            {selectedParent ? (
              <div className="mt-4 rounded-xl border border-cyan-300/15 bg-cyan-400/8 px-4 py-3 text-sm text-cyan-100">
                Selected parent: {selectedParent.name}
              </div>
            ) : null}
          </section>

          <section className="rounded-[28px] border border-white/10 bg-black/20 p-5">
            <h2 className="text-2xl font-black text-white">Child abilities / systems</h2>
            <p className="mt-2 text-sm leading-6 text-white/60">
              For systems and sub-systems, at least one linked child is required before publishing.
            </p>

            <input
              value={childSearch}
              onChange={async (e) => {
                setChildSearch(e.target.value);
                await searchNodes(e.target.value, setChildResults);
              }}
              className="mt-4 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
              placeholder="Search nodes to add as children..."
            />

            <div className="mt-3 space-y-2">
              {childResults.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    if (!childNodes.some((existing) => existing.id === item.id)) {
                      setChildNodes((prev) => [...prev, item]);
                      setDirty(true);
                    }
                    setChildResults([]);
                    setChildSearch("");
                  }}
                  className="block w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-white/75 transition hover:bg-white/10"
                >
                  {item.name} — {item.type}
                </button>
              ))}
            </div>

            <div className="mt-4 space-y-2">
              {childNodes.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/75"
                >
                  <span>
                    {item.name} — {item.type}
                  </span>

                  <button
                    type="button"
                    onClick={() => {
                      setChildNodes((prev) => prev.filter((entry) => entry.id !== item.id));
                      setDirty(true);
                    }}
                    className="rounded-lg border border-rose-300/20 bg-rose-400/10 px-3 py-1 text-rose-100"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}