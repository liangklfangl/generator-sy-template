"use strict";

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _glob = require("glob");

var _glob2 = _interopRequireDefault(_glob);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Remove files of one folder to another
 * @param  {[type]} source      [description]
 * @param  {[type]} destination [description]
 * @param  {[type]} that        [description]
 * @return {[type]}             [description]
 */
function bulkDirectory(source, destination, that) {
  var excludedFiles = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

  // Only add sourceRoot if the path is not absolute
  // const root = that.templatePath(source);
  //relative to sourceRoot()
  // const folderPathArray = source.split(path.sep);
  // if(folderPathArray[folderPathArray.length-1]=='cfg'){
  //   //ignore cfg folder, we will generate it ourself
  //   return;
  // }
  var files = _glob2.default.sync('**', { dot: true, nodir: true, cwd: source });
  //(1)** If a "globstar" is alone in a path portion, then it matches zero or more directories 
  //and subdirectories searching for matches. It does not crawl symlinked directories.
  //You can make glob treat dots as normal characters by setting dot:true in the options.
  //(2)If you set matchBase:true in the options, and the pattern has no slashes in it, then it 
  //will seek for any file anywhere in the tree with a matching basename. For example, *.js would match test/simple/basic.js.
  //(3)To get the bash-style behavior, set the nonull:true in the options.
  //(4) Do not match directories, only files. (Note: to match only directories, simply put a / at the end of the pattern.)
  //(5)cwd The current working directory in which to search. Defaults to process.cwd().
  destination = destination || source;
  // get the path relative to the template root, and copy to the relative destination
  for (var i in files) {
    if (excludedFiles.indexOf(files[i]) != -1) continue;
    var dest = _path2.default.join(destination, files[i]);
    //destination is folder
    var src = _path2.default.join(source, files[i]);
    that.fs.copy(src, dest);
  }
};

module.exports = {
  bulkDirectory: bulkDirectory
};