export const teamMemberSchema = {
  name: "teamMember",
  title: "Team Member",
  type: "document",
  fields: [
    { name: "name", title: "Name", type: "string" },
    { name: "role", title: "Role", type: "string" },
    { name: "bio", title: "Bio", type: "string" },
    { name: "photo", title: "Photo", type: "image" },
    { name: "order", title: "Order", type: "number" },
  ],
};
