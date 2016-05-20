function loadConfig(path) {
	var glob = require('glob'),
		object = {},
		key;

	glob.sync('*', {
		cwd: path
	}).forEach(function(option) {
		key = option.replace(/\.js$/, '');
		object[key] = require(path + option);
	});

	return object;
}

module.exports = function(grunt) {
	var config = {
		meta: grunt.file.readJSON('package.json'),
		sguide: './frontend/styleguide',
		sgBundle: [],
		env: process.env
	};

	require('load-grunt-tasks')(grunt, {
		pattern: ['grunt-*', '!grunt-template-jasmine-istanbul']
	});
	grunt.loadTasks('./config/build/tasks');
	grunt.util._.extend(config, loadConfig('./config/build/tasks/options/'));
	grunt.initConfig(config);

	grunt.registerTask('preclean', ['clean:docroot']);
	grunt.registerTask('test', ['jshint', 'jasmine']);

	
	grunt.registerTask('buildscripts', ['getvendors', 'getcomponents', 'concat:application', 'uglify']);
	grunt.registerTask('buildstyles', ['sprite', /*'svg_sprite', */'compass', 'cssmin']);

	grunt.registerTask('build', ['preclean', 'copy', 'buildscripts', 'buildstyles']);
	grunt.registerTask('default', ['build', 'watch']);

};