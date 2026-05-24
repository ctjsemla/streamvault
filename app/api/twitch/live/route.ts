import { NextResponse } from "next/server";
import { isTwitchConfigured } from "@/lib/twitch-config";
import { getTwitchLiveStatus } from "@/lib/twitch";

export async function GET(request: Request) {
  if (!isTwitchConfigured()) {
    return NextResponse.json({ isLive: false });
  }

  const { searchParams } = new URL(request.url);
  const login = searchParams.get("login");
  if (!login) {
    return NextResponse.json({ error: "login required" }, { status: 400 });
  }
  const status = await getTwitchLiveStatus(login);
  return NextResponse.json(status);
}
