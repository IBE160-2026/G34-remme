import { messages } from "@/lib/messages";

export default function Home() {
  return (
    <main className="px-page-margin py-8">
      <h1 className="font-serif text-display text-ink">{messages.appTitle}</h1>
      <p className="mt-4 max-w-reading-column font-serif text-lede text-ink-muted">
        {messages.appDescription}
      </p>
    </main>
  );
}
