export const mainNav = [
  { label: "Our Streamers", href: "/roster" },
  { label: "Services", href: "/services" },
  { label: "Brands", href: "/brands" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const applyCta = { label: "Apply", href: "/apply" } as const;

export const footerExplore = [...mainNav, applyCta] as const;

export const footerSocial = [
  { label: "X", href: "https://x.com/streamvault" },
  { label: "Instagram", href: "https://instagram.com/streamvault" },
  { label: "LinkedIn", href: "https://linkedin.com/company/streamvault" },
] as const;

export const siteTagline =
  "Live streaming talent management for the next generation of creators." as const;
