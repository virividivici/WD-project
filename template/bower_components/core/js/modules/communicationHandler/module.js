/* global angular */
(function() {
	'use strict';
	/**
	 * @ngdoc module
	 * @name communicationHandler
	 * @description Service set for basic HTTP communication
	 * Currently supports only the standard GET/POST requests, later might be ready for further extension
	 * @property communicationService {service} {@link communicationService}
	 * @author Miklos Urban <miklos.urban@bcsg.com>
	 * @version 1.0
	 */
	angular.module('communicationHandler', [])
	/**
	 * @ngdoc service
	 * @description Communication service ehich wraps the factory-standard Angular $http requests and give back a callback, or a Promise-based object
	 * @name communicationService
	 * @requires $http
	 * @requires $q
	 */
	.factory('communicationService', ['$http', '$q',
		function($http, $q) {
			return {
				/**
				 * @description Standard GET request using $http and [$q]
				 * @method get
				 * @memberOf communicationService
				 * @param	{string} uri URL address of request
				 * @param	{boolean} [deferred] boolean for promised result
				 * @return	{object} HTTP request object or Promise
				 * @example
				 *   // promise based request
				 *   communicationService.get('/api/get', true)
				 *       .then(function(data) {
				 *           console.info('deferred result', data);
				 *       })
				 *       .catch(function(response) {
				 *           console.error('request rejected');
				 *       });
				 *
				 *   // standard request
				 *   communicationService.get('/api/get')
				 *       .success(function(response) {
				 *           console.info('result', response);
				 *       })
				 *       .error(function(response) {
				 *           console.error('request error');
				 *       });
				 */
				get: function get(uri, deferred) {
					var defResponse = null,
						request = null;
					deferred = (deferred === undefined) ? false : deferred;

					if (uri === undefined) {
						return 'URI not specified';
					}

					request = $http.get(uri);

					if (deferred === true) {
						defResponse = $q.defer();
						request
							.success(function(response) {
								defResponse.resolve(response);
							})
							.error(function() {
								defResponse.reject('AJAX Call Rejected');
							});
						return defResponse.promise;
					}
					return request;
				},
				/**
				 * @description Standard POST request using $http and [$q]
				 * @method post
				 * @memberOf communicationService
				 * @param  {string} uri URL address of request
				 * @param  {object} data JSON data object which going to send
				 * @param  {boolean} [deferred] boolean for promised result
				 * @return {object} HTTP request object or Promise
				 * @example
				 *   // promise based request
				 *   communicationService.post('/api/post', {data:[1,2,3]}, true)
				 *       .then(function(data) {
				 *           console.info('deferred result', data);
				 *       })
				 *       .catch(function(response) {
				 *           console.error('request rejected');
				 *       });
				 *
				 *   // standard request
				 *   communicationService.post('/api/post', {data:[1,2,3]})
				 *       .success(function(response) {
				 *           console.info('result', response);
				 *       })
				 *       .error(function(response) {
				 *           console.error('request error');
				 *       });
				 */
				post: function post(uri, data, deferred) {
					var defResponse = null,
						request = null;
					deferred = (deferred === undefined) ? false : deferred;

					if (uri === undefined) {
						return 'URI not specified';
					}
					if (data === undefined) {
						return 'DATA is not specified';
					}

					request = $http.post(uri, data);

					if (deferred === true) {
						defResponse = $q.defer();
						request
							.success(function(response) {
								defResponse.resolve(response);
							})
							.error(function() {
								defResponse.reject('AJAX POST Rejected');
							});
						return defResponse.promise;
					}
					return request;
				},
				/**
				 * @description Header parameter setter method
				 * @method setHeader
				 * @memberOf communicationService
				 * @param {string} key   Key name of parameter
				 * @param {string} value Value of parameter
				 * @todo Later should create separated header setup for different HTTP methods
				 * @todo Implement further methods: update, delete, options, head
				 * @example
				 *   // set accept header
				 *   communicationService.setHeader('Accept', 'application/json');
				 */
				setHeader: function setHeader(key, value) {
					$http.defaults.headers.common[key] = value;
				}
			};
		}
	]);
}());