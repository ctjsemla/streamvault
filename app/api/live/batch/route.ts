import { NextResponse } from "next/server";
import { isTwitchConfigured } from "@/lib/twitch-config";
import { getTwitchLiveStatuses } from "@/lib/twitch";
import type { LiveBatchResponse } from "@/types/live";

export async function GET(request: Request) {
  if (!isTwitchConfigured()) {
    const body: LiveBatchResponse = { twitch: {}, youtube: {} };
    return NextResponse.json(body);
  }

  const { searchParams } = new URL(request.url);

  const twitchLogins = searchParams
    .get("twitch")
    ?.split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const twitch = twitchLogins?.length
    ? await getTwitchLiveStatuses(twitchLogins)
    : {};

  const body: LiveBatchResponse = { twitch, youtube: {} };
  return NextResponse.json(body);
}
