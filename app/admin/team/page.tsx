import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { BriefCard } from "@/components/admin/BriefCard";
import { DealTable } from "@/components/admin/DealTable";
import { FAQAccordion } from "@/components/admin/FAQAccordion";
import { ResourceCard } from "@/components/admin/ResourceCard";
import { authOptions } from "@/lib/auth";
import {
  getAdminBriefs,
  getAdminDeals,
  getAdminFaqs,
  getAdminResources,
} from "@/lib/admin-data";

export default async function AdminTeamPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/admin/login?callbackUrl=/admin/team");
  }

  const [deals, resources, briefs, faqs] = await Promise.all([
    getAdminDeals(),
    getAdminResources(),
    getAdminBriefs(),
    getAdminFaqs(),
  ]);

  return (
    <div className="flex min-h-screen flex-col bg-sv-off-white lg:flex-row">
      <AdminSidebar />
      <main className="min-w-0 flex-1 px-6 py-10 lg:px-10 lg:py-12">
        <p className="label-mono text-sv-red">Internal · Team Portal</p>
        <h1 className="font-display mt-2 text-3xl font-semibold tracking-tight text-[#0A0A0A] lg:text-4xl">
          Working with us.
        </h1>
        <p className="mt-2 text-sm text-sv-gray">
          Signed in as {session.user?.email}
        </p>

        <section className="mt-12">
          <h2 className="label-mono text-sv-gray-mid">Active deals</h2>
          <div className="mt-4">
            <DealTable deals={deals} />
          </div>
        </section>

        <section className="mt-14">
          <h2 className="label-mono text-sv-gray-mid">Resources</h2>
          <ul className="mt-4 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            {resources.map((resource) => (
              <li key={resource.id} className="w-full sm:max-w-xs sm:flex-1">
                <ResourceCard resource={resource} />
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-14">
          <h2 className="label-mono text-sv-gray-mid">Brief inbox</h2>
          {briefs.length === 0 ? (
            <p className="mt-4 text-sm text-sv-gray">
              No brand briefs yet. New inquiries from the site will appear here.
            </p>
          ) : (
            <ul className="mt-4 space-y-4">
              {briefs.map((brief) => (
                <li key={brief.id}>
                  <BriefCard brief={brief} />
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="mt-14">
          <h2 className="label-mono text-sv-gray-mid">FAQ</h2>
          <div className="mt-4 max-w-3xl">
            <FAQAccordion items={faqs} />
          </div>
        </section>
      </main>
    </div>
  );
}
