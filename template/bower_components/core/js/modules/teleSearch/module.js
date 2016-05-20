(function() {
	'use strict';
	angular.module('teleSearch', [])
		.factory('teleSearchService', ['$http',
			function($http) {

				function searchCustomers() {

					return $http.get('/rest/user/getUser').then(function(result) {
						return result.data;
					});

				}


				function getUserDetails(postData, options) {

					var opts = angular.extend({
						token: '',
						header: ''
					}, options);

					var headers = {};
					headers[opts.header] = opts.token;

					//debugger;

					return $http({
							url: '/rest/user/getUser',
							method: "POST",
							data: postData,
							headers: headers
							// headers: {'Content-Type': 'application/x-www-form-urlencoded'}
						})
						.then(function(response) {

								//debugger;

								// success
								return response.data;
							},
							function(response) { // optional
								// failed

								return response;
							}
						);
				}


				return {
					getUserDetails: getUserDetails
				};

			}
		])
		.controller('teleSearchCtrl', ['$scope', 'teleSearchService',
			function($scope, teleSearchService) {

				// Define list of results
				$scope.results = [];

				// Define current visible result
				$scope.currentResults = {};


				// Handle form submit by enter key
				$scope.onEnterSubmit = function(e) {

					if (event.keyCode === 13) {

						var options = $scope.getOptions(e);
						$scope.searchCustomers(options);

					}
				};


				// Click event
				$scope.searchCustomers = function() {

					var options = $scope.getOptions(event);
					$scope.getUserDetails(options);

				};

				// Build ajax options
				$scope.getOptions = function(event) {

					var options = {};

					var $input = $(event.currentTarget).parent().find('input');

					// Options can include _csrf.token & headerName
					options.token = $input.attr('data-token');
					options.header = $input.attr('data-header');

					return options;
				};


				$scope.getUserDetails = function(options) {

					// TODO: show spinner

					if ($scope.keywords && $scope.keywords !== ' ') {

						var postData = {
							"email": $scope.keywords
						};

						teleSearchService.getUserDetails(postData, options).then(function(data) {

							// TODO: remove spinner

							//debugger;

							// DEBUGGING
							// $scope.getRandomData(data);

							if (!data.results) {

								// Clear input
								$scope.keywords = '';

								// Nothing found so just stop
								return false;
							}

							// Process AJAX results
							var result = {
								id: $scope.index,
								keywords: $scope.keywords,
								data: data.results
							};

							// add to results list
							$scope.results.push(result);

							// Save current pane
							$scope.currentResults = result;

							// Clear input
							$scope.keywords = '';

							// update ID index
							$scope.index++;

						});
					}

				};

				$scope.getRandomData = function(realData) {

					var randomData = [{
						"id": 10,
						"name": "random 1",
						"accountNo": "32185",
						"company": "Random company 1",
						"billingInfo": "Annual"
					}, {
						"id": 20,
						"name": "random 2",
						"accountNo": "32185",
						"company": "Random company 2",
						"billingInfo": "Annual"
					}, {
						"id": 30,
						"name": "random 3",
						"accountNo": "32185",
						"company": "Random company 3",
						"billingInfo": "Annual"
					}, {
						"id": 40,
						"name": "random 4",
						"accountNo": "32185",
						"company": "Random company 4",
						"billingInfo": "Annual"
					}, {
						"id": 50,
						"name": "random 5",
						"accountNo": "32185",
						"company": "Random company 5",
						"billingInfo": "Annual"
					}];

					// return random item
					var items = _.sample(randomData, _.random(1, randomData.length));

					_.each(items, function(item) {
						realData.results.push(item);
					});

				};


				$scope.showTab = function(id) {

					// Find result with same ID as clicked element

					var data = _.filter($scope.results, function(result) {

						return result.id === id;

					});

					// update currentResults with the data for this ID
					$scope.currentResults = data[0];

				};


				$scope.removeTab = function(id) {

					// get results list without clicked item in it
					var data = _.reject($scope.results, function(result) {

						return result.id === id;

					});

					$scope.results = data;


					// if user has closed current tab
					if ($scope.currentResults.id === id) {

						var index = $(event.currentTarget).parent().index();

						if (index > 0) {
							// items still available
							$scope.currentResults = $scope.results[index - 1];
						} else {
							// last item
							$scope.currentResults = {};
						}

					}

				};


				$scope.clearSearches = function() {

					// Reset form and remove searches
					$scope.results = [];
					$scope.currentResults = {};
				};

			}
		]);
})();