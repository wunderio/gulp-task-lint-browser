'use strict';

var path = require('path');
var defaultsDeep = require('lodash.defaultsdeep');
var notifier = require('node-notifier');
var eslint = require('gulp-eslint');

module.exports = function (gulp, gulpConfig) {

  gulpConfig = gulpConfig || { basePath: '.' };

  // Merge default config with gulp config.
  var defaultConfig = {
    lintBrowser: {
      src: '/js/**/*.js',
      notify: {
        title: 'Wunderkraut JS Linter'
      }
    }
  };

  var config = defaultsDeep(gulpConfig, defaultConfig).lintBrowser;

  // Default task mapping.
  gulp.task('lint-browser', ['eslint-browser']);

  // Default watch task.
  gulp.task('lint-browser-watch', ['lint-browser'], function () {
    gulp.watch(path.join(gulpConfig.basePath, config.src), ['lint-browser'])
  });

  // Lint via eslint.
  gulp.task('eslint-browser', false, function () {
    return gulp.src(path.join(gulpConfig.basePath, config.src))
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failAfterError())
      .on('error', function (error) {
        notifier.notify({
          title: config.notify.title,
          message: error.message,
          icon: gulpConfig.notify.errorIcon,
          sound: false
        });
        this.emit('end');
      });
  });
};
