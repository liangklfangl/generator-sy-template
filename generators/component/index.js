'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _yeomanGenerator = require('yeoman-generator');

var _yeomanGenerator2 = _interopRequireDefault(_yeomanGenerator);

var _all = require('../app/utils/all');

var _all2 = _interopRequireDefault(_all);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var C = _all2.default.constants;

var getAllSettingsFromComponentName = _all2.default.yeoman.getAllSettingsFromComponentName;

var ComponentGenerator = function (_Generators) {
  _inherits(ComponentGenerator, _Generators);

  function ComponentGenerator(args, options) {
    _classCallCheck(this, ComponentGenerator);

    /**
     * Flag indicating whether the component should be created with associated style files.
     * @type {boolean}
     */
    var _this = _possibleConstructorReturn(this, (ComponentGenerator.__proto__ || Object.getPrototypeOf(ComponentGenerator)).call(this, args, options));

    _this.useStyles = false;

    /**
     * Flag indicating whether the component should make use of css modules.
     * @type {boolean}
     */
    _this.useCssModules = false;

    /**
     * A string to prepended to the `className` attribute of generated components.
     * @type {string}
     */
    _this._cssClsPrefix = '';

    /**
     * Flag indicating if stateful components should extends from React.PureComponent
     * @type {boolean}
     */
    _this.usePureComponent = false;
    /**
     * Filename of the template that will be used to create the component.
     * @type {?string}
     */
    _this.componentTemplateName = null;

    /**
     * Generator and template version to create the component from.
     * @type {?number}
     */
    _this.argument('name', { type: String, required: true });
    //When you run `yo react-webpack:component my/namespaced/components/name`, then `name` is
    //`my/namespaced/components/name`, will be avaiable in this.options["name"]
    _this.option('stateless', {
      desc: 'Create a stateless component instead of a full one',
      defaults: false
    });
    //Whether is stateless component
    _this.option('nostyle', {
      desc: 'Create a component without creating an associated style',
      defaults: false
    });
    //whether create a style file in `src/style` folder, such as Name1.css
    _this.option('pure', {
      desc: 'Create a pure component instead of a "regular" one. Will use React.PureComponent as a base instead of React.Component',
      defaults: false
    });
    //Pure Component generate or not
    return _this;
  }

  /**
   * [cssClsPrefix Get class prefix]
   * @return {[type]} [description]
   */


  _createClass(ComponentGenerator, [{
    key: 'configuring',
    value: function configuring() {
      this.useStyles = !this.options.nostyle;
      //whether generate style file
      this.useCssModules = this.config.get('cssmodules') || false;
      //Use cssmodule or not
      this.cssClsPrefix = this.config.get('cssClsPrefix') || '';

      // Make sure we don't try to use template v3 with cssmodules
      if (this.generatorVersion < 4 && this.useStyles && this.useCssModules) {
        this.env.error('Creating components with cssmodules is only supported in generator versions 4+');
      }

      // Get the filename of the component template to be copied during this run
      this.componentTemplateName = _all2.default.yeoman.getComponentTemplateName(this.options.stateless, this.useStyles, this.useCssModules);
      //`${componentTypeFrag}${styleTypeFrag}.js`;
    }
  }, {
    key: 'writing',
    value: function writing() {
      var settings = getAllSettingsFromComponentName(this.options["name"],
      //this.argument('name')
      this.config.get('style'),
      //style language of `less/scss` etc. this.config.set is invoked in `app` generator
      this.useCssModules,
      //this.config.get('') from asking of user!
      this.options.pure,
      //Whether is pure component
      this.generatorVersion,
      //generatorVersion
      this.cssClsPrefix
      // className: getComponentStyleName(cssClsPrefix + componentBaseName)
      );

      // Create the `style` template. Skipped if nostyle is set as command line flag
      if (this.useStyles) {
        this.fs.copyTpl(this.templatePath('styles/Component' + settings.style.suffix), this.destinationPath(settings.style.path + settings.style.fileName), settings);
      }
      // Create the component
      this.fs.copyTpl(this.templatePath('components/' + this.componentTemplateName).split(_path2.default.sep).join('/'), this.destinationPath(settings.component.path + settings.component.fileName),
      //`setting.component.path` is path to lay component.~path.normalize(`${componentPath.path}/${componentPartPath}/`)
      settings);

      // Create the unit test
      this.fs.copyTpl(this.templatePath('./tests/Base.js'), this.destinationPath(settings.test.path + settings.test.fileName), settings);
    }
  }, {
    key: 'cssClsPrefix',
    get: function get() {
      return this._cssClsPrefix;
    }

    /**
     * [cssClsPrefix Set class prefix]
     * @param  {[type]} val [description]
     * @return {[type]}     [description]
     */
    ,
    set: function set(val) {
      this._cssClsPrefix = val === '' ? '' : val + '-';
    }
  }]);

  return ComponentGenerator;
}(_yeomanGenerator2.default);

module.exports = ComponentGenerator;