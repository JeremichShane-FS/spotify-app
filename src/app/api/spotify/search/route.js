import { refreshAccessToken, validateSession } from "@/lib/spotify";
import { NextResponse } from "next/server";

const SPOTIFY_API = "https://api.spotify.com/v1";

export async function GET(request) {
  try {
    const sessionData = await validateSession();

    if (!sessionData) {
      return NextResponse.json({ error: "Unauthorized - Please log in" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");

    if (!query) {
      return NextResponse.json({ error: "Search query is required" }, { status: 400 });
    }

    let token = sessionData.accessToken;

    // Check if token needs refresh
    if (sessionData.expiresAt * 1000 < Date.now()) {
      const refreshedTokens = await refreshAccessToken(sessionData.refreshToken);
      token = refreshedTokens.accessToken;
    }

    // Make separate requests for each type with different limits
    const [tracksResponse, artistsResponse, albumsResponse] = await Promise.all([
      fetch(`${SPOTIFY_API}/search?q=${encodeURIComponent(query)}&type=track&limit=5`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }),
      fetch(`${SPOTIFY_API}/search?q=${encodeURIComponent(query)}&type=artist&limit=9`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }),
      fetch(`${SPOTIFY_API}/search?q=${encodeURIComponent(query)}&type=album&limit=9`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }),
    ]);

    const [tracksData, artistsData, albumsData] = await Promise.all([
      tracksResponse.json(),
      artistsResponse.json(),
      albumsResponse.json(),
    ]);

    // Combine the responses
    const data = {
      tracks: tracksData.tracks,
      artists: artistsData.artists,
      albums: albumsData.albums,
    };

    return NextResponse.json(data);
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json({ error: "Failed to search" }, { status: 500 });
  }
}
