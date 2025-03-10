import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  base: "/",
  publicDir: "public",
  build: {
    outDir: "dist",
    sourcemap: false,
    minify: "esbuild", // Explicitly declared
    cssCodeSplit: true,
    cssMinify: true,
    assetsInlineLimit: 4096,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html")
      },
      output: {
        assetFileNames: (assetInfo) => {
          const imgType = /\.(png|jpe?g|gif|svg|webp|avif)$/;
          if (assetInfo.name && imgType.test(assetInfo.name)) {
            return 'assets/img/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        }
      }
    }
  },
  optimizeDeps: {
    include: ["firebase/app", "firebase/firestore"]
  }
});