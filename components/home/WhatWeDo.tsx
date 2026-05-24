import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { RedDivider } from "@/components/shared/RedDivider";
import { SectionReveal } from "@/components/shared/SectionReveal";

const services = [
  {
    title: "Talent Management",
    description:
      "Full-service representation — contracts, negotiations, scheduling, and career strategy built for live-first creators.",
    href: "/services",
  },
  {
    title: "Brand Partnerships",
    description:
      "We match creators with brands that fit their audience. Campaign strategy, deliverables, and reporting handled end-to-end.",
    href: "/brands",
  },
  {
    title: "Content Strategy",
    description:
      "Clip programs, VOD repurposing, and cross-platform growth plans designed to compound your live audience.",
    href: "/services",
  },
] as const;

export function WhatWeDo() {
  return (
    <section className="bg-white px-6 py-20 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionReveal>
          <p className="label-mono text-sv-red">What We Do</p>
          <h2 className="font-display mt-4 max-w-2xl text-section text-[#0A0A0A]">
            Built for the live economy.
          </h2>
        </SectionReveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-3 lg:gap-8">
          {services.map((service, index) => (
            <SectionReveal key={service.title} delay={0.08 + index * 0.08}>
              <Link
                href={service.href}
                className="card-hover-lift group flex h-full flex-col rounded-lg border border-black/[0.08] bg-white p-6 lg:p-8"
              >
                <span className="font-mono-accent text-sm font-semibold text-sv-red">
                  0{index + 1}
                </span>
                <h3 className="font-display mt-6 text-2xl font-semibold tracking-tight text-[#0A0A0A] group-hover:text-sv-red">
                  {service.title}
                </h3>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-sv-gray">
                  {service.description}
                </p>
                <span className="label-mono mt-8 inline-flex items-center gap-1 text-[#0A0A0A] transition-colors group-hover:text-sv-red">
                  Learn more
                  <ArrowUpRight className="size-3.5" />
                </span>
              </Link>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal className="mt-16">
          <RedDivider />
        </SectionReveal>
      </div>
    </section>
  );
}
