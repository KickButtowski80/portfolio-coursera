import { defineConfig } from 'vite';
import { config } from 'dotenv';

export default defineConfig({
  server: {
    watch: {
      include: ['**/*.html', '**/*.js', '**/*.css']
    }
  },
  // define: {
  //   'process.env': config({ path: '.env.production' }).parsed
  // },
  build: {
    target: 'esnext',
    rollupOptions: {
      input: {
        main: 'index.html',
        recommendations: './js/recommendations-form/main.js'
      },
      output: {
        manualChunks: {
          firebase: ['firebase/app', 'firebase/firestore']
        }
      }
    },
    minify: 'terser',
    sourcemap: true
  },
  optimizeDeps: {
    include: ['firebase/app', 'firebase/firestore'],
    exclude: []
  }
});