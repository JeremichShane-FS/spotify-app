"use client";

import { useSession } from "next-auth/react";

export default function AuthCheck({ children }) {
  const { data: session, status } = useSession();

  console.log("Session data:", session);
  console.log("Authentication status:", status);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "authenticated" && session) {
    return <>{children}</>;
  } else {
    return <div>Not authenticated. Please sign in.</div>;
  }
}
