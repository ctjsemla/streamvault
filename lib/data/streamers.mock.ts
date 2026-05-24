import type { Platform, Streamer } from "@/types/streamer";

type RawStreamer = {
  slug: string;
  name: string;
  realName?: string;
  platform: Platform;
  handle: string;
  profileUrl: string;
  avatarUrl: string;
  category: string[];
  followers: number | null;
  avgViewers: number | null;
  peakViewers: number | null;
  hoursPerWeek: number | null;
  bio: string;
  language: string;
  location: string;
};

const RAW_STREAMERS: RawStreamer[] = [
  {
    slug: "fl0m",
    name: "fl0m",
    realName: "Erik Flom",
    platform: "twitch",
    handle: "fl0m",
    profileUrl: "https://www.twitch.tv/fl0m",
    avatarUrl:
      "https://static-cdn.jtvnw.net/jtv_user_pictures/fl0m-profile_image-efa66f8f4aa42f40-70x70.png",
    category: ["Gaming", "CS2", "Esports"],
    followers: 922000,
    avgViewers: 3600,
    peakViewers: 26448,
    hoursPerWeek: 50,
    bio: "Professional CS2 player and full-time streamer. Former Team Mythic AWPer blending elite gameplay with unfiltered commentary.",
    language: "English",
    location: "USA",
  },
  {
    slug: "averagejonas",
    name: "AverageJonas",
    platform: "twitch",
    handle: "averagejonas",
    profileUrl: "https://www.twitch.tv/averagejonas",
    avatarUrl:
      "https://static-cdn.jtvnw.net/jtv_user_pictures/dca7e0ce-d5d5-417a-8c9d-324841cd74df-profile_image-70x70.png",
    category: ["Gaming", "Deadlock", "Variety"],
    followers: 1010000,
    avgViewers: 1159,
    peakViewers: 30754,
    hoursPerWeek: 40,
    bio: "Norwegian gamer, singer and streamer living in LA. Full-time Deadlock content creator and variety streamer.",
    language: "English",
    location: "USA",
  },
  {
    slug: "knoqd",
    name: "knoqd",
    platform: "twitch",
    handle: "knoqd",
    profileUrl: "https://www.twitch.tv/knoqd",
    avatarUrl:
      "https://static-cdn.jtvnw.net/jtv_user_pictures/a6c21315-7af3-4f4e-8b64-fe15d6a18820-profile_image-70x70.png",
    category: ["Gaming", "Apex Legends"],
    followers: 175000,
    avgViewers: 409,
    peakViewers: 12527,
    hoursPerWeek: 30,
    bio: "Top-ranked Apex Legends grinder. Competitive gameplay and ranked ladder content.",
    language: "English",
    location: "USA",
  },
  {
    slug: "mendo",
    name: "Mendo",
    realName: "Lucas Håkansson",
    platform: "twitch",
    handle: "mendo",
    profileUrl: "https://www.twitch.tv/mendo",
    avatarUrl:
      "https://static-cdn.jtvnw.net/jtv_user_pictures/3461b7bf-7fb0-476c-984e-d1800457fac5-profile_image-70x70.png",
    category: ["Gaming", "Variety", "FPS"],
    followers: 685000,
    avgViewers: 1057,
    peakViewers: 25321,
    hoursPerWeek: 45,
    bio: "Pro gamer turned full-time grinder. Team Liquid pro playing Delta Force, DayZ, and variety FPS titles.",
    language: "English",
    location: "USA",
  },
  {
    slug: "ac7ionman",
    name: "Ac7ionMan",
    realName: "Aaron Travis",
    platform: "kick",
    handle: "ac7ionman",
    profileUrl: "https://kick.com/ac7ionman",
    avatarUrl:
      "https://files.kick.com/images/user/1251175/profile_image/conversion/970253ee-6572-4a60-ab8c-3c7a6d5e461a-fullsize.webp",
    category: ["Gaming", "IRL", "Variety"],
    followers: 220000,
    avgViewers: 6177,
    peakViewers: 123086,
    hoursPerWeek: 35,
    bio: "Kick partner and variety streamer. Gaming, IRL content, and high-energy entertainment.",
    language: "English",
    location: "USA",
  },
  {
    slug: "eightv",
    name: "EightV",
    platform: "kick",
    handle: "eightv",
    profileUrl: "https://kick.com/eightv",
    avatarUrl:
      "https://files.kick.com/images/user/88473/profile_image/conversion/e253a5b0-5b95-4fb4-b4ba-393736b6024c-fullsize.webp",
    category: ["Gaming", "Variety"],
    followers: 10300,
    avgViewers: null,
    peakViewers: null,
    hoursPerWeek: null,
    bio: "Rising Kick streamer delivering gaming and variety content.",
    language: "English",
    location: "USA",
  },
  {
    slug: "coringa",
    name: "Coringa",
    realName: "Victor",
    platform: "kick",
    handle: "coringa",
    profileUrl: "https://kick.com/coringa",
    avatarUrl:
      "https://files.kick.com/images/user/4204697/profile_image/conversion/eabdc59b-2f82-4ced-bcfa-953dca92aa9f-fullsize.webp",
    category: ["Gaming", "IRL", "Entertainment"],
    followers: null,
    avgViewers: null,
    peakViewers: null,
    hoursPerWeek: null,
    bio: "LOUD organization streamer. Daily streams packed with gaming, reactions, and non-stop entertainment.",
    language: "Portuguese",
    location: "Brazil",
  },
  {
    slug: "erobb221",
    name: "erobb221",
    platform: "kick",
    handle: "erobb221",
    profileUrl: "https://kick.com/erobb221",
    avatarUrl:
      "https://files.kick.com/images/user/21115571/profile_image/conversion/8ce90004-d13f-4bf3-8034-d3acb6d3e2e2-fullsize.webp",
    category: ["IRL", "Just Chatting", "Entertainment"],
    followers: 1600,
    avgViewers: null,
    peakViewers: null,
    hoursPerWeek: null,
    bio: "IRL and Just Chatting streamer on Kick.",
    language: "English",
    location: "USA",
  },
  {
    slug: "westjett",
    name: "WestJett",
    platform: "youtube",
    handle: "@WestJett",
    profileUrl: "https://www.youtube.com/@WestJett",
    avatarUrl:
      "https://yt3.googleusercontent.com/ytc/AIdro_mUJftxEivgLVKLwiD197P7lWpzEaOz2xdxyFjdLL6I2d4=s160-c-k-c0x00ffffff-no-rj",
    category: ["Gaming", "Commentary", "Drama", "Valorant"],
    followers: 787000,
    avgViewers: null,
    peakViewers: null,
    hoursPerWeek: null,
    bio: "Canadian YouTuber. Former Valorant content creator turned internet drama and commentary creator with 207M+ total views.",
    language: "English",
    location: "Canada",
  },
  {
    slug: "iijeriichoii",
    name: "Jericho",
    realName: "Tucker Boner",
    platform: "youtube",
    handle: "@iijeriichoii",
    profileUrl: "https://www.youtube.com/@iijeriichoii",
    avatarUrl:
      "https://yt3.googleusercontent.com/ytc/AIdro_mIiI-gEmAC_EXIwtEQqV8O2d5-I_4mAhEGVbKNeWBPMRA=s160-c-k-c0x00ffffff-no-rj",
    category: ["Gaming", "Comedy", "Variety"],
    followers: 1220000,
    avgViewers: null,
    peakViewers: null,
    hoursPerWeek: null,
    bio: "American YouTuber and Twitch streamer with 1.2M+ on both platforms. Gaming, comedy skits, and variety content since 2009.",
    language: "English",
    location: "USA",
  },
  {
    slug: "tcaptainx",
    name: "TCaptainX",
    platform: "youtube",
    handle: "@TCaptainX",
    profileUrl: "https://www.youtube.com/@TCaptainX",
    avatarUrl: "/avatars/tcaptainx.jpg",
    category: ["Gaming", "Variety"],
    followers: 767000,
    avgViewers: null,
    peakViewers: null,
    hoursPerWeek: null,
    bio: "YouTuber with 767K subscribers and 529M+ total views across 2,000+ videos.",
    language: "English",
    location: "USA",
  },
];

function toStreamer(raw: RawStreamer): Streamer {
  const handle = raw.handle.startsWith("@") ? raw.handle : `@${raw.handle}`;
  const platform = raw.platform;

  return {
    slug: raw.slug,
    name: raw.name,
    handle,
    bio: raw.bio,
    platforms: [platform],
    primaryPlatform: platform,
    categories: raw.category,
    followers: raw.followers,
    avgViewers: raw.avgViewers,
    peakViewers: raw.peakViewers,
    hoursPerWeek: raw.hoursPerWeek,
    realName: raw.realName,
    language: raw.language,
    location: raw.location,
    platformUrls: { [platform]: raw.profileUrl },
    avatarUrl: raw.avatarUrl,
    twitchLogin: platform === "twitch" ? raw.handle : undefined,
    kickUsername: platform === "kick" ? raw.slug : undefined,
    showBrandDeals: false,
  };
}

export const mockStreamers: Streamer[] = RAW_STREAMERS.map(toStreamer);

export const TWITCH_ROSTER_LOGINS = mockStreamers
  .filter((s) => s.twitchLogin)
  .map((s) => s.twitchLogin!);
