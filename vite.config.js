import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  base: "/",
  publicDir: "public",
  build: {
    outDir: "dist",
    sourcemap: false,
    // minify: "esbuild",
    minify: "terser",
    terserOptions: {
      compress: true,
      mangle: true
    },
    cssCodeSplit: true,
    cssMinify: true,
    assetsInlineLimit: 4096,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
      },
      output: {
        manualChunks: {
          // vendor: ["firebase/app", "firebase/firestore", "@fortawesome/fontawesome-free"]
          firebase: ["firebase/app", "firebase/firestore"],
  fontawesome: ["@fortawesome/fontawesome-free"]
        },
        assetFileNames: (assetInfo) => {
          const imgType = /\.(png|jpe?g|gif|svg|webp|avif)$/;
          if (assetInfo.name && imgType.test(assetInfo.name)) {
            return 'assets/img/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        }
      },
   
    },
    // treeshake: {
    //   moduleSideEffects: true,
    //   propertyReadSideEffects: true,
    //   tryCatch: true
    // }
  },
  server: {
    watch: {
      usePolling: true,
    },
  },
  css: {
    modules: false,
    preprocessorOptions: {
      scss: {
        additionalData: ''
      }
    }
  },
});