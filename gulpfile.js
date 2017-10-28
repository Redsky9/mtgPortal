let gulp = require('gulp');
let concat = require('gulp-concat');
let cleanCSS = require('gulp-clean-css');
let uglify = require('gulp-uglify-es').default;
let imagemin = require('gulp-imagemin');
let pump = require('pump');
let del = require('del');

gulp.task('css', () => {
 return gulp.src('public/css/*.css')
   .pipe(cleanCSS({compatibility: 'ie8'}))
//    .pipe(del('public/css/vendor.css'))
   .pipe(concat('vendor.css'))
   .pipe(gulp.dest('public/css/'));
});

gulp.task("uglify", function () {
    return gulp.src(["public/js/jquery-3.2.1.js", "public/js/popper.min.js", "public/js/bootstrap.js", "public/js/*.js", "public/js/details.js"])
        .pipe(uglify())
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest("public/js/"));
});

// gulp.task("uglify", function () {
//     return gulp.src(["public/js/jquery-3.2.1.js", "public/js/popper.min.js", "public/js/bootstrap.js", "!public/js/details.js", "public/js/*.js"])
//         .pipe(uglify())
//         .pipe(concat('vendor.js'))
//         .pipe(gulp.dest("public/js/"));
// });

gulp.task('imagemin', () =>
    gulp.src('public/images/svg/*')
    .pipe(imagemin())
    .pipe(gulp.dest('public/images'))
);

gulp.task('connect', () => {
    plugins().connect.server({
        'root': 'dist/html',
        'livereload': true,
        'host': 'localhost',
        'port': 8081
    });
});