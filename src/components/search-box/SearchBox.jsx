"use client";

import { useSpotifySearch } from "@/hooks";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { SearchInput } from "..";

export default function SearchBox() {
  const router = useRouter();
  const { query, setQuery } = useSpotifySearch();
  const [localQuery, setLocalQuery] = useState(query);
  const [debouncedQuery] = useDebounce(localQuery, 500);

  // Update local state when query changes (from logo click)
  useEffect(() => {
    setLocalQuery(query);
  }, [query]);

  useEffect(() => {
    router.push(debouncedQuery ? `/?q=${encodeURIComponent(debouncedQuery)}` : "/");
  }, [debouncedQuery, router]);

  const handleChange = value => {
    setLocalQuery(value);
    setQuery(value);
  };

  return (
    <SearchInput
      value={localQuery}
      onChange={handleChange}
      placeholder="Search for songs, artists, or albums..."
    />
  );
}
