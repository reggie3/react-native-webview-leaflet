const gulp = require("gulp");
const clean = require("gulp-clean");
const run = require("gulp-run");

gulp.task("clean", function() {
  return gulp
    .src("node_modules", { allowEmpty: true, read: false })
    .pipe(clean());
});
