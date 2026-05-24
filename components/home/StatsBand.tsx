"use client";

import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import { siteStats } from "@/lib/stats.config";
import { cn } from "@/lib/utils";

const stats = [
  {
    label: "Monthly Viewers Represented",
    value: siteStats.monthlyViewers,
    suffix: "+",
  },
  {
    label: "Creators on Roster",
    value: siteStats.totalRoster,
    suffix: "",
  },
  {
    label: "Brand Deals Closed",
    value: siteStats.brandDealsClosed,
    suffix: "",
  },
  {
    label: "Founded",
    value: siteStats.foundedYear,
    suffix: "",
  },
] as const;

export function StatsBand() {
  return (
    <section className="bg-[#0A0A0A] px-6 py-14 text-white lg:px-10 lg:py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className={cn(
              "flex flex-col items-center justify-center px-4 py-8 text-center lg:px-8 lg:py-10",
              (index === 0 || index === 2) && "max-lg:border-r max-lg:border-sv-red",
              index < 2 && "max-lg:border-b max-lg:border-sv-red",
              index < 3 && "lg:border-r lg:border-sv-red"
            )}
          >
            <p className="font-mono-accent text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
            </p>
            <p className="label-mono mt-3 max-w-[12rem] text-white/60">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
