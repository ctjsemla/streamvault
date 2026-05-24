export type Platform = "twitch" | "youtube" | "kick" | "tiktok";

export type Streamer = {
  _id?: string;
  name: string;
  slug: string;
  handle: string;
  bio?: string;
  avatarUrl?: string;
  bannerUrl?: string;
  platforms: Platform[];
  primaryPlatform: Platform;
  twitchLogin?: string;
  followers?: number | null;
  avgViewers?: number | null;
  peakViewers?: number | null;
  hoursPerWeek?: number | null;
  categories: string[];
  platformUrls?: Partial<Record<Platform, string>>;
  youtubeChannelId?: string;
  kickUsername?: string;
  realName?: string;
  language?: string;
  location?: string;
  minCampaignRate?: number;
  audienceAgeMid?: number;
  showBrandDeals?: boolean;
  brandDeals?: { brand: string; campaign: string; year?: number }[];
};
