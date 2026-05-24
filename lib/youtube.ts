import type { LiveStatus } from "@/types/live";
import { getYouTubeLiveUrl } from "@/lib/platforms";
import { scrapeYouTubeLiveStatus } from "@/lib/youtube-live-scrape";
import { withYouTubeLatestFallback } from "@/lib/youtube-latest-fallback";

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
  const apiKey = process.env.YOUTUBE_API_KEY?.trim();
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

async function fetchLiveViaApi(
  channelId: string,
  apiKey: string
): Promise<LiveStatus | null> {
  const channelsRes = await fetch(
    `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${encodeURIComponent(channelId)}&key=${apiKey}`,
    { cache: "no-store" }
  );

  if (!channelsRes.ok) return null;

  const channelsData = await channelsRes.json();
  const snippet = channelsData.items?.[0]?.snippet;
  if (snippet?.liveBroadcastContent !== "live") {
    return { isLive: false };
  }

  const searchRes = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${encodeURIComponent(channelId)}&type=video&eventType=live&maxResults=1&key=${apiKey}`,
    { cache: "no-store" }
  );
  if (!searchRes.ok) return null;

  const searchData = await searchRes.json();
  const videoId = searchData.items?.[0]?.id?.videoId as string | undefined;
  if (!videoId) return { isLive: false };

  const videoRes = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=liveStreamingDetails&id=${encodeURIComponent(videoId)}&key=${apiKey}`,
    { cache: "no-store" }
  );
  if (!videoRes.ok) return null;

  const videoData = await videoRes.json();
  const video = videoData.items?.[0];
  const concurrent = video?.liveStreamingDetails?.concurrentViewers;

  return {
    isLive: true,
    viewerCount: concurrent ? Number(concurrent) : undefined,
    streamUrl: getYouTubeLiveUrl(videoId),
    embedUrl: videoId,
  };
}

async function fetchLiveViaApiBatch(
  channelIds: string[],
  apiKey: string
): Promise<{ results: Record<string, LiveStatus>; apiOk: boolean }> {
  const results: Record<string, LiveStatus> = {};
  for (const id of channelIds) {
    results[id] = { isLive: false };
  }

  const idsParam = channelIds.map(encodeURIComponent).join(",");
  const channelsRes = await fetch(
    `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${idsParam}&key=${apiKey}`,
    { cache: "no-store" }
  );

  if (!channelsRes.ok) {
    return { results, apiOk: false };
  }

  const channelsData = await channelsRes.json();
  const liveChannelIds: string[] = [];

  for (const item of channelsData.items ?? []) {
    const id = item.id as string;
    if (item.snippet?.liveBroadcastContent === "live") {
      liveChannelIds.push(id);
    } else {
      results[id] = { isLive: false };
    }
  }

  await Promise.all(
    liveChannelIds.map(async (channelId) => {
      const status = await fetchLiveViaApi(channelId, apiKey);
      results[channelId] = status ?? { isLive: false };
    })
  );

  return { results, apiOk: true };
}

export async function getYouTubeLiveStatuses(
  channelIds: string[]
): Promise<Record<string, LiveStatus>> {
  const normalized = Array.from(
    new Set(channelIds.map((id) => id.trim()).filter(Boolean))
  );

  if (normalized.length === 0) return {};

  const apiKey = process.env.YOUTUBE_API_KEY?.trim();
  const output: Record<string, LiveStatus> = {};
  for (const channelId of normalized) {
    output[channelId] = { isLive: false };
  }

  let apiOk = false;

  if (apiKey) {
    try {
      const batch = await fetchLiveViaApiBatch(normalized, apiKey);
      Object.assign(output, batch.results);
      apiOk = batch.apiOk;
    } catch {
      apiOk = false;
    }
  }

  if (!apiKey || !apiOk) {
    await Promise.all(
      normalized.map(async (channelId) => {
        if (output[channelId]?.isLive) return;
        const scraped = await scrapeYouTubeLiveStatus(channelId);
        if (scraped.isLive) {
          output[channelId] = scraped;
        }
      })
    );
  }

  return output;
}

/** Latest public upload per channel (uploads playlist — low quota vs search). */
export async function getYouTubeLatestVideoIds(
  channelIds: string[]
): Promise<Record<string, string>> {
  const normalized = Array.from(
    new Set(channelIds.map((id) => id.trim()).filter(Boolean))
  );
  if (normalized.length === 0) return {};

  const apiKey = process.env.YOUTUBE_API_KEY?.trim();
  if (!apiKey) {
    return withYouTubeLatestFallback(normalized, {});
  }

  const output: Record<string, string> = {};

  try {
    const idsParam = normalized.map(encodeURIComponent).join(",");
    const channelsRes = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${idsParam}&key=${apiKey}`,
      { cache: "no-store" }
    );

    if (channelsRes.ok) {
      const channelsData = await channelsRes.json();
      const uploadsByChannel: Record<string, string> = {};

      for (const item of channelsData.items ?? []) {
        const channelId = item.id as string | undefined;
        const uploads =
          item.contentDetails?.relatedPlaylists?.uploads as string | undefined;
        if (channelId && uploads) uploadsByChannel[channelId] = uploads;
      }

      await Promise.all(
        Object.entries(uploadsByChannel).map(async ([channelId, playlistId]) => {
          try {
            const itemsRes = await fetch(
              `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${encodeURIComponent(playlistId)}&maxResults=1&key=${apiKey}`,
              { cache: "no-store" }
            );
            if (!itemsRes.ok) return;
            const itemsData = await itemsRes.json();
            const videoId = itemsData.items?.[0]?.snippet?.resourceId
              ?.videoId as string | undefined;
            if (videoId) output[channelId] = videoId;
          } catch {
            /* skip */
          }
        })
      );
    }
  } catch {
    /* fall through to static fallback */
  }

  return withYouTubeLatestFallback(normalized, output);
}
