'use strict';

var path = require('path');
var defaultsDeep = require('lodash.defaultsdeep');
var notify = require('gulp-notify');
var eslint = require('gulp-eslint');
var jscs = require('gulp-jscs');
var stylish = require('gulp-jscs-stylish');

module.exports = function (gulp, gulpConfig) {

  gulpConfig = gulpConfig || { basePath: '.' };

  // Merge default config with gulp config.
  var defaultConfig = {
    lintBrowser: {
      src: '/js/**/*.js'
    }
  };

  var config = defaultsDeep(gulpConfig, defaultConfig).lintBrowser;

  // Default task mapping.
  gulp.task('lint-browser', ['eslint-browser', 'jscs-browser']);

  // Default watch task.
  gulp.task('lint-browser-watch', ['lint-browser'], function () {
    gulp.watch(path.join(gulpConfig.basePath, config.src), ['lint-browser'])
  });

  // Lint via eslint.
  gulp.task('eslint-browser', false, function () {
    return gulp.src(path.join(gulpConfig.basePath, config.src))
      .pipe(eslint())
      .pipe(eslint.format())
      .on('error', notify.onError({
        message: 'One or more Javascript linting errors.',
        title: 'Wunderkraut JS Linter',
        icon: gulpConfig.notify.errorIcon
      }));
  });

  // Lint via jscs.
  gulp.task('jscs-browser', false, function() {
    return gulp.src(path.join(gulpConfig.basePath, config.src))
      .pipe(jscs())
      .pipe(stylish())
      .on('error', notify.onError({
        message: 'One or more Javascript coding style errors.',
        title: 'Wunderkraut JS Linter',
        icon: gulpConfig.notify.errorIcon
      }));
  });
};
