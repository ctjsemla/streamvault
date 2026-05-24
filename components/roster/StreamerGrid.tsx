"use client";

import { useMemo, useState } from "react";
import type { Platform, Streamer } from "@/types/streamer";
import {
  FilterBar,
  type RosterFilters,
} from "@/components/roster/FilterBar";
import { StreamerCard } from "@/components/roster/StreamerCard";
import { SectionReveal } from "@/components/shared/SectionReveal";

type StreamerGridProps = {
  streamers: Streamer[];
  categories: string[];
  platforms: Platform[];
  twitchConfigured?: boolean;
};

const defaultFilters: RosterFilters = {
  platform: "all",
  category: "all",
  sort: "followers",
};

function filterAndSort(streamers: Streamer[], filters: RosterFilters) {
  let result = [...streamers];

  if (filters.platform !== "all") {
    const platform = filters.platform;
    result = result.filter((s) => s.platforms.includes(platform));
  }

  if (filters.category !== "all") {
    result = result.filter((s) => s.categories.includes(filters.category));
  }

  switch (filters.sort) {
    case "name":
      result.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "viewers":
      result.sort((a, b) => (b.avgViewers ?? 0) - (a.avgViewers ?? 0));
      break;
    case "followers":
    default:
      result.sort((a, b) => (b.followers ?? 0) - (a.followers ?? 0));
      break;
  }

  return result;
}

export function StreamerGrid({
  streamers,
  categories,
  platforms,
  twitchConfigured = false,
}: StreamerGridProps) {
  const [filters, setFilters] = useState<RosterFilters>(defaultFilters);

  const filtered = useMemo(
    () => filterAndSort(streamers, filters),
    [streamers, filters]
  );

  if (streamers.length === 0) {
    return (
      <p className="text-center text-sm text-sv-gray">
        Roster is loading — check back shortly.
      </p>
    );
  }

  return (
    <div className="space-y-12">
      <FilterBar
        categories={categories}
        platforms={platforms}
        filters={filters}
        onChange={setFilters}
        resultCount={filtered.length}
      />

      {filtered.length === 0 ? (
        <p className="text-center text-sm text-sv-gray">
          No creators match these filters. Try adjusting platform or category.
        </p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((streamer, index) => (
            <SectionReveal key={streamer.slug} delay={(index % 3) * 0.05}>
              <StreamerCard
                streamer={streamer}
                className="w-full"
                showLiveBadge
                twitchConfigured={twitchConfigured}
              />
            </SectionReveal>
          ))}
        </div>
      )}
    </div>
  );
}
