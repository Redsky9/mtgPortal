let gulp = require('gulp');

gulp.task('connect', () => {
    plugins().connect.server({
        'root': 'dist/html',
        'livereload': true,
        'host': 'localhost',
        'port': 8081
    });
});