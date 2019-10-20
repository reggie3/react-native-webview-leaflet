const gulp = require('gulp');
const run = require('gulp-run');
const replace = require('gulp-string-replace');
const clean = require('gulp-clean');
const { series, parallel } = require('gulp');

// Empty the HTML/dist directory
gulp.task('cleanCache', function(done) {
  return gulp.src('./.cache', { read: false, allowEmpty: true }).pipe(clean());
});

gulp.task('cleanDist', function(done) {
  return gulp.src('./dist', { read: false, allowEmpty: true }).pipe(clean());
});

// Empty the distribution directory
gulp.task('cleanCompiled', function(done) {
  return gulp
    .src('./compiled', { read: false, allowEmpty: true })
    .pipe(clean());
});

// Empty the preCompile directory
gulp.task('cleanPrecompile', function(done) {
  return gulp
    .src('./precompile', { read: false, allowEmpty: true })
    .pipe(clean());
});

// copy all the files from HTML/src to HTML/dist
gulp.task('copySource', function(done) {
  return gulp.src('./src/**/*').pipe(gulp.dest('./precompile'));
});

// remove debugging flags from MapComponent.tsx file and copy that to the dist folder
gulp.task('replaceStrings', function() {
  return gulp
    .src(['./src/MapComponent.tsx']) // Any file globs are supported
    .pipe(
      replace('SHOW_DEBUG_INFORMATION = true', 'SHOW_DEBUG_INFORMATION = true')
    )
    .pipe(
      replace('ENABLE_BROWSER_TESTING = true', 'ENABLE_BROWSER_TESTING = false')
    )
    .pipe(gulp.dest('./precompile'));
});

// compile files to Typescript
gulp.task('compileTSC', (done) => {
  return run('yarn tsc').exec();
});

// replace the import for index.tsx with index.js
gulp.task('replaceHtmlTsxImport', function() {
  return gulp
    .src(['./src/index.html']) // Any file globs are supported
    .pipe(replace('index.tsx', 'index.js'))
    .pipe(gulp.dest('./compiled'));
});

// copy the css and other asset files to the compile directory
gulp.task('copyNonTSFilesToCompile', (done) => {
  return gulp.src(['./src/**/*.css']).pipe(gulp.dest('./compiled'));
});

// build the bundle and copy it to webviewLeaflet's assets directory
gulp.task('buildToWebViewLeaflet', async (done) => {
  return run(
    'parcel build ./compiled/index.html --out-dir ../WebViewLeaflet/assets --public-url .'
  ).exec();
});

gulp.task('buildForLocal', async (done) => {
  return run(
    'parcel build ./compiled/index.html --out-dir ./dist --public-url .'
  ).exec();
});

// create a build directly from the source for use in the browser
gulp.task('sourceBuild', async (done) => {
  return run(
    'parcel build ./src/index.html --out-dir ./dist --public-url .'
  ).exec();
});

gulp.task('clean', (done) => {
  const tasks = gulp.parallel(['cleanCache', 'cleanCompiled', 'cleanDist']);
  tasks();
  done();
});

gulp.task('dist', (done) => {
  const tasks = gulp.series([
    'clean',
    'copySource',
    'replaceStrings',
    'compileTSC',
    'replaceHtmlTsxImport',
    'copyNonTSFilesToCompile',
    'buildToWebViewLeaflet'
  ]);
  tasks();
  done();
});

gulp.task('browserDist', (done) => {
  const tasks = gulp.series([
    'clean',
    'copySource',
    'compileTSC',
    'replaceHtmlTsxImport',
    'copyNonTSFilesToCompile',
    'buildForLocal'
  ]);
  tasks();
  done();
});
