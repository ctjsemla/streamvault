import type { Deal } from "@/types/deal";
import { cn } from "@/lib/utils";

const statusStyles: Record<Deal["status"], string> = {
  pending: "bg-sv-off-white text-sv-gray",
  in_progress: "bg-sv-red-tint text-sv-red",
  live: "bg-sv-red text-white",
  completed: "bg-black/[0.06] text-[#0A0A0A]",
  invoiced: "bg-black/[0.06] text-sv-gray",
};

export function DealTable({ deals }: { deals: Deal[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-black/[0.08]">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead>
          <tr className="border-b border-black/[0.06] bg-sv-off-white">
            <th className="label-mono px-4 py-3 text-sv-gray-mid">Deal</th>
            <th className="label-mono px-4 py-3 text-sv-gray-mid">Brand</th>
            <th className="label-mono px-4 py-3 text-sv-gray-mid">Deadline</th>
            <th className="label-mono px-4 py-3 text-sv-gray-mid">Status</th>
          </tr>
        </thead>
        <tbody>
          {deals.map((deal) => (
            <tr key={deal.id} className="border-b border-black/[0.06] last:border-0">
              <td className="px-4 py-3 font-medium text-[#0A0A0A]">{deal.name}</td>
              <td className="px-4 py-3 text-sv-gray">{deal.brand}</td>
              <td className="px-4 py-3 font-mono-accent text-xs text-sv-gray">
                {deal.deadline}
              </td>
              <td className="px-4 py-3">
                <span
                  className={cn(
                    "label-mono inline-block rounded-full px-2 py-0.5 text-[10px] capitalize",
                    statusStyles[deal.status]
                  )}
                >
                  {deal.status.replace("_", " ")}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
