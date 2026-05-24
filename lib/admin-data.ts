import type { BrandBrief } from "@/types/brand";
import type { Deal } from "@/types/deal";
import { sanityClient, sanityConfigured } from "@/lib/sanity";

export type Resource = {
  id: string;
  title: string;
  fileType: string;
  description?: string;
  fileUrl?: string;
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  order: number;
};

const mockDeals: Deal[] = [
  {
    id: "1",
    name: "CS2 Peripheral Launch",
    brand: "SteelSeries",
    deadline: "2026-06-15",
    status: "in_progress",
  },
  {
    id: "2",
    name: "Sponsored Stream Series",
    brand: "Razer",
    deadline: "2026-05-30",
    status: "live",
  },
  {
    id: "3",
    name: "Summer Activation",
    brand: "G Fuel",
    deadline: "2026-07-01",
    status: "pending",
  },
];

const mockResources: Resource[] = [
  {
    id: "1",
    title: "Rate Card Template 2026",
    fileType: "PDF",
    description: "Standard rate card for sponsored streams.",
  },
  {
    id: "2",
    title: "Brand Integration Guidelines",
    fileType: "PDF",
    description: "Do's and don'ts for live integrations.",
  },
  {
    id: "3",
    title: "Deliverables Checklist",
    fileType: "DOC",
    description: "Pre/post stream deliverable tracker.",
  },
];

const mockFaqs: FaqItem[] = [
  {
    id: "1",
    question: "When do I get paid for a completed deal?",
    answer:
      "Net-30 from deliverable sign-off unless otherwise stated in your contract. Finance sends a confirmation email when payment is initiated.",
    order: 1,
  },
  {
    id: "2",
    question: "Who do I contact for a live campaign issue?",
    answer:
      "Use the internal partnerships channel shared during onboarding. Include the deal name in your message.",
    order: 2,
  },
  {
    id: "3",
    question: "Can I negotiate brand deals independently?",
    answer:
      "Exclusive roster members route all brand inquiries through StreamVault. Non-exclusive terms are outlined in your agreement.",
    order: 3,
  },
];

export async function getAdminDeals(): Promise<Deal[]> {
  if (!sanityConfigured) return mockDeals;
  try {
    const rows = await sanityClient.fetch<Deal[]>(
      `*[_type == "deal"] | order(deadline asc) {
        "id": _id,
        name,
        brand,
        deadline,
        status
      }`
    );
    return rows.length ? rows : mockDeals;
  } catch {
    return mockDeals;
  }
}

export async function getAdminResources(): Promise<Resource[]> {
  if (!sanityConfigured) return mockResources;
  try {
    const rows = await sanityClient.fetch<Resource[]>(
      `*[_type == "resource"] {
        "id": _id,
        title,
        fileType,
        description,
        "fileUrl": file.asset->url
      }`
    );
    return rows.length ? rows : mockResources;
  } catch {
    return mockResources;
  }
}

export async function getAdminBriefs(): Promise<BrandBrief[]> {
  return [];
}

export async function getAdminFaqs(): Promise<FaqItem[]> {
  if (!sanityConfigured) return mockFaqs;
  try {
    const rows = await sanityClient.fetch<FaqItem[]>(
      `*[_type == "faq"] | order(order asc) {
        "id": _id,
        question,
        answer,
        order
      }`
    );
    return rows.length ? rows : mockFaqs;
  } catch {
    return mockFaqs;
  }
}
