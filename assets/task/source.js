const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const config = require('./config.js');
const fs = require('fs');

module.exports.initSourceTask = function() {

    gulp.task('minify.images', function() {
        return gulp.src('./img/*')
            .pipe(imagemin())
            .pipe(gulp.dest('../www/img'))
    });

    gulp.task('move.fonts', function() {
        return gulp.src('./fonts/*')
            .pipe(gulp.dest('../www/fonts'));
    });

    gulp.task('move.basecss', function () {
        return gulp.src('./style/*.css')
            .pipe(gulp.dest('../www/css/'));
    })

    gulp.task('init.manifest', function () {
        fs.writeFile('../www/manifest.json', '{}', () => {});
    })

    gulp.task('source', ['minify.images', 'move.fonts', 'move.basecss','init.manifest']);
    
}