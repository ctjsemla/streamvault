"use client";

import { motion } from "framer-motion";

const reasons = [
  {
    title: "Creator-First",
    description:
      "We manage every deal so creators can focus on content. No conflicts, no compromises.",
  },
  {
    title: "US Market Expertise",
    description:
      "Deep roots in the US streaming ecosystem across Twitch, YouTube, and Kick.",
  },
  {
    title: "Transparent Deals",
    description:
      "Flat commission, clear contracts, no hidden fees. Creators and brands both win.",
  },
  {
    title: "Data-Driven Matching",
    description:
      "We match brands to the right creator based on audience data, not guesswork.",
  },
] as const;

export function WhyStreamVault() {
  return (
    <section className="bg-white px-6 py-20 lg:px-10 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:gap-20">
        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-72px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-section text-[#0A0A0A]"
        >
          Why brands choose StreamVault.
        </motion.h2>

        <div className="divide-y divide-black/[0.08] border-t border-black/[0.08]">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-48px" }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="border-l-2 border-sv-red py-6 pl-5 lg:py-8 lg:pl-6"
            >
              <h3 className="font-display text-xl font-semibold tracking-tight text-[#0A0A0A]">
                {reason.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-sv-gray lg:text-base">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
