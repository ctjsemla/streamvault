/** Static latest-video fallbacks when YouTube API quota is exhausted. */
export const YOUTUBE_LATEST_VIDEO_FALLBACK: Record<string, string> = {
  "UCwWZO7EaFHK-b0vC2uekKqw": "6UHwehd7Hyw",
  "UCAKt4p3InTNrYjSJKvx1bsA": "YkLVeQ_ANEg",
  "UCrZkYs5U8Tvj_ciAYFqshiw": "k_WyRN6xd-M",
};

export function withYouTubeLatestFallback(
  channelIds: string[],
  resolved: Record<string, string>
): Record<string, string> {
  const output = { ...resolved };
  for (const channelId of channelIds) {
    if (!output[channelId] && YOUTUBE_LATEST_VIDEO_FALLBACK[channelId]) {
      output[channelId] = YOUTUBE_LATEST_VIDEO_FALLBACK[channelId];
    }
  }
  return output;
}
