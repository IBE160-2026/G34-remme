import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { messages } from "@/lib/messages";

import { DemoBanner } from "./demo-banner";

function mockFetch(impl: () => Promise<Response>) {
  const fetchMock = vi.fn<typeof fetch>(() => impl());
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

function jsonResponse(body: unknown, status = 200) {
  return Promise.resolve(
    new Response(JSON.stringify(body), {
      status,
      headers: { "Content-Type": "application/json" },
    }),
  );
}

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("DemoBanner", () => {
  it("shows the banner and README link when demo is true", async () => {
    const fetchMock = mockFetch(() => jsonResponse({ demo: true, max_chars: 15000 }));
    render(<DemoBanner />);

    expect(await screen.findByText(messages.demoBanner)).toBeTruthy();
    const link = screen.getByRole("link", { name: messages.demoBannerReadmeLink });
    expect(link.getAttribute("href")).toBe("/readme");
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock.mock.calls[0][0]).toBe("/api/status");
  });

  it("shows no banner when demo is false", async () => {
    const fetchMock = mockFetch(() => jsonResponse({ demo: false, max_chars: 15000 }));
    const { container } = render(<DemoBanner />);

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    await new Promise((resolve) => setTimeout(resolve, 50));
    expect(container.innerHTML).toBe("");
    expect(screen.queryByText(messages.demoBanner)).toBeNull();
  });

  it("shows no banner, does not crash and fetches once when the request fails", async () => {
    const fetchMock = mockFetch(() => Promise.reject(new TypeError("Failed to fetch")));
    const { container } = render(<DemoBanner />);

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    await new Promise((resolve) => setTimeout(resolve, 50));
    expect(container.innerHTML).toBe("");
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("shows no banner and fetches once when status returns 500", async () => {
    const fetchMock = mockFetch(() => jsonResponse({ detail: "error" }, 500));
    const { container } = render(<DemoBanner />);

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    await new Promise((resolve) => setTimeout(resolve, 50));
    expect(container.innerHTML).toBe("");
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
