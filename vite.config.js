import { defineConfig } from "vite";

export default defineConfig({
  base: "/", // Ensure proper path resolution in Vercel
  build: {
    outDir: "dist",
    sourcemap: false, // Disable source maps for production vercel
    minify: "terser", // Enable JavaScript minification
    rollupOptions: {
      input: {
        main: "index.html",
      },
      output: {
        manualChunks: undefined, // Optimize chunking
      },
    },
  },
  optimizeDeps: {
    include: ["firebase/app", "firebase/firestore"],
  },
  server: {
    watch: {
      usePolling: true,
    },
  },
});
