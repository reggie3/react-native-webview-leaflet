const gulp = require("gulp");
const run = require("gulp-run");

gulp.task("run", () => {
  return run("cd html")
    .exec()
    .pipe(run("yarn dist"));
});
