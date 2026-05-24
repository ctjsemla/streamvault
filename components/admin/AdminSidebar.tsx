"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin/team", label: "Working With Us" },
  { href: "/admin", label: "Overview" },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-full flex-col border-b border-black/[0.08] bg-[#0A0A0A] text-white lg:min-h-screen lg:w-56 lg:border-b-0 lg:border-r">
      <div className="px-6 py-8">
        <p className="label-mono text-sv-red">Internal</p>
        <p className="font-display mt-2 text-lg font-semibold">StreamVault</p>
      </div>
      <nav className="flex gap-1 px-4 pb-4 lg:flex-col lg:px-3 lg:pb-8">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "label-mono rounded-md px-3 py-2 text-[11px] transition-colors",
              pathname === link.href
                ? "bg-white/10 text-white"
                : "text-white/50 hover:bg-white/5 hover:text-white"
            )}
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <button
        type="button"
        onClick={() => signOut({ callbackUrl: "/admin/login" })}
        className="label-mono mt-auto hidden px-6 py-6 text-left text-white/40 transition-colors hover:text-sv-red lg:block"
      >
        Sign out
      </button>
    </aside>
  );
}
