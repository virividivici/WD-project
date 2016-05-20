module.exports = {
	options: {
		httpPath: './',
		sassDir: './frontend/src/scss',
		cssDir: './.temp/css',
		fontsDir: '../fonts',
		require: 'bootstrap-sass',
		relativeAssets: true
	},
	styles: {
		options: {
			environment: 'development',
			outputStyle: 'expanded',
			force: true
		}
	}
}