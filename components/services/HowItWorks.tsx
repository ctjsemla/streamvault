import { SectionReveal } from "@/components/shared/SectionReveal";
import { howItWorksSteps } from "@/lib/data/services.content";

export function HowItWorks() {
  return (
    <section className="border-t border-black/[0.06] bg-sv-off-white px-6 py-20 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionReveal>
          <p className="label-mono text-sv-red">Process</p>
          <h2 className="font-display mt-4 max-w-xl text-section text-[#0A0A0A]">
            How it works.
          </h2>
        </SectionReveal>

        <div className="relative mt-16 lg:ml-8">
          <div
            className="absolute bottom-0 left-[15px] top-0 w-px bg-sv-red/30 lg:left-[19px]"
            aria-hidden
          />

          <ol className="space-y-12 lg:space-y-16">
            {howItWorksSteps.map((item, index) => (
              <SectionReveal key={item.step} delay={index * 0.06}>
                <li className="relative flex gap-8 lg:gap-12">
                  <div className="relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border-2 border-sv-red bg-white lg:size-10">
                    <span className="font-mono-accent text-[10px] font-bold text-sv-red lg:text-xs">
                      {item.step}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1 pb-2 pt-0.5 lg:max-w-2xl">
                    <h3 className="font-display text-2xl font-semibold tracking-tight text-[#0A0A0A]">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-sv-gray lg:text-base">
                      {item.description}
                    </p>
                  </div>
                </li>
              </SectionReveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
