var gulp = require('gulp'),
watch = require('gulp-watch');

gulp.task('watch', function() {
   
    watch('app/assets/styles/**/*.scss', function() {
        gulp.start('styles');
    });

    watch('app/assets/scripts/**/*.js', function() {
        gulp.start('scripts');
    })
    
});