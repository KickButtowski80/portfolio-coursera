export default {
  server: {
    watch: {
      include: ['**/*.html', '**/*.js', '**/*.css']
    }
  },
  build: {
    rollupOptions: {
      target: 'esnext',
      input: {
        main: 'index.html',
        recommendations: './js/recommendations-form/main.js'
      }
    }
  },
  optimizeDeps: {
    include: ['firebase/app', 'firebase/firestore']
  },
  css: {
    devSourcemap: true
  }
}
