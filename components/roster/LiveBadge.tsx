"use client";

import useSWR from "swr";
import { formatCompactNumber } from "@/lib/format";
import { cn } from "@/lib/utils";

type LiveBadgeProps = {
  twitchLogin: string;
  twitchConfigured?: boolean;
  className?: string;
};

import type { LiveStatus } from "@/types/live";

const fetcher = (url: string) =>
  fetch(url).then((res) => res.json() as Promise<LiveStatus>);

export function LiveBadge({
  twitchLogin,
  twitchConfigured = true,
  className,
}: LiveBadgeProps) {
  const { data } = useSWR<LiveStatus>(
    twitchConfigured
      ? `/api/twitch/live?login=${encodeURIComponent(twitchLogin)}`
      : null,
    fetcher,
    { refreshInterval: 60_000, revalidateOnFocus: false }
  );

  if (!data?.isLive) return null;

  return (
    <span
      className={cn(
        "label-mono inline-flex items-center gap-1.5 rounded-full bg-sv-red-tint px-2 py-0.5 text-[10px] text-sv-red",
        className
      )}
    >
      <span className="live-pulse-dot size-1.5 rounded-full bg-sv-red" />
      Live
      {data.viewerCount != null && (
        <span className="text-sv-gray">
          · {formatCompactNumber(data.viewerCount)}
        </span>
      )}
    </span>
  );
}
