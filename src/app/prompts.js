import utils from "./utils/all";

module.exports = [
  {
    type: 'input',
    name: 'appName',
    message: 'Please choose your application name',
    default: utils.yeoman.getAppName()
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
    choices: utils.config.getChoices('style'),
    //get options of `style` setting
    default: utils.config.getDefaultChoice('style')
    //get default options of `style` setting
  },
  {
    type: 'confirm',
    name: 'cssmodules',
    message: 'Enable css module support? See https://github.com/gajus/react-css-modules for further info',
    default: true
  }//,
  // {
  //   type: 'confirm',
  //   name: 'postcss',
  //   message: 'Enable postcss?',
  //   default: false
  // }
];
