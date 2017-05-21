const gulp = require('gulp');
const concat = require('gulp-concat');
const config = require('./config.js');

module.exports.initVendorTask = function() {
    gulp.task('compile.vendor', function() {
        return gulp.src(config.vendor.js)
            .pipe(concat('vendor.min.js'))
            .pipe(gulp.dest('../www/js'))
    });
}