const gulp = require('gulp');
const run = require('gulp-run');

gulp.task('dist', async (done) => {
  await run(
    'parcel build ../HTML/src/index.html --out-dir ./assets --public-url .'
  ).exec();
  done();
});

// copy dist file to location that WebViewLeaflet can use
gulp.task('copy', function() {
  return gulp
    .src('./HTML/dist/index.html')
    .pipe(gulp.dest('./WebViewLeaflet/'));
});

gulp.task('index', async (done) => {
  await gulp.series('dist', 'copy');
  done();
});
