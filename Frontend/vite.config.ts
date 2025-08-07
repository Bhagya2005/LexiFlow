import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    chunkSizeWarningLimit: 800, // optional: raise warning limit
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          shadcn: ['@radix-ui/react-tooltip', '@radix-ui/react-dialog', '@radix-ui/react-popover'],
          lucide: ['lucide-react'],
        },
      },
    },
  },
});
