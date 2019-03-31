const {src, dest, series} = require('gulp')
const sass = require('gulp-sass')
const csso = require('gulp-csso')
const htmlmin = require('gulp-htmlmin')
const include = require('gulp-file-include')
const autoprefixer = require('gulp-autoprefixer')
const del = require('del')

const AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
]

function scss() {
  return src('src/scss/*.scss')
    .pipe(sass())
    .pipe(autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
    .pipe(csso())
    .pipe(dest('dist'))
}

function html() {
  return src('src/**.html')
    .pipe(include({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(dest('dist'))
}

function clean() {
  return del('dist')
}

exports.build = series(clean, html, scss)

