export type BrandPartner = {
  _id?: string;
  name: string;
  logoUrl?: string;
};

export type CaseStudy = {
  _id?: string;
  headline: string;
  campaignType: string;
  metrics: { label: string; value: string }[];
  brandName?: string;
};

export type BrandBrief = {
  id: string;
  brandName: string;
  campaignType: string;
  budgetRange: string;
  message: string;
  receivedAt: string;
};
