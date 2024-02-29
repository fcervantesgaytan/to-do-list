const purgecss = require('@fullhuman/postcss-purgecss')
const cssnano = require('cssnano')

const config = {
  plugins: [
    require('autoprefixer'),
    require('tailwindcss'),
    cssnano({
      preset: 'default'
    }),
    purgecss({
      content: ['./**/*.html'],
      defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
    })
  ]
}

module.exports = config
