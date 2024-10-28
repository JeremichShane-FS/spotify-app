import { searchSpotify } from "@/lib/spotify";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const QUERY_KEY = "spotify-search";

export function useSpotifySearch() {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const [query, setQueryState] = useState(searchParams.get("q") || "");

  // Update query when searchParams changes
  useEffect(() => {
    const currentQuery = searchParams.get("q") || "";
    setQueryState(currentQuery);
  }, [searchParams]);

  const setQuery = useCallback(
    newQuery => {
      if (!session) {
        newQuery = "";
      }
      setQueryState(newQuery);
      queryClient.setQueryData([QUERY_KEY, "query"], newQuery);
    },
    [session, queryClient]
  );

  // Clear query cache when logging out
  useEffect(() => {
    if (!session) {
      setQueryState("");
      queryClient.removeQueries([QUERY_KEY]);
    }
  }, [session, queryClient]);

  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEY, "results", query],
    queryFn: () => searchSpotify(query),
    enabled: !!session && !!query?.trim(),
    staleTime: 1000 * 60 * 5, // 5 minutes
    select: data => ({
      tracks: data?.tracks?.items || [],
      artists: data?.artists?.items || [],
      albums: data?.albums?.items || [],
    }),
  });

  return {
    query,
    setQuery,
    data,
    isLoading,
  };
}
