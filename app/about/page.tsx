import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/contact/ContactForm";
import { RedDivider } from "@/components/shared/RedDivider";
import { SectionReveal } from "@/components/shared/SectionReveal";
import { agencyValues } from "@/lib/data/team.mock";

export const metadata: Metadata = {
  title: "About",
  description:
    "StreamVault is a live streaming talent agency built for creators and brands in the live economy.",
};

export default function AboutPage() {
  return (
    <div className="bg-white">
      <section className="px-6 pb-16 pt-10 lg:px-10 lg:pb-24 lg:pt-14">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
            <SectionReveal className="lg:max-w-2xl">
              <p className="label-mono text-sv-red">About</p>
              <h1 className="font-display mt-4 text-section text-[#0A0A0A]">
                Built for the live economy.
              </h1>
            </SectionReveal>
            <SectionReveal delay={0.1} className="lg:max-w-md lg:pb-2">
              <p className="text-lg leading-relaxed text-sv-gray">
                StreamVault launched in 2022 with a simple thesis: live streaming
                is not a subset of influencer marketing — it is its own industry
                with its own rules.
              </p>
            </SectionReveal>
          </div>

          <SectionReveal className="mt-16 lg:mt-20">
            <div className="border-l-2 border-sv-red pl-8 lg:pl-12">
              <p className="text-pull-quote text-[#0A0A0A]">
                We represent creators who treat live as their primary platform —
                and brands that want campaigns audiences actually watch.
              </p>
              <p className="mt-8 max-w-3xl text-sm leading-relaxed text-sv-gray lg:text-base">
                Today we manage an exclusive roster across Twitch, YouTube, Kick,
                and TikTok Live. Talent management, brand partnerships, and
                content strategy live under one roof — so creators can focus on
                streaming and brands get campaigns that feel native, not forced.
              </p>
            </div>
          </SectionReveal>
        </div>
      </section>

      <section className="border-t border-black/[0.06] bg-sv-off-white px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <SectionReveal>
            <p className="label-mono text-sv-red">Approach</p>
            <h2 className="font-display mt-4 max-w-2xl text-section text-[#0A0A0A]">
              A live-native agency, end to end.
            </h2>
            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-sv-gray lg:text-base">
              We don&apos;t list creators on a spreadsheet and hope for the best.
              Every partnership is scoped for live deliverables, measured with
              live metrics, and renewed based on what actually moved the audience.
            </p>
          </SectionReveal>
        </div>
      </section>

      <section className="px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <SectionReveal>
            <RedDivider />
            <p className="label-mono mt-12 text-sv-red">Values</p>
          </SectionReveal>

          <ol className="mt-10 space-y-12">
            {agencyValues.map((value, index) => (
              <SectionReveal key={value.title} delay={index * 0.06}>
                <li className="flex flex-col gap-4 sm:flex-row sm:gap-12">
                  <span className="font-mono-accent shrink-0 text-4xl font-bold text-sv-red/25">
                    0{index + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl font-semibold tracking-tight">
                      {value.title}
                    </h3>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-sv-gray">
                      {value.description}
                    </p>
                  </div>
                </li>
              </SectionReveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-black/[0.06] bg-sv-off-white px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-3xl">
          <SectionReveal>
            <p className="label-mono text-sv-red">Contact</p>
            <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight text-[#0A0A0A]">
              Get in touch.
            </h2>
            <p className="mt-4 text-sm text-sv-gray">
              Send a message through the form below — or visit our{" "}
              <Link href="/contact" className="text-sv-red hover:text-sv-red-hover">
                contact page
              </Link>
              .
            </p>
          </SectionReveal>
          <SectionReveal className="mt-10">
            <ContactForm className="rounded-lg border border-black/[0.08] bg-white p-6 lg:p-8" />
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}
