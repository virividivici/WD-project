module.exports = function(grunt) {
	grunt.registerTask('getcomponents', "Building and compiling application components from partials", function() {
		
		var meta = grunt.file.readJSON('./package.json'),
			coreComponents = meta.application.dependencies.core,
			projectComponents = meta.application.dependencies.project,
			componentStyles = '',
			appFile = '',
			initFile = null,
			sampleinitFile = null,
			appliedComponents = [],
			sgBundle = [],
			i = 0,
			copyPartials = function copyPartials(abspath, rootdir, subdir, filename) {
				if (filename.indexOf('.html') > -1) {
					grunt.log.ok("Copy component's template partials");
					grunt.file.copy(abspath, meta.application.docrootFolder + '/partials/' + filename);
				}
			},
			readStyles = function readStyles(abspath, rootdir, subdir, filename) {
				if (filename.indexOf('.scss') > -1) {
					grunt.log.ok("Read component's style");
					componentStyles = grunt.file.read(abspath);
				}
			},
			getComponent = function getComponent(name, type) {
				var path = './frontend/' + type + '/js/modules/' + name + '/module.js';
				if (grunt.file.exists(path)) {
					grunt.log.ok('"' + name + '" component prepared to build');
					grunt.file.recurse('./frontend/' + type + '/js/modules/' + name, copyPartials);
					grunt.file.recurse('./frontend/' + type + '/js/modules/' + name, readStyles);
					sgBundle.push('<%= sguide %>/partials/components/' + name + '/*.html');
					appliedComponents.push(name);
					return grunt.file.read(path);
				} else {
					grunt.log.warn('"' + name + '" is ignored, check filename and path');
					return '';
				}
			};
		grunt.file.defaultEncoding = 'utf8';
		
		for (i = 0; i < projectComponents.length; i += 1) {
			appFile += getComponent(projectComponents[i], 'src');
		}
		sampleinitFile = initFile = grunt.file.read('./frontend/src/js/init.js');
		initFile = initFile.replace("'<%=initComponents %>'", '"' + appliedComponents.join('","') + '"');

		grunt.file.write('./.temp/components.js', appFile);
		grunt.file.write('./.temp/init.js', initFile);

		appliedComponents.push('exampleComponents');
		sampleinitFile = sampleinitFile.replace("'<%=initComponents %>'", '"' + appliedComponents.join('","') + '"');
		grunt.file.write('./.temp/init-sample.js', sampleinitFile);

		grunt.file.write('./frontend/src/scss/modules.scss', componentStyles);
		grunt.config.set('sgBundle', sgBundle);
		grunt.log.ok('Components building finished');
	});
};