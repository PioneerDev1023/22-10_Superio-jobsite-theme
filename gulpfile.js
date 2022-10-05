"use strict";

const browserSync  = require('browser-sync').create();
const gulp         = require('gulp');
const sass         = require('gulp-sass')(require('node-sass'));
const concat       = require('gulp-concat');
const postcss      = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

function cssMain() {
  return gulp.src("./sass/main.scss")
    .pipe(sass({
      outputStyle: 'expanded',
    }))
    .pipe(postcss([
      autoprefixer({ Browserslist: ['defaults'] }),
    ]))
    .pipe( concat('style.css') )
    .pipe( gulp.dest("./css") )
    .pipe( browserSync.stream() );
}

function server() {
  browserSync.init({
    notify: false,
    server: {
      baseDir: "./"
    }
  });

  gulp.watch( ["sass/**/*.scss", "!sass/vendors/**"], cssMain );
}

exports.server = server;
exports.cssMain = cssMain;
exports.build = gulp.series( cssMain, server );
