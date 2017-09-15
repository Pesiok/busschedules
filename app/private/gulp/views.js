var gulp = require('gulp'),
ejs = require('gulp-ejs'),
cities = require('../config/cities.json'),
stops = require('../config/stops.json');

gulp.task('views', function() {
  return gulp.src('app/assets/views/pages/*.ejs')
    .pipe(ejs({ cities: cities, stops: stops }, {}, { ext:'.html' }))
    .on('error', function(err){
      console.log(err.toString());
    })
    .pipe(gulp.dest('./app'));
});