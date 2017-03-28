import Generators from 'yeoman-generator';
import utils from './utils/all';
import prompts from './prompts';
import path from 'path';
import fs from 'fs';
import glob from "glob";
import R from "ramda";
import mkdirp from "mkdirp";
import getWebpackCommonConfig from 'webpackcc/lib/getWebpackDefaultConfig';
//We must define a process.cwd to first parameter
// import mkdirp from "mkdirp";
// import waterfall from 'async/waterfall'
import fileUtil from "./utils/util";
const wcfConfig  = require("./config/wcf.config.json");
const cwd = process.cwd();
//package.json of our folder
const baseRootPath = path.join(path.dirname(require.resolve('react-webpack-template')),"..");
/**
 * Base generator. Will copy all required files from react-webpack-template
 */
class AppGenerator extends Generators {

  constructor(args, options) {
    super(args, options);
     //Options look a lot like arguments, but they are written as command line flags.
    // yo webapp --coffee, --coffee is option 
    this.option('skip-welcome-message', {
      desc: 'Skip the welcome message',
      type: Boolean,
      defaults: false
    });
    this.option('skip-install');
    // Use our plain template as source
    this.sourceRoot(baseRootPath);
    //The template context is defined as ./templates/ by default. 
    //You can overwrite this default by using generator.sourceRoot('new/template/path').
    this.config.save();
    //Calling `this.config.save()` from a generator for the first time will create the file(yo-rc.json).
  }

  initializing() {
    if(!this.options['skip-welcome-message']) {
      this.log(require('yeoman-welcome'));
      //ladies and gentleman
      this.log('Out of the box I include Webpack and some default React components.\n');
    }
  }

  prompting() {
    return this.prompt(prompts).then((answers) => {
      // Make sure to get the correct app name if it is not the default
      //User`s input of appName
      if(answers.appName !== utils.yeoman.getAppName()) {
        answers.appName = utils.yeoman.getAppName(answers.appName);
      }
      // Set needed global vars for yo
      this.appName = answers.appName;
      this.style = answers.style;
      // this.ownWebpack = answers.ownWebpack;
      this.cssmodules = answers.cssmodules;
      // this.generatedWithVersion = parseInt(packageInfo.version.split('.').shift(), 10);
      // Set needed keys into config, first part of version devided with dot
      this.config.set('appName', this.appName);
      this.config.set('appPath', this.appPath);
      this.config.set('style', this.style);
      this.config.set('cssmodules', this.cssmodules);
      // this.config.set('generatedWithVersion', this.generatedWithVersion);
      //We save user config 
    });
  }

  configuring() {
    // Generate our package.json. Make sure to also include the required dependencies for styles
    // let defaultSettings = this.fs.readJSON(`${baseRootPath}/package.json`);
    const defaultSettings = {scripts:{},devDependencies:{},dependencies:{}};
    //package.json of react-webpack-template
    //this.fs is an instance of `mem-fs` . 
    //You access a file using store#get() method. If the file is in memory, it will be used. Otherwise, we'll load the file from the file-system.
    let packageSettings = {
      name: this.appName,
      private: true,
      version: '0.0.1',
      description: `${this.appName} - Generated by generator-react-webpack`,
      main: 'src/index.js',
      entry :wcfConfig.entry,
      scripts: R.merge(defaultSettings.scripts,wcfConfig.scripts),
      //We can merge wcf scripts in file
      repository: '',
      keywords: [],
      author: 'Your name here',
      devDependencies: R.merge(defaultSettings.devDependencies,wcfConfig.devDependencies),
      dependencies: R.merge(defaultSettings.dependencies,wcfConfig.dependencies)
    };
    this.fs.writeJSON(this.destinationPath('package.json'), packageSettings);
    //The `destinationRoot` is the folder in which Yeoman will be scaffolding a new application. 
    //It is your user project folder, it is where you'll write most of the scaffolding.
    //Our `destinationPath` is relative to `destinationRoot` , So here we write package.json in our destination folder
  }

  writing() {
    const excludeList = [
      'LICENSE',
      'README.md',
      'CHANGELOG.md',
      'node_modules',
      'package.json',
      '.istanbul.yml',
      '.travis.yml'
    ];

    //If user configured his own webpack.config.js, we will provide an template
    //And we also will merge it file using webpack-merge before wcf processing
    this.fs.copy(path.resolve(__dirname,"./config/webpack.config.js").split(path.sep).join("/"),this.destinationPath()+"/webpack.config.js");
    this.fs.copy(path.resolve(__dirname,"./config/index.html").split(path.sep).join("/"),this.destinationPath()+"/src/index.html");
    this.fs.copy(path.resolve(__dirname,"./config/.babelrc").split(path.sep).join("/"),this.destinationPath()+"/.babelrc");
    //mkdirp `cfg` and remove config files to it
    mkdirp(cwd+"/cfg",(err) =>{
       fileUtil.bulkDirectory(path.join(__dirname,"config"),cwd+"/cfg",this,['webpack.config.js']);
       //bulkDirectory(source, destination, that)
    });
    // Get all files in our repo and copy the ones we should
    fs.readdir(this.sourceRoot(), (err, items) => {
        //The template context is defined as ./templates/ by default. 
       //You can overwrite this default by using generator.sourceRoot('new/template/path').
       //`SourceRoot` here is const baseRootPath = path.join(path.dirname(require.resolve('react-webpack-template')));
      for(let item of items) {
        // Copy all items to our root
        let fullPath = path.join(baseRootPath, item).split(path.sep).join("/");
        //Special file in react-webpack-template folder
        if(fs.lstatSync(fullPath).isDirectory() && item =="conf"){
          continue;
        }else if(fs.lstatSync(fullPath).isDirectory()) {
          // bulkDirectory(item, item).bind(this);
          //item is a special file in one folder
          fileUtil.bulkDirectory(
               this.templatePath(item),
               this.destinationPath(item),
               this,["index.html"]);
          //We move our `index.html` manually
        } else {
          //we use our own webpack.config.js template file
          if (item === '.npmignore' /* || item === 'webpack.config.js'*/) {
             this.fs.copyTpl(
               this.templatePath(item),
               this.destinationPath(".gitignore")
              );
          } else if(item =='package.json'||item =="webpack.config.js" || item.indexOf("index.html")!=-1 || item==".babelrc"){
            //package.json will not override!
            continue;
          } else{
  
            this.fs.copy(this.templatePath(item), this.destinationPath(item));
          }
        }
      }
    });
  }

  install() {
    if(!this.options['skip-install']) {
      this.installDependencies({ bower: false });
      //invoke `installDependencies` function
    }
  }
}
module.exports = AppGenerator;
