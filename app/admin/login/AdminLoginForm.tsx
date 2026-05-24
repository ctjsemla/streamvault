"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/admin/team";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid credentials or unauthorized email.");
      return;
    }

    router.push(callbackUrl);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-6 border border-black/10 p-8"
      >
        <div>
          <p className="label-mono text-sv-red">StreamVault Internal</p>
          <h1 className="font-display mt-2 text-3xl font-semibold text-sv-black">
            Admin Sign In
          </h1>
        </div>
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-black/10 px-4 py-3 text-sm outline-none focus:border-sv-red"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-black/10 px-4 py-3 text-sm outline-none focus:border-sv-red"
            required
          />
        </div>
        {error && <p className="text-sm text-sv-red">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-sv-red px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-sv-red-hover disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Sign In"}
        </button>
      </form>
    </main>
  );
}
