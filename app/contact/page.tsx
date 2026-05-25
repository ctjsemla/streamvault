import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { SectionReveal } from "@/components/shared/SectionReveal";
import { siteContact } from "@/lib/site";

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
              Reach us at{" "}
              <a
                href={`mailto:${siteContact.email}`}
                className="font-medium text-[#0A0A0A] underline decoration-sv-red/40 underline-offset-4 transition-colors hover:text-sv-red"
              >
                {siteContact.email}
              </a>{" "}
              or use the form below — our team will respond as soon as possible.
            </p>
            <address className="mt-4 not-italic text-sm leading-relaxed text-sv-gray">
              {siteContact.office.street}
              <br />
              {siteContact.office.city}, {siteContact.office.state}{" "}
              {siteContact.office.zip}
            </address>
          </SectionReveal>

          <SectionReveal className="mt-12">
            <ContactForm className="rounded-lg border border-black/[0.08] bg-sv-off-white p-6 lg:p-8" />
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}
