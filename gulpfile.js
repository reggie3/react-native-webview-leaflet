const gulp = require('gulp');

const concat = require('gulp-concat');
const jeditor = require('gulp-json-editor');
const bump = require('gulp-bump');
const webpack_stream = require('webpack-stream');
const webpaconfig = require('./webpack.config.js');
const webpackDevConfig = require('./webpack.config.dev');
const webpackProdConfig = require('./webpack.config.prod');
const run = require('gulp-run');

// dependencies for npm publishing
const npmDeps = {
  glamor: '^2.20.40',
  glamorous: '^4.11.2',
  'is-valid-coordinates': '^1.0.0',
  leaflet: '^1.3.1',
  'leaflet.markercluster': '^1.3.0',
  'prop-types': '^15.6.0',
  'react-native-ui-kitten': '^3.0.0',
  util: '^0.10.3',
  'render-if': '^0.1.1'
};
// additional dependencies for expo app
const expoDeps = {
  expo: '^25.0.0',
  react: '16.0.0',
  'react-dom': '^16.2.0',
  'react-native':
    'https://github.com/expo/react-native/archive/sdk-25.0.0.tar.gz'
};

// main for npm publishing
const npmMain = 'index.js';
// main for expo app
const expoMain = 'node_modules/expo/AppEntry.js';

const paths = {
  src: './Scripts/',
  build: './dist/'
};

/****package.json stuff****/
gulp.task('test', function() {
  console.log('Hello Zell');
});

const updatePackageJSONforNPM = json => {};
// read the package.json and update it for npm publishing
gulp.task('forNPM', done => {
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

// read and bump the package version in config.js so that it
// matches the version number about to be published
gulp.task('editConfig', done => {
  gulp
    .src('./config.js')
    .pipe(bump({ key: 'PACKAGE_VERSION' }))
    .pipe(concat('config.js'))
    .pipe(gulp.dest('./'));
  done();
});

// pack the files
gulp.task('webpack-prod', done => {
  return webpack_stream(webpackDevConfig).pipe(gulp.dest(`${paths.build}`));
  done();
});

gulp.task('webpack-dev', done => {
  return webpack_stream(webpackDevConfig).pipe(gulp.dest(`${paths.build}`));
  done();
});


gulp.task('npm-publish', done => {
  return run('npm publish').exec(); // run "npm start".
  done();
});

gulp.task('git-add', done => {
  return run('git add .').exec();
  done();
});

gulp.task('git-commit', done => {
  return run('git commit -m "publishing"').exec();

  done();
});

gulp.task('git-push', done => {
  return run('git push origin master').exec();
  done();
});

gulp.task('forExpo', done => {
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


gulp.task(
  'prod',
  gulp.series(
    'forNPM',
    'editConfig',
    'webpack-prod',
    gulp.parallel(
      gulp.series('git-add', 'git-commit', 'git-push'),
      'npm-publish'
    ),
    'forExpo'
  )
);

gulp.task(
  'dev',
  gulp.series(
    'forNPM',
    'editConfig',
    'webpack-dev',
    gulp.parallel(
      gulp.series('git-add', 'git-commit', 'git-push'),
      'npm-publish'
    ),
    'forExpo'
  )
);

// set the version number in package.json
// remove excess dependencies from package.json
// change package.json main to "index.js"

// put this new correct version in config.js as PACKAGE_VERSION
// ensure USE_LOCAL_FILES is false in config.js

// run webpack
// publish files to npm

// publish files to git
