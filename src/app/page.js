"use client";

import { ProfilePic } from "@/components/user";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      if (status === "authenticated") {
        try {
          console.log("Fetching data with session:", {
            hasToken: !!session?.user?.accessToken,
          });

          const res = await fetch("/api/spotify");
          const data = await res.json();
          console.log(data);

          if (!res.ok) {
            console.error("API error response:", data);
            throw new Error(data.error || "Failed to fetch user data");
          }

          setUserData(data);
        } catch (error) {
          console.error("Fetch error:", error);
          // Only redirect to sign in if it's an authentication error
          if (error.message.includes("authenticated") || error.message.includes("token")) {
            signIn("spotify");
          }
        }
      }
    }

    fetchData();
  }, [status, session]);

  return (
    <div>
      {status === "unauthenticated" && <h1>Home</h1>}
      {userData && (
        <div>
          <h1>Welcome, {userData.display_name}</h1>
          <div>
            <ProfilePic />
          </div>
          <div>{userData.email && <p>Email: {userData.email}</p>}</div>
        </div>
      )}
    </div>
  );
}
