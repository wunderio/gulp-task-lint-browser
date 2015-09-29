Gulp task lint browser
=================

> A gulp task for linting Javascript which is intended for the browser.

## Installation
```sh
npm install --save-dev wunderkraut/gulp-task-lint-browser
```

## Usage

### Basic usage

```js
// Require gulp.
var gulp = require('gulp')

// Require task module and pass gulp to provide the gulp tasks.
require('gulp-task-lint-browser')(gulp)
```

### Advanced usage
You can also pass a configuration to the task. This allows you to overwrite the default configuration and provide other configuration like a base path for your files.

#### gulpfile.js
```js
var gulp = require('gulp')
var gulpConfig = require('./gulpconfig')

// Just pass the configuration object as second parameter.
require('gulp-task-lint-browser')(gulp, gulpConfig)
```

#### gulpconfig.js
```js
module.exports = {
  // Basic configuration.
  basePath: '.',

  // Overwrite default configurations.
  lintBrowser: {
    src: '/js/**/*.js'
  }
}
```

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/wunderkraut/gulp-task-lint-browser/issues/new).
