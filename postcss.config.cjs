// postcss.config.cjs
const purgecss = require('@fullhuman/postcss-purgecss');

module.exports = {
  plugins: [
    purgecss({
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