import { NextResponse } from "next/server";
import { isTwitchConfigured } from "@/lib/twitch-config";
import { getTwitchLiveStatuses } from "@/lib/twitch";
import { getYouTubeLatestVideoIds, getYouTubeLiveStatuses } from "@/lib/youtube";
import type { LiveBatchResponse } from "@/types/live";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const twitchLogins = searchParams
      .get("twitch")
      ?.split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const youtubeChannelIds = searchParams
      .get("youtube")
      ?.split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const twitch =
      isTwitchConfigured() && twitchLogins?.length
        ? await getTwitchLiveStatuses(twitchLogins)
        : {};

    const youtube = youtubeChannelIds?.length
      ? await getYouTubeLiveStatuses(youtubeChannelIds)
      : {};

    const anyYoutubeLive = Object.values(youtube).some((s) => s.isLive);
    const youtubeLatest =
      youtubeChannelIds?.length && !anyYoutubeLive
        ? await getYouTubeLatestVideoIds(youtubeChannelIds)
        : undefined;

    const body: LiveBatchResponse = { twitch, youtube, youtubeLatest };
    return NextResponse.json(body);
  } catch {
    const body: LiveBatchResponse = { twitch: {}, youtube: {} };
    return NextResponse.json(body);
  }
}
