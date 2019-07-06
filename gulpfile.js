const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();

gulp.task('sass', function () {
    return gulp.src('app/css/**/*.scss')
        .pipe(plugins.sass().on('error', plugins.sass.logError))
        .pipe(gulp.dest('app/css'));
});


gulp.task('webserver', function() {
    gulp.src('./app')
        .pipe(plugins.webserver({
            fallback: 'index.html',
            host: '0.0.0.0',
            port: 8000,
            livereload: true,
            open: false
        }));
});

gulp.task('watch', (done) => {
    gulp.watch(['app/css/**/*.scss'], function(cb) {
        gulp.series('sass')(cb);
    });
    done();
});

gulp.task('default', gulp.parallel('watch', 'webserver', (cb) => {
    cb();
}));
