module.exports = {
	coverage: {
		//src: ['./frontend/core/js/modules/**/module.js', './src/js/**/*.js'],
		src: ['./frontend/core/js/modules/**/module.js'],
		options: {
			vendor: './node_modules/angular/angular.min.js',
			helpers: ['./node_modules/angular-mocks/angular-mocks.js', './frontend/core/js/test_helpers/**/*.js', './frontend/src/js/test_helpers/**/*.js'],
			specs: ['./frontend/core/js/tests/*.js', './src/js/tests/**/*.js'],
			template: require('grunt-template-jasmine-istanbul'),
			templateOptions: {
				coverage: './docs/coverage/coverage.json',
				report: [{
					type: 'html',
					options: {
						dir: './docs/coverage'
					}
				}, {
					type: 'text-summary'
				}]
			}
		}
	}
}