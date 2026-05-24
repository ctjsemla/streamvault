import { SectionReveal } from "@/components/shared/SectionReveal";

type CampaignRowProps = {
  title: string;
  description: string;
  metrics: readonly string[];
  index: number;
};

export function CampaignRow({
  title,
  description,
  metrics,
  index,
}: CampaignRowProps) {
  const isReversed = index % 2 === 1;

  return (
    <SectionReveal>
      <article
        className={`flex flex-col gap-8 py-12 lg:gap-12 lg:py-16 ${
          isReversed ? "lg:flex-row-reverse" : "lg:flex-row"
        } lg:items-center`}
      >
        <div
          className={`flex aspect-[4/3] w-full items-end rounded-lg border border-black/[0.08] bg-sv-red-tint p-8 lg:w-[45%] ${
            isReversed ? "lg:origin-right" : "lg:origin-left"
          }`}
        >
          <div>
            <span className="font-mono-accent text-5xl font-bold text-sv-red/25">
              0{index + 1}
            </span>
            <p className="label-mono mt-4 text-sv-red">Campaign type</p>
          </div>
        </div>

        <div className="min-w-0 flex-1 lg:py-4">
          <h3 className="font-display text-2xl font-semibold tracking-tight text-[#0A0A0A] lg:text-3xl">
            {title}
          </h3>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-sv-gray lg:text-base">
            {description}
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {metrics.map((metric) => (
              <li
                key={metric}
                className="label-mono rounded-full border border-black/[0.08] bg-white px-3 py-1 text-[10px] text-sv-gray"
              >
                {metric}
              </li>
            ))}
          </ul>
        </div>
      </article>
    </SectionReveal>
  );
}
