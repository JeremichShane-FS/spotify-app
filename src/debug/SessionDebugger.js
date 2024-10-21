"use client";

import { useSession } from "next-auth/react";
import { useEffect, useRef } from "react";

export default function SessionDebugger() {
  const { data: session, status } = useSession();
  const prevSessionRef = useRef();
  const prevStatusRef = useRef();

  useEffect(() => {
    if (session !== prevSessionRef.current || status !== prevStatusRef.current) {
      console.log("Session update:");
      console.log("Session:", session);
      console.log("Status:", status);
      console.log("-------------------");

      prevSessionRef.current = session;
      prevStatusRef.current = status;
    }
  }, [session, status]);

  return null;
}
