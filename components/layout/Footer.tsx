import Link from "next/link";
import { applyCta, footerExplore, footerSocial, siteTagline } from "@/lib/site";

function FooterLogo() {
  return (
    <Link href="/" className="group inline-flex items-baseline gap-0.5">
      <span className="font-display text-2xl font-semibold tracking-tight text-white transition-colors group-hover:text-sv-red">
        Stream
      </span>
      <span className="font-display text-2xl font-semibold tracking-tight text-sv-red">
        Vault
      </span>
    </Link>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-black/[0.06] bg-[#0A0A0A] text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr] lg:gap-8">
          <div className="flex flex-col gap-5 lg:pr-8">
            <FooterLogo />
            <p className="max-w-sm text-sm leading-relaxed text-white/60">
              {siteTagline}
            </p>
            <p className="label-mono text-white/40">Est. 2022</p>
            <Link
              href="/contact"
              className="label-mono w-fit text-sv-red transition-colors hover:text-sv-red-hover"
            >
              Contact us →
            </Link>
          </div>

          <div>
            <p className="label-mono mb-5 text-white/40">Explore</p>
            <ul className="flex flex-col gap-3">
              {footerExplore.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="label-mono mb-5 text-white/40">Connect</p>
            <ul className="flex flex-col gap-3">
              {footerSocial.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 h-px w-full bg-sv-red/80" aria-hidden />

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="label-mono text-white/40">
            © {year} StreamVault. All rights reserved.
          </p>
          <Link
            href={applyCta.href}
            className="label-mono text-sv-red transition-colors hover:text-sv-red-hover"
          >
            {applyCta.label} to join →
          </Link>
        </div>
      </div>
    </footer>
  );
}
