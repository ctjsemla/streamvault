import type { Platform } from "@/types/streamer";
import { cn } from "@/lib/utils";

const STYLES: Record<Platform, string> = {
  twitch: "bg-[#9146FF]/10 text-[#9146FF] border-[#9146FF]/25",
  kick: "bg-[#53FC18]/10 text-[#3db814] border-[#53FC18]/30",
  youtube: "bg-red-500/10 text-red-600 border-red-500/25",
  tiktok: "bg-black/5 text-[#0A0A0A] border-black/10",
};

const LABELS: Record<Platform, string> = {
  twitch: "Twitch",
  kick: "Kick",
  youtube: "YouTube",
  tiktok: "TikTok",
};

const STYLES_DARK: Record<Platform, string> = {
  twitch: "bg-[#9146FF]/15 text-[#b380ff] border-[#9146FF]/35",
  kick: "bg-[#53FC18]/12 text-[#7dff4d] border-[#53FC18]/35",
  youtube: "bg-red-500/15 text-red-400 border-red-500/35",
  tiktok: "bg-white/5 text-white/70 border-white/15",
};

type PlatformBadgeProps = {
  platform: Platform;
  className?: string;
  variant?: "light" | "dark";
};

export function PlatformBadge({
  platform,
  className,
  variant = "light",
}: PlatformBadgeProps) {
  return (
    <span
      className={cn(
        "label-mono inline-flex items-center rounded border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
        variant === "dark" ? STYLES_DARK[platform] : STYLES[platform],
        className
      )}
    >
      {LABELS[platform]}
    </span>
  );
}

export function PlatformBadges({
  platforms,
  className,
}: {
  platforms: Platform[];
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap gap-1.5", className)}>
      {platforms.map((p) => (
        <PlatformBadge key={p} platform={p} />
      ))}
    </div>
  );
}
