'use strict';

var build = require('webpackcc/lib/build');
var path = require('path');
var util = require('util');
var program = {
  cwd: process.cwd(),
  dev: true,
  karma: true,
  config: path.join(__dirname, "./cfg/test.js")
};
//Get webpack common configuration
var webpackConfig = build(program, function () {});

module.exports = function karmaConfig(config) {
  config.set({
    browsers: ['PhantomJS'],
    files: ['test/loadtests.js'],
    port: 8080,
    captureTimeout: 60000,
    frameworks: ['mocha', 'chai', 'sinon'],
    client: {
      mocha: {}
    },
    singleRun: true,
    reporters: ['mocha', 'coverage', 'junit'],
    mochaReporter: {
      output: 'autowatch'
    },
    preprocessors: {
      'test/loadtests.js': ['webpack', 'sourcemap']
    },
    webpack: webpackConfig,
    //Get webpack configuration
    webpackServer: {
      noInfo: true
    },
    junitReporter: {
      outputDir: 'coverage',
      outputFile: 'junit-result.xml',
      useBrowserName: false
    },
    coverageReporter: {
      dir: 'coverage/',
      watermarks: {
        statements: [70, 80],
        functions: [70, 80],
        branches: [70, 80],
        lines: [70, 80]
      },
      reporters: [{ type: 'text' }, {
        type: 'html',
        subdir: 'html'
      }, {
        type: 'cobertura',
        subdir: 'cobertura'
      }, {
        type: 'lcovonly',
        subdir: 'lcov'
      }]
    }
  });
};