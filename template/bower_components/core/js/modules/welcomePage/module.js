/* global angular */
(function() {
	'use strict';
	angular.module('welcomePage', [])
		.controller('welcomeCtrl', ['$scope', 'postService',
			function($scope, postService) {

				$scope.closeWelcomeMessage = function(event) {

					//var data = {};

					//data.userID = userID;

					//alert(productID); 

					var ajaxURL = $(event.currentTarget).attr('data-path');
					var callback = $scope.removeWelcome;
					$scope.makeAjaxCall(ajaxURL, callback);

					//console.log(data);
					//console.log(ajaxURL);
				};

				$scope.makeAjaxCall = function(ajaxURL, callback) {

					var options = {};

					// Options can include _csrf.token & headerName
					options.token = $scope.serverToken;
					options.header = $scope.serverHeader;
					postService.postData(ajaxURL, '', options).then(function(response) {

						$scope.removeWelcome();

					});

				};

				$scope.removeWelcome = function() {

					//var myid = data.productID;
					$scope.showWelcome = false;
					//$scope['class'] = "animate-if";


				};
			}
		]);
})();