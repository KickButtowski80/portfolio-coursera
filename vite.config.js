import { defineConfig } from "vite";
import { resolve } from "path";
import sharp from "vite-plugin-sharp";

export default defineConfig({
  build: {
    outDir: "dist",
    sourcemap: false,
    minify: "terser",
    terserOptions: {
      compress: true,
      mangle: true,
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
          firebase: ["firebase/app", "firebase/firestore"],
          fontawesome: ["@fortawesome/fontawesome-free"],
        },
        assetFileNames: (assetInfo) => {
          const imgType = /\.(png|jpe?g|gif|svg|webp|avif)$/;
          if (assetInfo.name && imgType.test(assetInfo.name)) {
            return "assets/img/[name]-[hash][extname]";
          }
          return "assets/[name]-[hash][extname]";
        },
      },
    },
  },
  plugins: [
    sharp({
      quality: 80,
      mozjpeg: {
        quality: 80,
        progressive: true,
      },
      pngquant: {
        quality: [0.8, 0.9],
        speed: 4,
      },
      webp: {
        quality: 80,
      },
      avif: {
        quality: 80,
      },
    }),
  ],
  server: {
    watch: {
      usePolling: true,
    },
    modules: false,
    preprocessorOptions: {
      scss: {
        additionalData: "",
      },
    },
  },
});