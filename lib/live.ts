import type { Streamer } from "@/types/streamer";
import type { LiveBatchResponse, LiveStatus } from "@/types/live";

export type LivePlatform = "twitch" | "youtube";

export function getTwitchLiveCheckStreamers(streamers: Streamer[]): Streamer[] {
  return streamers.filter(
    (s) => s.primaryPlatform === "twitch" && Boolean(s.twitchLogin)
  );
}

export function getYouTubeLiveCheckStreamers(streamers: Streamer[]): Streamer[] {
  return streamers.filter(
    (s) => s.primaryPlatform === "youtube" && Boolean(s.youtubeChannelId)
  );
}

export function buildLiveBatchUrl(
  twitchStreamers: Streamer[],
  youtubeStreamers: Streamer[]
): string | null {
  const twitch = Array.from(
    new Set(
      twitchStreamers
        .map((s) => s.twitchLogin?.trim().toLowerCase())
        .filter(Boolean) as string[]
    )
  );

  const youtube = Array.from(
    new Set(
      youtubeStreamers
        .map((s) => s.youtubeChannelId?.trim())
        .filter(Boolean) as string[]
    )
  );

  if (twitch.length === 0 && youtube.length === 0) return null;

  const params = new URLSearchParams();
  if (twitch.length) params.set("twitch", twitch.join(","));
  if (youtube.length) params.set("youtube", youtube.join(","));
  return `/api/live/batch?${params.toString()}`;
}

export type StreamerLiveInfo = {
  streamer: Streamer;
  status: LiveStatus;
  platform: LivePlatform;
};

export function getLiveStreamersFromBatch(
  twitchStreamers: Streamer[],
  youtubeStreamers: Streamer[],
  batch: LiveBatchResponse
): StreamerLiveInfo[] {
  const live: StreamerLiveInfo[] = [];

  for (const streamer of twitchStreamers) {
    if (!streamer.twitchLogin) continue;
    const status = batch.twitch[streamer.twitchLogin.toLowerCase()];
    if (status?.isLive) {
      live.push({ streamer, status, platform: "twitch" });
    }
  }

  for (const streamer of youtubeStreamers) {
    if (!streamer.youtubeChannelId) continue;
    const status = batch.youtube[streamer.youtubeChannelId];
    if (status?.isLive) {
      live.push({ streamer, status, platform: "youtube" });
    }
  }

  return live;
}

/** YouTube live cards first, then by concurrent viewers. */
export function sortLiveByViewers(
  live: StreamerLiveInfo[]
): StreamerLiveInfo[] {
  return [...live].sort((a, b) => {
    if (a.platform !== b.platform) {
      return a.platform === "youtube" ? -1 : 1;
    }
    return (b.status.viewerCount ?? 0) - (a.status.viewerCount ?? 0);
  });
}
