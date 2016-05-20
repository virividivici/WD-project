module.exports = {
	options: {
		reporter: require('jshint-stylish'),
		browser: true,
		expr: true,
		globals: {
			angular: true
		}
	},
	//uses_defaults: ['./frontend/core/js/modules/**/module.js' /*, './src/js/**/ /*.js'*/ ]
	uses_defaults: [ ]
}