"use client";

import { Loading } from "@/components";
import { ResultsList } from "@/components/search-results";
import { useSpotifySearch } from "@/hooks";
import { signIn, useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const queryParam = searchParams.get("q");
  const { setQuery, isLoading, error } = useSpotifySearch();

  useEffect(() => {
    if (queryParam && session) {
      setQuery(queryParam);
    }
  }, [queryParam, setQuery, session]);

  if (status === "loading") {
    return <Loading />;
  }

  if (!session) {
    return (
      <div className="home">
        <h1 className="home__title">Spotify Search</h1>
        <div className="home__login">
          <p className="home__login-text">Please login to search for music</p>
          <button className="home__login-button" onClick={() => signIn()}>
            Log in
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="home">
      <h1 className="home__title">Spotify Search</h1>
      {queryParam ? (
        <>
          {isLoading ? (
            <Loading />
          ) : error ? (
            <div className="home__error">Error: {error.message}</div>
          ) : (
            <div className="home__results">
              <div className="home__results-grid">
                <ResultsList type="tracks" />
                <ResultsList type="artists" />
                <ResultsList type="albums" />
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="home__message">Start searching for your favorite music!</div>
      )}
    </div>
  );
}
