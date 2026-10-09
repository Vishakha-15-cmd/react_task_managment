// ============================================================
// VITE CONFIGURATION
// Enables React and Tailwind CSS plugins.
// ============================================================
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// ==================== VITE PLUGINS ====================
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
