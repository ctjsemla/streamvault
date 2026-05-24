import { isTwitchConfigured } from "@/lib/twitch-config";
import { getTwitchLiveStatuses } from "@/lib/twitch";
import { getYouTubeLatestVideoIds, getYouTubeLiveStatuses } from "@/lib/youtube";
import type { Streamer } from "@/types/streamer";
import type { LiveBatchResponse } from "@/types/live";

export async function fetchLiveBatchSnapshot(
  twitchStreamers: Streamer[],
  youtubeStreamers: Streamer[]
): Promise<LiveBatchResponse> {
  const twitchLogins = twitchStreamers
    .map((s) => s.twitchLogin?.trim().toLowerCase())
    .filter(Boolean) as string[];

  const youtubeChannelIds = youtubeStreamers
    .map((s) => s.youtubeChannelId?.trim())
    .filter(Boolean) as string[];

  const twitch =
    isTwitchConfigured() && twitchLogins.length
      ? await getTwitchLiveStatuses(twitchLogins)
      : {};

  const youtube = youtubeChannelIds.length
    ? await getYouTubeLiveStatuses(youtubeChannelIds)
    : {};

  const anyYoutubeLive = Object.values(youtube).some((s) => s.isLive);
  const youtubeLatest =
    youtubeChannelIds.length && !anyYoutubeLive
      ? await getYouTubeLatestVideoIds(youtubeChannelIds)
      : undefined;

  return { twitch, youtube, youtubeLatest };
}
