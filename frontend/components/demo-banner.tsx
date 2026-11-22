"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { messages, README_HREF } from "@/lib/messages";

type Status = { demo: boolean; max_chars: number };

/**
 * Fetches /api/status in the browser on every page load, so the mode is never
 * baked in at build time. On failure it shows nothing and does not retry.
 */
export function DemoBanner() {
  const [demo, setDemo] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/status", { cache: "no-store", signal: controller.signal })
      .then((response) => (response.ok ? (response.json() as Promise<Status>) : null))
      .then((status) => setDemo(status?.demo === true))
      .catch(() => setDemo(false));
    return () => controller.abort();
  }, []);

  if (!demo) return null;

  return (
    <div
      role="status"
      className="flex h-[52px] items-center gap-3 bg-demo-band px-page-margin text-body text-ink"
    >
      <InfoIcon />
      <span>{messages.demoBanner}</span>
      <Link href={README_HREF} className="text-label text-clay underline underline-offset-2">
        {messages.demoBannerReadmeLink}
      </Link>
    </div>
  );
}

function InfoIcon() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <circle cx="10" cy="10" r="8.25" />
      <path d="M10 9v5" />
      <path d="M10 6.25v.01" />
    </svg>
  );
}
