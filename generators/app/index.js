'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _yeomanGenerator = require('yeoman-generator');

var _yeomanGenerator2 = _interopRequireDefault(_yeomanGenerator);

var _all = require('./utils/all');

var _all2 = _interopRequireDefault(_all);

var _prompts = require('./prompts');

var _prompts2 = _interopRequireDefault(_prompts);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _mkdirp = require('mkdirp');

var _mkdirp2 = _interopRequireDefault(_mkdirp);

var _getWebpackDefaultConfig = require('webpackcc/lib/getWebpackDefaultConfig');

var _getWebpackDefaultConfig2 = _interopRequireDefault(_getWebpackDefaultConfig);

var _util = require('./utils/util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
//We must define a process.cwd to first parameter
// import mkdirp from "mkdirp";
// import waterfall from 'async/waterfall'


var wcfConfig = require("./config/wcf.config.js");
var cwd = process.cwd();
//package.json of our folder
var baseRootPath = _path2.default.join(_path2.default.dirname(require.resolve('react-webpack-template')), "..");
/**
 * Base generator. Will copy all required files from react-webpack-template
 */

var AppGenerator = function (_Generators) {
  _inherits(AppGenerator, _Generators);

  function AppGenerator(args, options) {
    _classCallCheck(this, AppGenerator);

    //Options look a lot like arguments, but they are written as command line flags.
    // yo webapp --coffee, --coffee is option 
    var _this = _possibleConstructorReturn(this, (AppGenerator.__proto__ || Object.getPrototypeOf(AppGenerator)).call(this, args, options));

    _this.option('skip-welcome-message', {
      desc: 'Skip the welcome message',
      type: Boolean,
      defaults: false
    });
    _this.option('skip-install');
    // Use our plain template as source
    _this.sourceRoot(baseRootPath);
    //The template context is defined as ./templates/ by default. 
    //You can overwrite this default by using generator.sourceRoot('new/template/path').
    _this.config.save();
    //Calling `this.config.save()` from a generator for the first time will create the file(yo-rc.json).
    return _this;
  }

  _createClass(AppGenerator, [{
    key: 'initializing',
    value: function initializing() {
      if (!this.options['skip-welcome-message']) {
        this.log(require('yeoman-welcome'));
        //ladies and gentleman
        this.log('Out of the box I include Webpack and some default React components.\n');
      }
    }
  }, {
    key: 'prompting',
    value: function prompting() {
      var _this2 = this;

      return this.prompt(_prompts2.default).then(function (answers) {
        // Make sure to get the correct app name if it is not the default
        //User`s input of appName
        if (answers.appName !== _all2.default.yeoman.getAppName()) {
          answers.appName = _all2.default.yeoman.getAppName(answers.appName);
        }
        // Set needed global vars for yo
        _this2.appName = answers.appName;
        _this2.style = answers.style;
        // this.ownWebpack = answers.ownWebpack;
        _this2.cssmodules = answers.cssmodules;
        // this.generatedWithVersion = parseInt(packageInfo.version.split('.').shift(), 10);
        // Set needed keys into config, first part of version devided with dot
        _this2.config.set('appName', _this2.appName);
        _this2.config.set('appPath', _this2.appPath);
        _this2.config.set('style', _this2.style);
        _this2.config.set('cssmodules', _this2.cssmodules);
        // this.config.set('generatedWithVersion', this.generatedWithVersion);
        //We save user config 
      });
    }
  }, {
    key: 'configuring',
    value: function configuring() {
      // Generate our package.json. Make sure to also include the required dependencies for styles
      // let defaultSettings = this.fs.readJSON(`${baseRootPath}/package.json`);
      var defaultSettings = { scripts: {}, devDependencies: {}, dependencies: {} };
      //package.json of react-webpack-template
      //this.fs is an instance of `mem-fs` . 
      //You access a file using store#get() method. If the file is in memory, it will be used. Otherwise, we'll load the file from the file-system.
      var packageSettings = {
        name: this.appName,
        private: true,
        version: '0.0.1',
        description: this.appName + ' - Generated by generator-react-webpack',
        main: 'src/index.js',
        entry: wcfConfig.entry,
        scripts: _ramda2.default.merge(defaultSettings.scripts, wcfConfig.scripts),
        //We can merge wcf scripts in file
        repository: '',
        keywords: [],
        author: 'Your name here',
        devDependencies: _ramda2.default.merge(defaultSettings.devDependencies, wcfConfig.devDependencies),
        dependencies: _ramda2.default.merge(defaultSettings.dependencies, wcfConfig.dependencies)
      };
      this.fs.writeJSON(this.destinationPath('package.json'), packageSettings);
      //The `destinationRoot` is the folder in which Yeoman will be scaffolding a new application. 
      //It is your user project folder, it is where you'll write most of the scaffolding.
      //Our `destinationPath` is relative to `destinationRoot` , So here we write package.json in our destination folder
    }
  }, {
    key: 'writing',
    value: function writing() {
      var _this3 = this;

      var excludeList = ['LICENSE', 'README.md', 'CHANGELOG.md', 'node_modules', 'package.json', '.istanbul.yml', '.travis.yml'];

      //If user configured his own webpack.config.js, we will provide an template
      //And we also will merge it file using webpack-merge before wcf processing
      this.fs.copy(_path2.default.resolve(__dirname, "./config/webpack.config.js").split(_path2.default.sep).join("/"), this.destinationPath() + "/webpack.config.js");
      this.fs.copy(_path2.default.resolve(__dirname, "./config/index.html").split(_path2.default.sep).join("/"), this.destinationPath() + "/src/index.html");
      this.fs.copy(_path2.default.resolve(__dirname, "./config/.babelrc").split(_path2.default.sep).join("/"), this.destinationPath() + "/.babelrc");
      this.fs.copy(_path2.default.resolve(__dirname, "./config/karma.conf.js").split(_path2.default.sep).join("/"), this.destinationPath() + "/karma.conf.js");
      this.fs.copy(_path2.default.resolve(__dirname, "./config/.eslintrc.js").split(_path2.default.sep).join("/"), this.destinationPath() + "/.eslintrc.js");
      //mkdirp `cfg` and remove config files to it
      (0, _mkdirp2.default)(cwd + "/cfg", function (err) {
        _util2.default.bulkDirectory(_path2.default.join(__dirname, "config"), cwd + "/cfg", _this3, ['webpack.config.js']);
        //bulkDirectory(source, destination, that)
      });
      // Get all files in our repo and copy the ones we should
      _fs2.default.readdir(this.sourceRoot(), function (err, items) {
        //The template context is defined as ./templates/ by default. 
        //You can overwrite this default by using generator.sourceRoot('new/template/path').
        //`SourceRoot` here is const baseRootPath = path.join(path.dirname(require.resolve('react-webpack-template')));
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var item = _step.value;

            // Copy all items to our root
            var fullPath = _path2.default.join(baseRootPath, item).split(_path2.default.sep).join("/");
            //Special file in react-webpack-template folder
            if (_fs2.default.lstatSync(fullPath).isDirectory() && item == "conf") {
              continue;
            } else if (_fs2.default.lstatSync(fullPath).isDirectory()) {
              // bulkDirectory(item, item).bind(this);
              //item is a special file in one folder
              _util2.default.bulkDirectory(_this3.templatePath(item), _this3.destinationPath(item), _this3, ["index.html"]);
              //We move our `index.html` manually
            } else {
              //we use our own webpack.config.js template file
              if (item === '.npmignore' /* || item === 'webpack.config.js'*/) {
                  _this3.fs.copyTpl(_this3.templatePath(item), _this3.destinationPath(".gitignore"));
                } else if (item == 'package.json' || item == ".eslintrc" || item == "karma.conf.js" || item == "webpack.config.js" || item.indexOf("index.html") != -1 || item == ".babelrc") {
                //package.json will not override!
                continue;
              } else {

                _this3.fs.copy(_this3.templatePath(item), _this3.destinationPath(item));
              }
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      });
    }
  }, {
    key: 'install',
    value: function install() {
      if (!this.options['skip-install']) {
        this.installDependencies({ bower: false });
        //invoke `installDependencies` function
      }
    }
  }]);

  return AppGenerator;
}(_yeomanGenerator2.default);

module.exports = AppGenerator;