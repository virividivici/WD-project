/**
 * @todo This need to refactor, and use the system enviromental descriptors to give further optimisations
 */
module.exports = {
	options: {
		banner: '/*! <%= meta.name %> - v<%= meta.version %> */', //TODO
		compress: {
			drop_console: false
		},
		sourceMap: false,
		mangle: false,
		unused: false,
		drop_debugger: true,
		ie_proof: true
	},
	minifyMain: {
		files: [{
			src: '<%= meta.application.docrootFolder %>/js/main.js',
			dest: '<%= meta.application.docrootFolder %>/js/main.min.js'
		}]
	}
}