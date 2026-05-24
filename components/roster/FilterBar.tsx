"use client";

import type { Platform } from "@/types/streamer";
import { cn } from "@/lib/utils";

export type RosterSort = "name" | "followers" | "viewers";

export type RosterFilters = {
  platform: Platform | "all";
  category: string;
  sort: RosterSort;
};

type FilterBarProps = {
  categories: string[];
  platforms: Platform[];
  filters: RosterFilters;
  onChange: (filters: RosterFilters) => void;
  resultCount: number;
  variant?: "light" | "dark";
};

const PLATFORM_LABELS: Record<Platform, string> = {
  twitch: "Twitch",
  youtube: "YouTube",
  kick: "Kick",
  tiktok: "TikTok",
};

const SORT_OPTIONS: { value: RosterSort; label: string }[] = [
  { value: "name", label: "Name" },
  { value: "followers", label: "Followers" },
  { value: "viewers", label: "Avg Viewers" },
];

function FilterChip({
  active,
  onClick,
  children,
  dark,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "label-mono rounded-full border px-3 py-1.5 text-[11px] transition-colors",
        dark
          ? active
            ? "border-sv-red bg-sv-red text-white"
            : "border-white/15 bg-white/5 text-white/55 hover:border-white/30 hover:text-white"
          : active
            ? "border-sv-red bg-sv-red text-white"
            : "border-black/[0.08] bg-white text-sv-gray hover:border-black/[0.16] hover:text-[#0A0A0A]"
      )}
    >
      {children}
    </button>
  );
}

export function FilterBar({
  categories,
  platforms,
  filters,
  onChange,
  resultCount,
  variant = "light",
}: FilterBarProps) {
  const dark = variant === "dark";
  const set = (partial: Partial<RosterFilters>) =>
    onChange({ ...filters, ...partial });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p
            className={cn(
              "label-mono",
              dark ? "text-white/40" : "text-sv-gray-mid"
            )}
          >
            Filter roster
          </p>
          <p
            className={cn(
              "mt-1 font-mono-accent text-sm",
              dark ? "text-white" : "text-[#0A0A0A]"
            )}
          >
            {resultCount} creator{resultCount === 1 ? "" : "s"}
          </p>
        </div>

        <label className="flex flex-col gap-1.5">
          <span
            className={cn(
              "label-mono",
              dark ? "text-white/40" : "text-sv-gray-mid"
            )}
          >
            Sort by
          </span>
          <select
            value={filters.sort}
            onChange={(e) => set({ sort: e.target.value as RosterSort })}
            className={cn(
              "label-mono h-9 rounded-md border px-3 text-[11px] outline-none focus-visible:border-sv-red focus-visible:ring-2 focus-visible:ring-sv-red/20",
              dark
                ? "border-white/15 bg-[#111111] text-white"
                : "border-black/[0.08] bg-white text-[#0A0A0A]"
            )}
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="space-y-3">
        <p
          className={cn(
            "label-mono",
            dark ? "text-white/40" : "text-sv-gray-mid"
          )}
        >
          Platform
        </p>
        <div className="flex flex-wrap gap-2">
          <FilterChip
            dark={dark}
            active={filters.platform === "all"}
            onClick={() => set({ platform: "all" })}
          >
            All
          </FilterChip>
          {platforms.map((platform) => (
            <FilterChip
              key={platform}
              dark={dark}
              active={filters.platform === platform}
              onClick={() => set({ platform })}
            >
              {PLATFORM_LABELS[platform]}
            </FilterChip>
          ))}
        </div>
      </div>

      {categories.length > 0 && (
        <div className="space-y-3">
          <p
            className={cn(
              "label-mono",
              dark ? "text-white/40" : "text-sv-gray-mid"
            )}
          >
            Category
          </p>
          <div className="flex flex-wrap gap-2">
            <FilterChip
              dark={dark}
              active={filters.category === "all"}
              onClick={() => set({ category: "all" })}
            >
              All
            </FilterChip>
            {categories.map((category) => (
              <FilterChip
                key={category}
                dark={dark}
                active={filters.category === category}
                onClick={() => set({ category })}
              >
                {category}
              </FilterChip>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
