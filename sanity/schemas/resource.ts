export const resourceSchema = {
  name: "resource",
  title: "Resource",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string" },
    { name: "fileType", title: "File Type", type: "string" },
    { name: "file", title: "File", type: "file" },
    { name: "description", title: "Description", type: "text" },
  ],
};
