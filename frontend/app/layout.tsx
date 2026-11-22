import type { Metadata } from "next";

import { DemoBanner } from "@/components/demo-banner";
import { messages } from "@/lib/messages";

import "./globals.css";

export const metadata: Metadata = {
  title: messages.appTitle,
  description: messages.appDescription,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="nb">
      <body className="min-h-screen bg-paper font-sans text-body text-ink">
        <DemoBanner />
        {children}
      </body>
    </html>
  );
}
