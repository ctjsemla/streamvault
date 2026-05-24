"use client";

import { useState } from "react";
import { ApplicationStepper } from "@/components/apply/ApplicationStepper";
import {
  TrackSelector,
  type ApplyTrack,
} from "@/components/apply/TrackSelector";
import { SectionReveal } from "@/components/shared/SectionReveal";

export default function ApplyPage() {
  const [track, setTrack] = useState<ApplyTrack>("streamer");

  return (
    <div className="bg-white">
      <section className="px-6 pb-12 pt-10 lg:px-10 lg:pb-16 lg:pt-14">
        <div className="mx-auto max-w-3xl">
          <SectionReveal>
            <p className="label-mono text-sv-red">Apply</p>
            <h1 className="font-display mt-4 text-section text-[#0A0A0A]">
              Join StreamVault.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-sv-gray">
              We represent creators who are serious about live as their primary
              platform. Choose your track and complete the application below.
            </p>
          </SectionReveal>

          <SectionReveal className="mt-10">
            <TrackSelector value={track} onChange={setTrack} />
          </SectionReveal>

          <SectionReveal className="mt-12">
            <ApplicationStepper key={track} track={track} />
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}
