import { defineConfig } from "vite";
import { resolve } from "path";
import purgecss from 'vite-plugin-purgecss';
import sharp from 'vite-plugin-sharp';

export default defineConfig({
  build: {
    outDir: "dist",
    sourcemap: false,
    minify: "terser",
    terserOptions: {
      compress: {
        ecma: 2020,
        warnings: false,
        comparisons: false,
        inline: 2,
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
        passes: 3,
      },
      mangle: {
        safari10: true,
        properties: {
          regex: /^_/,
        },
      },
      format: {
        comments: false,
        ecma: 2020,
      },
      toplevel: true,
      keep_classnames: false,
      keep_fnames: false,
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
      content: [
        './index.html',
        './js/**/*.js'
      ],
      safelist: {
        standard: [
          'html', 'body', 'active', 'open', 'show', 'fade', 'collapse'
        ],
        deep: [
          /^fa-/,
          /^modal-/,
          /^carousel-/
        ],
        greedy: [
          /^nav-/,
          /^bg-/,
          /^theme-/,
          /^darkmode-/
        ]
      }
    }),
    sharp({
      force: true,
      include: /\.(jpe?g|png|gif|webp)$/i,
      exclude: /node_modules/,
      removeMetadata: true,
      defaultOptions: {
        jpeg: {
          quality: 75,
          progressive: true,
        },
        png: {
          quality: 75,
          compressionLevel: 9,
        },
        webp: {
          quality: 75,
          lossless: false,
          effort: 6,
        },
        gif: {
          quality: 75,
          effort: 7,
          colors: 128
        },
        avif: {
          quality: 75,
          effort: 9,
        },
        resize: {
          width: 800,  // Reduced from 1920
          height: 600, // Reduced from 1080
          fit: 'inside',
          withoutEnlargement: true,
          position: 'centre'
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
  },
});