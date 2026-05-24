import { mockStreamers } from "@/lib/data/streamers.mock";
import { enrichStreamerAvatars } from "@/lib/streamer-avatars";
import { sanityClient, sanityConfigured } from "@/lib/sanity";
import type { Platform, Streamer } from "@/types/streamer";

const PLATFORMS: Platform[] = ["twitch", "youtube", "kick", "tiktok"];

type SanityStreamerRow = {
  _id: string;
  name: string;
  slug: string;
  handle?: string;
  bio?: string;
  avatarUrl?: string;
  bannerUrl?: string;
  platforms?: string[];
  twitchLogin?: string;
  youtubeChannelId?: string;
  kickUsername?: string;
  followers?: number;
  avgViewers?: number;
  peakViewers?: number;
  hoursPerWeek?: number;
  categories?: string[];
  showBrandDeals?: boolean;
  brandDeals?: Streamer["brandDeals"];
};

const streamersQuery = `*[_type == "streamer"] | order(name asc) {
  _id,
  name,
  "slug": slug.current,
  handle,
  bio,
  "avatarUrl": avatar.asset->url,
  "bannerUrl": banner.asset->url,
  platforms,
  twitchLogin,
  youtubeChannelId,
  kickUsername,
  followers,
  avgViewers,
  peakViewers,
  hoursPerWeek,
  categories,
  showBrandDeals,
  brandDeals
}`;

function normalizePlatform(value: string): Platform | null {
  const key = value.toLowerCase() as Platform;
  return PLATFORMS.includes(key) ? key : null;
}

function normalizeStreamer(row: SanityStreamerRow): Streamer | null {
  if (!row.slug || !row.name) return null;

  const platforms = (row.platforms ?? [])
    .map(normalizePlatform)
    .filter((p): p is Platform => p !== null);

  const primaryPlatform =
    platforms[0] ??
    (row.twitchLogin
      ? "twitch"
      : row.kickUsername
        ? "kick"
        : row.youtubeChannelId
          ? "youtube"
          : "twitch");

  return {
    _id: row._id,
    name: row.name,
    slug: row.slug,
    handle: row.handle ?? `@${row.slug}`,
    bio: row.bio,
    avatarUrl: row.avatarUrl,
    bannerUrl: row.bannerUrl,
    platforms: platforms.length ? platforms : [primaryPlatform],
    primaryPlatform,
    twitchLogin: row.twitchLogin,
    youtubeChannelId: row.youtubeChannelId,
    kickUsername: row.kickUsername,
    followers: row.followers ?? null,
    avgViewers: row.avgViewers ?? null,
    peakViewers: row.peakViewers ?? null,
    hoursPerWeek: row.hoursPerWeek ?? null,
    categories: row.categories ?? [],
    showBrandDeals: row.showBrandDeals,
    brandDeals: row.brandDeals,
  };
}

function shouldUseSanityRoster(): boolean {
  return process.env.USE_SANITY_ROSTER === "true";
}

async function loadMockRoster(): Promise<Streamer[]> {
  return enrichStreamerAvatars(mockStreamers);
}

export async function getStreamers(): Promise<Streamer[]> {
  if (!shouldUseSanityRoster() || !sanityConfigured) {
    return loadMockRoster();
  }

  try {
    const rows = await sanityClient.fetch<SanityStreamerRow[]>(streamersQuery);
    const streamers = rows
      .map(normalizeStreamer)
      .filter((s): s is Streamer => s !== null);

    if (streamers.length === 0) return loadMockRoster();
    return enrichStreamerAvatars(streamers);
  } catch {
    return loadMockRoster();
  }
}

export async function getStreamerBySlug(slug: string): Promise<Streamer | null> {
  const streamers = await getStreamers();
  return streamers.find((s) => s.slug === slug) ?? null;
}

export function getRosterFilterOptions(streamers: Streamer[]) {
  const categories = Array.from(
    new Set(streamers.flatMap((s) => s.categories))
  ).sort();

  const platforms = PLATFORMS.filter((p) =>
    streamers.some((s) => s.platforms.includes(p))
  );

  return { categories, platforms };
}

export function getTwitchRosterStreamers(streamers: Streamer[]): Streamer[] {
  return streamers.filter(
    (s) => s.primaryPlatform === "twitch" && Boolean(s.twitchLogin)
  );
}

export function getYouTubeRosterStreamers(streamers: Streamer[]): Streamer[] {
  return streamers.filter(
    (s) => s.primaryPlatform === "youtube" && Boolean(s.youtubeChannelId)
  );
}
