import type { Streamer } from "@/types/streamer";
import type { LiveBatchResponse, LiveStatus } from "@/types/live";

/** Live checks are Twitch-only; Kick/YouTube never appear in Live Now. */
export function buildLiveBatchUrl(streamers: Streamer[]): string | null {
  const twitch = Array.from(
    new Set(
      streamers
        .filter((s) => s.primaryPlatform === "twitch" && s.twitchLogin)
        .map((s) => s.twitchLogin!.trim().toLowerCase())
    )
  );

  if (twitch.length === 0) return null;

  const params = new URLSearchParams();
  params.set("twitch", twitch.join(","));
  return `/api/live/batch?${params.toString()}`;
}

export type StreamerLiveInfo = {
  streamer: Streamer;
  status: LiveStatus;
  platform: "twitch";
};

export function getLiveStreamersFromBatch(
  streamers: Streamer[],
  batch: LiveBatchResponse
): StreamerLiveInfo[] {
  const live: StreamerLiveInfo[] = [];

  for (const streamer of streamers) {
    if (streamer.primaryPlatform !== "twitch" || !streamer.twitchLogin) continue;
    const status = batch.twitch[streamer.twitchLogin.toLowerCase()];
    if (status?.isLive) {
      live.push({ streamer, status, platform: "twitch" });
    }
  }

  return live;
}

export function sortLiveByViewers(
  live: StreamerLiveInfo[]
): StreamerLiveInfo[] {
  return [...live].sort(
    (a, b) => (b.status.viewerCount ?? 0) - (a.status.viewerCount ?? 0)
  );
}
