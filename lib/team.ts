import { sanityClient, sanityConfigured } from "@/lib/sanity";

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  photoUrl?: string;
  order: number;
};

const teamQuery = `*[_type == "teamMember"] | order(order asc) {
  "id": _id,
  name,
  role,
  bio,
  "photoUrl": photo.asset->url,
  order
}`;

/** Team data is not rendered on the public site. Admin-only if needed later. */
export async function getTeamMembers(): Promise<TeamMember[]> {
  if (!sanityConfigured) return [];

  try {
    const rows = await sanityClient.fetch<TeamMember[]>(teamQuery);
    return rows;
  } catch {
    return [];
  }
}
