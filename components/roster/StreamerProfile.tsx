import Link from "next/link";
import { StreamerAvatar } from "@/components/roster/StreamerAvatar";
import { ArrowUpRight } from "lucide-react";
import type { Streamer } from "@/types/streamer";
import { StreamerLivePanel } from "@/components/roster/StreamerLivePanel";
import { PlatformBadge } from "@/components/shared/PlatformBadge";
import { formatOptionalStat } from "@/lib/format";
import {
  getPlatformProfileUrl,
  PLATFORM_LABELS,
} from "@/lib/platforms";
import { RedDivider } from "@/components/shared/RedDivider";
import { SectionReveal } from "@/components/shared/SectionReveal";

type StreamerProfileProps = {
  streamer: Streamer;
};

function audienceLabel(streamer: Streamer): string {
  return streamer.primaryPlatform === "youtube" ? "Subscribers" : "Followers";
}

export function StreamerProfile({ streamer }: StreamerProfileProps) {
  const showBrandDeals =
    streamer.showBrandDeals !== false &&
    (streamer.brandDeals?.length ?? 0) > 0;
  const followers = formatOptionalStat(streamer.followers);
  const avgViewers = formatOptionalStat(streamer.avgViewers);
  const peakViewers = formatOptionalStat(streamer.peakViewers);

  return (
    <div className="bg-white">
      <section className="px-6 pb-12 pt-10 lg:px-10 lg:pb-16 lg:pt-14">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/roster"
            className="label-mono text-sv-gray transition-colors hover:text-sv-red"
          >
            ← Back to roster
          </Link>

          <SectionReveal className="mt-8">
            <StreamerLivePanel streamer={streamer} />
          </SectionReveal>

          <SectionReveal className="mt-10 flex flex-col gap-8 lg:flex-row lg:items-start">
            <StreamerAvatar
              name={streamer.name}
              avatarUrl={streamer.avatarUrl}
              size="lg"
              className="border border-black/[0.08]"
            />
            <div className="min-w-0 flex-1">
              <p className="label-mono text-sv-red">StreamVault Creator</p>
              <h1 className="font-display mt-2 text-section text-[#0A0A0A]">
                {streamer.name}
              </h1>
              {streamer.realName && (
                <p className="mt-1 text-sm text-sv-gray">{streamer.realName}</p>
              )}
              <p className="label-mono mt-2 text-sv-gray">{streamer.handle}</p>
              <PlatformBadge
                platform={streamer.primaryPlatform}
                className="mt-3"
              />
              {(streamer.location || streamer.language) && (
                <p className="label-mono mt-2 text-sv-gray-mid">
                  {[streamer.location, streamer.language]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
              )}

              {streamer.bio && (
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-sv-gray">
                  {streamer.bio}
                </p>
              )}

              {(followers || avgViewers || peakViewers) && (
                <div className="mt-8 flex flex-wrap gap-8">
                  {followers && (
                    <div>
                      <p className="label-mono text-sv-gray-mid">
                        {audienceLabel(streamer)}
                      </p>
                      <p className="font-display mt-1 text-3xl font-semibold tracking-tight">
                        {followers}
                      </p>
                    </div>
                  )}
                  {avgViewers && (
                    <div>
                      <p className="label-mono text-sv-gray-mid">Avg viewers</p>
                      <p className="font-display mt-1 text-3xl font-semibold tracking-tight">
                        {avgViewers}
                      </p>
                    </div>
                  )}
                  {peakViewers && (
                    <div>
                      <p className="label-mono text-sv-gray-mid">Peak viewers</p>
                      <p className="font-display mt-1 text-3xl font-semibold tracking-tight">
                        {peakViewers}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {streamer.categories.length > 0 && (
                <div className="mt-8 flex flex-wrap gap-2">
                  {streamer.categories.map((cat) => (
                    <span
                      key={cat}
                      className="label-mono rounded bg-sv-off-white px-2 py-1 text-[10px] text-sv-gray"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </SectionReveal>

          <SectionReveal className="mt-12">
            <RedDivider />
          </SectionReveal>
        </div>
      </section>

      <section className="border-t border-black/[0.06] bg-sv-off-white px-6 py-12 lg:px-10 lg:py-14">
        <div className="mx-auto max-w-7xl">
          <SectionReveal>
            <p className="label-mono text-sv-red">Platforms</p>
            <h2 className="font-display mt-3 text-2xl font-semibold tracking-tight text-[#0A0A0A]">
              Where to find this creator
            </h2>
          </SectionReveal>

          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {streamer.platforms.map((platform, index) => {
              const url = getPlatformProfileUrl(platform, streamer);
              const isKick = platform === "kick";

              return (
                <SectionReveal key={platform} delay={index * 0.05}>
                  <li className="rounded-lg border border-black/[0.08] bg-white p-5">
                    <p className="font-display text-lg font-semibold text-[#0A0A0A]">
                      {PLATFORM_LABELS[platform]}
                    </p>
                    {(isKick || platform === "youtube") && (
                      <p className="mt-2 text-sm text-sv-gray">
                        {isKick
                          ? "Profile link only — Kick does not offer a public live API yet."
                          : "Channel link — live status is not checked for YouTube creators."}
                      </p>
                    )}
                    {url ? (
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="label-mono mt-4 inline-flex items-center gap-1 text-sv-red transition-colors hover:text-sv-red-hover"
                      >
                        View profile
                        <ArrowUpRight className="size-3.5" />
                      </a>
                    ) : (
                      <p className="label-mono mt-4 text-sv-gray-mid">
                        Link unavailable
                      </p>
                    )}
                  </li>
                </SectionReveal>
              );
            })}
          </ul>
        </div>
      </section>

      {showBrandDeals && (
        <section className="border-t border-black/[0.06] px-6 py-12 lg:px-10 lg:py-14">
          <div className="mx-auto max-w-7xl">
            <SectionReveal>
              <p className="label-mono text-sv-red">Brand History</p>
              <h2 className="font-display mt-3 text-2xl font-semibold tracking-tight text-[#0A0A0A]">
                Past brand deals
              </h2>
            </SectionReveal>

            <ul className="mt-8 divide-y divide-black/[0.06] rounded-lg border border-black/[0.08]">
              {streamer.brandDeals!.map((deal, index) => (
                <SectionReveal key={`${deal.brand}-${deal.campaign}`} delay={index * 0.04}>
                  <li className="flex flex-col gap-1 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-display font-semibold text-[#0A0A0A]">
                        {deal.brand}
                      </p>
                      <p className="mt-1 text-sm text-sv-gray">{deal.campaign}</p>
                    </div>
                    {deal.year && (
                      <p className="label-mono text-sv-gray-mid">{deal.year}</p>
                    )}
                  </li>
                </SectionReveal>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="border-t border-black/[0.06] bg-[#0A0A0A] px-6 py-14 text-white lg:px-10 lg:py-16">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p className="label-mono text-white/50">For brands</p>
            <h2 className="font-display mt-2 text-2xl font-semibold tracking-tight lg:text-3xl">
              Book {streamer.name} for a campaign
            </h2>
            <p className="mt-3 max-w-md text-sm text-white/60">
              Tell us about your brand and we&apos;ll put together a live-first
              partnership proposal.
            </p>
          </div>
          <Link
            href="/brands"
            className="inline-flex h-11 items-center justify-center rounded-md bg-sv-red px-6 text-sm font-semibold text-white transition-colors hover:bg-sv-red-hover"
          >
            Book for a Campaign
          </Link>
        </div>
      </section>
    </div>
  );
}
