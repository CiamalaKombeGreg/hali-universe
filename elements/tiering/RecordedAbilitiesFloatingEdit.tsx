"use client";

import Link from "next/link";
import { Pencil } from "lucide-react";

export default function RecordedAbilitiesFloatingEdit() {
  return (
    <Link
      href="/tiering-power/recorded-abilities/edit"
      className="sticky top-6 z-300 ml-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-fuchsia-400/30 bg-[#120b24]/85 text-fuchsia-100 shadow-[0_0_24px_rgba(217,70,239,0.22)] backdrop-blur-xl transition duration-300 hover:scale-105 hover:bg-[#1a1030]"
      title="Edit page"
    >
      <Pencil className="h-5 w-5" />
    </Link>
  );
}