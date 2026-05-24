import { RedDivider } from "@/components/shared/RedDivider";
import { SectionReveal } from "@/components/shared/SectionReveal";
import { servicesDetail } from "@/lib/data/services.content";

export function ServicesList() {
  return (
    <section className="px-6 py-16 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-7xl space-y-24 lg:space-y-32">
        {servicesDetail.map((service, index) => {
          const isReversed = index % 2 === 1;

          return (
            <SectionReveal key={service.number}>
              <article
                className={`flex flex-col gap-10 lg:gap-16 ${
                  isReversed ? "lg:flex-row-reverse" : "lg:flex-row"
                } lg:items-start`}
              >
                <div className="lg:w-[38%] lg:shrink-0">
                  <span className="font-mono-accent text-6xl font-bold leading-none text-sv-red/20 lg:text-8xl">
                    {service.number}
                  </span>
                  <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight text-[#0A0A0A] lg:text-4xl">
                    {service.title}
                  </h2>
                  <p className="label-mono mt-3 text-sv-red">{service.tagline}</p>
                </div>

                <div className="min-w-0 flex-1 border-l-2 border-sv-red/30 pl-8 lg:pl-12">
                  <p className="text-lg leading-relaxed text-sv-gray">
                    {service.description}
                  </p>
                  <ul className="mt-8 space-y-3">
                    {service.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex gap-3 text-sm leading-relaxed text-[#0A0A0A]"
                      >
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-sv-red" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
              {index < servicesDetail.length - 1 && (
                <RedDivider className="mt-24 lg:mt-32" />
              )}
            </SectionReveal>
          );
        })}
      </div>
    </section>
  );
}
