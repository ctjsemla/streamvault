export const brandPartnerSchema = {
  name: "brandPartner",
  title: "Brand Partner",
  type: "document",
  fields: [
    { name: "name", title: "Name", type: "string" },
    { name: "logo", title: "Logo", type: "image" },
  ],
};

export const caseStudySchema = {
  name: "caseStudy",
  title: "Case Study",
  type: "document",
  fields: [
    { name: "headline", title: "Headline", type: "string" },
    { name: "campaignType", title: "Campaign Type", type: "string" },
    {
      name: "metrics",
      title: "Metrics",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "string" },
            { name: "value", type: "string" },
          ],
        },
      ],
    },
    { name: "brandName", title: "Brand Name", type: "string" },
  ],
};
