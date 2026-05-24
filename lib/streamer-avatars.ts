import type { Streamer } from "@/types/streamer";
import { getTwitchUserAvatars } from "@/lib/twitch";
import { getYouTubeAvatarForHandle } from "@/lib/youtube-profiles";

/** Known static avatar URLs (slug → image). */
const STATIC_AVATAR_BY_SLUG: Record<string, string> = {
  fl0m: "https://static-cdn.jtvnw.net/jtv_user_pictures/fl0m-profile_image-300x300.png",
  ac7ionman:
    "https://files.kick.com/images/user/5045/profile_image/conversion/ac7ionman-medium.webp",
};

export async function enrichStreamerAvatars(
  streamers: Streamer[]
): Promise<Streamer[]> {
  try {
    return await enrichStreamerAvatarsInner(streamers);
  } catch {
    return streamers;
  }
}

async function enrichStreamerAvatarsInner(
  streamers: Streamer[]
): Promise<Streamer[]> {
  const twitchLogins = streamers
    .filter((s) => s.twitchLogin)
    .map((s) => s.twitchLogin!);

  const twitchAvatars = await getTwitchUserAvatars(twitchLogins);

  const youtubeHandles = streamers
    .filter((s) => s.primaryPlatform === "youtube")
    .map((s) => s.handle);

  const youtubeAvatars = await Promise.all(
    youtubeHandles.map(async (handle) => ({
      handle,
      url: await getYouTubeAvatarForHandle(handle),
    }))
  );

  const youtubeByHandle = Object.fromEntries(
    youtubeAvatars
      .filter((e): e is { handle: string; url: string } => Boolean(e.url))
      .map((e) => [e.handle.toLowerCase(), e.url])
  );

  return streamers.map((streamer) => {
    if (streamer.avatarUrl) return streamer;

    if (streamer.twitchLogin) {
      const url = twitchAvatars[streamer.twitchLogin.toLowerCase()];
      if (url) return { ...streamer, avatarUrl: url };
    }

    if (streamer.primaryPlatform === "youtube") {
      const url = youtubeByHandle[streamer.handle.toLowerCase()];
      if (url) return { ...streamer, avatarUrl: url };
    }

    const staticUrl = STATIC_AVATAR_BY_SLUG[streamer.slug];
    if (staticUrl) return { ...streamer, avatarUrl: staticUrl };

    return streamer;
  });
}
