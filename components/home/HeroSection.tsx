"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { RedDivider } from "@/components/shared/RedDivider";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white px-6 pb-20 pt-10 lg:px-10 lg:pb-28 lg:pt-16">
      <div className="pointer-events-none absolute -right-24 top-0 size-[420px] rounded-full bg-sv-red/5 blur-3xl" />
      <div className="mx-auto max-w-7xl">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="label-mono text-sv-red"
        >
          Live Streaming Talent Agency
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="font-display mt-6 max-w-4xl text-hero text-[#0A0A0A]"
        >
          Where live creators become{" "}
          <span className="text-sv-red">brands.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.22 }}
          className="mt-8 max-w-xl text-lg leading-relaxed text-sv-gray"
        >
          StreamVault is the premier live streaming talent agency in the United
          States — exclusive management and brand partnerships for Twitch,
          YouTube, Kick, and TikTok Live creators.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.32 }}
          className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
        >
          <Link
            href="/roster"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-sv-red px-6 text-sm font-semibold text-white transition-colors hover:bg-sv-red-hover"
          >
            View Roster
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/brands"
            className="inline-flex h-11 items-center justify-center rounded-md border border-black/[0.12] bg-white px-6 text-sm font-semibold text-[#0A0A0A] transition-colors hover:border-black/[0.2] hover:bg-sv-off-white"
          >
            Partner With Us
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="mt-16 max-w-3xl"
        >
          <RedDivider />
        </motion.div>
      </div>
    </section>
  );
}
