import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionReveal } from "@/components/shared/SectionReveal";
import { applyCta } from "@/lib/site";

export function DualCTA() {
  return (
    <section className="px-6 pb-24 pt-4 lg:px-10 lg:pb-32">
      <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-2 lg:gap-6">
        <SectionReveal>
          <div className="flex h-full flex-col justify-between rounded-lg bg-[#0A0A0A] p-8 text-white lg:p-10">
            <div>
              <p className="label-mono text-white/50">For Creators</p>
              <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight lg:text-4xl">
                Ready to go exclusive?
              </h2>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
                Apply to join the StreamVault roster. We work with creators who
                are serious about live as their primary platform.
              </p>
            </div>
            <Link
              href={applyCta.href}
              className="label-mono mt-10 inline-flex w-fit items-center gap-2 text-sv-red transition-colors hover:text-sv-red-hover"
            >
              {applyCta.label} now
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.08}>
          <div className="flex h-full flex-col justify-between rounded-lg border border-black/[0.08] bg-sv-red-tint p-8 lg:p-10">
            <div>
              <p className="label-mono text-sv-red">For Brands</p>
              <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight text-[#0A0A0A] lg:text-4xl">
                Launch a live campaign.
              </h2>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-sv-gray">
                Tell us about your brand and goals. We&apos;ll match you with
                creators whose audiences align with your target demo.
              </p>
            </div>
            <Link
              href="/brands"
              className="label-mono mt-10 inline-flex w-fit items-center gap-2 text-[#0A0A0A] transition-colors hover:text-sv-red"
            >
              Start a partnership
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
