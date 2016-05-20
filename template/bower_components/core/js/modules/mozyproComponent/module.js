(function() {
	'use strict';
	angular.module('mozyproComponent', [])
		.controller('mozyLicenseKeyCtrl', ['$scope',
			function($scope) {

				$scope.licenseObj = obj;

				$scope.currentOS = $scope.licenseObj.os;

				$scope.setCurrentOS = function(currentOS) {

					alert(currentOS);
				};

			}
		]);
})();