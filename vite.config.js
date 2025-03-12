import { defineConfig } from "vite";
import { resolve } from "path";
import purgecss from 'vite-plugin-purgecss';

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
    purgecss({
      content: ['./index.html', './js/**/*.js'],
      safelist: {
        standard: ['html', 'body', /^fa-/], // Keep Font Awesome classes
        deep: [/^modal-/, /^carousel-/],    // Keep important component classes
        greedy: [/^nav-/]                   // Keep navigation classes
      }
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