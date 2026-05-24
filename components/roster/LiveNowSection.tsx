"use client";

import { useMemo } from "react";
import useSWR from "swr";
import { StreamerAvatar } from "@/components/roster/StreamerAvatar";
import { PlatformBadge } from "@/components/shared/PlatformBadge";
import type { Streamer } from "@/types/streamer";
import type { LiveBatchResponse, LiveStatus } from "@/types/live";
import { formatCompactNumber } from "@/lib/format";
import {
  buildLiveBatchUrl,
  getLiveStreamersFromBatch,
  sortLiveByViewers,
  type LivePlatform,
} from "@/lib/live";
import { buildTwitchEmbedSrc } from "@/lib/twitch-embed";
import { buildYouTubeEmbedSrc } from "@/lib/youtube-embed";
import { cn } from "@/lib/utils";

type LiveNowSectionProps = {
  twitchConfigured: boolean;
  youtubeConfigured: boolean;
  twitchStreamers: Streamer[];
  youtubeStreamers: Streamer[];
  initialBatch: LiveBatchResponse;
};

type LiveNowCard = {
  streamer: Streamer;
  platform: LivePlatform;
  viewerCount: number | null;
  showEmbed: boolean;
  badge: "live" | "recent";
  videoId?: string;
};

async function fetchLiveBatch(url: string): Promise<LiveBatchResponse> {
  try {
    const res = await fetch(url);
    if (!res.ok) return { twitch: {}, youtube: {} };
    return (await res.json()) as LiveBatchResponse;
  } catch {
    return { twitch: {}, youtube: {} };
  }
}

function mockLiveCards(
  twitchStreamers: Streamer[],
  youtubeStreamers: Streamer[]
): LiveNowCard[] {
  const youtube = [...youtubeStreamers]
    .sort((a, b) => (b.followers ?? 0) - (a.followers ?? 0))
    .slice(0, 2)
    .map(
      (streamer): LiveNowCard => ({
        streamer,
        platform: "youtube",
        viewerCount: streamer.avgViewers ?? 800,
        showEmbed: Boolean(streamer.youtubeChannelId),
        badge: "live",
      })
    );

  if (youtube.length >= 2) return youtube;

  const twitch = [...twitchStreamers]
    .sort((a, b) => (b.followers ?? 0) - (a.followers ?? 0))
    .slice(0, 2 - youtube.length)
    .map(
      (streamer): LiveNowCard => ({
        streamer,
        platform: "twitch",
        viewerCount: streamer.avgViewers ?? 1200,
        showEmbed: true,
        badge: "live",
      })
    );

  return [...youtube, ...twitch];
}

function featuredOfflineCards(
  twitchStreamers: Streamer[],
  youtubeStreamers: Streamer[],
  latestByChannel: Record<string, string>
): LiveNowCard[] {
  const youtube = [...youtubeStreamers]
    .sort((a, b) => (b.followers ?? 0) - (a.followers ?? 0))
    .slice(0, 2)
    .map((streamer): LiveNowCard => {
      const videoId = streamer.youtubeChannelId
        ? latestByChannel[streamer.youtubeChannelId]
        : undefined;
      return {
        streamer,
        platform: "youtube",
        viewerCount: streamer.followers ?? null,
        showEmbed: Boolean(videoId),
        badge: "recent",
        videoId,
      };
    });

  if (youtube.length >= 2) return youtube;

  const twitch = [...twitchStreamers]
    .sort((a, b) => (b.followers ?? 0) - (a.followers ?? 0))
    .slice(0, 2 - youtube.length)
    .map(
      (streamer): LiveNowCard => ({
        streamer,
        platform: "twitch",
        viewerCount: streamer.followers ?? null,
        showEmbed: false,
        badge: "recent",
      })
    );

  return [...youtube, ...twitch];
}

function liveCardFromInfo(
  streamer: Streamer,
  platform: LivePlatform,
  status: LiveStatus
): LiveNowCard {
  const videoId = platform === "youtube" ? status.embedUrl : undefined;
  return {
    streamer,
    platform,
    viewerCount: status.viewerCount ?? null,
    showEmbed:
      platform === "twitch"
        ? Boolean(streamer.twitchLogin)
        : Boolean(videoId),
    badge: "live",
    videoId,
  };
}

