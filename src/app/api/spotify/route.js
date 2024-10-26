// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import { getServerSession } from "next-auth";
// import { headers } from "next/headers";

// export const dynamic = "force-dynamic";

// const baseURL = "https://api.spotify.com";

// async function refreshAccessToken(refreshToken) {
//   try {
//     const response = await fetch("https://accounts.spotify.com/api/token", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//         Authorization: `Basic ${Buffer.from(
//           `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
//         ).toString("base64")}`,
//       },
//       body: new URLSearchParams({
//         grant_type: "refresh_token",
//         refresh_token: refreshToken,
//       }),
//     });

//     const refreshedTokens = await response.json();

//     if (!response.ok) {
//       throw new Error("Failed to refresh access token");
//     }

//     return {
//       accessToken: refreshedTokens.access_token,
//       accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
//       refreshToken: refreshedTokens.refresh_token ?? refreshToken,
//     };
//   } catch (error) {
//     throw new Error("RefreshAccessTokenError");
//   }
// }

// async function fetchSpotifyData(endpoint, token) {
//   const res = await fetch(`${baseURL}/${endpoint}`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//     },
//   });

//   if (!res.ok) {
//     throw new Error(`Spotify API error: ${await res.text()}`);
//   }

//   return res.json();
// }

// async function getSessionWithHeaders() {
//   const headersList = headers();
//   return await getServerSession(authOptions);
// }

// export async function GET() {
//   try {
//     const session = await getSessionWithHeaders();

//     if (!session) {
//       return Response.json({ error: "No session found" }, { status: 401 });
//     }

//     let token = session.user?.accessToken;
//     const refreshToken = session.user?.refreshToken;

//     if (!token) {
//       return Response.json({ error: "No access token found" }, { status: 401 });
//     }

//     try {
//       const data = await fetchSpotifyData("v1/me", token);
//       return Response.json(data);
//     } catch (error) {
//       if (error.message.includes("401")) {
//         const refreshedTokens = await refreshAccessToken(refreshToken);
//         token = refreshedTokens.accessToken;
//         const data = await fetchSpotifyData("v1/me", token);
//         return Response.json(data);
//       }
//       throw error;
//     }
//   } catch (error) {
//     return Response.json({ error: error.message }, { status: 500 });
//   }
// }

// export async function getTopTracks() {
//   try {
//     const session = await getSessionWithHeaders();

//     if (!session) {
//       return Response.json({ error: "No session found" }, { status: 401 });
//     }

//     let token = session.user?.accessToken;
//     const refreshToken = session.user?.refreshToken;

//     if (!token) {
//       return Response.json({ error: "No access token found" }, { status: 401 });
//     }

//     try {
//       const data = await fetchSpotifyData("v1/me/top/tracks?time_range=long_term&limit=5", token);
//       return Response.json(data);
//     } catch (error) {
//       if (error.message.includes("401")) {
//         const refreshedTokens = await refreshAccessToken(refreshToken);
//         token = refreshedTokens.accessToken;
//         const data = await fetchSpotifyData("v1/me/top/tracks?time_range=long_term&limit=5", token);
//         return Response.json(data);
//       }
//       throw error;
//     }
//   } catch (error) {
//     return Response.json({ error: error.message }, { status: 500 });
//   }
// }
