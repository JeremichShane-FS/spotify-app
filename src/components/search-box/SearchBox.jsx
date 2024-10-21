"use client";

import { useState } from "react";
import "./SearchBox.scss";

export default function SearchBox() {
  const [query, setQuery] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    console.log(query);
  };

  const handleChange = e => {
    setQuery(e.target.value);
  };

  return (
    <div className="search-box">
      <div className="no-focus-outline">
        <form className="search-box__form" onSubmit={handleSubmit}>
          <input
            className="search-box__input"
            onChange={handleChange}
            placeholder="Search"
            type="search"
            value={query}
            id="search-input"
            tabIndex={0}
            spellCheck="false"
          />
        </form>
      </div>
    </div>
  );
}
