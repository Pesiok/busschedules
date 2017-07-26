var gulp = require('gulp'),
del = require('del'),
usemin = require('gulp-usemin'),
rev = require('gulp-rev'),
cssnano = require('gulp-cssnano'),
uglify = require('gulp-uglify'),
htmlmin = require('gulp-htmlmin');

gulp.task('deleteDistFolder', function() {
    return del(['../public'], { force: true }).then(paths => {
        console.log('Deleted files and folders:\n', paths.join('\n'));
    });
});

gulp.task('copyGeneralFiles', ['deleteDistFolder'], function() {
    //ignore paths with exclamation mark
    var paths = [
        'app/**/*',
        '!app/index.html',
        '!app/assets/styles/**',
        '!app/assets/scripts/**',
        '!app/temp',
        '!app/temp/**'
    ]
    
    return gulp.src(paths)
        .pipe(gulp.dest("../public"));
});

gulp.task('useminTrigger', ['deleteDistFolder'], function(){
    gulp.start('usemin');
});

gulp.task('usemin', ['styles', 'scripts'], function() {
    return gulp.src("app/index.html")
        .pipe(usemin({
            css: [function() {return rev()}, function() {return cssnano()}],
            html: [function() {return htmlmin({collapseWhitespace: true})}],
            js: [function() {return rev()}, function() {return uglify()}]
        }))
        .pipe(gulp.dest("../public"));
});

gulp.task('build', ['deleteDistFolder', 'copyGeneralFiles', 'useminTrigger']);