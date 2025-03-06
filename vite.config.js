export default {
  server: {
    watch: {
      usePolling: true,
      include: ['**/*.html', '**/*.js', '**/*.css']
    }
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: 'index.html',
      },
      output: {
        manualChunks: {
          firebase: ['firebase/app', 'firebase/firestore'],
        },
      },
    },
  },
  resolve: {
    // Remove aliases to let Vite handle module resolution naturally
  },
  optimizeDeps: {
    include: []
  },
  css: {
    devSourcemap: true
  }
}
