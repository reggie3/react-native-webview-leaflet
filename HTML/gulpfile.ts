const gulp = require('gulp');
const run = require('gulp-run');
const replace = require('gulp-string-replace');
const clean = require('gulp-clean');
const { series, parallel } = require('gulp');
const ts = require('gulp-typescript');

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
  gulp.src('./precompile', { read: false, allowEmpty: true }).pipe(clean());
  setTimeout(() => {
    done();
  }, 3000);
});

// Empty the assets directory of the WebviewLeafletComponent
gulp.task('cleanAssets', function(done) {
  gulp
    .src('../WebviewLeaflet/assets', { read: false, allowEmpty: true })
    .pipe(clean());
  done();
});

// copy all the files from HTML/src to HTML/precompile
gulp.task('copySource', function(done) {
  return gulp.src('./src/**/*').pipe(gulp.dest('./precompile'));
});

// remove debugging flags from MapComponent.tsx file and copy that to the readyForBuild folder
gulp.task('replaceStringsDist', function() {
  return gulp
    .src(['./src/MapComponent.tsx']) // Any file globs are supported
    .pipe(
      replace('SHOW_DEBUG_INFORMATION = true', 'SHOW_DEBUG_INFORMATION = false')
    )
    .pipe(
      replace('ENABLE_BROWSER_TESTING = true', 'ENABLE_BROWSER_TESTING = false')
    )
    .pipe(gulp.dest('./readyForBuild'));
});

// remove debugging flags from MapComponent.tsx file and copy that to the dist readyForBuild
gulp.task('replaceStringsDev', function(done) {
  gulp
    .src(['./src/MapComponent.tsx']) // Any file globs are supported
    .pipe(
      replace('SHOW_DEBUG_INFORMATION = true', 'SHOW_DEBUG_INFORMATION = true')
    )
    .pipe(
      replace('ENABLE_BROWSER_TESTING = true', 'ENABLE_BROWSER_TESTING = false')
    )
    .pipe(gulp.dest('./readyForBuild'));
  done();
});

gulp.task('copyCompiled', function(done) {
  // return gulp.src('./src/**/*').pipe(gulp.dest('./precompile'));
  return gulp
    .src('./compiled/HTML/precompile/**/*')
    .pipe(gulp.dest('./readyForBuild'));
});
// compile files to Typescript
gulp.task('compileTSC', (done) => {
  return run('yarn tsc').exec();
  /* var tsResult = gulp.src('src/*.ts').pipe(
    ts({
      noImplicitAny: true,
      target: 'es5',
      lib: ['es6', 'dom'],
      sourceMap: true,
      jsx: 'react',
      declaration: true,
           moduleResolution: 'node',
       types: ['react', 'jest', 'node'],
      noEmitOnError: false,
      outFile: 'out'
    })
  );
  return tsResult.js.pipe(gulp.dest('built/local')); */
});

// replace the import for index.tsx with index.js
gulp.task('replaceHtmlTsxImport', function() {
  return gulp
    .src(['./src/index.html'])
    .pipe(replace('index.tsx', 'index.js'))
    .pipe(gulp.dest('./readyForBuild'));
});

// copy the css and other asset files to the compile directory
gulp.task('copyNonTSFilesToCompile', (done) => {
  return gulp.src(['./src/**/*.css']).pipe(gulp.dest('./readyForBuild'));
});

// build the bundle and copy it to webviewLeaflet's assets directory
gulp.task('buildToWebViewLeaflet', async (done) => {
  return run(
    'parcel build ./readyForBuild/index.html --out-dir ../WebViewLeaflet/assets --public-url .'
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
  const tasks = gulp.parallel([
    'cleanCache',
    'cleanCompiled',
    'cleanDist'
    /* 'cleanPrecompile' */
  ]);
  tasks();
  done();
});

gulp.task('dev', (done) => {
  const tasks = gulp.series([
    'clean',
    'copySource',
    'replaceStringsDev',
    'compileTSC',
    'replaceHtmlTsxImport',
    'copyNonTSFilesToCompile',
    'copyCompiled'
    /* 'buildToWebViewLeaflet' */
  ]);
  tasks();
  done();
});

gulp.task('dist', (done) => {
  const tasks = gulp.series([
    'clean',
    'copySource',
    'replaceStringsDist',
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
