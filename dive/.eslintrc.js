module.exports = {
  "parser": "babel-eslint",
  //By default, ESLint uses Espree as its parser. You can optionally specify that a different parser should be used in your configuration file
  //Detail : http://eslint.org/docs/user-guide/configuring
  "env": {
    "browser": true,
    // browser global variables
    "node": true,
    //Node.js global variables and Node.js scoping.
    "mocha": true
    //adds all of the Mocha testing global variables.
  },
  //An environment defines global variables that are predefined
  "root" : true,
  //. ESLint will stop looking in parent folders once it finds a configuration with "root": true.
  "plugins" :[],
  //ESLint supports the use of third-party plugins. Before using the plugin you have to install it using npm.
  "extends": "airbnb",
  //Detail :https://yq.aliyun.com/articles/66559
  //An extends property value "eslint:recommended" enables a subset of core rules that report common 
  //problems, which have a check mark  on the rules page. The recommended subset can change only at major versions of ESLint.
  //A configuration file can extend the set of enabled rules from base configurations.
  //The extends property value is either:
  //(1)a string that specifies a configuration
  //(2)an array of strings: each additional configuration extends the preceding configurations
  "settings" : {
  	"author" : "liangklfangl"
  	//ESLint supports adding shared settings into configuration file. You can add settings object
  	// to ESLint configuration file and it will be supplied to every rule that will be executed.
  	//  This may be useful if you are adding custom rules and want them to have access to the same information and be easily configurable.
  },
  "rules": {
 //(1)To configure rules inside of a configuration file, use the rules key along with an error level 
 //and any options you want to use. 
 //(2)If a rule has additional options, you can specify them using array literal syntax, such as:
 // /*eslint quotes: ["error", "double"], curly: 2*/ 
//This comment specifies the “double” option for the quotes rule. The first item in the array is always the rule severity (number or string).
    "comma-dangle": 0,
    //Turn off our rule, default is 'never' meaning that `disallow traillging comma`
    //http://eslint.org/docs/rules/comma-dangle#when-not-to-use-it
    "padded-blocks": 0,
    //http://eslint.org/docs/rules/padded-blocks
    //Default is `always` , requires empty lines at the beginning and ending of block statements (except switch statements and classes)
    "react/prefer-stateless-function": [0,{"ignorePureComponents":false}],
    //https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prefer-stateless-function.md
    "react/jsx-filename-extension": 0,
    //Whether should filename postfixed with 'jsx'
    "no-underscore-dangle": [ "error", { "allowAfterThis": true ,"allowAfterSuper":true}],
    //This rule disallows dangling underscores in identifiers. But,obj.__proto__ = {} is okay because __proto__ is not identifier (in AST means)
    //http://eslint.org/docs/rules/no-underscore-dangle.html
    "import/no-unresolved": ["error", {
    //https://github.com/liangklfang/eslint-plugin-import
    //A list of regex strings that, if matched by a path, will not report the matching module if no exports are found.
        "ignore": [
          "cfg",
          "components/",
          "stores/",
          "actions/",
          "sources/",
          "styles/",
          "images/"
        ]
    }]
  }
}
