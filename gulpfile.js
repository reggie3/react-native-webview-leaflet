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
	'is-valid-coordinates': '^1.0.0',
	leaflet: '^1.3.1',
	'leaflet.markercluster': '^1.3.0',
	'prop-types': '^15.6.0',
	util: '^0.10.3',
	'render-if': '^0.1.1'
};
// additional dependencies for expo app
const expoDeps = {
	"expo": "^26.0.0",
	"react": "16.3.0-alpha.1",
    "react-dom": "^16.3.1",
    "react-native": "https://github.com/expo/react-native/archive/sdk-26.0.0.tar.gz",
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
	console.log('Hello');
});

const updatePackageJSONforNPM = (json) => {};
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

// read and bump the package version in config.js so that it
// matches the version number about to be published
gulp.task('editConfigForProd', (done) => {
	gulp.src('./config.js').pipe(bump({ key: 'PACKAGE_VERSION' })).pipe(concat('config.js')).pipe(gulp.dest('./'));
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

gulp.task('git-push-inline-javascript', (done) => {
	return run('git push origin inline-javascript-2').exec();
	done();
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
		gulp.parallel(gulp.series('git-add', 'git-commit', 'git-push'), 'npm-publish'),
		'forExpo'
	)
);

gulp.task(
	'beta',
	gulp.series(
		'forNPM',
		'webpack',
		gulp.parallel(gulp.series('git-add', 'git-commit', 'git-push-inline-javascript'), 'npm-publish-beta'),
		'forExpo'
	)
);

gulp.task(
	'test',
	gulp.series(
		'forNPM',
		'editConfigForProd',
		'webpack',
		gulp.parallel(gulp.series('git-add', 'git-commit', 'git-push'), 'npm-publish'),
		'forExpo'
	)
);
