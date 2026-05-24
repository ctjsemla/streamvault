"use client";

import { useState } from "react";
import Link from "next/link";
import type { Streamer } from "@/types/streamer";
import { matchStreamersForBrand } from "@/lib/brandMatch";
import { formatOptionalStat } from "@/lib/format";
import { SectionReveal } from "@/components/shared/SectionReveal";

const CATEGORIES = [
  "Gaming",
  "FPS",
  "IRL",
  "Lifestyle",
  "Just Chatting",
  "Entertainment",
  "Tech",
  "Music",
  "Esports",
];

type BrandMatchToolProps = {
  streamers: Streamer[];
};

export function BrandMatchTool({ streamers }: BrandMatchToolProps) {
  const [category, setCategory] = useState("Gaming");
  const [ageMin, setAgeMin] = useState(18);
  const [ageMax, setAgeMax] = useState(34);
  const [budget, setBudget] = useState("10k-50k");
  const [results, setResults] = useState<ReturnType<typeof matchStreamersForBrand>>(
    []
  );
  const [searched, setSearched] = useState(false);

  function handleMatch(e: React.FormEvent) {
    e.preventDefault();
    setResults(
      matchStreamersForBrand(streamers, {
        productCategory: category,
        targetAgeMin: ageMin,
        targetAgeMax: ageMax,
        budgetRange: budget,
      })
    );
    setSearched(true);
  }

  return (
    <section className="border-t border-black/[0.06] bg-sv-off-white px-6 py-20 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionReveal>
          <p className="label-mono text-sv-red">Roster Match</p>
          <h2 className="font-display mt-4 max-w-2xl text-section text-[#0A0A0A]">
            Find creators who fit your campaign.
          </h2>
        </SectionReveal>

        <div className="mt-12 flex flex-col gap-12 lg:flex-row lg:items-start">
          <form
            onSubmit={handleMatch}
            className="w-full shrink-0 space-y-6 rounded-lg border border-black/[0.08] bg-white p-6 lg:max-w-md lg:p-8"
          >
            <label className="block">
              <span className="label-mono text-sv-gray-mid">Product category</span>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-2 w-full rounded-md border border-black/[0.08] px-3 py-2 text-sm outline-none focus-visible:border-sv-red focus-visible:ring-2 focus-visible:ring-sv-red/20"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>

            <div className="grid grid-cols-2 gap-4">
              <label className="block">
                <span className="label-mono text-sv-gray-mid">Age min</span>
                <input
                  type="number"
                  min={13}
                  max={65}
                  value={ageMin}
                  onChange={(e) => setAgeMin(Number(e.target.value))}
                  className="mt-2 w-full rounded-md border border-black/[0.08] px-3 py-2 text-sm outline-none focus-visible:border-sv-red"
                />
              </label>
              <label className="block">
                <span className="label-mono text-sv-gray-mid">Age max</span>
                <input
                  type="number"
                  min={13}
                  max={65}
                  value={ageMax}
                  onChange={(e) => setAgeMax(Number(e.target.value))}
                  className="mt-2 w-full rounded-md border border-black/[0.08] px-3 py-2 text-sm outline-none focus-visible:border-sv-red"
                />
              </label>
            </div>

            <label className="block">
              <span className="label-mono text-sv-gray-mid">Budget range</span>
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="mt-2 w-full rounded-md border border-black/[0.08] px-3 py-2 text-sm outline-none focus-visible:border-sv-red"
              >
                <option value="under-2k">Under $2K</option>
                <option value="2k-10k">$2K – $10K</option>
                <option value="10k-50k">$10K – $50K</option>
                <option value="50k-plus">$50K+</option>
              </select>
            </label>

            <button
              type="submit"
              className="w-full rounded-md bg-sv-red py-3 text-sm font-semibold text-white transition-colors hover:bg-sv-red-hover"
            >
              Match Creators
            </button>
          </form>

          <div className="min-w-0 flex-1">
            {!searched && (
              <p className="text-sm text-sv-gray">
                Enter your campaign criteria to see top roster matches ranked by
                category fit, budget alignment, and audience age.
              </p>
            )}
            {searched && results.length === 0 && (
              <p className="text-sm text-sv-gray">
                No strong matches found. Try widening your budget or age range, or
                send us an inquiry below.
              </p>
            )}
            <ul className="space-y-4">
              {results.map(({ streamer, matchPercent }, i) => {
                const avgViewers = formatOptionalStat(streamer.avgViewers);
                return (
                <li
                  key={streamer.slug}
                  className="flex flex-col gap-4 rounded-lg border border-black/[0.08] bg-white p-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-mono-accent text-xs text-sv-red">
                      #{i + 1} · {matchPercent}% match
                    </p>
                    <p className="font-display mt-1 text-xl font-semibold">
                      {streamer.name}
                    </p>
                    <p className="label-mono mt-1 text-sv-gray">
                      {avgViewers ? `${avgViewers} avg viewers · ` : ""}
                      {streamer.categories.join(", ")}
                    </p>
                  </div>
                  <Link
                    href={`/roster/${streamer.slug}`}
                    className="label-mono shrink-0 text-sv-red hover:text-sv-red-hover"
                  >
                    View profile →
                  </Link>
                </li>
              );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
