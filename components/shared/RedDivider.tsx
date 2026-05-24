import { cn } from "@/lib/utils";

type RedDividerProps = {
  className?: string;
};

export function RedDivider({ className }: RedDividerProps) {
  return (
    <div
      role="presentation"
      className={cn("h-px w-full bg-sv-red/80", className)}
      aria-hidden
    />
  );
}
