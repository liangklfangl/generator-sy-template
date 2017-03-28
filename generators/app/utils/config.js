'use strict';

var opts = require('./configopts.json');

/**
 * Get a setting
 * @param  {String} setting
 * @return {Mixed} setting or null if not found
 * settings as `style`, `cssmodules`,`postcss`,`path`
 */
var getSetting = function getSetting(setting) {
  return opts[setting] !== undefined ? opts[setting] : null;
};

/**
 * Get choices for a given setting
 * @param  {String} setting
 * @return {Mixed} Result or null if nothing was found
 * Get choices will heavily depend on getSetting
 */
var getChoices = function getChoices(setting) {
  var config = getSetting(setting);
  return config && Array.isArray(config.options) ? config.options : null;
};

/**
 * Get the wanted choice by key
 * @param  {String} setting
 * @param  {String} key
 * @return {Object}
 * configUtils.getChoiceByKey('path', type).path;
 */
var getChoiceByKey = function getChoiceByKey(setting, key) {
  var choices = getChoices(setting);
  //Get option part
  if (!choices) {
    return null;
  }
  var result = null;
  //depend on key to get special configuration
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = choices[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var choice = _step.value;

      if (choice.name === key) {
        result = choice;
        break;
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

  return result;
};

/**
 * Get the default choice for a config setting
 * @param  {String} setting
 * @return {Mixed}
 * Get default configuration by setting!
 */
var getDefaultChoice = function getDefaultChoice(setting) {
  var config = getSetting(setting);
  return config && config.default !== undefined && config.default.length > 0 ? config.default : null;
};

module.exports = {
  getSetting: getSetting,
  //Settings consist of `style`, `cssmodules`,`postcss`,`path`
  getChoices: getChoices,
  //Get options
  getChoiceByKey: getChoiceByKey,
  getDefaultChoice: getDefaultChoice
};