import type { Metadata } from "next";
import { BrandInquiryForm } from "@/components/brands/BrandInquiryForm";
import { BrandMatchTool } from "@/components/brands/BrandMatchTool";
import { CampaignRow } from "@/components/brands/CampaignRow";
import { RedDivider } from "@/components/shared/RedDivider";
import { SectionReveal } from "@/components/shared/SectionReveal";
import { campaignTypes } from "@/lib/data/campaigns.content";
import { getStreamers } from "@/lib/streamers";

export const metadata: Metadata = {
  title: "Brands",
  description:
    "Partner with StreamVault creators for live streaming campaigns that drive real engagement.",
};

export default async function BrandsPage() {
  const streamers = await getStreamers();

  return (
    <div className="bg-white">
      <section className="relative overflow-hidden px-6 pb-12 pt-10 lg:px-10 lg:pb-16 lg:pt-14">
        <div className="pointer-events-none absolute -left-32 top-0 size-[360px] rounded-full bg-sv-red/5 blur-3xl" />
        <div className="relative mx-auto max-w-7xl">
          <SectionReveal>
            <p className="label-mono text-sv-red">For Brands</p>
            <h1 className="font-display mt-4 max-w-3xl text-section text-[#0A0A0A]">
              Live campaigns that audiences{" "}
              <span className="text-sv-red">actually watch.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-sv-gray">
              StreamVault connects brands with vetted live creators — scoped,
              executed, and reported by a team that understands Twitch, YouTube,
              Kick, and TikTok Live.
            </p>
          </SectionReveal>
          <SectionReveal className="mt-10">
            <RedDivider />
          </SectionReveal>
        </div>
      </section>

      <section className="px-6 lg:px-10">
        <div className="mx-auto max-w-7xl divide-y divide-black/[0.06]">
          {campaignTypes.map((campaign, index) => (
            <CampaignRow
              key={campaign.id}
              title={campaign.title}
              description={campaign.description}
              metrics={campaign.metrics}
              index={index}
            />
          ))}
        </div>
      </section>

      <BrandMatchTool streamers={streamers} />
      <BrandInquiryForm />
    </div>
  );
}
