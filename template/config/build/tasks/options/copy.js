module.exports = {
	angular_frame: {
		files: [{
			cwd: './node_modules/angular/',
			src: 'angular.min.js',
			dest: '<%= meta.application.docrootFolder %>/js/base',
			expand: true
		}]
	},
	base_js: {
		files: [{
			expand: true,
			cwd: './frontend/src/js/base',
			src: ['**'],
			dest: '<%= meta.application.docrootFolder %>/js/base'
		}]
	},
	/**vendors_js: {
		files: [{
			expand: true,
			cwd: './frontend/src/js/vendors',
			src: ['**'],
			dest: '<%= meta.application.docrootFolder %>/js/vendors'
		}]
	},**/
	images: {
		files: [{
			expand: true,
			cwd: './frontend/src/images',
			src: ['**'],
			dest: '<%= meta.application.docrootFolder %>/images'
		}]
	},
	custom_templates: {
		files: [{
			expand: true,
			cwd: './frontend/src/custom_templates',
			src: ['**'],
			dest: '<%= meta.application.docrootFolder %>/partials'
		}]
	},
	fonts: {
		files: [{
			expand: true,
			flatten: true,
			src: ['./node_modules/bootstrap-sass/assets/fonts/bootstrap/*'],
			dest: '<%= meta.application.docrootFolder %>/fonts',
			filter: 'isFile'
		}, {
			expand: true,
			flatten: true,
			src: ['./node_modules/font-awesome/fonts/*'],
			dest: '<%= meta.application.docrootFolder %>/fonts',
			filter: 'isFile'
		}, {
			expand: true,
			flatten: true,
			cwd: './frontend/src/fonts',
			src: ['**'],
			dest: '<%= meta.application.docrootFolder %>/fonts'
		}]
	}
}