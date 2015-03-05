'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var file = yeoman.file;


var WebProjectGenerator = module.exports = function WebProjectGenerator(args, options, config) {
	yeoman.generators.Base.apply(this, arguments);

	this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(WebProjectGenerator, yeoman.generators.Base);

WebProjectGenerator.prototype.askFor = function askFor() {
	var cb = this.async();

	// welcome message
	console.log(this.yeoman);
	console.log('Project with Compass and HTML5 Boilerplate are prepared!');

	var prompts = [{
		name: 'language',
		message: 'Which language would you like to use? (ISO abbreviation)',
		default: 'en'
	}, {
		type: 'confirm',
		name: 'createSublimeTextProjectFile',
		message: 'Create Sublime Text project file?',
		default: true
	}, {
		name: 'htmlTitle',
		message: 'Your HTML <title>?',
		default: this.appname
	}];

	this.prompt(prompts, function (answers) {
		// // manually deal with the response, get back and store the results.
		// // we change a bit this way of doing to automatically do this in the self.prompt() method.
		this.language = answers.language;
		this.createSublimeTextProjectFile = answers.createSublimeTextProjectFile;
		this.htmlTitle = answers.htmlTitle;

		cb();
	}.bind(this));
};

WebProjectGenerator.prototype.gruntfile = function gruntfile() {
	this.template('Gruntfile.js');
};

WebProjectGenerator.prototype.packageJSON = function packageJSON() {
	this.template('_package.json', 'package.json');
};

WebProjectGenerator.prototype.SassConfig = function SassConfig() {
	this.copy('configs/config.rb', 'config.rb');
};

WebProjectGenerator.prototype.git = function git() {
	this.copy('configs/gitignore', '.gitignore');
	this.copy('configs/gitattributes', '.gitattributes');
};

WebProjectGenerator.prototype.bower = function bower() {
	this.copy('configs/bowerrc', '.bowerrc');
	this.template('_bower.json', 'bower.json');
};

WebProjectGenerator.prototype.editor = function editor() {
	this.copy('configs/editorconfig', '.editorconfig');
	if (this.createSublimeTextProjectFile) {
		this.template('configs/project.sublime-project', this._.slugify(this.appname) + '.sublime-project');
	}
};

WebProjectGenerator.prototype.assets = function assets() {
	this.mkdir('templates');
	this.mkdir('assets');

	this.mkdir('assets/font');

	this.mkdir('assets/img');
	this.mkdir('assets/img/sprites');

	this.mkdir('assets/js');

	this.mkdir('assets/scss');
	this.mkdir('assets/scss/components');
	this.mkdir('assets/scss/helpers');
	this.mkdir('assets/scss/layout');
	this.mkdir('assets/scss/settings');
	this.mkdir('assets/scss/vendor');
};

WebProjectGenerator.prototype.files = function files() {
	this.template('_README.md', 'README.md');

	if (file.exists(this.src._base + '/404/404_' + this.language + '.html')) {
		this.copy('404/404_' + this.language + '.html', 'templates/404.html');
	}
	else {
		console.log('There is not 404.html error page in your choosen language, I\'m including english version.');
		this.copy('404/404_en.html', 'templates/404.html');
	}

	this.copy('templates/head-global.html', 'templates/includes/head-global.html');
	this.copy('templates/scripts.html', 'templates/includes/scripts.html');

	this.copy('icons/favicon.ico', 'favicon.ico');
	this.copy('icons/apple-touch-icon.png', 'apple-touch-icon.png');

	this.copy('configs/htaccess', '.htaccess');
	this.copy('configs/robots.txt', 'robots.txt');
	this.copy('configs/crossdomain.xml', 'crossdomain.xml');

	this.copy('scss/main.scss', 'assets/scss/main.scss');
	this.copy('scss/ie8.scss', 'assets/scss/ie8.scss');
	this.copy('scss/h5bp.scss', 'assets/scss/vendor/_h5bp.scss');

	this.copy('scss/sizes.scss', 'assets/scss/settings/_sizes.scss');
	this.copy('scss/media.scss', 'assets/scss/settings/_media.scss');
	this.copy('scss/colors.scss', 'assets/scss/settings/_colors.scss');
	this.copy('scss/type.scss', 'assets/scss/settings/_type.scss');
	this.copy('scss/z-index-settings.scss', 'assets/scss/settings/_z-index.scss');

	this.copy('scss/functions.scss', 'assets/scss/helpers/_functions.scss');
	this.copy('scss/mixins.scss', 'assets/scss/helpers/_mixins.scss');
	this.copy('scss/placeholders.scss', 'assets/scss/helpers/_placeholders.scss');
	this.copy('scss/z-index-helper.scss', 'assets/scss/helpers/_z-index.scss');
	this.copy('scss/sprites.scss', 'assets/scss/helpers/_sprites.scss');
	this.copy('scss/base.scss', 'assets/scss/helpers/_base.scss');
	this.copy('scss/shame.scss', 'assets/scss/helpers/_shame.scss');

	this.copy('js/main.js', 'assets/js/main.js');
	this.copy('js/plugins.js', 'assets/js/plugins.js');
	this.copy('js/jquery-2.1.0.js', 'assets/js/jquery-2.1.0.js');
	this.copy('js/jquery-1.8.0.js', 'assets/js/jquery-1.8.0.js');
	this.copy('js/selectivizr-1.0.3b.js', 'assets/js/selectivizr-1.0.3b.js');
};

WebProjectGenerator.prototype.index = function index() {

	this.copy('index.html', 'templates/index.html');
};

WebProjectGenerator.prototype.install = function () {
	var done = this.async();
	this.installDependencies({
		callback: done
	});
};