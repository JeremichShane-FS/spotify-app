import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function refreshAccessToken(refreshToken) {
  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(
          `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
        ).toString("base64")}`,
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      }),
    });
    const refreshedTokens = await response.json();
    if (!response.ok) {
      throw new Error("Failed to refresh access token");
    }

    return {
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? refreshToken,
    };
  } catch (error) {
    throw new Error("RefreshAccessTokenError");
  }
}

export async function validateSession() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return null;

    // Get the account from the database
    const account = await prisma.account.findFirst({
      where: {
        userId: session.user.id,
        provider: "spotify",
      },
    });

    if (!account) return null;

    return {
      accessToken: account.access_token,
      refreshToken: account.refresh_token,
      expiresAt: account.expires_at,
    };
  } catch (error) {
    console.error("Session validation error:", error);
    return null;
  }
}

export async function searchSpotify(query) {
  if (!query?.trim()) return null;

  const response = await fetch(`/api/spotify/search?q=${encodeURIComponent(query)}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}
