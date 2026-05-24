"use client";

import { useMemo } from "react";
import { buildTwitchEmbedSrc } from "@/lib/twitch-embed";
import { cn } from "@/lib/utils";

type TwitchEmbedProps = {
  channel: string;
  className?: string;
};

export function TwitchEmbed({ channel, className }: TwitchEmbedProps) {
  const src = useMemo(() => buildTwitchEmbedSrc(channel), [channel]);

  return (
    <div className={cn("h-full w-full overflow-hidden bg-[#0A0A0A]", className)}>
      <iframe
        src={src}
        title={`${channel} live on Twitch`}
        className="h-full w-full border-0"
        allowFullScreen
      />
    </div>
  );
}
