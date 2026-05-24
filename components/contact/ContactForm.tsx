"use client";

import { useState } from "react";

type ContactFormProps = {
  id?: string;
  className?: string;
};

export function ContactForm({ id, className }: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch("/api/forms/contact", {
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

  if (status === "success") {
    return (
      <div
        className={`rounded-lg border border-sv-red/20 bg-sv-red-tint p-8 ${className ?? ""}`}
      >
        <p className="font-display text-xl font-semibold text-[#0A0A0A]">
          Message sent.
        </p>
        <p className="mt-2 text-sm text-sv-gray">
          Thanks for reaching out. We&apos;ll get back to you as soon as we can.
        </p>
      </div>
    );
  }

  return (
    <form
      id={id}
      onSubmit={handleSubmit}
      className={`space-y-5 ${className ?? ""}`}
    >
      <label className="block">
        <span className="label-mono text-sv-gray-mid">Name</span>
        <input
          name="name"
          required
          autoComplete="name"
          className="mt-2 w-full rounded-md border border-black/[0.08] bg-white px-3 py-2 text-sm outline-none focus-visible:border-sv-red focus-visible:ring-2 focus-visible:ring-sv-red/20"
        />
      </label>
      <label className="block">
        <span className="label-mono text-sv-gray-mid">Email</span>
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          className="mt-2 w-full rounded-md border border-black/[0.08] bg-white px-3 py-2 text-sm outline-none focus-visible:border-sv-red focus-visible:ring-2 focus-visible:ring-sv-red/20"
        />
      </label>
      <label className="block">
        <span className="label-mono text-sv-gray-mid">Message</span>
        <textarea
          name="message"
          rows={5}
          required
          className="mt-2 w-full resize-y rounded-md border border-black/[0.08] bg-white px-3 py-2 text-sm outline-none focus-visible:border-sv-red focus-visible:ring-2 focus-visible:ring-sv-red/20"
        />
      </label>
      {status === "error" && (
        <p className="text-sm text-sv-red">
          Something went wrong. Please try again.
        </p>
      )}
      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-md bg-sv-red px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-sv-red-hover disabled:opacity-60"
      >
        {status === "loading" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
