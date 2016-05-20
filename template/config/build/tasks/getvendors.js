module.exports = function(grunt) {
	function getRequiredVendors(list) {
		var vendors = [
				'./node_modules/angular-messages/angular-messages.min.js',
				'./node_modules/angular-animate/angular-animate.min.js',
				'./node_modules/angular-sanitize/angular-sanitize.min.js'
			];
		
		vendors.push('./frontend/src/js/plugins.js');
		return vendors;
	}
	grunt.registerTask('getvendors', 'Read and concat vendors and framework components', function() {
		var i = 0,
			vendorsFile = '',
			vendors = getRequiredVendors(grunt.file.readJSON('./package.json').application.dependencies.vendors);
		grunt.file.defaultEncoding = 'utf8';
		for (i = 0; i < vendors.length; i += 1) {
			grunt.log.ok(vendors[i]);
			try {
				vendorsFile += grunt.file.read(vendors[i]);
			} catch (ignore) {
				grunt.log.warn('Linked vendor %s does not exists', vendors[i]);
			}
		}
		grunt.file.write('./.temp/vendors.js', vendorsFile);
		grunt.log.ok('Vendors are done');
	});
};