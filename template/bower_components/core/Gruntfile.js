module.exports = function(grunt) {

	grunt.initConfig({

		jasmine: {
			coverage: {
				src: './js/modules/**/*.js',
				options: {
					vendor: './node_modules/angular/angular.js',
					helpers: ['./node_modules/angular-mocks/angular-mocks.js', './js/test_helpers/**/*.js'],
					specs: './js/tests/**/*.js',
					template: require('grunt-template-jasmine-istanbul'),
					templateOptions: {
						coverage: './coverage/coverage.json',
						report: [{
							type: 'html',
							options: {
								dir: './coverage'
							}
						}, {
							type: 'text-summary'
						}]
					}
				}
			}
		},

		jshint: {
			options: {
				reporter: require('jshint-stylish'),
				browser: true,
				expr: true,
				globals: {
					angular: true
				}
			},
			uses_defaults: './js/modules/**/*.js'
		}

	});

	grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.loadNpmTasks('grunt-contrib-jshint');

	grunt.registerTask('default', ['jshint', 'jasmine']);

};