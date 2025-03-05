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
    },
  },
  resolve: {
    alias: {
      'firebase/app': '/node_modules/firebase/app',
      'firebase/firestore': '/node_modules/firebase/firestore'
    }
  },
  css: {
    devSourcemap: true
  }
}
