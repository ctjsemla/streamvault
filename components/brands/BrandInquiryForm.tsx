"use client";

import { useState } from "react";
import { SectionReveal } from "@/components/shared/SectionReveal";

export function BrandInquiryForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch("/api/forms/brand-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="px-6 py-20 lg:px-10 lg:py-28" id="inquiry">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start">
          <SectionReveal className="lg:w-[40%] lg:shrink-0">
            <p className="label-mono text-sv-red">Get in touch</p>
            <h2 className="font-display mt-4 text-section text-[#0A0A0A]">
              Start a partnership.
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-sv-gray">
              Tell us about your brand, campaign goals, and timeline. Our partnerships
              team responds within 2 business days.
            </p>
          </SectionReveal>

          <SectionReveal delay={0.08} className="min-w-0 flex-1">
            {status === "success" ? (
              <div className="rounded-lg border border-sv-red/20 bg-sv-red-tint p-8">
                <p className="font-display text-xl font-semibold text-[#0A0A0A]">
                  Inquiry received.
                </p>
                <p className="mt-2 text-sm text-sv-gray">
                  We&apos;ll be in touch shortly to discuss your campaign.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-5 rounded-lg border border-black/[0.08] bg-sv-off-white p-6 lg:p-8"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block sm:col-span-1">
                    <span className="label-mono text-sv-gray-mid">Company</span>
                    <input
                      name="companyName"
                      required
                      className="mt-2 w-full rounded-md border border-black/[0.08] bg-white px-3 py-2 text-sm outline-none focus-visible:border-sv-red"
                    />
                  </label>
                  <label className="block sm:col-span-1">
                    <span className="label-mono text-sv-gray-mid">Email</span>
                    <input
                      name="email"
                      type="email"
                      required
                      className="mt-2 w-full rounded-md border border-black/[0.08] bg-white px-3 py-2 text-sm outline-none focus-visible:border-sv-red"
                    />
                  </label>
                </div>
                <label className="block">
                  <span className="label-mono text-sv-gray-mid">Campaign type</span>
                  <input
                    name="campaignType"
                    required
                    placeholder="e.g. Sponsored stream, product launch"
                    className="mt-2 w-full rounded-md border border-black/[0.08] bg-white px-3 py-2 text-sm outline-none focus-visible:border-sv-red"
                  />
                </label>
                <label className="block">
                  <span className="label-mono text-sv-gray-mid">Budget range</span>
                  <select
                    name="budgetRange"
                    required
                    className="mt-2 w-full rounded-md border border-black/[0.08] bg-white px-3 py-2 text-sm outline-none focus-visible:border-sv-red"
                  >
                    <option value="under-2k">Under $2K</option>
                    <option value="2k-10k">$2K – $10K</option>
                    <option value="10k-50k">$10K – $50K</option>
                    <option value="50k-plus">$50K+</option>
                  </select>
                </label>
                <label className="block">
                  <span className="label-mono text-sv-gray-mid">Message</span>
                  <textarea
                    name="message"
                    rows={4}
                    required
                    className="mt-2 w-full resize-y rounded-md border border-black/[0.08] bg-white px-3 py-2 text-sm outline-none focus-visible:border-sv-red"
                  />
                </label>
                {status === "error" && (
                  <p className="text-sm text-sv-red">Something went wrong. Try again.</p>
                )}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="rounded-md bg-sv-red px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-sv-red-hover disabled:opacity-60"
                >
                  {status === "loading" ? "Sending…" : "Submit Inquiry"}
                </button>
              </form>
            )}
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
