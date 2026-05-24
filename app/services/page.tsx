import type { Metadata } from "next";
import Link from "next/link";
import { HowItWorks } from "@/components/services/HowItWorks";
import { ServicesList } from "@/components/services/ServicesList";
import { RedDivider } from "@/components/shared/RedDivider";
import { SectionReveal } from "@/components/shared/SectionReveal";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Talent management, brand partnerships, and content strategy for live streaming creators.",
};

export default function ServicesPage() {
  return (
    <div className="bg-white">
      <section className="px-6 pb-8 pt-10 lg:px-10 lg:pb-12 lg:pt-14">
        <div className="mx-auto max-w-7xl">
          <SectionReveal>
            <p className="label-mono text-sv-red">Services</p>
            <h1 className="font-display mt-4 max-w-3xl text-section text-[#0A0A0A]">
              Everything live creators need to scale.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-sv-gray">
              StreamVault is a full-service live streaming agency — not a
              traditional talent firm with a webcam add-on. Every service is
              built around how creators and audiences actually show up today.
            </p>
          </SectionReveal>
          <SectionReveal className="mt-10">
            <RedDivider />
          </SectionReveal>
        </div>
      </section>

      <ServicesList />
      <HowItWorks />

      <section className="border-t border-black/[0.06] px-6 py-14 lg:px-10 lg:py-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-lg">
            <p className="label-mono text-sv-gray-mid">For brands</p>
            <p className="font-display mt-2 text-2xl font-semibold tracking-tight">
              Launch a live campaign with our roster.
            </p>
          </div>
          <Link
            href="/brands"
            className="inline-flex h-11 items-center justify-center rounded-md bg-sv-red px-6 text-sm font-semibold text-white transition-colors hover:bg-sv-red-hover"
          >
            Partner With Us
          </Link>
        </div>
      </section>
    </div>
  );
}
