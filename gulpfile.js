var gulp        = require('gulp');
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');
var sass        = require('gulp-sass');
var livereload  = require('gulp-livereload');
var server      = livereload();
var mainScripts = require('./assets/js/script.js.json');
var _           = require('./assets/components/lodash/dist/lodash.underscore.js');

var tasksToRunOnStart = [
  'scripts',
  'sass'
];

// Create An Array Of The Scripts In This Collection,
// So That Grunt Can Reload Automatically
var scriptList = _.map(mainScripts, function(script) {
  return script;
});

var placesToWatch = [
  './index.html',
  './assets/dist/**'
];

var scssLocationToWatch = './assets/scss/**';
var jsLocationToWatch   = './assets/js/**';

var minifiedJSName      = 'script.min.js';
var minifiedJSFolder    = './assets/dist/js-min';

var scssToCompile       = 'assets/scss/screen.scss';
var cssOutputLocation   = 'assets/dist/css';

gulp.task('scripts', function() {
  gulp.src(scriptList)
      .pipe(uglify())
      .pipe(concat(minifiedJSName))
      .pipe(gulp.dest(minifiedJSFolder));
});

gulp.task('sass', function() {
  return gulp.src(scssToCompile)
             .pipe(sass())
             .pipe(gulp.dest(cssOutputLocation));
});

gulp.task('default', tasksToRunOnStart, function() {

  gulp.watch(scssLocationToWatch, function() {
    gulp.run('sass');
  });

  gulp.watch(jsLocationToWatch, function() {
    gulp.run('scripts');
  });

  gulp.watch(placesToWatch).on('change', function(file) {
    server.changed(file.path);
  });
});