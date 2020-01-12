const gulp = require("gulp");
const inlinesource = require("gulp-inline-source");
const replace = require("gulp-replace");
const clean = require("gulp-clean");
const rename = require("gulp-rename");

const REACT_BUILD_DIRECTORY = "build";
const REACT_BUILD_FILES = "./build/*.html";
const FILE_NAME_AFTER_ADDING_INLINE_TAGS = "indexWithTags.html";
const DIST_HTML_FILE_NAME = "index.html";
const DIST_DIRECTORY = "dist";

gulp.task("clean", function() {
  return gulp
    .src(
      [
        `${REACT_BUILD_DIRECTORY}/${FILE_NAME_AFTER_ADDING_INLINE_TAGS}`,
        DIST_DIRECTORY
      ],
      {
        allowEmpty: true,
        read: false
      }
    )
    .pipe(clean());
});

gulp.task("disableBrowserTestFlag", () => {
  return gulp
    .src(["./src/MapComponent.tsx"])
    .pipe(
      replace(
        "const ENABLE_BROWSER_TESTING = true;",
        "const ENABLE_BROWSER_TESTING = false;"
      )
    )
    .pipe(gulp.dest("./src"));
});

gulp.task("enableBrowserTestFlag", () => {
  return gulp
    .src(["./src/MapComponent.tsx"])
    .pipe(
      replace(
        "const ENABLE_BROWSER_TESTING = false;",
        "const ENABLE_BROWSER_TESTING = true;"
      )
    )
    .pipe(gulp.dest("./src"));
});

gulp.task("addInlineTags", function() {
  return gulp
    .src(REACT_BUILD_FILES)
    .pipe(replace('rel="stylesheet"', 'rel="stylesheet" inline'))
    .pipe(replace("></script>", " inline></script>"))
    .pipe(rename(FILE_NAME_AFTER_ADDING_INLINE_TAGS))
    .pipe(gulp.dest(REACT_BUILD_DIRECTORY));
});

gulp.task("inlineSource", function() {
  return gulp
    .src(`./${REACT_BUILD_DIRECTORY}/${FILE_NAME_AFTER_ADDING_INLINE_TAGS}`)
    .pipe(inlinesource())
    .pipe(rename(DIST_HTML_FILE_NAME))
    .pipe(gulp.dest(DIST_DIRECTORY));
});

exports.build = gulp.series("clean", "addInlineTags", "inlineSource");
