module.exports = {
	configFiles: {
		files: [
			'gruntfile.js',
			'config/build/tasks/**'
		],
		options: {
			reload: true
		}
	},
	styles: {
		files: [
			'frontend/src/scss/**/*.scss',
			//'frontend/src/sprite_source/*.svg',
			'frontend/src/sprite_source/*.png'
		],
		tasks: ['buildstyles']
	},
	scripts: {
		files: ['frontend/src/js/**/*.js'],
		tasks: ['buildscripts'],
	},
	images: {
		files: ['frontend/src/images/**/*.*'],
		tasks: ['copy:images'],
	},
	fonts: {
		files: ['frontend/src/fonts/**/*.*'],
		tasks: ['copy:fonts'],
	},
	styleguide: {
		files: ['frontend/styleguide/**/*.*'],
		tasks: ['build']
	}
}