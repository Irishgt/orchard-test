const gulp = require("gulp");
const babel = require("gulp-babel");
const sass = require("gulp-sass")(require("sass"));
const cleanCSS = require("gulp-clean-css");
const rename = require("gulp-rename");
const fs = require("fs");
const hb = require("gulp-hb");
const data = require("gulp-data");

// -------------------
// Compile SCSS → CSS
// -------------------
function styles() {
  return gulp
    .src("src/scss/styles.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(cleanCSS())
    .pipe(rename({ basename: "styles", extname: ".css" }))
    .pipe(gulp.dest("dist/assets/css"));
}

function images() {
  return gulp
    .src("src/assets/img/**/*.{jpg,jpeg,png,webp}")
    .pipe(gulp.dest("dist/assets/img"));
}

// -------------------
// Handlebars templates
// -------------------
function templates() {
  return gulp
    .src("src/templates/index.hbs")
    .pipe(
      data(function () {
        return JSON.parse(fs.readFileSync("./src/data/content.json"));
      })
    )
    .pipe(hb().partials("src/templates/components/**/*.hbs"))
    .pipe(rename("index.html"))
    .pipe(gulp.dest("dist"));
}

// -------------------
// Copy JavaScript
// -------------------
function scripts() {
  return gulp
    .src("src/assets/js/**/*.js")
    .pipe(
      babel({
        presets: ["@babel/preset-env"],
      })
    )
    .pipe(gulp.dest("dist/assets/js"));
}

function watcher() {
  gulp.watch("src/scss/**/*.scss", styles);
  gulp.watch("src/templates/**/*.hbs", templates);
  gulp.watch("src/data/**/*.json", templates);
  gulp.watch("src/assets/js/**/*.js", scripts);
  gulp.watch("src/assets/img/**/*.{jpg,jpeg,png,webp}", images);
}

// -------------------
// Tasks
// -------------------
exports.styles = styles;
exports.templates = templates;
exports.scripts = scripts;
exports.images = images;
exports.watch = watcher;

exports.default = gulp.series(
  gulp.parallel(styles, templates, scripts, images),
  watcher
);
