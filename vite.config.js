import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/NivaraHealth/",   // 👈 MUST MATCH REPO NAME
});

