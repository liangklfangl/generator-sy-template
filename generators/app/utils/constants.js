'use strict';

/**
 * List of supported generator versions.
 * @type {number[]}
 */

var SUPPORTED_GEN_VERSIONS = [3, 4];

/**
 * ENUM of supported component types.
 * @type {{STATEFUL: string, STATELESS: string}}
 */
var COMP_TYPES = {
  STATEFUL: 'Stateful',
  STATELESS: 'Stateless'
};

/**
 * ENUM of supported style types.
 * @type {{WITH_STYLES: string, WITH_CSSMODULES: string, NO_STYLES: string}}
 */
var STYLE_TYPES = {
  WITH_STYLES: 'WithStyles',
  WITH_CSSMODULES: 'CssModules',
  NO_STYLES: 'NoStyles'
};

module.exports = {
  SUPPORTED_GEN_VERSIONS: SUPPORTED_GEN_VERSIONS,
  COMP_TYPES: COMP_TYPES,
  STYLE_TYPES: STYLE_TYPES
};