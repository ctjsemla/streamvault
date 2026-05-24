/** Twitch embed parent domains (required by Twitch player API). */
export function getTwitchEmbedParents(): string[] {
  const parents = ["localhost", "127.0.0.1"];

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (siteUrl) {
    try {
      const hostname = new URL(siteUrl).hostname;
      if (hostname) parents.push(hostname);
    } catch {
      /* ignore invalid URL */
    }
  }

  return Array.from(new Set(parents));
}

export function buildTwitchEmbedSrc(channel: string): string {
  const parentQuery = getTwitchEmbedParents()
    .map((p) => `parent=${encodeURIComponent(p)}`)
    .join("&");

  return `https://player.twitch.tv/?channel=${encodeURIComponent(channel)}&${parentQuery}&muted=false`;
}
