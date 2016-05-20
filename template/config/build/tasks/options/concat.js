module.exports = {
	application: {
		files: [{
			src: [
				'./.temp/vendors.js',
				'./.temp/components.js',
				'./.temp/init.js'
			],
			dest: '<%= meta.application.docrootFolder %>/js/main.js'
		}]
	},
	samples: {
		files: [{
			src: [
				'./.temp/vendors.js',
				'./.temp/components.js',
				'./frontend/styleguide/examples.js',
				'./.temp/init-sample.js'
			],
			dest: '<%= meta.application.docrootFolder %>/js/main-sample.js'
		}]
	}
}