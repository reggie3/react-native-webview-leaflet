const gulp = require('gulp')
const inlinesource = require('gulp-inline-source')
const replace = require('gulp-replace')
const clean = require('gulp-clean')
const rename = require('gulp-rename')

const BuildDirectory = 'build'
const FILE_NAME_AFTER_ADDING_INLINE_TAGS = 'indexWithTags.html'
const DIST_DIRECTORY = 'dist'

gulp.task('clean', function () {
  return gulp
    .src(
      [
        `${BuildDirectory}/${FILE_NAME_AFTER_ADDING_INLINE_TAGS}`,
        DIST_DIRECTORY,
      ],
      {
        allowEmpty: true,
        read: false,
      },
    )
    .pipe(clean())
})

gulp.task('addInlineTags', function () {
  return gulp
    .src('./build/*.html')
    .pipe(replace('rel="stylesheet"', 'rel="stylesheet" inline'))
    .pipe(replace('></script>', ' inline></script>'))
    .pipe(rename(FILE_NAME_AFTER_ADDING_INLINE_TAGS))
    .pipe(gulp.dest(BuildDirectory))
})

gulp.task('inlineSource', function () {
  return gulp
    .src(`./${BuildDirectory}/${FILE_NAME_AFTER_ADDING_INLINE_TAGS}`)
    .pipe(inlinesource())
    .pipe(rename('index.html'))
    .pipe(gulp.dest(DIST_DIRECTORY))
})

exports.build = gulp.series('clean', 'addInlineTags', 'inlineSource')
