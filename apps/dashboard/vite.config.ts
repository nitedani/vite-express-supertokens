/// <reference types="vavite/vite-config" />

import vavite from "vavite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { telefunc } from "telefunc/vite";
export default defineConfig({
  buildSteps: [
    {
      name: "client",
      config: {
        build: {
          outDir: "dist/client",
          manifest: true,
          rollupOptions: { input: "/client/client-entry.tsx" },
        },
      },
    },
    {
      name: "server",
      config: {
        build: {
          ssr: true,
          outDir: "dist/server",
        },
      },
    },
  ],
  ssr: {
    external: ["reflect-metadata"],
  },

  root: __dirname,

  server: {
    port: Number(process.env.PORT || 3000),
    host: true,
    watch: {
      // important for docker compatibility
      usePolling: true,
    },
  },

  plugins: [
    vavite({
      serverEntry: "/server/main.ts",
      serveClientAssetsInDev: true,
    }),
    react(),
    tsconfigPaths(),
    telefunc({
      disableNamingConvention: true,
    }),
  ],
});
