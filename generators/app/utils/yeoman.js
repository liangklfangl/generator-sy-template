'use strict';

var path = require('path');
var configUtils = require('./config');
var _ = require('underscore.string');
var C = require('./constants');
// Needed directory paths, get last part of route
var baseName = path.basename(process.cwd());
/**
 * Get the base directory
 * @return {path.basename(process.cwd())}
 */
var getBaseDir = function getBaseDir() {
  return baseName;
};

/**
 * Get all settings (paths and the like) from components name
 * @param {String} componentName The components name
 * @param {String} style Style language to use [optional]
 * @param {boolean} useCssModules Flag indicating whether to use css modules
 * @param {Boolean} isPure Use a pure component? [optional]
 * @param {String|Number} generatorVersion The version of the generator [optional]
 * @param {String} cssClsPrefix Prefix to prepended to the component class name
 * @return {Object} Component settings
 */
var getAllSettingsFromComponentName = function getAllSettingsFromComponentName(componentName, style, useCssModules, isPure, generatorVersion, cssClsPrefix) {
  // Default style language is `css`
  // yo react-webpack:component my/namespaced/components/name while `my/namespaced/components/name` is name
  if (!style) {
    style = 'css';
  }

  // Use version 3 fallback as default for projects
  // Default project is 3.0, usually set in package.json
  if (!generatorVersion) {
    generatorVersion = 3;
  }
  // Clean up the path and pull it to parts
  var cleanedPaths = getCleanedPathName(componentName);
  //Return _.camelize(_.slugify(_.humanize(path)));}).join('/') + _.capitalize(suffix);
  //`Src/Component/Button+capitalize(suffix)`
  //(1)Converts an underscored, camelized, or dasherized string into a humanized one. 
  //Also removes beginning and ending whitespace, and removes the postfix '_id'.
  // humanize("  capitalize dash-CamelCase_underscore trim  ");
  // => "Capitalize dash camel case underscore trim"
  // (2)slugify(string) => string
  // Transform text into an ascii slug which can be used in safely in URLs. Replaces whitespaces, 
  // accentuated, and special characters with a dash. Limited set of non-ascii characters are transformed to similar versions in the ascii character set such as ä to a.
  // slugify("Un éléphant à l\'orée du bois");
  // => "un-elephant-a-l-oree-du-bois"
  // (3)detail: https://github.com/epeli/underscore.string
  // (4) my/namespaced/components/name6 returned, camelize("moz-transform");
  // => "mozTransform"
  var componentParts = cleanedPaths.split('/');
  var componentBaseName = _.capitalize(componentParts.pop());
  //Only `filename` part
  var componentPartPath = componentParts.join('/');
  //Get path except for file name
  // Get the components displayName property
  var componentFullName = _.classify(_.replaceAll(componentName, '/', '_'));
  //MyNamespacedComponentsName6 returned
  // Converts string to camelized class name. First letter is always upper case
  // classify("some_class_name");
  // => "SomeClassName" which means that we will convert string to class like string
  // Configure Styles
  var stylePaths = configUtils.getChoiceByKey('path', 'style');
  // Path is from `path` while other is from `style`.
  // where to put styles configured in `configopts.json`
  var styleSettings = configUtils.getChoiceByKey('style', style);
  //`style` part of configopts.json
  // Configure components
  var componentPath = configUtils.getChoiceByKey('path', 'component');
  //Get `component` part of `path`
  // Configure tests
  var testPath = configUtils.getChoiceByKey('path', 'test');
  //Get `test` part of `path`
  var settings = {
    style: {
      webpackPath: ('./' + componentBaseName.toLowerCase() + (useCssModules ? '.module' : '') + styleSettings.suffix).split(path.sep).join("/"),
      //`${componentBaseName}` is Filename of css file, if cssmodule enabled, we add `.module`. suffix is equal to postfix 
      path: path.normalize(componentPath.path + '/' + componentPartPath + '/').split(path.sep).join("/"),
      //relative to `src` folder configurd in configopts.json now!
      fileName: '' + componentBaseName.toLowerCase() + (useCssModules ? '.module' : '') + styleSettings.suffix,
      //fileName part will not include `./`
      className: getComponentStyleName(cssClsPrefix + componentBaseName),
      //getComponentStyleName return `style.less-component`
      //cssClsPrefix is prefix part of our css class
      suffix: styleSettings.suffix
      //styleSettings.suffix from `style` part of configopts.json
    },
    component: {
      webpackPath: path.normalize('components/' + componentPartPath + '/' + componentBaseName + '.js').split(path.sep).join("/"),
      //import <%= component.className %> from '<%= component.webpackPath %>';
      //Here is `component.webpackPath` means
      path: path.normalize(componentPath.path + '/' + componentPartPath + '/').split(path.sep).join("/"),
      //Is relative to componentPath.path configured now!
      //`componentPath.path` is `src/components`
      //`componentPartPath` is  what you typed in command cli with name eliminated
      fileName: componentBaseName + '.js',
      //`filename` is closely relevant to `componentBaseName`
      className: '' + componentBaseName,
      //`className` is name of component
      //shallow(<<%= component.className %> />)
      classBase: isPure ? 'React.PureComponent' : 'React.Component',
      //${isPure} or not. Which class we will extend to of our Component
      displayName: '' + componentFullName,
      //_.classify(_.replaceAll(componentName, '/', '_'));
      //DisplayName of our React Component, Each Component has a displayName
      //`displayName` of component, Name.displayName = 'MyNamespacedComponentsName';
      suffix: '.js'
      //suffix is `.js` of component
    },
    test: {
      path: path.normalize(testPath.path + '/components/' + componentPartPath + '/'),
      //test path of `path` of configopts.json. Default is `test` folder parallel to `src`
      fileName: componentBaseName + 'Test.js'
      //FileName of TestCase
    }
  };
  return settings;
};

