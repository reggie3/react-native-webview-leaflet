const gulp = require('gulp');

const concat = require('gulp-concat');
const jeditor = require('gulp-json-editor');
const bump = require('gulp-bump');
const run = require('gulp-run');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const gutil = require('gulp-util');

// dependencies for npm publishing
const npmDeps = {
  "is-valid-coordinates": "^1.0.0",
  "leaflet": "^1.3.1",
  "leaflet.markercluster": "^1.3.0",
  "prop-types": "^15.6.0",
  "util": "^0.10.3",
  "render-if": "^0.1.1",
  "lodash.uniqby": "^4.7.0",
};
// additional dependencies for expo app
const expoDeps = {
  "expo": "^27.0.0",
  "react": "16.3.1",
  "react-dom": "^16.3.1",
  "react-native": "https://github.com/expo/react-native/archive/sdk-27.0.0.tar.gz"
};

// main for npm publishing
const npmMain = 'index.js';
// main for expo app
const expoMain = 'node_modules/expo/AppEntry.js';

// read the package.json and update it for npm publishing
gulp.task('forNPM', (done) => {
  gulp
    .src('./package.json')
    .pipe(bump())
    .pipe(
      jeditor(function(json) {
        json.dependencies = npmDeps;
        json.main = npmMain;
        return json;
      })
    )
    .pipe(concat('package.json'))
    .pipe(gulp.dest('./'));
  done();
});

// pack the files
gulp.task('webpack', (done) => {
  webpack(webpackConfig, function(err, stats) {
    if (err) throw new gutil.PluginError('webpack:build', err);
    gutil.log(
      '[webpack:build] Completed\n' +
        stats.toString({
          assets: true,
          chunks: true,
          chunkModules: true,
          colors: true,
          hash: false,
          timings: false,
          version: false
        })
    );
    done();
  });
});

gulp.task('npm-publish', () => {
  return run('npm publish').exec();
});

gulp.task('npm-publish-beta', () => {
  return run('npm publish --tag beta').exec();
});

gulp.task('git-add', () => {
  return run('git add .').exec();
});

gulp.task('git-commit', () => {
  return run('git commit -m "publishing"').exec();
});

gulp.task('git-push', () => {
  return run('git push origin master').exec();
});

gulp.task('git-push-inline-javascript', () => {
  return run('git push origin inline-javascript-2').exec();
});

gulp.task('forExpo', (done) => {
  gulp
    .src('./package.json')
    .pipe(
      jeditor({
        dependencies: expoDeps,
        main: expoMain
      })
    )
    .pipe(concat('package.json'))
    .pipe(gulp.dest('./'));
  done();
});

gulp.task('copy-build-files', (done) => {
  gulp.src('./build/index.html').pipe(gulp.dest('./assets/dist/'));
  gulp.src('./build/main.bundle.js.map').pipe(gulp.dest('./assets/dist/'));
  done();
});

gulp.task('build', gulp.series('webpack', 'copy-build-files'));

gulp.task(
  'prod',
  gulp.series(
    'forNPM',
    'build',
    gulp.parallel(
      gulp.series('git-add', 'git-commit', 'git-push'),
      'npm-publish'
    ),
    'forExpo',
    'copy-build-files'
  )
);

gulp.task(
  'beta',
  gulp.series(
    'forNPM',
    'webpack',
    gulp.parallel(
      gulp.series('git-add', 'git-commit', 'git-push-inline-javascript'),
      'npm-publish-beta'
    ),
    'forExpo',
    'copy-build-files'
  )
);

gulp.task(
  'test',
  gulp.series(
    'forNPM',
    'webpack',
    gulp.parallel(
      gulp.series('git-add', 'git-commit', 'git-push'),
      'npm-publish'
    ),
    'forExpo',
    'copy-build-files'
  )
);
