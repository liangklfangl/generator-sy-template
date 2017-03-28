'use strict';

const webpackCfg = require('./webpack.config')('test');

module.exports = function karmaConfig(config) {
  config.set({
    browsers: ['PhantomJS'],
    // Description: A list of browsers to launch and capture. When Karma starts up, it will also 
    // start up each browser which is placed within this setting. Once Karma is shut down, it will shut down these browsers as well. You can capture any browser manually by opening the browser and visiting the URL where the Karma web server is listening (by default it is http://localhost:9876/).
    files: [
      'test/loadtests.js'
    ],
    //Which file should be loaded in browser, file list
    port: 8080,
    //port
    captureTimeout: 60000,
    // The captureTimeout value represents the maximum boot-up time allowed for a browser to start 
    // and connect to Karma. If any browser does not get captured within the timeout, Karma will kill it and try to launch it again and, after three attempts to capture it, Karma will give up.
    frameworks: [
      'mocha',
      'chai',
      'sinon'
    ],
    //Description: List of test frameworks you want to use. Typically, you will set this to ['jasmine'], ['mocha'] or ['qunit']...
   //Please note just about all frameworks in Karma require an additional plugin/framework library to be installed (via NPM).
    client: {
      mocha: {}
    },
    //client part,client.useIframe,client.runInParent
    singleRun: true,
    //Setting true, karma will open browser and then close after tesing
    reporters: ['mocha', 'coverage', 'junit'],
    //Using reporters,`karma-coverage`,`karma-mocha-reporter`,`karma-junit-reporter`
    //Note: Just about all additional reporters in Karma (other than progress) require an additional library to be installed (via NPM).
    mochaReporter: {
      output: 'autowatch'
      //`autowatch`:first run will have the full output and the next runs just output the summary and errors in mocha style
    },
    //mocha test reporter
    preprocessors: {
      'test/loadtests.js': ['webpack', 'sourcemap']
      //You can use the karma-sourcemap-loader to get the source maps generated for your test bundle.
    },
    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    //source files, that you wanna generate coverage for
    // do not include tests or libraries
    // (these files will be instrumented by Istanbul)
    webpack: webpackCfg,
     // karma watches the test entry points
    // (you don't need to specify the entry option of webpack configuration)
   // webpack watches dependencies
   // webpack configuration
    webpackServer: {
      noInfo: true
    },
    junitReporter: {
      outputDir: 'coverage',
      //results will be saved as $outputDir/$browserName.xml
      outputFile: 'junit-result.xml',
      // if included, results will be saved as $outputDir/$browserName/$outputFile
      useBrowserName: false
      //add browser name to report and classes names
    },
    //coverageReporter
    //optionally, configure the reporter
    coverageReporter: {
      dir: 'coverage/',
      //specify a common output directory
      //Description: This will be used to output coverage reports. When you set a relative path, 
      //the directory is resolved against the basePath.
      watermarks: {
        statements: [70, 80],
        //Description: This will be used to set the coverage threshold colors. 
        //The first number is the threshold between Red and Yellow. The second number is the threshold between Yellow and Green.
        functions: [70, 80],
        branches: [70, 80],
        lines: [70, 80]
      },
      //You can use multiple reporters, by providing array of options.
      reporters: [
        { type: 'text' },
        {
          type: 'html',
          subdir: 'html'
          //(1)reporters not supporting the `file` property. Using `subdir` and `type`
         // (2)reporters supporting the `file` property, use `subdir` to directly
        // output them in the `dir` directory
       // { type: 'cobertura', subdir: '.', file: 'cobertura.txt' },
        },
        {
          type: 'cobertura',
          subdir: 'cobertura'
        },
        {
          type: 'lcovonly',
          subdir: 'lcov'
        }
      ]
    }
  });
};
