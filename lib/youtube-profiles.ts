/** Resolve YouTube channel avatar from @handle via Data API. */
export async function getYouTubeAvatarForHandle(
  handle: string
): Promise<string | null> {
  const apiKey = process.env.YOUTUBE_API_KEY?.trim();
  if (!apiKey) return null;

  const forHandle = handle.replace(/^@/, "");
  if (!forHandle) return null;

  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=snippet&forHandle=${encodeURIComponent(forHandle)}&key=${apiKey}`,
      { next: { revalidate: 86400 } }
    );
    if (!res.ok) return null;

    const data = await res.json();
    const thumbs = data.items?.[0]?.snippet?.thumbnails;
    return (
      thumbs?.high?.url ??
      thumbs?.medium?.url ??
      thumbs?.default?.url ??
      null
    );
  } catch {
    return null;
  }
}
