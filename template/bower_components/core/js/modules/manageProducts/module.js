(function() {
	'use strict';
	angular.module('manageProducts', [])
		.controller('manageProductCtrl', ['$scope', 'postService', '$http',
			function($scope, postService, $http) {

				$http.get(SaaS.location + '/docroot/assets/js/json_' + locale + '.properties').success(function(data) {
					$scope.i18nMessages = data;
				});
				$scope.deleteConfirme = false;
				$scope.initValue = function(id, identifier, value) {

					$scope.deleteConfirme = false;

					if ($scope[id]) {

						$scope[identifier + id] = value;

					} else {

						$scope[identifier + id] = value;
					}

				};

				$scope.updatelicence = function(item) {

					$scope[item] = true;
				};

				$scope.updatelicenceNext = function(item) {

					$scope[item] = false;
				};

				$scope.deleteSubscription = function(productId, url) {

					var ajaxURL = url + '/' + productId;

					var data = {};
					data.productId = productId;
					data.origin = "Remove Subscription";

					var callback = $scope.deleteSubscriptionCallback;

					$scope.makeAjaxCall(ajaxURL, data, callback);
				};

				$scope.unassignUser = function(userId, value, url, modelId) {

					var ajaxURL = url + userId + '/' + value;

					var data = {};
					data.userId = userId;
					data.value = value;
					data.origin = "Unassign User";
					data.modelId = modelId;

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

				$scope.deleteSubscriptionCallback = function(response) {

					var currentProductId = response.postData.productId;

					$scope['cancelledComplete' + currentProductId] = true;

				};

				$scope.unassignUserCallback = function(response) {
					//console.log(response.postData);
					var prodId = response.postData.value;
					var userId = response.postData.userId;
					$scope['assigned' + prodId] = $scope['assigned' + prodId] + 1;
					$scope['available' + prodId] = $scope['available' + prodId] + 1;
					$scope['checkbox' + prodId + userId] = true;

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

						} else {
							$scope.ajaxErrorHeader = data.origin;
							$scope.ajaxErrorMessage = response.data.error;

							//console.log('Error: ', response.data.error);
						}

					});

				};


			}
		])
		.controller('companyProductsCtrl', ['$scope', 'postService',
			function($scope, postService) {

				$scope.products = productsJson;
				$scope.productsBackUp = angular.copy(productsJson);
				$scope.savedChanges = null;

				$scope.discardChanges = function() {
					$scope.products = angular.copy($scope.productsBackUp);
				};

				$scope.getTotal = function() {
					var total = 0;
					for (var i = 0; i < $scope.products.length; i++) {
						if ($scope.products[i].checked === true) {
							total += $scope.products[i].price;
						}
					}
					return total;
				};

				$scope.lowestBundle = -1;

				for (var i = 0; i < $scope.products.length; i++) {
					if ($scope.products[i].bundle === true) {
						if ($scope.lowestBundle == -1 || $scope.lowestBundle > $scope.products[i].price) {
							$scope.lowestBundle = $scope.products[i].price;
						}
					}
				}

				$scope.updateCompanyProducts = function(ajaxUrl, opt1, opt2) {

					var postData = $scope.products;

					var options = {};

					options.token = opt1;
					options.header = opt2;

					postService.postData(ajaxUrl, postData, options).then(function(response) {

						if (response.data.success === true) {
							$scope.savedChanges = true;
						} else {
							$scope.savedChanges = false;
						}

						$scope.products = response.data.companyProducts;
						$scope.productsBackUp = angular.copy(response.data.companyProducts);
					});
				};
			}
		])
		.controller('productPurchaseCtrl', ['$scope',
			function($scope) {

				$scope.quantity1 = 1;




			}
		])
		.controller('productIntroCtlr', ['$scope',
			function($scope) {

				$scope.playProductVideo = false;

				$scope.playProductIntroVideo = function(elementId, event) {
					$scope.playProductVideo = true;
					$(".heroImage").css('visibility', 'hidden');

					$("video").each(function() {
						if (navigator.appVersion.indexOf("MSIE 8.") == -1) {
							this.pause();
						}

					});




					var videoElement = document.getElementById(elementId);

					var source = $(videoElement).find('source');

					var mp4Video = source[0];
					mp4Video.src = $(mp4Video).attr('id');
					var ogvVideo = source[1];
					ogvVideo.src = $(ogvVideo).attr('id');

					$scope.displayVideo = true;
					videoElement.load();

					if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) {
						if (videoElement.requestFullscreen) {
							videoElement.requestFullscreen();
						} else if (videoElement.mozRequestFullScreen) {
							videoElement.mozRequestFullScreen();
						} else if (videoElement.webkitRequestFullscreen) {

							videoElement.webkitRequestFullscreen();
						}
					}


					videoElement.play();


				};


				$scope.closeProductIntroVideo = function(elementId, event) {

					var videoElement = document.getElementById(elementId);
					videoElement.pause();
					$scope.playProductVideo = false;
					$(".heroImage").css('visibility', 'visible');

				};


			}
		]);
})();