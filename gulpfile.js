'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssmin = require('gulp-cssmin'),
    uglify = require('gulp-uglify'),
    rigger = require('gulp-rigger'),
    imagemin = require('gulp-imagemin'),
    mainBowerFiles = require('gulp-main-bower-files'),
    uglify = require('gulp-uglify'),
    gulpFilter = require('gulp-filter'),
    browserSync = require('browser-sync').create(),
    twig = require('gulp-twig'),
    sourcemaps = require('gulp-sourcemaps'),
    data = require('gulp-data'),
    path = require('path'),
    semver = require('semver'),
    fs = require('fs');


//CSS
gulp.task('sass', function(){
  gulp.src('front-end/style/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
    .pipe(cssmin())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('../wp-test/wp-content/themes/second/'))
});

//JS
gulp.task('js', function () {
    gulp.src('front-end/js/*.js')
        .pipe(rigger())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('../wp-test/wp-content/themes/second/js'))
});

//images
gulp.task('image', () =>
    gulp.src('front-end/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('../wp-test/wp-content/themes/second/images'))
);

//fonts
gulp.task('font', function() {
    gulp.src('front-end/font/**')
    .pipe(gulp.dest('../wp-test/wp-content/themes/second/font/'))
});


//bower
gulp.task('main-bower-files', function() {
    return gulp.src('./bower.json')
        .pipe(mainBowerFiles('**/*.js'))
        .pipe(uglify())
        .pipe(gulp.dest('../wp-test/wp-content/themes/second/js/lib'));
});

/*
var getJsonData = function(file) {
    var fileName = path.basename(file.path, '.twig');
    return JSON.parse(fs.readFileSync('./fixtures/' + fileName + '.json'));
};

gulp.task('twig', function() {

    var twig = require('gulp-twig');
    return gulp.src('view/*.twig')
        .pipe(data(getJsonData))
        .pipe(twig())
        .pipe(gulp.dest('public'));

});
*/


//Server
gulp.task('serve', function() {
    browserSync.init({
        proxy: "http://wp-test.com/",
    });    
    gulp.watch(['../wp-test/wp-content/themes/second/**/*']).on('change', browserSync.reload);
});

//WATCH
gulp.task('watch', function() {
    gulp.watch(['front-end/style/*.scss'], ['sass']);
    gulp.watch(['front-end/js/*.js'], ['js']);
});

gulp.task('default', ['sass', 'image', 'main-bower-files', 'js', 'font', 'serve', 'watch']);