// TOOLING ONLY: Vite serves/builds the website; Vitest uses the test settings below.
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
  plugins: [react()],
  test: {
    // Simulate browser elements for component tests without launching a real browser.
    environment: "jsdom",
    setupFiles: "./src/test/setup.js",
    restoreMocks: true,
  },
});
