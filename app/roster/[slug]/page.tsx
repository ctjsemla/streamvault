import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StreamerProfile } from "@/components/roster/StreamerProfile";
import { getStreamerBySlug, getStreamers } from "@/lib/streamers";

type PageProps = {
  params: { slug: string };
};

export async function generateStaticParams() {
  const streamers = await getStreamers();
  return streamers.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const streamer = await getStreamerBySlug(params.slug);

  if (!streamer) {
    return { title: "Creator Not Found" };
  }

  return {
    title: streamer.name,
    description: streamer.bio ?? `${streamer.name} — StreamVault roster creator.`,
  };
}

export default async function StreamerProfilePage({ params }: PageProps) {
  const { slug } = params;
  const streamer = await getStreamerBySlug(slug);

  if (!streamer) {
    notFound();
  }

  return <StreamerProfile streamer={streamer} />;
}
