import type { LiveStatus } from "@/types/live";
import { getYouTubeLiveUrl } from "@/lib/platforms";

export type YouTubeChannelStats = {
  subscriberCount?: number;
  viewCount?: number;
};

/**
 * YouTube Data API — channel stats (subscriber count).
 */
export async function getYouTubeChannelStats(
  channelId: string
): Promise<YouTubeChannelStats> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) {
    return { subscriberCount: 0, viewCount: 0 };
  }

  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${apiKey}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) throw new Error("YouTube API failed");
    const data = await res.json();
    const stats = data.items?.[0]?.statistics;
    return {
      subscriberCount: Number(stats?.subscriberCount ?? 0),
      viewCount: Number(stats?.viewCount ?? 0),
    };
  } catch {
    return { subscriberCount: 0, viewCount: 0 };
  }
}

export async function getYouTubeLiveStatus(
  channelId: string
): Promise<LiveStatus> {
  const batch = await getYouTubeLiveStatuses([channelId]);
  return batch[channelId] ?? { isLive: false };
}

/** YouTube live is not used on the public roster (Twitch-only Live Now). */
export async function getYouTubeLiveStatuses(
  channelIds: string[]
): Promise<Record<string, LiveStatus>> {
  const normalized = Array.from(
    new Set(channelIds.map((id) => id.trim()).filter(Boolean))
  );

  if (normalized.length === 0) return {};

  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) {
    return Object.fromEntries(
      normalized.map((id) => [id, { isLive: false }])
    );
  }

  try {
    const output: Record<string, LiveStatus> = {};
    for (const channelId of normalized) {
      output[channelId] = { isLive: false };
    }

    await Promise.all(
      normalized.map(async (channelId) => {
        const searchRes = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&type=video&eventType=live&maxResults=1&key=${apiKey}`,
          { cache: "no-store" }
        );
        if (!searchRes.ok) return;

        const searchData = await searchRes.json();
        const videoId = searchData.items?.[0]?.id?.videoId as string | undefined;
        if (!videoId) return;

        const videoRes = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=liveStreamingDetails,snippet&id=${videoId}&key=${apiKey}`,
          { cache: "no-store" }
        );
        if (!videoRes.ok) return;

        const videoData = await videoRes.json();
        const video = videoData.items?.[0];
        const concurrent =
          video?.liveStreamingDetails?.concurrentViewers;

        output[channelId] = {
          isLive: true,
          viewerCount: concurrent ? Number(concurrent) : undefined,
          streamUrl: getYouTubeLiveUrl(videoId),
          embedUrl: videoId,
        };
      })
    );

    return output;
  } catch {
    return Object.fromEntries(
      normalized.map((id) => [id, { isLive: false }])
    );
  }
}
