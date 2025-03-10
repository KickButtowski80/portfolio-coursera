import { defineConfig } from "vite";

export default defineConfig({
  base: "/", // Ensure proper path resolution in Vercel
  build: {
    outDir: "dist",
    sourcemap: false, // Disable source maps for production
    minify: "esbuild", // Use esbuild for minification
    cssCodeSplit: true, // Enable CSS code splitting
    cssMinify: true, // Enable CSS minification
    assetsInlineLimit: 4096, // Files smaller than 4kb will be inlined as base64
    rollupOptions: {
      input: {
        main: "index.html",
      },
      output: {
        manualChunks: {
          vendor: ["firebase/app", "firebase/firestore", "@fortawesome/fontawesome-free"]
        },
        assetFileNames: (assetInfo) => {
          // Process image files
          const imgType = /\.(png|jpe?g|gif|svg|webp|avif)$/;
          if (assetInfo.name && imgType.test(assetInfo.name)) {
            return 'assets/img/[name]-[hash][extname]';
          }
          // Process other files
          return 'assets/[name]-[hash][extname]';
        }
      },
      treeshake: {
        moduleSideEffects: false,
        propertyReadSideEffects: false,
        tryCatch: false
      }
    },
  },
  optimizeDeps: {
    include: ["firebase/app", "firebase/firestore", "@fortawesome/fontawesome-free"]
  },
  server: {
    watch: {
      usePolling: true,
    },
  },
  css: {
    modules: false, // Disable CSS modules to avoid conflicts
    preprocessorOptions: {
      scss: {
        additionalData: ''
      }
    }
  }
});
