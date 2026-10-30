import { fileURLToPath, URL } from "node:url";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

/**
 * The live demos run the library from its repository, checked out next to this one (`../stackui`), until
 * `stackui` is on npm. Point somewhere else with STACKUI_SRC.
 */
const lib = process.env.STACKUI_SRC ?? fileURLToPath(new URL("../stackui/packages/react/src/", import.meta.url));
const raiz = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  plugins: [react()],
  // GitHub Pages serves the site under /stackui-site/.
  base: process.env.SITE_BASE ?? "/",
  resolve: {
    alias: { "stackui/styles.css": `${lib}styles/index.css`, "stackui/barcode": `${lib}barcode.ts`, "stackui": `${lib}index.ts` },
    // The library source sits outside this folder: React must still come from here, once.
    dedupe: ["react", "react-dom", "@zxing/browser", "@zxing/library"],
  },
  server: { port: 5310, fs: { allow: [raiz, lib] } },
  build: {
    rollupOptions: {
      // Two pages: the landing (its own CSS, no library) and the demo app shown inside the phones.
      input: { index: `${raiz}index.html`, demo: `${raiz}demo.html` },
    },
  },
});
