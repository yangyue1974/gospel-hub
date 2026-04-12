"use client";

import { useState, useRef, useEffect } from "react";

type Artist = { id: string; name: string };

export function ArtistSelect({
  artists,
}: {
  artists: Artist[];
}) {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const filtered = query
    ? artists.filter((a) =>
        a.name.toLowerCase().includes(query.toLowerCase())
      )
    : artists;

  const exactMatch = artists.find(
    (a) => a.name.toLowerCase() === query.toLowerCase()
  );

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="relative">
      <input type="hidden" name="artist_id" value={selectedId} />
      <input type="hidden" name="artist_name" value={query} />
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setSelectedId("");
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        placeholder="Search or type new artist name..."
        className="w-full rounded border border-border bg-background px-3 py-2 text-sm"
        required
        autoComplete="off"
      />
      {open && (filtered.length > 0 || (query && !exactMatch)) && (
        <ul className="absolute z-50 mt-1 max-h-48 w-full overflow-auto rounded border border-border bg-background shadow-lg">
          {query && !exactMatch && (
            <li
              className="cursor-pointer px-3 py-2 text-sm text-primary font-medium hover:bg-accent border-b border-border"
              onMouseDown={() => {
                setSelectedId("");
                setOpen(false);
              }}
            >
              + Create &quot;{query}&quot;
            </li>
          )}
          {filtered.map((a) => (
            <li
              key={a.id}
              className="cursor-pointer px-3 py-2 text-sm hover:bg-accent"
              onMouseDown={() => {
                setSelectedId(a.id);
                setQuery(a.name);
                setOpen(false);
              }}
            >
              {a.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