/**
 * Get a cleaned path name for a given path
 * @param {String} path
 * @param {String} suffix [optional]
 * @return {String}
 * Default suffix is empty string ''
 */
var getCleanedPathName = function getCleanedPathName(path, suffix) {
  if (!suffix) {
    suffix = '';
  }
  // If we have filesystem separators, use them to build the full path
  var pathArray = path.split('/');

  // Build the full components name. If path is "src/component/button+suffix" will be transformed to 
  // src/component/button
  return pathArray.map(function (path) {
    return _.camelize(_.slugify(_.humanize(path)));
  }).join('/') + _.capitalize(suffix);
};

/**
 * Get the css/less/whatever style name to use
 * @param  {String} path
 * @return {String}
 * If our path is `src/component`, then it will be changed to `component-component`
 * 
 */
var getComponentStyleName /*`style.less-component`*/ = function getComponentStyleName(path) {
  var fileName = path.split('/').pop().toLowerCase();
  return _.slugify(_.humanize(fileName)) + '-component';
};

/**
 * Get a js friendly application name, Detail : http://npm.taobao.org/package/underscore.string
 * @param  {String} appName The input application name [optional]
 * @return {Default is path.basename(process.cwd())}
 */
var getAppName = function getAppName(appName) {
  // If appName is not given, use the current directory
  if (appName === undefined) {
    appName = getBaseDir();
  }
  //(1)humanize("  capitalize dash-CamelCase_underscore trim  ");
  // => "Capitalize dash camel case underscore trim"
  // Converts an underscored, camelized, or dasherized string into a humanized one.
  // (2)Transform text into an ascii slug which can be used in safely in URLs.
  //  Replaces whitespaces, accentuated, and special characters with a dash. 
  //  Limited set of non-ascii characters are transformed to similar versions in the ascii character set such as ä to a.
  // Also removes beginning and ending whitespace, and removes the postfix '_id'.
  // slugify("Un éléphant à l\'orée du bois");
  // => "un-elephant-a-l-oree-du-bois"
  return _.slugify(_.humanize(appName));
};

/**
 * Get the wanted destination path
 * @param  {String} name Name of the file
 * @param  {String} type The type to use (e.g. action, store, ...)
 * @param  {Suffix} suffix The suffix to use for the file (e.g. Store, Actions, ...)
 * @return {String} Final path
 */
