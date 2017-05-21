var gulp = require('gulp');
var runSequence = require('run-sequence');

module.exports.initPublishTask = function() {
    gulp.task('dev', function() {
        return runSequence('source', 'compile.vendor', 'compile.app');
    })

    gulp.task('dev:watch', function () {
        gulp.watch(['./style/sass/**/*.scss', './js/**/*.js','./js/*.js', './js/templates/*.html','../templates/**/*.html'], ['compile.app']);
    })

    gulp.task('build',  function() {
        return runSequence('clean', [
            'source', 'compile.vendor', 'compile.app'
        ], 'build.app');
    })
}