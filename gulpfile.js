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
  expo: '^30.0.0',
  'is-valid-coordinates': '^1.0.0',
  leaflet: '^1.3.1',
  'leaflet.markercluster': '^1.3.0',
  'prop-types': '^15.6.0',
  util: '^0.10.3',
  'lodash.uniqby': '^4.7.0',
  geolib: '^2.0.24',
  'react-leaflet': '^2.0.0-rc.1',
};

const npmPeerDeps={
  "react": "16.3.1",
  "react-dom": "^16.3.1",
  "react-native": "^0.57.1"
}

// additional dependencies for expo app
const expoDeps = {
  expo: '^30.0.0',
  react: '16.3.1',
  'react-dom': '^16.3.1',
  'react-native': `https://github.com/expo/react-native/archive/sdk-30.0.0.tar.gz`
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
        json.peerDependencies = npmPeerDeps;
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
  return run('webpack').exec();
  done();
});

gulp.task('npm-publish', (done) => {
  return run('npm publish').exec();
  done();
});

gulp.task('npm-publish-beta', (done) => {
  return run('npm publish --tag beta').exec();
  done();
});

gulp.task('git-add', (done) => {
  return run('git add .').exec();
  done();
});

gulp.task('git-commit', (done) => {
  return run('git commit -m "publishing"').exec();

  done();
});

gulp.task('git-push', (done) => {
  return run('git push origin master').exec();
  done();
});

gulp.task('git-push-beta', (done) => {
  return run('git push origin 5-with-raster-layers').exec();
});

gulp.task('forExpo', (done) => {
  gulp
    .src('./package.json')
    .pipe(
      jeditor({
        dependencies: expoDeps,
        main: expoMain,
        peerDependencies: {}
      })
    )
    .pipe(concat('package.json'))
    .pipe(gulp.dest('./'));
  done();
});

gulp.task('copy-build-files', (done) => {
  gulp.src('./build/index.html').pipe(gulp.dest('./assets/dist/'));
  gulp.src('./build/main.bundle.js.map').pipe(gulp.dest('./assets/dist/'));
  gulp.src('./build/images/*').pipe(gulp.dest('./assets/dist/images'));
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
    'forExpo'
  )
);

gulp.task(
  'beta',
  gulp.series(
    'forNPM',
    'build',
    'npm-publish-beta',
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
