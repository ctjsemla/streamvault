import Link from "next/link";

export function SuccessScreen() {
  return (
    <div className="rounded-lg border border-sv-red/20 bg-sv-red-tint px-8 py-12 text-center">
      <p className="label-mono text-sv-red">Application received</p>
      <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight text-[#0A0A0A]">
        You&apos;re on our radar.
      </h2>
      <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-sv-gray">
        We review every application personally. Expect a response within 5
        business days if your profile is a fit for the roster.
      </p>
      <Link
        href="/roster"
        className="label-mono mt-8 inline-flex text-sv-red hover:text-sv-red-hover"
      >
        Browse the roster →
      </Link>
    </div>
  );
}
