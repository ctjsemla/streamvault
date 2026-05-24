import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { SectionReveal } from "@/components/shared/SectionReveal";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with StreamVault.",
};

export default function ContactPage() {
  return (
    <div className="bg-white">
      <section className="px-6 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-3xl">
          <SectionReveal>
            <p className="label-mono text-sv-red">Contact</p>
            <h1 className="font-display mt-4 text-section text-[#0A0A0A]">
              Send us a message.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-sv-gray">
              Use the form below and our team will respond as soon as possible.
              We don&apos;t publish a public inbox — this keeps our roster and
              partners protected from spam.
            </p>
          </SectionReveal>

          <SectionReveal className="mt-12">
            <ContactForm className="rounded-lg border border-black/[0.08] bg-sv-off-white p-6 lg:p-8" />
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}
