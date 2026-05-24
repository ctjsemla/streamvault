import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { StreamerCard } from "@/components/roster/StreamerCard";
import { SectionReveal } from "@/components/shared/SectionReveal";
import { getStreamers } from "@/lib/streamers";

export async function RosterCarousel() {
  const streamers = await getStreamers();

  return (
    <section className="overflow-hidden bg-white px-6 py-20 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionReveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="label-mono text-sv-red">The Roster</p>
            <h2 className="font-display mt-4 text-section text-[#0A0A0A]">
              Creators who move culture live.
            </h2>
          </div>
          <Link
            href="/roster"
            className="label-mono inline-flex items-center gap-1 text-[#0A0A0A] transition-colors hover:text-sv-red"
          >
            View full roster
            <ArrowRight className="size-3.5" />
          </Link>
        </SectionReveal>

        <SectionReveal delay={0.1} className="mt-12">
          <div className="-mx-6 flex gap-5 overflow-x-auto px-6 pb-4 scrollbar-none lg:-mx-10 lg:px-10">
            {streamers.map((streamer) => (
              <StreamerCard
                key={streamer.slug}
                streamer={streamer}
                className="w-[280px] shrink-0"
              />
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
