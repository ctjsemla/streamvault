import { Suspense } from "react";
import { AdminLoginForm } from "./AdminLoginForm";

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-white">
          <p className="text-sm text-sv-gray">Loading…</p>
        </main>
      }
    >
      <AdminLoginForm />
    </Suspense>
  );
}
