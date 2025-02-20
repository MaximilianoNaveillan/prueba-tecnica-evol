import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/", // Puede afectar la forma en que se sirven los recursos estáticos
  build: {
    outDir: "dist",
  },
  plugins: [react(), tailwindcss()],
});
