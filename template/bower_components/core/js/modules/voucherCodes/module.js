(function() {
	'use strict';
	angular.module('voucherCodes', [])
		.controller('voucherCodesCtrl', ['$scope', 'postService', '$http',
			function($scope, postService, $http) {

				$scope.getVoucherData = function(ajaxURL) {

					$http.get(ajaxURL).
					success(function(data) {
						//data = [{ id: 1, value: 'here is one'}, { id: 2, value: 'here is two'}];
						$scope.voucherResults = data;
						//console.log('the data: ', data);
					});

				};

				$scope.setCouponList = function(url) {
					$scope.getVoucherData(url);
				};

				$scope.sendVoucher = function(value, url) {

					var ajaxURL = url + value;

					var data = {};
					data.value = value;
					data.origin = "Send voucher";

					$scope.makeAjaxCall(ajaxURL, data);
				};

				$scope.makeAjaxCall = function(ajaxURL, data, callbackFn) {

					var options = {};

					// Options can include _csrf.token & headerName
					options.token = $scope.serverToken;
					options.header = $scope.serverHeader;

					postService.postData(ajaxURL, data, options).then(function(response) {

						if (response.data.success) {

							$scope.ajaxErrorHeader = '';
							if (callbackFn) {
								callbackFn(response);
							}

						} else {
							$scope.ajaxErrorHeader = data.origin;
							$scope.ajaxErrorMessage = response.data.error;
						}

					});

				};

			}
		]);
})();