// import { defineConfig } from "vite";
// import { resolve } from "path";

// export default defineConfig({
//   build: {
//     outDir: "dist",
//     sourcemap: false,
//     minify: "terser",
//     terserOptions: {
//       compress: true,
//       mangle: true,
//     },
//     cssCodeSplit: true,
//     cssMinify: true,
//     assetsInlineLimit: 4096,
//     rollupOptions: {
//       input: {
//         main: resolve(__dirname, "index.html"),
//       },
//       output: {
//         manualChunks: {
//           firebase: ["firebase/app", "firebase/firestore"],
//           fontawesome: ["@fortawesome/fontawesome-free"],
//         },
//         assetFileNames: (assetInfo) => {
//           const imgType = /\.(png|jpe?g|gif|svg|webp|avif)$/;
//           if (assetInfo.name && imgType.test(assetInfo.name)) {
//             return "assets/img/[name]-[hash][extname]";
//           }
//           return "assets/[name]-[hash][extname]";
//         },
//       },
//     },
//   },
//   css: {
//     modules: false,
//     preprocessorOptions: {
//       scss: {
//         additionalData: "",
//       },
//     },
//   },
//   server: {
//     watch: {
//       usePolling: true,
//     },
//   }
// });

import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    outDir: "dist",
    sourcemap: false, // No sourcemaps for production
    minify: true, // Uses esbuild (faster than Terser)
    cssCodeSplit: true, // Splits CSS for better optimization
    assetsInlineLimit: 4096, // Inline assets under 4KB
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
          const assetExt = assetInfo.name?.split(".").pop();
          const assetType = ["png", "jpg", "jpeg", "gif", "svg", "webp", "avif"];
          return assetType.includes(assetExt)
            ? "assets/img/[name]-[hash][extname]"
            : "assets/[name]-[hash][extname]";
        },
      },
    },
  },
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
  },
});
 