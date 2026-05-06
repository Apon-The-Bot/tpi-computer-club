// Configured for Vercel deployment.
// - cloudflare: false disables the Cloudflare Workers plugin
// - tanstackStart.target: "vercel" makes TanStack Start emit a Vercel-compatible build
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  cloudflare: false,
  tanstackStart: {
    target: "vercel",
    server: { entry: "server" },
  },
});
