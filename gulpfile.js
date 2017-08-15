var gulp = require('gulp');
var concat = require('gulp-concat');
var wrap = require('gulp-wrap');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify-es').default;
var cleanCss = require('gulp-clean-css');
var pump = require('pump');

gulp.task('js', function(cb) {
  // put all the angular modules, services, controllers, directives and routes into public/js/app.js
  pump([
    gulp.src([
        'public/modules/*.module.js',
        'public/users/users.client.module.js',
        'public/users/users.client.services.js',
        'public/users/users.client.controller.js',
        'public/services/*.service.js',
        'public/controllers/*.controller.js',
        'public/directives/*.directive.js',
        'public/routes/*.routes.js',
      ]),
    wrap('// BEGIN <%= file.relative %>\n<%= contents %>// END <%= file.relative %>\n\n'),
    concat('app.js'),
    gulp.dest('public/js'),
  ], cb);
});

gulp.task('css', function(cb) {
  pump([
    gulp.src([
      'src/materialize-src/sass/materialize.scss'
    ]),
    sass.sync().on('error', sass.logError),
    gulp.dest('public/css'),
  ], cb);
});

gulp.task('minify-css', ['css'], function(cb) {
  pump([
    gulp.src([
      'public/css/materialize.css',
      'public/css/main.css',
    ]),
    concat('main.min.css'),
    cleanCss({compatibility: 'ie8'}),
    gulp.dest('public/css'),
  ], cb);
});

gulp.task('uglify', ['js'], function(cb) {
  pump([
    gulp.src([
      'public/js/app.js',
      'public/lang/*.js',
      'public/js/main.js',
    ]),
    concat('main.min.js'),
    uglify(),
    gulp.dest('public/js'),
  ], cb);
});

gulp.task('materialize-fonts', [], function(cb) {
  pump([
    gulp.src(['src/materialize-src/fonts/**/*']),
    gulp.dest('public/fonts')
  ], cb);
});

gulp.task('materialize-css', ['css'], function(cb) {
  pump([
    gulp.src([
      //'src/materialize-src/js/**/*.js',
      "src/materialize-src/js/initial.js",
      "src/materialize-src/js/jquery.easing.1.3.js",
      "src/materialize-src/js/animation.js",
      "src/materialize-src/js/velocity.min.js",
      "src/materialize-src/js/hammer.min.js",
      "src/materialize-src/js/jquery.hammer.js",
      "src/materialize-src/js/global.js",
      "src/materialize-src/js/collapsible.js",
      "src/materialize-src/js/dropdown.js",
      "src/materialize-src/js/modal.js",
      "src/materialize-src/js/materialbox.js",
      "src/materialize-src/js/parallax.js",
      "src/materialize-src/js/tabs.js",
      "src/materialize-src/js/tooltip.js",
      "src/materialize-src/js/waves.js",
      "src/materialize-src/js/toasts.js",
      "src/materialize-src/js/sideNav.js",
      "src/materialize-src/js/scrollspy.js",
      "src/materialize-src/js/forms.js",
      "src/materialize-src/js/slider.js",
      "src/materialize-src/js/cards.js",
      "src/materialize-src/js/chips.js",
      "src/materialize-src/js/pushpin.js",
      "src/materialize-src/js/buttons.js",
      "src/materialize-src/js/transitions.js",
      "src/materialize-src/js/scrollFire.js",
      "src/materialize-src/js/date_picker/picker.js",
      "src/materialize-src/js/date_picker/picker.date.js",
      "src/materialize-src/js/character_counter.js",
      "src/materialize-src/js/carousel.js",
      "src/materialize-src/js/tapTarget.js",
    ]),
    concat('materialize.js'),
    gulp.dest('public/js'),
  ], cb);
});

gulp.task('materialize', ['materialize-css', 'materialize-fonts']);

gulp.task('materialize-uglify', ['materialize'], function(cb) {
  pump([
    gulp.src([
      'public/js/materialize.js',
    ]),
    concat('materialize.min.js'),
    uglify(),
    gulp.dest('public/js'),
  ], cb);
});

gulp.task('build', ['js', 'css', 'minify-css', 'materialize-uglify', 'uglify']);

gulp.task('watch', ['build'], function() {
  gulp.watch([
    'public/js/main.js',
    'public/lang/*.js',
    'public/modules/*.module.js',
    'public/users/*.js',
    'public/services/*.service.js',
    'public/controllers/*.controller.js',
    'public/directives/*.directive.js',
    'public/routes/*.routes.js',
    'src/**/*.js',
    'src/**/*.scss',
    'public/css/main.css',
  ], ['build']);
});
