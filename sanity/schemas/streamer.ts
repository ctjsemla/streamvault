export const streamerSchema = {
  name: "streamer",
  title: "Streamer",
  type: "document",
  fields: [
    { name: "name", title: "Name", type: "string" },
    { name: "slug", title: "Slug", type: "slug", options: { source: "name" } },
    { name: "handle", title: "Handle", type: "string" },
    { name: "bio", title: "Bio", type: "text" },
    { name: "avatar", title: "Avatar", type: "image" },
    { name: "banner", title: "Banner", type: "image" },
    {
      name: "platforms",
      title: "Platforms",
      type: "array",
      of: [{ type: "string" }],
    },
    { name: "twitchLogin", title: "Twitch Login", type: "string" },
    { name: "youtubeChannelId", title: "YouTube Channel ID", type: "string" },
    { name: "kickUsername", title: "Kick Username", type: "string" },
    { name: "followers", title: "Followers", type: "number" },
    { name: "avgViewers", title: "Avg Viewers", type: "number" },
    { name: "peakViewers", title: "Peak Viewers", type: "number" },
    { name: "hoursPerWeek", title: "Hours Per Week", type: "number" },
    {
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "string" }],
    },
    { name: "showBrandDeals", title: "Show Brand Deals", type: "boolean" },
    {
      name: "brandDeals",
      title: "Brand Deals",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "brand", type: "string", title: "Brand" },
            { name: "campaign", type: "string", title: "Campaign" },
            { name: "year", type: "number", title: "Year" },
          ],
        },
      ],
    },
  ],
};
