import type { LiveStatus } from "@/types/live";
import { isTwitchConfigured } from "@/lib/twitch-config";
import { getTwitchStreamUrl } from "@/lib/platforms";

export type TwitchLiveStatus = LiveStatus;

let cachedToken: { accessToken: string; expiresAt: number } | null = null;

function withStreamUrl(login: string, status: LiveStatus): LiveStatus {
  if (!status.isLive) return status;
  return {
    ...status,
    streamUrl: getTwitchStreamUrl(login.toLowerCase()),
  };
}

async function getTwitchAccessToken(): Promise<string | null> {
  const clientId = process.env.TWITCH_CLIENT_ID;
  const clientSecret = process.env.TWITCH_CLIENT_SECRET;
  if (!clientId || !clientSecret) return null;

  if (cachedToken && cachedToken.expiresAt > Date.now()) {
    return cachedToken.accessToken;
  }

  const tokenRes = await fetch(
    `https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`,
    { method: "POST", cache: "no-store" }
  );
  if (!tokenRes.ok) return null;

  const { access_token, expires_in } = await tokenRes.json();
  cachedToken = {
    accessToken: access_token,
    expiresAt: Date.now() + (expires_in - 60) * 1000,
  };
  return access_token;
}

async function fetchTwitchStreams(
  logins: string[],
  accessToken: string,
  clientId: string
): Promise<Map<string, LiveStatus>> {
  const result = new Map<string, LiveStatus>();
  logins.forEach((login) => result.set(login.toLowerCase(), { isLive: false }));

  if (logins.length === 0) return result;

  const params = logins
    .map((login) => `user_login=${encodeURIComponent(login)}`)
    .join("&");

  const streamRes = await fetch(
    `https://api.twitch.tv/helix/streams?${params}`,
    {
      headers: {
        "Client-ID": clientId,
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    }
  );

  if (!streamRes.ok) throw new Error("Twitch streams failed");

  const data = await streamRes.json();
  for (const stream of data.data ?? []) {
    const login = String(stream.user_login ?? "").toLowerCase();
    result.set(login, withStreamUrl(login, {
      isLive: true,
      viewerCount: stream.viewer_count,
    }));
  }

  return result;
}

export async function getTwitchLiveStatus(login: string): Promise<TwitchLiveStatus> {
  const batch = await getTwitchLiveStatuses([login]);
  return batch[login.toLowerCase()] ?? { isLive: false };
}

export async function getTwitchUserAvatars(
  logins: string[]
): Promise<Record<string, string>> {
  const normalized = Array.from(
    new Set(logins.map((l) => l.trim().toLowerCase()).filter(Boolean))
  );
  if (normalized.length === 0 || !isTwitchConfigured()) return {};

  const clientId = process.env.TWITCH_CLIENT_ID!;
  try {
    const accessToken = await getTwitchAccessToken();
    if (!accessToken) return {};

    const params = normalized
      .map((login) => `login=${encodeURIComponent(login)}`)
      .join("&");

    const res = await fetch(`https://api.twitch.tv/helix/users?${params}`, {
      headers: {
        "Client-ID": clientId,
        Authorization: `Bearer ${accessToken}`,
      },
      next: { revalidate: 86400 },
    });

    if (!res.ok) return {};

    const data = await res.json();
    const output: Record<string, string> = {};
    for (const user of data.data ?? []) {
      const login = String(user.login ?? "").toLowerCase();
      const url = user.profile_image_url as string | undefined;
      if (login && url) output[login] = url;
    }
    return output;
  } catch {
    return {};
  }
}

export async function getTwitchLiveStatuses(
  logins: string[]
): Promise<Record<string, LiveStatus>> {
  const normalized = Array.from(
    new Set(logins.map((l) => l.trim().toLowerCase()).filter(Boolean))
  );

  if (normalized.length === 0) return {};

  if (!isTwitchConfigured()) {
    return Object.fromEntries(
      normalized.map((login) => [login, { isLive: false }])
    );
  }

  const clientId = process.env.TWITCH_CLIENT_ID!;

  try {
    const accessToken = await getTwitchAccessToken();
    if (!accessToken) throw new Error("No Twitch token");

    const streams = await fetchTwitchStreams(
      normalized,
      accessToken,
      clientId
    );

    const output: Record<string, LiveStatus> = {};
    for (const login of normalized) {
      output[login] = streams.get(login) ?? { isLive: false };
    }
    return output;
  } catch {
    return Object.fromEntries(
      normalized.map((login) => [login, { isLive: false }])
    );
  }
}
