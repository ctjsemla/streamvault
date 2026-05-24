"use client";

import { useMemo } from "react";
import useSWR from "swr";
import { StreamerAvatar } from "@/components/roster/StreamerAvatar";
import { PlatformBadge } from "@/components/shared/PlatformBadge";
import type { Streamer } from "@/types/streamer";
import type { LiveBatchResponse } from "@/types/live";
import { formatCompactNumber } from "@/lib/format";
import {
  buildLiveBatchUrl,
  getLiveStreamersFromBatch,
  sortLiveByViewers,
} from "@/lib/live";
import { buildTwitchEmbedSrc } from "@/lib/twitch-embed";
import { cn } from "@/lib/utils";

type LiveNowSectionProps = {
  twitchConfigured: boolean;
  twitchStreamers: Streamer[];
};

type LiveNowCard = {
  streamer: Streamer;
  viewerCount: number | null;
  showEmbed: boolean;
  badge: "live" | "recent";
};

const fetcher = (url: string) =>
  fetch(url).then((res) => res.json() as Promise<LiveBatchResponse>);

function mockLiveCards(streamers: Streamer[]): LiveNowCard[] {
  return [...streamers]
    .sort((a, b) => (b.followers ?? 0) - (a.followers ?? 0))
    .slice(0, 2)
    .map((streamer) => ({
      streamer,
      viewerCount: streamer.avgViewers ?? 1200,
      showEmbed: true,
      badge: "live" as const,
    }));
}

function recentLiveCards(streamers: Streamer[]): LiveNowCard[] {
  return [...streamers]
    .sort((a, b) => (b.avgViewers ?? 0) - (a.avgViewers ?? 0))
    .slice(0, 2)
    .map((streamer) => ({
      streamer,
      viewerCount: streamer.avgViewers ?? null,
      showEmbed: false,
      badge: "recent" as const,
    }));
}

export function LiveNowSection({
  twitchConfigured,
  twitchStreamers,
}: LiveNowSectionProps) {
  const batchUrl =
    twitchStreamers.length > 0 ? buildLiveBatchUrl(twitchStreamers) : null;

  const { data, isLoading } = useSWR<LiveBatchResponse>(
    batchUrl,
    batchUrl ? fetcher : null,
    {
      refreshInterval: 60_000,
      revalidateOnFocus: false,
    }
  );

  const { headerLabel, cards } = useMemo(() => {
    if (twitchStreamers.length === 0) {
      return { headerLabel: "", cards: [] as LiveNowCard[] };
    }

    if (!twitchConfigured) {
      return { headerLabel: "LIVE NOW", cards: mockLiveCards(twitchStreamers) };
    }

    if (!data) {
      return { headerLabel: "", cards: [] as LiveNowCard[] };
    }

    const live = sortLiveByViewers(
      getLiveStreamersFromBatch(twitchStreamers, data)
    ).slice(0, 2);

    if (live.length > 0) {
      return {
        headerLabel: "LIVE NOW",
        cards: live.map((item) => ({
          streamer: item.streamer,
          viewerCount: item.status.viewerCount ?? null,
          showEmbed: true,
          badge: "live" as const,
        })),
      };
    }

    return {
      headerLabel: "Recently Live",
      cards: recentLiveCards(twitchStreamers),
    };
  }, [twitchStreamers, twitchConfigured, data]);

  if (twitchStreamers.length === 0) return null;
  if (twitchConfigured && (isLoading || !data)) return null;
  if (cards.length === 0) return null;

  const isLiveHeader = headerLabel === "LIVE NOW";

  return (
    <section className="border-b border-black/[0.06] bg-[#0A0A0A] px-6 py-10 text-white lg:px-10 lg:py-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center gap-3">
          {isLiveHeader && (
            <span className="live-pulse-dot size-2 shrink-0 rounded-full bg-sv-red" />
          )}
          <p
            className={cn(
              "label-mono",
              isLiveHeader ? "text-sv-red" : "text-white/60"
            )}
          >
            {headerLabel}
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {cards.map((card, index) => {
            const login = card.streamer.twitchLogin;
            const showEmbedOnMobile = card.showEmbed && index === 0;

            return (
              <article
                key={card.streamer.slug}
                className="overflow-hidden rounded-lg border border-white/10 bg-white/5"
              >
                {card.showEmbed && login && (
                  <div
                    className={cn(
                      "w-full overflow-hidden bg-black",
                      showEmbedOnMobile ? "block" : "hidden md:block"
                    )}
                  >
                    <iframe
                      src={buildTwitchEmbedSrc(login)}
                      title={`${card.streamer.name} live on Twitch`}
                      height={400}
                      width="100%"
                      className="border-0"
                      allowFullScreen
                    />
                  </div>
                )}

                <div className="flex gap-4 p-5">
                  <StreamerAvatar
                    name={card.streamer.name}
                    avatarUrl={card.streamer.avatarUrl}
                    size="md"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-display text-xl font-semibold tracking-tight">
                        {card.streamer.name}
                      </p>
                      {card.badge === "live" ? (
                        <span className="label-mono inline-flex items-center gap-1.5 rounded-full bg-sv-red-tint px-2 py-0.5 text-[10px] text-sv-red">
                          <span className="live-pulse-dot size-1.5 rounded-full bg-sv-red" />
                          LIVE
                        </span>
                      ) : (
                        <span className="label-mono rounded-full border border-white/15 px-2 py-0.5 text-[10px] text-white/50">
                          Recently Live
                        </span>
                      )}
                    </div>
                    <PlatformBadge
                      platform="twitch"
                      variant="dark"
                      className="mt-2"
                    />
                    {card.viewerCount != null && (
                      <p className="font-mono-accent mt-3 text-sm text-white/70">
                        {card.badge === "live"
                          ? `${formatCompactNumber(card.viewerCount)} watching now`
                          : `${formatCompactNumber(card.viewerCount)} avg viewers`}
                      </p>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
