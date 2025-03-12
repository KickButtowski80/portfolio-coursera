// postcss.config.cjs
module.exports = {
    plugins: [
      require('@fullhuman/postcss-purgecss')({
        content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue,html}'],
        defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
        safelist: {
          standard: ['html', 'body'],
          deep: [/^fa-/]
        }
      })
    ]
  };