const gulp = require('gulp');
const run = require('gulp-run');
const replace = require('gulp-string-replace');
const clean = require('gulp-clean');
const { series, parallel } = require('gulp');
const rollup = require('rollup');
const rollupTypescript = require('rollup-plugin-typescript');
const html = require('rollup-plugin-bundle-html');

// 1. Empty the HTML/dist directory
const cleanDist = (done) => {
  return gulp
    .src('./dist', { read: false, allowEmpty: true })
    .pipe(clean());
};

gulp.task('cleanPreDist', function(done) {
  return gulp
    .src('./preDist', { read: false, allowEmpty: true })
    .pipe(clean());
});

// 1. copy all the files from HTML/src to HTML/dist
gulp.task('copySource', function(done) {
  return gulp.src('./src/**/*').pipe(gulp.dest('./preDist'));
});

gulp.task('deletePreDistMapComponent', function() {
  return gulp
    .src('./preDist/MapComponent.tsx', { read: false, allowEmpty: true })
    .pipe(clean());
});

// copy the types file
/* gulp.task('copyTypes', function() {
  return gulp
    .src('./WebViewLeaflet/types.d.ts')
    .pipe(gulp.dest('./preDist'));
}); */

// 2. remove debugging flags from MapComponent.tsx file and copy that to the dist folder
gulp.task('replaceStrings', function() {
  return gulp
    .src(['./src/MapComponent.tsx']) // Any file globs are supported
    .pipe(
      replace('SHOW_DEBUG_INFORMATION = true', 'SHOW_DEBUG_INFORMATION = false')
    )
    .pipe(
      replace('ENABLE_BROWSER_TESTING = true', 'ENABLE_BROWSER_TESTING = false')
    )
    .pipe(gulp.dest('./preDist'));
});

gulp.task('inlineAssets', () => {
  return rollup.rollup({});
});
// use parcel to build, package, and copy to assets directory
gulp.task('buildForDist', async (done) => {
  /* return run(
    'parcel build ./preDist/index.html --out-dir ./dist --public-url .'
  ).exec(); */

  return rollup.rollup({
    input: './preDist/index.html',
    plugins: [
      html({
        template: './preDist/index.html',
        filename: 'index.html'
      })
    ]
  });
  /* .then((bundle) => {
      return bundle.write({
        file: './dist/index.html',
        format: 'umd',
        name: 'library',
        sourcemap: true
      });
    }); */
});

// copy to webviewLeaflet's assets directory

gulp.task('copyToWebViewLeaflet', async (done) => {
  return run(
    'parcel build ./preist/index.html --out-dir ./WebViewLeaflet/assets --public-url .'
  ).exec();
});

gulp.task('dist', (done) => {
  const tasks = gulp.series([
    cleanDist,
    'cleanPreDist',
    'copySource',
    'deletePreDistMapComponent',
    'replaceStrings',
    'buildForDist'
  ]);
  tasks();
  done();
});
