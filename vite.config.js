import { defineConfig } from "vite";
import { resolve } from "path";
import sharp from 'vite-plugin-sharp';

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
      force: true, // Force image processing even if the output file exists
      include: /\.(jpe?g|png|gif|webp)$/i, // File formats to process
      exclude: /node_modules/, // Exclude node_modules
      removeMetadata: true, // Remove image metadata
      defaultOptions: {
        jpeg: {
          quality: 80,
          progressive: true,
        },
        png: {
          quality: 80,
          compressionLevel: 9,
        },
        webp: {
          quality: 80,
          lossless: false,
          effort: 6,
        },
        gif: {
          quality: 80,
        },
        avif: {
          quality: 80,
          effort: 9,
        },
        resize: {
          width: 1920, // Max width
          height: 1080, // Max height
          fit: 'inside', // Maintain aspect ratio
          withoutEnlargement: true, // Don't upscale small images
        }
      }
    })
  ],
  css: {
    modules: false,
    preprocessorOptions: {
      scss: {
        additionalData: "",
      },
    },
  },
  server: {
    watch: {
      usePolling: true,
    },
  }
});