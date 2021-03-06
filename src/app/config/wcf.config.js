module.exports = {
    "scripts":{
     "dist":"cross-env NODE_ENV=production npm run pack",
     "clean": " rimraf dest/*",
     "copy": "copyfiles -f ./src/index.html ./dest && copyfiles -u 1 \"./src/static/**\" ./dest",
     "eslint": "eslint ./src",
     "pack": "npm run clean & npm run copy & wcf --dev  --config ./cfg/dist.js --htmlTemplate ./src/index.html",
     "devServer": "wcf --dev --devServer --config ./cfg/devServer.js --htmlTemplate ./src/index.html",
     "watch": "wcf --dev --watch --config ./cfg/watch.js --htmlTemplate ./src/index.html",
     "test": "cross-env NODE_ENV=test karma start",
     "test:watch": "cross-env NODE_ENV=test karma start --autoWatch=true --singleRun=false --reporters=mocha,coverage"
    },
    "devDependencies": {
     "babel-plugin-transform-object-rest-spread": "^6.23.0",
     "babel-eslint": "^7.2.1",
     "eslint": "^3.0.0",
     "eslint-config-airbnb": "^13.0.0",
     "eslint-loader": "^1.3.0",
     "eslint-plugin-import": "^2.2.0",
     "eslint-plugin-jsx-a11y": "^2.2.0",
     "eslint-plugin-react": "^6.0.0",
     "webpack": "^2.2.0",
     "webpack-dev-server": "^2.4.1",
     "karma": "^1.0.0",
     "karma-chai": "^0.1.0",
     "eslint-plugin-jsx-a11y": "^4.0.0",
     "karma-coverage": "^1.0.0",
     "karma-junit-reporter": "^1.0.0",
     "karma-mocha": "^1.0.1",
     "karma-mocha-reporter": "^2.0.3",
     "karma-phantomjs-launcher": "^1.0.4",
     "karma-sinon": "^1.0.5",
     "karma-sourcemap-loader": "^0.3.7",
     "karma-webpack": "^1.8.1",
     "mocha": "^3.0.0",
     "react-addons-test-utils": "^15.0.0-rc.2",
     "phantomjs-prebuilt": "^2.1.7",
     "rimraf": "^2.5.2",
     "sinon": "^1.17.3"
  },
  "dependencies" :{
    "normalize.css": "^4.0.0",
    "react-dom": "^15.0.2",
    "react": "^15.3.0",
    "enzyme": "^2.8.0",
    "webpackcc": "^2.0.20",
    "react-hot-loader": "^3.0.0-beta.6",
    "cross-env": "^3.1.0"
  },
  "entry" :{
    "index" : "./src/client.js"
  }
}