const gulp = require('gulp');
const jsonEditor = require('gulp-json-editor');
const config = require('./config.js');
const del = require('del');

module.exports.initBuildTask = function() {
    gulp.task('build.app', ['minify.app.css', 'minify.app.js']);
    gulp.task('clean', function(){
        return del('../static/', {
            force: true
        })
    })
}