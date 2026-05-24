"use client";

import useSWR from "swr";
import type { Streamer } from "@/types/streamer";
import type { LiveBatchResponse } from "@/types/live";
import { formatCompactNumber } from "@/lib/format";
import { buildLiveBatchUrl } from "@/lib/live";
import { TwitchEmbed } from "@/components/roster/TwitchEmbed";

type StreamerLivePanelProps = {
  streamer: Streamer;
};

const fetcher = (url: string) =>
  fetch(url).then((res) => res.json() as Promise<LiveBatchResponse>);

export function StreamerLivePanel({ streamer }: StreamerLivePanelProps) {
  const isTwitch = streamer.primaryPlatform === "twitch" && !!streamer.twitchLogin;
  const batchUrl = isTwitch ? buildLiveBatchUrl([streamer]) : null;

  const { data } = useSWR<LiveBatchResponse>(
    batchUrl,
    batchUrl ? fetcher : null,
    {
      refreshInterval: 60_000,
      revalidateOnFocus: false,
    }
  );

  if (!isTwitch || !batchUrl || !data || !streamer.twitchLogin) return null;

  const twitchLogin = streamer.twitchLogin.toLowerCase();
  const twitchLive = data.twitch[twitchLogin];

  if (!twitchLive?.isLive) return null;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <span className="label-mono inline-flex items-center gap-1.5 rounded-full bg-sv-red-tint px-3 py-1 text-sv-red">
          <span className="live-pulse-dot size-1.5 rounded-full bg-sv-red" />
          LIVE on Twitch
        </span>
        {twitchLive.viewerCount != null && (
          <p className="font-mono-accent text-sm text-sv-gray">
            {formatCompactNumber(twitchLive.viewerCount)} watching now
          </p>
        )}
        {twitchLive.streamUrl && (
          <a
            href={twitchLive.streamUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="label-mono text-sv-red transition-colors hover:text-sv-red-hover"
          >
            Open stream →
          </a>
        )}
      </div>

      <TwitchEmbed channel={streamer.twitchLogin} />
    </div>
  );
}
