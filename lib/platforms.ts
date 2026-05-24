import type { Platform, Streamer } from "@/types/streamer";

export function getTwitchStreamUrl(login: string): string {
  return `https://www.twitch.tv/${login}`;
}

export function getKickProfileUrl(username: string): string {
  return `https://kick.com/${username}`;
}

export function getYouTubeChannelUrl(channelId: string): string {
  return `https://www.youtube.com/channel/${channelId}`;
}

export function getYouTubeLiveUrl(videoId: string): string {
  return `https://www.youtube.com/watch?v=${videoId}`;
}

export function getPlatformProfileUrl(
  platform: Platform,
  streamer: Streamer
): string | null {
  if (streamer.platformUrls?.[platform]) {
    return streamer.platformUrls[platform] ?? null;
  }

  switch (platform) {
    case "twitch":
      return streamer.twitchLogin
        ? getTwitchStreamUrl(streamer.twitchLogin)
        : null;
    case "kick":
      return streamer.kickUsername
        ? getKickProfileUrl(streamer.kickUsername)
        : null;
    case "youtube":
      return streamer.youtubeChannelId
        ? getYouTubeChannelUrl(streamer.youtubeChannelId)
        : null;
    default:
      return null;
  }
}

export const PLATFORM_LABELS: Record<Platform, string> = {
  twitch: "Twitch",
  youtube: "YouTube",
  kick: "Kick",
  tiktok: "TikTok",
};
