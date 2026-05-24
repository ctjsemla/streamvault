export const dealSchema = {
  name: "deal",
  title: "Deal",
  type: "document",
  fields: [
    { name: "name", title: "Deal Name", type: "string" },
    { name: "brand", title: "Brand", type: "string" },
    { name: "deadline", title: "Deadline", type: "date" },
    {
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: ["pending", "in_progress", "live", "completed", "invoiced"],
      },
    },
    { name: "streamerEmail", title: "Streamer Email", type: "string" },
  ],
};