var getDestinationPath = function getDestinationPath(name, type, suffix) {

  var cleanedPaths = getCleanedPathName(name, suffix);
  //Src/Component/Button+_.capitalize(suffix) returned
  //_.camelize(_.slugify(_.humanize(path)));}).join('/') + _.capitalize(suffix)
  var fsParts = cleanedPaths.split('/');
  //Get ['Src','Component','Button+_.capitalize(suffix)']
  var actionBaseName = _.capitalize(fsParts.pop());
  //Last part is capitalized filename not path
  var partPath = fsParts.join('/');
  //Get `/` joined Path
  var fsPath = configUtils.getChoiceByKey('path', type).path;
  //Setting part is `path` ,type is `name` part(base,action,component and etc), in getChoiceByKey method , we compare two name attribute
  //while path of `base` is `src`, `action` is `src/action`  
  var parts = [fsPath];
  //Get path of `type` supplied
  if (partPath.length > 0) {
    parts.push(partPath);
  }
  //path config in configopts.json is base path, we must append name of parameter
  parts.push(actionBaseName);
  //Fullpath =  configUtils.getChoiceByKey('path', type).path + getCleanedPathName(user supplied)+actionBaseName
  var fullPath = parts.join('/');
  return fullPath + '.js';
};

/**
 * Get the destinations class name
 * @param  {String} name Name of the file
 * @param  {String} type The type to use (e.g. action, store, ...)
 * @param  {Suffix} suffix The suffix to use for the file (e.g. Store, Actions, ...)
 * @return {String} The javascript class name to use
 * ClassName is heavily rely on Destion path
 */
var getDestinationClassName = function getDestinationClassName(name, type, suffix) {
  var fixedName = getDestinationPath(name, type, suffix);
  // `${fullPath}.js` returned
  return _.capitalize(fixedName.split('/').pop().split('.js')[0]);
  //`.js` is elimited
};

/**
 * Get the filename of the component template to copy.
 * @param {boolean} isStateless
 * @param {boolean} useStyles
 * @param {boolean} useCssModules
 * @return {string} The template filename including the .js suffix
 */
var getComponentTemplateName = function getComponentTemplateName(isStateless, useStyles, useCssModules) {
  var componentTypeFrag = isStateless ? C.COMP_TYPES.STATELESS : C.COMP_TYPES.STATEFUL;
  //get component type
  //const COMP_TYPES = {
  //   STATEFUL: 'Stateful',
  //   STATELESS: 'Stateless'
  // };

  var styleTypeFrag = !useStyles ? C.STYLE_TYPES.NO_STYLES : useCssModules ? C.STYLE_TYPES.WITH_CSSMODULES : C.STYLE_TYPES.WITH_STYLES;
  // const STYLE_TYPES = {
  //   WITH_STYLES: 'WithStyles',
  //   WITH_CSSMODULES: 'CssModules',
  //   NO_STYLES: 'NoStyles'
  // };
  return '' + componentTypeFrag + styleTypeFrag + '.js';
  //return such as "Stateful/WithStyles.js"
};

module.exports = {
  getBaseDir: getBaseDir,
  //get Base dir
  getAllSettingsFromComponentName: getAllSettingsFromComponentName,
  getAppName: getAppName,
  //get a friendly appName, removing _ , space, camelcased etc
  getCleanedPathName: getCleanedPathName,
  //change to Src/Component/Button+ _.capitalize(suffix)
  getComponentStyleName: getComponentStyleName,
  //If our path is `src/component`, then it will be changed to `component-component`
  //index.less will be transformed to "index.less-component"
  getComponentTemplateName: getComponentTemplateName,
  //Template name of our Component,return such as "Stateful/WithStyles.js"
  getDestinationPath: getDestinationPath,
  // Fullpath =  configUtils.getChoiceByKey('path', type).path + getCleanedPathName(user supplied)+actionBaseName +".js"
  //This is our destination path
  getDestinationClassName: getDestinationClassName
};