/** YouTube embed requires a live video id from the Data API. */
export function buildYouTubeEmbedSrc(videoId: string): string {
  return `https://www.youtube.com/embed/${encodeURIComponent(videoId)}?autoplay=0&rel=0`;
}
