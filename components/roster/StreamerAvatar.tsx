"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type StreamerAvatarProps = {
  name: string;
  avatarUrl?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const SIZE_PX = { sm: 40, md: 56, lg: 112 } as const;

const SIZE_CLASSES = {
  sm: "size-10 text-xs",
  md: "size-14 text-sm",
  lg: "size-24 text-xl lg:size-28",
} as const;

export function StreamerAvatar({
  name,
  avatarUrl,
  size = "md",
  className,
}: StreamerAvatarProps) {
  const [failed, setFailed] = useState(false);
  const dim = SIZE_CLASSES[size];
  const px = SIZE_PX[size];

  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  if (!avatarUrl || failed) {
    return (
      <div
        className={cn(
          "flex shrink-0 items-center justify-center rounded-full bg-sv-red-tint font-mono-accent font-semibold text-sv-red",
          dim,
          className
        )}
      >
        {initials}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden rounded-full bg-sv-off-white",
        dim,
        className
      )}
    >
      <Image
        src={avatarUrl}
        alt={name}
        width={px}
        height={px}
        unoptimized
        className="h-full w-full object-cover"
        onError={() => setFailed(true)}
      />
    </div>
  );
}
