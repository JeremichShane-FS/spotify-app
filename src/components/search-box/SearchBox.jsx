"use client";

import { useSpotifySearch } from "@/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDebounce } from "use-debounce";
import { SearchInput } from "..";

export default function SearchBox() {
  const router = useRouter();
  const { query, setQuery } = useSpotifySearch();
  const [debouncedQuery] = useDebounce(query, 500);

  useEffect(() => {
    router.push(debouncedQuery ? `/?q=${encodeURIComponent(debouncedQuery)}` : "/");
  }, [debouncedQuery, router]);

  return (
    <SearchInput
      value={query}
      onChange={setQuery}
      placeholder="Search for songs, artists, or albums..."
    />
  );
}
