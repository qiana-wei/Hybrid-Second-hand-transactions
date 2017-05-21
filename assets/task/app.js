const gulp = require('gulp');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const runSequence = require('run-sequence');
const config = require('./config.js');
const babel = require('gulp-babel');
const fs = require('fs');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
const injectHtml = require('gulp-inject-stringified-html');

module.exports.initAppTask = function () {

    gulp.task('compile.sass', function () {
        return gulp.src('./style/sass/*.scss')
            .pipe(sourcemaps.init())
            .pipe(sass().on('error', sass.logError))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest('../www/css'));
    });

    gulp.task('minify.app.css', ['compile.sass'], function () {
        return gulp.src('../www/css/*.css')
            .pipe(cleanCSS())
            .pipe(gulp.dest('../www/css'));
    });

    gulp.task('build.app.js', function () {
        return gulp.src('./js/locality/*.js')
            .pipe(babel({
                presets: ['es2015']
            }))
            .pipe(gulp.dest('../www/js'));
    });

    gulp.task('minify.app.js', function () {
        return gulp.src('../www/js/*.js')
            .pipe(uglify())
            .pipe(gulp.dest('../www/js'));
    });

    gulp.task('compile.spa', function () {
        let files = fs.readdirSync('./js/spa').filter(file => file !== 'index.js').map(file => {
            return './js/spa/' + file;
        });
        files.push('./js/spa/index.js');
        return gulp.src(files)
            .pipe(concat('index.js'))
            .pipe(injectHtml())
            .pipe(babel({
                presets: ['es2015']
            }))
            .pipe(gulp.dest('../www/js'));
    })

    gulp.task('browserify.app.js',()=> {
        return browserify('./js/utils/utils.js')
            .bundle()
            .pipe(source('utils.js')) 
            .pipe(buffer())
            .pipe(babel({
                presets: ['es2015']
            }))
            .pipe(gulp.dest('../www/js'));
        });

    gulp.task('compile.app', function () {
        return runSequence('compile.sass', 'compile.spa','browserify.app.js', 'build.app.js');
    })

}