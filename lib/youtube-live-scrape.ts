import type { LiveStatus } from "@/types/live";
import { getYouTubeLiveUrl } from "@/lib/platforms";

const USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

function extractVideoId(html: string): string | null {
  const match = html.match(/"videoId":"([A-Za-z0-9_-]{11})"/);
  return match?.[1] ?? null;
}

function parseIsLiveNow(html: string): boolean {
  const match = html.match(/"liveBroadcastDetails":\{[^}]*"isLiveNow":(true|false)/);
  return match?.[1] === "true";
}

function parseConcurrentViewers(html: string): number | undefined {
  const match = html.match(/"concurrentViewers":"(\d+)"/);
  return match ? Number(match[1]) : undefined;
}

/** Fallback when Data API is unavailable — checks /channel/{id}/live page. */
export async function scrapeYouTubeLiveStatus(
  channelId: string
): Promise<LiveStatus> {
  try {
    const livePageRes = await fetch(
      `https://www.youtube.com/channel/${encodeURIComponent(channelId)}/live`,
      {
        headers: { "User-Agent": USER_AGENT },
        cache: "no-store",
      }
    );
    if (!livePageRes.ok) return { isLive: false };

    const livePageHtml = await livePageRes.text();
    const videoId = extractVideoId(livePageHtml);
    if (!videoId) return { isLive: false };

    const watchRes = await fetch(
      `https://www.youtube.com/watch?v=${encodeURIComponent(videoId)}`,
      {
        headers: { "User-Agent": USER_AGENT },
        cache: "no-store",
      }
    );
    if (!watchRes.ok) return { isLive: false };

    const watchHtml = await watchRes.text();
    if (!parseIsLiveNow(watchHtml)) return { isLive: false };

    return {
      isLive: true,
      viewerCount: parseConcurrentViewers(watchHtml),
      streamUrl: getYouTubeLiveUrl(videoId),
      embedUrl: videoId,
    };
  } catch {
    return { isLive: false };
  }
}
