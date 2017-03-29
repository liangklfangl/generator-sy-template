import Generators from 'yeoman-generator';
import utils from '../app/utils/all';
const C = utils.constants;
import path from "path";
const getAllSettingsFromComponentName = utils.yeoman.getAllSettingsFromComponentName;
class ComponentGenerator extends Generators {

  constructor(args, options) {
    super(args, options);
    /**
     * Flag indicating whether the component should be created with associated style files.
     * @type {boolean}
     */
    this.useStyles = false;

    /**
     * Flag indicating whether the component should make use of css modules.
     * @type {boolean}
     */
    this.useCssModules = false;

    /**
     * A string to prepended to the `className` attribute of generated components.
     * @type {string}
     */
    this._cssClsPrefix = '';

    /**
     * Flag indicating if stateful components should extends from React.PureComponent
     * @type {boolean}
     */
    this.usePureComponent = false;
    /**
     * Filename of the template that will be used to create the component.
     * @type {?string}
     */
    this.componentTemplateName = null;

    /**
     * Generator and template version to create the component from.
     * @type {?number}
     */
    this.argument('name', { type: String, required: true });
    //When you run `yo react-webpack:component my/namespaced/components/name`, then `name` is
    //`my/namespaced/components/name`, will be avaiable in this.options["name"]
    this.option('stateless', {
      desc: 'Create a stateless component instead of a full one',
      defaults: false
    });
    //Whether is stateless component
    this.option('nostyle', {
      desc: 'Create a component without creating an associated style',
      defaults: false
    });
    //whether create a style file in `src/style` folder, such as Name1.css
    this.option('pure', {
      desc: 'Create a pure component instead of a "regular" one. Will use React.PureComponent as a base instead of React.Component',
      defaults: false
    });
    //Pure Component generate or not
  }

/**
 * [cssClsPrefix Get class prefix]
 * @return {[type]} [description]
 */
  get cssClsPrefix() {
    return this._cssClsPrefix;
  }

/**
 * [cssClsPrefix Set class prefix]
 * @param  {[type]} val [description]
 * @return {[type]}     [description]
 */
  set cssClsPrefix(val) {
    this._cssClsPrefix = (val === '') ? '' : `${val}-`;
  }

  configuring() {
    this.useStyles = !this.options.nostyle;
    //whether generate style file
    this.useCssModules = this.config.get('cssmodules') || false;
    //Use cssmodule or not
    this.cssClsPrefix = this.config.get('cssClsPrefix') || '';

    // Make sure we don't try to use template v3 with cssmodules
    if (this.generatorVersion < 4 && this.useStyles && this.useCssModules) {
      this.env.error('Creating components with cssmodules is only supported in generator versions 4+');
    }

    // Get the filename of the component template to be copied during this run
    this.componentTemplateName =
      utils.yeoman.getComponentTemplateName(this.options.stateless, this.useStyles, this.useCssModules);
   //`${componentTypeFrag}${styleTypeFrag}.js`;
  }

  writing() {
    const settings =
      getAllSettingsFromComponentName(
        this.options["name"],
        //this.argument('name')
        this.config.get('style'),
        //style language of `less/scss` etc. this.config.set is invoked in `app` generator
        this.useCssModules,
        //this.config.get('') from asking of user!
        this.options.pure,
        //Whether is pure component
        this.generatorVersion,
        //generatorVersion
        this.cssClsPrefix
      // className: getComponentStyleName(cssClsPrefix + componentBaseName)
      );
     
    // Create the `style` template. Skipped if nostyle is set as command line flag
    if(this.useStyles) {
      this.fs.copyTpl(
        this.templatePath(`styles/Component${settings.style.suffix}`),
        this.destinationPath(settings.style.path + settings.style.fileName),
        settings
      );
    }
    // Create the component
    this.fs.copyTpl(
      this.templatePath(`components/${this.componentTemplateName}`).split(path.sep).join('/'),
      this.destinationPath(settings.component.path + settings.component.fileName),
      //`setting.component.path` is path to lay component.~path.normalize(`${componentPath.path}/${componentPartPath}/`)
      settings
    );

    // Create the unit test
    this.fs.copyTpl(
      this.templatePath(`./tests/Base.js`),
      this.destinationPath(settings.test.path + settings.test.fileName),
      settings
    );
  }
}

module.exports = ComponentGenerator;
