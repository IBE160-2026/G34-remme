import { afterEach, describe, expect, it, vi } from "vitest";

async function rewritesWith(backendUrl: string | undefined) {
  vi.resetModules();
  if (backendUrl === undefined) vi.stubEnv("BACKEND_URL", undefined);
  else vi.stubEnv("BACKEND_URL", backendUrl);
  const { default: config } = await import("./next.config");
  return config.rewrites!();
}

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("next.config rewrites", () => {
  it("defaults to 127.0.0.1:8000 when BACKEND_URL is unset", async () => {
    expect(await rewritesWith(undefined)).toEqual([
      { source: "/api/:path*", destination: "http://127.0.0.1:8000/api/:path*" },
    ]);
  });

  it("defaults to 127.0.0.1:8000 when BACKEND_URL is empty", async () => {
    expect(await rewritesWith("")).toEqual([
      { source: "/api/:path*", destination: "http://127.0.0.1:8000/api/:path*" },
    ]);
  });

  it("uses BACKEND_URL when set", async () => {
    expect(await rewritesWith("http://backend:8000")).toEqual([
      { source: "/api/:path*", destination: "http://backend:8000/api/:path*" },
    ]);
  });
});
