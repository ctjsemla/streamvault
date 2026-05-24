import type { BrandBrief } from "@/types/brand";

export function BriefCard({ brief }: { brief: BrandBrief }) {
  return (
    <article className="rounded-lg border border-black/[0.08] border-l-4 border-l-sv-red bg-white p-5">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <h3 className="font-display text-lg font-semibold text-[#0A0A0A]">
          {brief.brandName}
        </h3>
        <time className="label-mono text-[10px] text-sv-gray-mid">
          {brief.receivedAt}
        </time>
      </div>
      <p className="label-mono mt-2 text-sv-red">{brief.campaignType}</p>
      <p className="label-mono mt-1 text-[10px] text-sv-gray">
        Budget: {brief.budgetRange}
      </p>
      <p className="mt-4 text-sm leading-relaxed text-sv-gray">{brief.message}</p>
    </article>
  );
}
