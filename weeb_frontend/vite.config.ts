/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    // describe / it / expect available without import
    globals: true,
    // simulated browser (DOM) to render components in the terminal
    environment: "jsdom",
    // loaded before each test file (jest-dom matchers)
    setupFiles: "./src/setupTests.ts",
    coverage: {
      provider: "v8",
      include: ["src/**/*.{ts,tsx}"],
      exclude: ["src/**/*.test.{ts,tsx}", "src/setupTests.ts", "src/main.tsx"],
    },
  },
});
