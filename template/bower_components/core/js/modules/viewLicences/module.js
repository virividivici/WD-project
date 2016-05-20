(function() {
	'use strict';
	angular.module('viewLicences', [])
		.controller('viewLicencesCtrl', ['$scope', 'postService',
			function($scope, postService) {

				$scope.initValue = function(id, identifier, value) {

					$scope.deleteConfirme = false;

					if ($scope[id]) {

						$scope[id][identifier] = value;

					} else {

						var obj = {};
						obj[identifier] = value;

						$scope[id] = obj;

					}

				};
				// $scope.deleteSubscription = function(productId, url){

				// 	var ajaxURL = url +  '/' + productId;

				// 	var data = {};
				//           data.productId = productId;
				//           data.origin = "Remove Subscription";

				// 	var callback = $scope.deleteSubscriptionCallback;

				//           $scope.makeAjaxCall(ajaxURL, data, callback);
				// }

				$scope.lockSubscription = function(productId, url) {

					var ajaxURL = url + productId;

					var data = {};
					data.productId = productId;
					data.origin = "Lock subscription";

					var callback = $scope.lockSubscriptionCallback;

					//$scope['locked' + productId] = {isLocked: true};

					$scope.makeAjaxCall(ajaxURL, data, callback);

				};

				$scope.unlockSubscription = function(productId, url) {

					var ajaxURL = url + productId;

					var data = {};
					data.productId = productId;
					data.origin = "Unlock subscription";

					var callback = $scope.unlockSubscriptionCallback;

					//$scope['locked' + productId] = {isLocked: false};

					$scope.makeAjaxCall(ajaxURL, data, callback);

				};

				$scope.unassignUser = function(userId, modelId, url, parentId, reassign) {

					var ajaxURL = url + userId + '/' + modelId;

					var data = {};
					data.userId = userId;
					data.value = modelId;
					data.origin = "Unassign User";
					data.modelId = modelId;
					data.reassignable = reassign;
					data.parentId = parentId;

					var callback = $scope.unassignUserCallback;
					// console.log('pre scope: ', $scope);
					$scope.makeAjaxCall(ajaxURL, data, callback);

				};

				$scope.ViewLicences_unassignUser = function(userId, modelId, url, parentId, reassign) {

					var ajaxURL = url + userId + '/' + modelId;

					// var classid = 'userRow_'+userId;


					// alert(classid);

					var data = {};
					data.userId = userId;

					$scope.removeUser = false;




					data.value = modelId;
					data.origin = "Unassign User";
					data.modelId = modelId;
					data.reassignable = reassign;
					data.parentId = parentId;

					var callback = $scope.unassignUserCallback;
					// console.log('pre scope: ', $scope);
					// $scope.makeAjaxCall(ajaxURL, data, callback);

				};

				$scope.updatelicence = function(item) {

					$scope[item] = true;
				};

				$scope.updatelicenceNext = function(item) {

					$scope[item] = false;
				};

				$scope.lockSubscriptionCallback = function(response, target) {


					var productId = response.postData.productId;

					$scope['locked' + productId] = {
						isLocked: true
					};




				};

				$scope.unlockSubscriptionCallback = function(response, target) {


					var productId = response.postData.productId;

					$scope['locked' + productId] = {
						isLocked: false
					};

					//console.log('unlocked!!', target);


				};

				$scope.unassignUserCallback = function(response) {

					//console.log('scopey: ', $scope);
					var modelId = response.postData.modelId,
						isReassignable = response.postData.reassignable,
						parentId = response.postData.parentId;

					if (!isReassignable) {
						return false;
					}

					var currentAvailable = $scope['totals' + modelId].available,
						totalAvailable = $scope['total' + parentId].totalAvailable;

					//currentAssigned --;
					currentAvailable++;
					totalAvailable++;

					//$scope['totals' + modelId] = {assigned: currentAssigned, available: currentAvailable};
					$scope['totals' + modelId] = {
						available: currentAvailable
					};
					$scope['total' + parentId] = {
						totalAvailable: totalAvailable
					};

				};

				$scope.makeAjaxCall = function(ajaxURL, data, callbackFn) {
					// console.log('making call', $scope);
					var options = {};

					// Options can include _csrf.token & headerName
					options.token = $scope.serverToken;
					options.header = $scope.serverHeader;

					postService.postData(ajaxURL, data, options).then(function(response) {

						if (response.data.success) {

							// alert(response.data.success);
							$scope.ajaxErrorHeader = '';

							if (callbackFn) {
								callbackFn(response);
							}

							$scope.deleteConfirme = true;

						} else {
							$scope.ajaxErrorHeader = data.origin;
							$scope.ajaxErrorMessage = response.data.error;

							//console.log('Error: ', response.data.error);
						}

					});

				};


			}
		])
		.controller('assignLicenceCtrl', ['$scope',
			function($scope) {

				$scope.checkList = [];
				$scope.checkListTrue = false;


				$scope.updateCheckList = function(item) {

					if ($scope.checkList.indexOf(item) == -1) {
						$scope.checkList.push(item);
					} else {
						$scope.checkList.splice($scope.checkList.indexOf(item), 1);
					}


					if ($scope.checkList.length !== 0) {
						$scope.checkListTrue = true;
					} else {

						$scope.checkListTrue = false;
					}
				};

			}
		])
		.controller('purchaseSummaryCtrl', ['$scope',
			function($scope) {


				$scope.creditBalance = 0;
				$scope.totalPrice = 0;

				$scope.getPaymentDue = function() {

					var cost = 0;
					var creditDiff = $scope.creditBalance - $scope.totalPrice;

					if (creditDiff >= 0) {
						cost = 0;
					} else {
						cost = $scope.totalPrice - $scope.creditBalance;
					}

					return cost;

				};

			}
		]);
})();