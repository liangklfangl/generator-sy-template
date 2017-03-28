const openPath = require('rfc-open-path');
openPath('a/b/c/d/e', true, error => {
  if (error) {
    throw error;
  }

  console.log('done');
});