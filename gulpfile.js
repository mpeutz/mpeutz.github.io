/**
 *   SCSS Gulpfile
 * 
 *   all scss files go into a "partials" folder within the "css" folder
 * 
 */

// Set autoprefixer params
var prefixes = [
    'last 3 version',
    'Explorer >= 9',
    '> 1%',
    'Firefox ESR'
];

// Set Paths
var SCSS_MAIN = "_scss/main.scss", 
    CSS_SRC   = "main.css";



// Require npm packages (gulp, sass, sourcemaps, & autoprefixer)
var gulp         = require('gulp');
var gutil        = require('gulp-util');
var sass         = require('gulp-sass'),
    babel        = require('gulp-babel'),
    sourcemaps   = require('gulp-sourcemaps'),
    browserSync  = require('browser-sync').create(),
    autoprefixer = require('gulp-autoprefixer'),
    concat       = require('gulp-concat'),
    uglify       = require('gulp-uglify'),
    jsmin        = require('gulp-jsmin'),
    rename       = require('gulp-rename'),
    clean        = require('gulp-clean-css');

// Compile scss to css with autoprefixer and sourcemaps
function buildSass() {
    return gulp.src(SCSS_MAIN)
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'expanded' }))
        .pipe(autoprefixer(prefixes))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest("./css"));
}

gulp.task('minify-js', function () {
    return gulp.src([
        // './_site/script/jquery.min.js',
        // './_site/script/require.js',
        './script/perfect-scrollbar.js',
        './script/smoothState.js',
        './script/hammer-time.js',
        './script/page-script.js'
    ])
        .pipe(sourcemaps.init())
        // getBundleName creates a cache busting name
        .pipe(babel({ presets: ['es2015'] }))
        .pipe(concat('script.min.js'))
        .pipe(uglify().on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./script'));
});

gulp.task('scss', buildSass);

gulp.task('default', ['scss']);


// Watch changes to scss files and auto-compile
gulp.task('watch', ['scss'], function () {
    gulp.watch(['_scss/*.scss'], ['scss']);
});