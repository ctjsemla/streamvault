import type { Streamer } from "@/types/streamer";

export type BrandMatchInput = {
  productCategory: string;
  targetAgeMin: number;
  targetAgeMax: number;
  budgetRange: string;
};

export type BrandMatchResult = {
  streamer: Streamer;
  matchPercent: number;
};

const BUDGET_TIERS: Record<string, { min: number; max: number }> = {
  "under-2k": { min: 0, max: 2000 },
  "2k-10k": { min: 2000, max: 10000 },
  "10k-50k": { min: 10000, max: 50000 },
  "50k-plus": { min: 50000, max: Infinity },
};

export function matchStreamersForBrand(
  streamers: Streamer[],
  input: BrandMatchInput
): BrandMatchResult[] {
  const budget = BUDGET_TIERS[input.budgetRange] ?? BUDGET_TIERS["2k-10k"];
  const targetAgeMid = (input.targetAgeMin + input.targetAgeMax) / 2;

  const scored = streamers
    .map((streamer) => {
      const categoryMatch = streamer.categories.some(
        (c) => c.toLowerCase() === input.productCategory.toLowerCase()
      )
        ? 40
        : streamer.categories.some((c) =>
              c.toLowerCase().includes(input.productCategory.toLowerCase())
            )
          ? 25
          : 10;

      const rate = streamer.minCampaignRate ?? 5000;
      const budgetMatch =
        rate >= budget.min && rate <= budget.max
          ? 35
          : rate < budget.min
            ? Math.max(10, 35 - (budget.min - rate) / 500)
            : Math.max(5, 20 - (rate - budget.max) / 2000);

      const ageDelta = Math.abs((streamer.audienceAgeMid ?? 22) - targetAgeMid);
      const ageMatch = Math.max(0, 25 - ageDelta);

      const matchPercent = Math.min(
        99,
        Math.round(categoryMatch + budgetMatch + ageMatch)
      );

      return { streamer, matchPercent };
    })
    .filter((r) => r.matchPercent >= 45)
    .sort((a, b) => b.matchPercent - a.matchPercent)
    .slice(0, 3);

  return scored;
}
