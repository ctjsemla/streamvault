"use client";

import { cn } from "@/lib/utils";

type YouTubeEmbedProps = {
  videoId: string;
  className?: string;
};

export function YouTubeEmbed({ videoId, className }: YouTubeEmbedProps) {
  return (
    <div className={cn("h-full w-full overflow-hidden bg-[#0A0A0A]", className)}>
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=0`}
        title="YouTube live stream"
        className="h-full w-full border-0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
