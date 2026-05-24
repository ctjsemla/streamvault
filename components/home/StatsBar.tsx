import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import { SectionReveal } from "@/components/shared/SectionReveal";
import { siteStats } from "@/lib/stats.config";

const stats = [
  {
    label: "Roster Size",
    value: siteStats.totalRoster,
    suffix: "",
  },
  {
    label: "Monthly Viewers Represented",
    value: siteStats.monthlyViewers,
    suffix: "+",
  },
  {
    label: "Brand Deals Closed",
    value: siteStats.brandDealsClosed,
    suffix: "",
  },
  {
    label: "Years in Operation",
    value: siteStats.yearsInOperation,
    suffix: "",
  },
] as const;

export function StatsBar() {
  return (
    <section className="border-y border-black/[0.06] bg-sv-off-white px-6 py-14 lg:px-10 lg:py-16">
      <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {stats.map((stat, index) => (
          <SectionReveal key={stat.label} delay={index * 0.06}>
            <div className="flex flex-col gap-2">
              <p className="font-display text-4xl font-semibold tracking-tight text-[#0A0A0A] sm:text-5xl">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="label-mono text-sv-gray">{stat.label}</p>
            </div>
          </SectionReveal>
        ))}
      </div>
    </section>
  );
}
