import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { nitro } from "nitro/vite";

const isVercel = !!process.env.VERCEL;

export default defineConfig({
  cloudflare: !isVercel,
  plugins: isVercel ? [nitro({ preset: "vercel" })] : [],
});
