import type { Metadata } from "next";
import Link from "next/link";
import { LiveNowSection } from "@/components/roster/LiveNowSection";
import { StreamerGrid } from "@/components/roster/StreamerGrid";
import { RedDivider } from "@/components/shared/RedDivider";
import { SectionReveal } from "@/components/shared/SectionReveal";
import { applyCta } from "@/lib/site";
import { isTwitchConfigured } from "@/lib/twitch-config";
import {
  getRosterFilterOptions,
  getStreamers,
  getTwitchRosterStreamers,
} from "@/lib/streamers";

export const metadata: Metadata = {
  title: "Roster",
  description:
    "Meet StreamVault's exclusive roster of live streaming creators across Twitch, YouTube, Kick, and TikTok Live.",
};

export default async function RosterPage() {
  const streamers = await getStreamers();
  const { categories, platforms } = getRosterFilterOptions(streamers);
  const twitchConfigured = isTwitchConfigured();
  const twitchStreamers = getTwitchRosterStreamers(streamers);

  return (
    <div className="bg-white">
      <LiveNowSection
        twitchConfigured={twitchConfigured}
        twitchStreamers={twitchStreamers}
      />

      <section className="px-6 pb-12 pt-10 lg:px-10 lg:pb-16 lg:pt-14">
        <div className="mx-auto max-w-7xl">
          <SectionReveal>
            <p className="label-mono text-sv-red">The Roster</p>
            <h1 className="font-display mt-4 max-w-3xl text-section text-[#0A0A0A]">
              Exclusive creators. Live-first audiences.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-sv-gray">
              Browse our managed talent across gaming, IRL, and entertainment.
              Filter by platform or category to find the right creator for your
              campaign.
            </p>
          </SectionReveal>

          <SectionReveal className="mt-10">
            <RedDivider />
          </SectionReveal>
        </div>
      </section>

      <section className="border-t border-black/[0.06] bg-sv-off-white px-6 py-14 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <StreamerGrid
            streamers={streamers}
            categories={categories}
            platforms={platforms}
            twitchConfigured={twitchConfigured}
          />
        </div>
      </section>

      <section className="border-t border-black/[0.06] px-6 py-14 lg:px-10 lg:py-16">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p className="label-mono text-sv-gray-mid">Want to join?</p>
            <p className="font-display mt-2 text-2xl font-semibold tracking-tight text-[#0A0A0A]">
              Apply to the StreamVault roster.
            </p>
          </div>
          <Link
            href={applyCta.href}
            className="inline-flex h-11 items-center justify-center rounded-md bg-sv-red px-6 text-sm font-semibold text-white transition-colors hover:bg-sv-red-hover"
          >
            {applyCta.label}
          </Link>
        </div>
      </section>
    </div>
  );
}
