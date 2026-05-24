import type { Resource } from "@/lib/admin-data";

export function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <article className="flex flex-col gap-3 rounded-lg border border-black/[0.08] bg-white p-5">
      <span className="label-mono w-fit rounded bg-sv-off-white px-2 py-0.5 text-[10px] text-sv-gray">
        {resource.fileType}
      </span>
      <h3 className="font-display text-lg font-semibold text-[#0A0A0A]">
        {resource.title}
      </h3>
      {resource.description && (
        <p className="text-sm text-sv-gray">{resource.description}</p>
      )}
      {resource.fileUrl ? (
        <a
          href={resource.fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="label-mono mt-auto text-sv-red hover:text-sv-red-hover"
        >
          Download →
        </a>
      ) : (
        <p className="label-mono mt-auto text-sv-gray-mid">File pending upload</p>
      )}
    </article>
  );
}
