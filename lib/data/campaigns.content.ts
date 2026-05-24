export const campaignTypes = [
  {
    id: "sponsored-stream",
    title: "Sponsored Live Stream",
    description:
      "Native brand integration during a scheduled live broadcast — product placement, talking points, and chat engagement woven into the creator's usual format.",
    metrics: ["Avg. 45 min integration", "Live chat activation", "VOD clip rights"],
  },
  {
    id: "product-launch",
    title: "Product Launch Event",
    description:
      "Coordinated go-live across one or multiple creators for a single launch moment. Ideal for gaming peripherals, energy drinks, apparel drops, and app releases.",
    metrics: ["Multi-creator sync", "Peak concurrent viewers", "Post-launch clip package"],
  },
  {
    id: "always-on",
    title: "Always-On Ambassador",
    description:
      "Quarterly partnership with recurring streams, social posts, and event appearances. Built for brands investing in long-term creator relationships.",
    metrics: ["3–12 month terms", "Category exclusivity options", "Quarterly reporting"],
  },
] as const;
