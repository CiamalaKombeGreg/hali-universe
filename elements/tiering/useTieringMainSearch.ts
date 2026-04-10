"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function useTieringMainSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const clear = () => setQuery("");

  const goToSearch = () => {
    const trimmed = query.trim();
    if (!trimmed) return;

    router.push(
      `/tiering-power/recorded-abilities?search=${encodeURIComponent(trimmed)}`
    );
    setQuery("");
  };

  return {
    query,
    setQuery,
    clear,
    goToSearch,
  };
}