export function LiveNowSection({
  twitchConfigured,
  youtubeConfigured,
  twitchStreamers,
  youtubeStreamers,
  initialBatch,
}: LiveNowSectionProps) {
  const hasLivePool =
    twitchStreamers.length > 0 || youtubeStreamers.length > 0;
  const apisConfigured = twitchConfigured || youtubeConfigured;

  const batchUrl = hasLivePool
    ? buildLiveBatchUrl(twitchStreamers, youtubeStreamers)
    : null;

  const { data } = useSWR<LiveBatchResponse>(
    batchUrl,
    batchUrl ? fetchLiveBatch : null,
    {
      refreshInterval: 60_000,
      revalidateOnFocus: true,
      shouldRetryOnError: false,
      fallbackData: initialBatch,
    }
  );

  const { headerLabel, cards } = useMemo(() => {
    if (!hasLivePool) {
      return { headerLabel: "", cards: [] as LiveNowCard[] };
    }

    if (!apisConfigured) {
      return {
        headerLabel: "LIVE NOW",
        cards: mockLiveCards(twitchStreamers, youtubeStreamers),
      };
    }

    const batch = data ?? initialBatch;

    const live = sortLiveByViewers(
      getLiveStreamersFromBatch(twitchStreamers, youtubeStreamers, batch)
    )
      .slice(0, 2)
      .map((item) =>
        liveCardFromInfo(item.streamer, item.platform, item.status)
      );

    if (live.length > 0) {
      return { headerLabel: "LIVE NOW", cards: live };
    }

    return {
      headerLabel: "Latest Videos",
      cards: featuredOfflineCards(
        twitchStreamers,
        youtubeStreamers,
        batch.youtubeLatest ?? {}
      ),
    };
  }, [
    hasLivePool,
    apisConfigured,
    data,
    initialBatch,
    twitchStreamers,
    youtubeStreamers,
  ]);

  if (!hasLivePool) return null;
  if (cards.length === 0) return null;

  const isLiveHeader = headerLabel === "LIVE NOW";
  const isLatestHeader = headerLabel === "Latest Videos";

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
              isLiveHeader
                ? "text-sv-red"
                : isLatestHeader
                  ? "text-white/80"
                  : "text-white/60"
            )}
          >
            {headerLabel}
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {cards.map((card, index) => {
            const showEmbedOnMobile = card.showEmbed && index === 0;
            const embedSrc =
              card.showEmbed &&
              card.platform === "twitch" &&
              card.streamer.twitchLogin
                ? buildTwitchEmbedSrc(card.streamer.twitchLogin)
                : card.showEmbed &&
                    card.platform === "youtube" &&
                    card.streamer.youtubeChannelId &&
                    card.videoId
                  ? buildYouTubeEmbedSrc(card.videoId)
                  : null;

            return (
              <article
                key={card.streamer.slug}
                className="overflow-hidden rounded-lg border border-white/10 bg-white/5"
              >
                {card.showEmbed && embedSrc && (
                  <div
                    className={cn(
                      "w-full overflow-hidden bg-black",
                      showEmbedOnMobile ? "block" : "hidden md:block"
                    )}
                  >
                    <iframe
                      src={embedSrc}
                      title={`${card.streamer.name} live on ${card.platform === "youtube" ? "YouTube" : "Twitch"}`}
                      height={400}
                      width="100%"
                      className="border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
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
                          {card.videoId ? "Latest upload" : "Offline"}
                        </span>
                      )}
                    </div>
                    <PlatformBadge
                      platform={card.platform}
                      variant="dark"
                      className="mt-2"
                    />
                    {card.viewerCount != null && (
                      <p className="font-mono-accent mt-3 text-sm text-white/70">
                        {card.badge === "live"
                          ? `${formatCompactNumber(card.viewerCount)} watching now`
                          : card.platform === "youtube"
                            ? `${formatCompactNumber(card.viewerCount)} subscribers`
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
