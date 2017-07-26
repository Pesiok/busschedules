var gulp = require('gulp'),
sass = require('gulp-sass'),
autoprefixer = require('gulp-autoprefixer');

gulp.task('styles', function() {
    return gulp.src('app/assets/styles/**/*.scss')
        .pipe(sass({
            includePaths: ['node_modules/normalize-scss/sass']
        }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .on('error', function(err){
            console.log(err.toString());
            this.emit('end');
        })
        .pipe(gulp.dest('app/temp/styles'))
});
