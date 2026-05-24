import { cn } from "@/lib/utils";

type StepIndicatorProps = {
  steps: string[];
  currentStep: number;
};

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="space-y-4">
      <div className="h-1 overflow-hidden rounded-full bg-black/[0.06]">
        <div
          className="h-full rounded-full bg-sv-red transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <ol className="flex justify-between gap-2">
        {steps.map((label, index) => (
          <li
            key={label}
            className={cn(
              "label-mono hidden text-center text-[10px] sm:block sm:max-w-[120px]",
              index <= currentStep ? "text-sv-red" : "text-sv-gray-mid"
            )}
          >
            <span
              className={cn(
                "mb-1 inline-flex size-6 items-center justify-center rounded-full border text-[10px]",
                index <= currentStep
                  ? "border-sv-red bg-sv-red text-white"
                  : "border-black/[0.08] bg-white text-sv-gray"
              )}
            >
              {index + 1}
            </span>
            <span className="mt-1 block">{label}</span>
          </li>
        ))}
      </ol>
      <p className="label-mono text-sv-gray sm:hidden">
        Step {currentStep + 1} of {steps.length}: {steps[currentStep]}
      </p>
    </div>
  );
}
