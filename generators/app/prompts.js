'use strict';

var _all = require('./utils/all');

var _all2 = _interopRequireDefault(_all);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = [{
  type: 'input',
  name: 'appName',
  message: 'Please choose your application name',
  default: _all2.default.yeoman.getAppName()
  //Get appName from path.basename(process.cwd())
},
// {
//   type: 'confirm',
//   name: 'ownWebpack',
//   message: 'You need generate you own webpack.config.js in cwd?',
//   default: true
// },
{
  type: 'list',
  name: 'style',
  message: 'Which style language do you want to use?',
  choices: _all2.default.config.getChoices('style'),
  //get options of `style` setting
  default: _all2.default.config.getDefaultChoice('style')
  //get default options of `style` setting
},
// {
//   type: 'confirm',
//   name: 'cssmodules',
//   message: 'Enable css module support? See https://github.com/gajus/react-css-modules for further info',
//   default: true
// },
{
  type: 'confirm',
  name: 'postcss',
  message: 'Enable postcss?',
  default: false
}];