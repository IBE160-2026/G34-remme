import { readFile } from "node:fs/promises";
import path from "node:path";

import Link from "next/link";

import { messages } from "@/lib/messages";

// Read the README at request time, never at build time.
export const dynamic = "force-dynamic";

async function readReadme(): Promise<string | null> {
  const readmePath = path.resolve(
    /*turbopackIgnore: true*/ process.cwd(),
    process.env.README_PATH ?? "../README.md",
  );
  try {
    return await readFile(readmePath, "utf-8");
  } catch {
    return null;
  }
}

export default async function ReadmePage() {
  const readme = await readReadme();

  return (
    <main className="px-page-margin py-7">
      <Link href="/" className="text-label text-clay underline underline-offset-2">
        {messages.backToApp}
      </Link>
      <h1 className="mt-6 font-serif text-headline text-ink">{messages.readmeTitle}</h1>
      {readme === null ? (
        <p className="mt-5 font-serif text-title text-ink">{messages.readmeMissing}</p>
      ) : (
        <pre className="mt-5 max-w-reading-column font-sans text-body whitespace-pre-wrap text-ink">
          {readme}
        </pre>
      )}
    </main>
  );
}
