'use strict';

var openPath = require('rfc-open-path');
openPath('a/b/c/d/e', true, function (error) {
  if (error) {
    throw error;
  }

  console.log('done');
});