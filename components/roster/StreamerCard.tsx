import Link from "next/link";
import { LiveBadge } from "@/components/roster/LiveBadge";
import { StreamerAvatar } from "@/components/roster/StreamerAvatar";
import { PlatformBadge } from "@/components/shared/PlatformBadge";
import type { Streamer } from "@/types/streamer";
import { formatOptionalStat } from "@/lib/format";
import { cn } from "@/lib/utils";

type StreamerCardProps = {
  streamer: Streamer;
  className?: string;
  showLiveBadge?: boolean;
  twitchConfigured?: boolean;
};

function audienceLabel(streamer: Streamer): string {
  return streamer.primaryPlatform === "youtube" ? "Subscribers" : "Followers";
}

export function StreamerCard({
  streamer,
  className,
  showLiveBadge = false,
  twitchConfigured = false,
}: StreamerCardProps) {
  const followers = formatOptionalStat(streamer.followers);
  const avgViewers = formatOptionalStat(streamer.avgViewers);
  const showStats = followers != null || avgViewers != null;
  const showLive =
    showLiveBadge &&
    twitchConfigured &&
    streamer.primaryPlatform === "twitch" &&
    Boolean(streamer.twitchLogin);

  return (
    <Link
      href={`/roster/${streamer.slug}`}
      className={cn(
        "card-hover-lift group flex w-full flex-col gap-4 rounded-lg border border-black/[0.08] bg-white p-5",
        className
      )}
    >
      <div className="flex items-start gap-4">
        <StreamerAvatar
          name={streamer.name}
          avatarUrl={streamer.avatarUrl}
          size="md"
        />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-display text-lg font-semibold tracking-tight text-[#0A0A0A] group-hover:text-sv-red">
              {streamer.name}
            </p>
            {showLive && streamer.twitchLogin && (
              <LiveBadge
                twitchLogin={streamer.twitchLogin}
                twitchConfigured={twitchConfigured}
              />
            )}
          </div>
          <p className="label-mono mt-1 truncate text-sv-gray">
            {streamer.handle}
          </p>
          <PlatformBadge
            platform={streamer.primaryPlatform}
            className="mt-2"
          />
        </div>
      </div>

      {streamer.bio && (
        <p className="line-clamp-2 text-sm leading-relaxed text-sv-gray">
          {streamer.bio}
        </p>
      )}

      <div className="flex flex-wrap gap-2">
        {streamer.categories.slice(0, 3).map((cat) => (
          <span
            key={cat}
            className="label-mono rounded bg-sv-off-white px-2 py-1 text-[10px] text-sv-gray"
          >
            {cat}
          </span>
        ))}
      </div>

      {showStats && (
        <div
          className={cn(
            "mt-auto flex items-end justify-between border-t border-black/[0.06] pt-4",
            followers != null && avgViewers != null ? "" : "justify-start"
          )}
        >
          {avgViewers != null && (
            <div>
              <p className="label-mono text-sv-gray-mid">Avg viewers</p>
              <p className="font-mono-accent text-sm font-semibold text-[#0A0A0A]">
                {avgViewers}
              </p>
            </div>
          )}
          {followers != null && (
            <div className={avgViewers != null ? "text-right" : ""}>
              <p className="label-mono text-sv-gray-mid">
                {audienceLabel(streamer)}
              </p>
              <p className="font-mono-accent text-sm font-semibold text-[#0A0A0A]">
                {followers}
              </p>
            </div>
          )}
        </div>
      )}
    </Link>
  );
}
