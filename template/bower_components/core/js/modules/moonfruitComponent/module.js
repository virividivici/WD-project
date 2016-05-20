(function() {
	'use strict';
	angular.module('moonfruitComponent', [])
		.controller('moonfruitCtrl', ['$scope', '$http',
			function($scope, $http) {

				$scope.restUrl = null;
				$scope.redirectUrl = null;

				// $scope.currentOS = $scope.licenseObj.os;

				$scope.submitMoonfruit = function() {
					$('#floatingBarsG').show();
					$http.get($scope.restUrl)

					.success(function(data) {


						$('#floatingBarsG').hide();
						if (data) {
							// if not successful, bind errors to error variables
							console.log($scope.redirectUrl);

							window.location = $scope.redirectUrl + "?domain=" + data;

						} else {
							// if successful, bind success message to message
							//console.log('ERROR');
						}
					});
				};

				$scope.setRestUrl = function(restUrl) {

					$scope.restUrl = restUrl;
				};

			}
		]);
})();