// postcss.config.cjs
// postcss.config.cjs
module.exports = {
    plugins: [
      require('@fullhuman/postcss-purgecss')({
        content: ['./index.html', './js/**/*.js'],
        defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
        safelist: {
          standard: ['html', 'body', /^fa-/],
          deep: [/^modal-/, /^carousel-/],
          greedy: [/^nav-/]
        }
      })
    ]
  };