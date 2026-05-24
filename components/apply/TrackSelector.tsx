"use client";

import { cn } from "@/lib/utils";

export type ApplyTrack = "streamer" | "partnership";

type TrackSelectorProps = {
  value: ApplyTrack;
  onChange: (track: ApplyTrack) => void;
};

const tracks = [
  {
    id: "streamer" as const,
    label: "Join the Roster",
    description:
      "Full application for creators seeking exclusive or non-exclusive management.",
  },
  {
    id: "partnership" as const,
    label: "Partnership Inquiry",
    description:
      "Shorter form for collaborators, agencies, or brands exploring talent access.",
  },
];

export function TrackSelector({ value, onChange }: TrackSelectorProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      {tracks.map((track) => (
        <button
          key={track.id}
          type="button"
          onClick={() => onChange(track.id)}
          className={cn(
            "flex-1 rounded-lg border p-5 text-left transition-colors",
            value === track.id
              ? "border-sv-red bg-sv-red-tint"
              : "border-black/[0.08] bg-white hover:border-black/[0.16]"
          )}
        >
          <p className="font-display text-lg font-semibold text-[#0A0A0A]">
            {track.label}
          </p>
          <p className="mt-2 text-sm text-sv-gray">{track.description}</p>
        </button>
      ))}
    </div>
  );
}
