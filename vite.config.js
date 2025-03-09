import { defineConfig } from "vite";

export default defineConfig({
  base: "/", // Ensure proper path resolution in Vercel
  build: {
    outDir: "dist", // Default output folder
    sourcemap: true, // Enable source maps for debugging
    rollupOptions: {
      input: {
        main: "index.html",
      },
    },
  },
  optimizeDeps: {
    include: ["firebase/app", "firebase/firestore"], // Ensure Firebase is pre-bundled
  },
  server: {
    watch: {
      usePolling: true, // Useful for WSL, Docker, or network file systems
    },
  },
});
