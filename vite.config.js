import { defineConfig } from "vite";

export default defineConfig({
  base: "/", // Ensure proper path resolution in Vercel
  build: {
    outDir: "dist",
    sourcemap: false, // Disable source maps for production
    minify: "esbuild", // Use esbuild for minification
    cssCodeSplit: true, // Enable CSS code splitting
    cssMinify: true, // Enable CSS minification
    rollupOptions: {
      input: {
        main: "index.html",
      },
      output: {
        manualChunks: {
          vendor: ["firebase/app", "firebase/firestore", "@fortawesome/fontawesome-free"]
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
    include: ["firebase/app", "firebase/firestore", "@fortawesome/fontawesome-free"],
    exclude: []
  },
  server: {
    watch: {
      usePolling: true,
    },
  },
  css: {
    modules: {
      localsConvention: 'camelCase',
      generateScopedName: '[name]__[local]__[hash:base64:5]'
    },
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/styles/variables.scss";'
      }
    }
  }
});
