import { DualCTA } from "@/components/home/DualCTA";
import { HeroSection } from "@/components/home/HeroSection";
import { RosterCarousel } from "@/components/home/RosterCarousel";
import { StatsBand } from "@/components/home/StatsBand";
import { StatsBar } from "@/components/home/StatsBar";
import { WhyStreamVault } from "@/components/home/WhyStreamVault";
import { WhatWeDo } from "@/components/home/WhatWeDo";

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <WhatWeDo />
      <RosterCarousel />
      <StatsBand />
      <WhyStreamVault />
      <DualCTA />
    </>
  );
}
