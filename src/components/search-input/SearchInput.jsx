"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";

import "./SearchInput.scss";

export default function SearchInput({ value, onChange, placeholder = "Search..." }) {
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) {
      onChange("");
    }
  }, [session, onChange]);

  return (
    <input
      type="text"
      value={value}
      onChange={e => onChange?.(e.target.value)}
      placeholder={session ? placeholder : "Please log in to search"}
      className="search-input"
      id="search-input"
      disabled={!session}
    />
  );
}
