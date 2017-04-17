var gulp = require('gulp'),
sass = require('gulp-sass');

//SASS
gulp.task('styles', function() {
   return gulp.src('app/assets/styles/**/*.scss')
        .pipe(sass({
            includePaths: ['node_modules/normalize-scss/sass']
        }))
        .on('error', function(err){
            console.log(err.toString());
            this.emit('end');
        })
        .pipe(gulp.dest('app/temp/styles'))
        
});