"use client";

import { useState } from "react";
import { StepIndicator } from "@/components/apply/StepIndicator";
import { SuccessScreen } from "@/components/apply/SuccessScreen";
import type { ApplyTrack } from "@/components/apply/TrackSelector";

const STREAMER_STEPS = [
  "About you",
  "Your stream",
  "Audience",
  "Review",
];

const PARTNERSHIP_STEPS = ["Contact", "Details", "Review"];

type FormData = Record<string, string>;

type ApplicationStepperProps = {
  track: ApplyTrack;
};

export function ApplicationStepper({ track }: ApplicationStepperProps) {
  const steps = track === "streamer" ? STREAMER_STEPS : PARTNERSHIP_STEPS;
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );

  function update(field: string, value: string) {
    setData((prev) => ({ ...prev, [field]: value }));
  }

  async function submit() {
    setStatus("loading");
    try {
      const endpoint =
        track === "streamer"
          ? "/api/forms/streamer-application"
          : "/api/forms/brand-inquiry";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, track }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return <SuccessScreen />;
  }

  const isLast = step === steps.length - 1;

  return (
    <div className="space-y-8">
      <StepIndicator steps={steps} currentStep={step} />

      <div className="rounded-lg border border-black/[0.08] bg-white p-6 lg:p-8">
        {track === "streamer" && step === 0 && (
          <div className="space-y-5">
            <label className="block">
              <span className="label-mono text-sv-gray-mid">Full name</span>
              <input
                required
                value={data.name ?? ""}
                onChange={(e) => update("name", e.target.value)}
                className="mt-2 w-full rounded-md border border-black/[0.08] px-3 py-2 text-sm outline-none focus-visible:border-sv-red"
              />
            </label>
            <label className="block">
              <span className="label-mono text-sv-gray-mid">Email</span>
              <input
                type="email"
                required
                value={data.email ?? ""}
                onChange={(e) => update("email", e.target.value)}
                className="mt-2 w-full rounded-md border border-black/[0.08] px-3 py-2 text-sm outline-none focus-visible:border-sv-red"
              />
            </label>
            <label className="block">
              <span className="label-mono text-sv-gray-mid">Primary handle</span>
              <input
                required
                placeholder="@username"
                value={data.handle ?? ""}
                onChange={(e) => update("handle", e.target.value)}
                className="mt-2 w-full rounded-md border border-black/[0.08] px-3 py-2 text-sm outline-none focus-visible:border-sv-red"
              />
            </label>
          </div>
        )}

        {track === "streamer" && step === 1 && (
          <div className="space-y-5">
            <label className="block">
              <span className="label-mono text-sv-gray-mid">Primary platform</span>
              <select
                value={data.platform ?? "twitch"}
                onChange={(e) => update("platform", e.target.value)}
                className="mt-2 w-full rounded-md border border-black/[0.08] px-3 py-2 text-sm outline-none focus-visible:border-sv-red"
              >
                <option value="twitch">Twitch</option>
                <option value="youtube">YouTube</option>
                <option value="kick">Kick</option>
                <option value="tiktok">TikTok Live</option>
              </select>
            </label>
            <label className="block">
              <span className="label-mono text-sv-gray-mid">Twitch / channel login</span>
              <input
                value={data.twitchLogin ?? ""}
                onChange={(e) => update("twitchLogin", e.target.value)}
                className="mt-2 w-full rounded-md border border-black/[0.08] px-3 py-2 text-sm outline-none focus-visible:border-sv-red"
              />
            </label>
            <label className="block">
              <span className="label-mono text-sv-gray-mid">Stream schedule</span>
              <input
                placeholder="e.g. Mon–Fri, 6–10pm ET"
                value={data.schedule ?? ""}
                onChange={(e) => update("schedule", e.target.value)}
                className="mt-2 w-full rounded-md border border-black/[0.08] px-3 py-2 text-sm outline-none focus-visible:border-sv-red"
              />
            </label>
          </div>
        )}

        {track === "streamer" && step === 2 && (
          <div className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="label-mono text-sv-gray-mid">Followers</span>
                <input
                  type="number"
                  value={data.followers ?? ""}
                  onChange={(e) => update("followers", e.target.value)}
                  className="mt-2 w-full rounded-md border border-black/[0.08] px-3 py-2 text-sm outline-none focus-visible:border-sv-red"
                />
              </label>
              <label className="block">
                <span className="label-mono text-sv-gray-mid">Avg viewers</span>
                <input
                  type="number"
                  value={data.avgViewers ?? ""}
                  onChange={(e) => update("avgViewers", e.target.value)}
                  className="mt-2 w-full rounded-md border border-black/[0.08] px-3 py-2 text-sm outline-none focus-visible:border-sv-red"
                />
              </label>
            </div>
            <label className="block">
              <span className="label-mono text-sv-gray-mid">Content categories</span>
              <input
                placeholder="Gaming, IRL, Just Chatting…"
                value={data.categories ?? ""}
                onChange={(e) => update("categories", e.target.value)}
                className="mt-2 w-full rounded-md border border-black/[0.08] px-3 py-2 text-sm outline-none focus-visible:border-sv-red"
              />
            </label>
            <label className="block">
              <span className="label-mono text-sv-gray-mid">Why StreamVault?</span>
              <textarea
                rows={4}
                value={data.why ?? ""}
                onChange={(e) => update("why", e.target.value)}
                className="mt-2 w-full resize-y rounded-md border border-black/[0.08] px-3 py-2 text-sm outline-none focus-visible:border-sv-red"
              />
            </label>
          </div>
        )}

        {track === "streamer" && step === 3 && (
          <dl className="space-y-4 text-sm">
            {Object.entries(data).map(([key, val]) => (
              <div key={key} className="flex justify-between gap-4 border-b border-black/[0.06] pb-3">
                <dt className="label-mono text-sv-gray-mid capitalize">{key}</dt>
                <dd className="text-right text-[#0A0A0A]">{val}</dd>
              </div>
            ))}
          </dl>
        )}

        {track === "partnership" && step === 0 && (
          <div className="space-y-5">
            <label className="block">
              <span className="label-mono text-sv-gray-mid">Name</span>
              <input
                required
                value={data.name ?? ""}
                onChange={(e) => update("name", e.target.value)}
                className="mt-2 w-full rounded-md border border-black/[0.08] px-3 py-2 text-sm outline-none focus-visible:border-sv-red"
              />
            </label>
            <label className="block">
              <span className="label-mono text-sv-gray-mid">Email</span>
              <input
                type="email"
                required
                value={data.email ?? ""}
                onChange={(e) => update("email", e.target.value)}
                className="mt-2 w-full rounded-md border border-black/[0.08] px-3 py-2 text-sm outline-none focus-visible:border-sv-red"
              />
            </label>
            <label className="block">
              <span className="label-mono text-sv-gray-mid">Organization</span>
              <input
                value={data.companyName ?? ""}
                onChange={(e) => update("companyName", e.target.value)}
                className="mt-2 w-full rounded-md border border-black/[0.08] px-3 py-2 text-sm outline-none focus-visible:border-sv-red"
              />
            </label>
          </div>
        )}

        {track === "partnership" && step === 1 && (
          <div className="space-y-5">
            <label className="block">
              <span className="label-mono text-sv-gray-mid">Inquiry type</span>
              <input
                value={data.campaignType ?? ""}
                onChange={(e) => update("campaignType", e.target.value)}
                className="mt-2 w-full rounded-md border border-black/[0.08] px-3 py-2 text-sm outline-none focus-visible:border-sv-red"
              />
            </label>
            <label className="block">
              <span className="label-mono text-sv-gray-mid">Message</span>
              <textarea
                rows={5}
                required
                value={data.message ?? ""}
                onChange={(e) => update("message", e.target.value)}
                className="mt-2 w-full resize-y rounded-md border border-black/[0.08] px-3 py-2 text-sm outline-none focus-visible:border-sv-red"
              />
            </label>
          </div>
        )}

        {track === "partnership" && step === 2 && (
          <dl className="space-y-4 text-sm">
            {Object.entries(data).map(([key, val]) => (
              <div key={key} className="flex justify-between gap-4 border-b border-black/[0.06] pb-3">
                <dt className="label-mono text-sv-gray-mid capitalize">{key}</dt>
                <dd className="text-right text-[#0A0A0A]">{val}</dd>
              </div>
            ))}
          </dl>
        )}

        {status === "error" && (
          <p className="mt-4 text-sm text-sv-red">Submission failed. Try again.</p>
        )}
      </div>

      <div className="flex justify-between gap-4">
        <button
          type="button"
          disabled={step === 0}
          onClick={() => setStep((s) => s - 1)}
          className="rounded-md border border-black/[0.08] px-5 py-2.5 text-sm font-medium text-sv-gray transition-colors hover:border-black/[0.16] disabled:opacity-40"
        >
          Back
        </button>
        {isLast ? (
          <button
            type="button"
            onClick={submit}
            disabled={status === "loading"}
            className="rounded-md bg-sv-red px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-sv-red-hover disabled:opacity-60"
          >
            {status === "loading" ? "Submitting…" : "Submit Application"}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setStep((s) => s + 1)}
            className="rounded-md bg-[#0A0A0A] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-sv-gray"
          >
            Continue
          </button>
        )}
      </div>
    </div>
  );
}
