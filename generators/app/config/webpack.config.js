'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var args = require('minimist')(process.argv.slice(2));
//Get other`s process.argv
// List of allowed environments
var allowedEnvs = ['dev', 'dist', 'test'];
// Set the correct environment
var env = void 0;
if (args._.length > 0 && args._.indexOf('start') !== -1) {
  //node example/parse.js -x 3 -y 4 -n5 -abc --beep=boop foo bar baz
  //{ _: [ 'foo', 'bar', 'baz' ],
  // x: 3,
  // y: 4,
  // n: 5,
  // a: true,
  // b: true,
  // c: true,
  // beep: 'boop' }
  env = 'test';
  //We are now in `test` mode
} else if (args.env) {
  env = args.env;
  //Env mode depend on `args.env`
} else {
  env = 'dev';
  //Default is `dev` mode
}
process.env.REACT_WEBPACK_ENV = env;
//We set ev on `process.env` object

/**
 * Build the webpack configuration
 * @param  {String} wantedEnv The wanted environment
 * @return {Object} Webpack config
 */
function buildConfig(wantedEnv) {
  var isValid = wantedEnv && wantedEnv.length > 0 && allowedEnvs.indexOf(wantedEnv) !== -1;
  //Valid env mode
  var validEnv = isValid ? wantedEnv : 'dev';
  //Default is `dev` mode
  var config = require(_path2.default.join(__dirname, 'cfg/' + validEnv));
  return config;
}

module.exports = buildConfig(env);
//`env` is string processed