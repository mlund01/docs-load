'use strict';

var gulp = require('gulp'),
    less = require('gulp-less'),
    mainBowerFiles = require('main-bower-files'),
    lessImport = require('gulp-less-import'),
    concat = require('gulp-concat');

gulp.task('compile_less', function(){
    return gulp
        .src([].concat(
            mainBowerFiles({filter: '**/*.less'}),
            "./src/styles/variables.less",
            "./src/styles/**/*.less"
        ))
        .pipe(lessImport('oc-import.less'))
        .pipe(less())
        .pipe(concat('style.css'))
        .pipe(gulp.dest('./public/stylesheets'))
})

// If gulp gets big, will follow the below structure
// requireDir('./gulp', {recurse: true});
//
// gulp.task('build', ['serve-build']);
// gulp.task('compile', ['serve-compile']);
