"use client";

import { signIn, useSession } from "next-auth/react";

import "./SignIn.scss";

export default function SignIn() {
  const { data: session, status } = useSession();
  console.log("Session", session, "Status", status);

  if (status === "loading") {
    return <>...</>;
  }

  return (
    <button className="login-button" onClick={() => signIn()}>
      Log In
    </button>
  );
}
