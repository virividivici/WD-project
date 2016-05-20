(function() {
	'use strict';
	angular.module('drawerBox', [])
		.config(['$sceProvider',
			function($sceProvider) {
				$sceProvider.enabled(false);
			}
		])
		.filter('grouped', function() {

			return function(input, itemsPerRow) {


				if (itemsPerRow === undefined) {

					itemsPerRow = 1;
				}

				var out = [];

				for (var i = 0; i < input.length; i++) {

					var rowElementIndex = i % itemsPerRow;
					var indexRow = (i - rowElementIndex) / itemsPerRow;
					var row;

					if (rowElementIndex === 0) {

						row = [];
						out[indexRow] = row;

					} else {

						row = out[indexRow];
					}

					row[rowElementIndex] = input[i];
				}

				return out;
			};
		})
		.controller('drawerBoxCtrl', ['$scope', '$sce', 'postService',
			function($scope, $sce, postService) {


				$scope.objects = products;

				$scope.snippet = "<ul><li> one </li><li> two </li><li> three </li></ul>";
				$scope.items = [];
				while ($scope.objects.length) {
					$scope.items.push($scope.objects.splice(0, 1));

				}

				$scope.drawerContentURL = 'partials/item.html';
				$scope.currentItem = null;
				//$scope.rowIndex = 0;
				// $scope.displayIndex = null;
				$scope.display0 = true;

				$scope.display1 = false;

				$scope.setCurrentItem = function(item) {
					$scope.currentItem = item;
				};

				$scope.closeDrawerBox = function() {
					$scope.currentItem = null;
					// $scope.displayIndex = null;
				};

				$scope.renderToHtml = function(htmlString) {
					return $sce.trustAsHtml(htmlString);
				};

				$scope.trustThisSource = function(theUrl) {
					//console.log(theUrl);
					return $sce.trustAsResourceUrl(theUrl);
				};

				$scope.displayCurrentItem = function(item) {

					$scope['display' + item] = !$scope['display' + item];
					if (item == '0') {
						$scope.display1 = false;
					}
					if (item == '1') {
						$scope.display0 = false;
					}
				};

				//$scope.displayVideo = false;



				$scope.playVideo = function(elementId, event) {

					var videoElement = document.getElementById('vid-' + elementId);

					$("video").each(function() {
						if (navigator.appVersion.indexOf("MSIE 8.") == -1) {
							this.pause();
						}
					});
					$(event.target).hide();
					$(videoElement).show();

					if (navigator.appVersion.indexOf("MSIE 8.") != -1) {

						//$scope.displayVideo = true; 
					} else {

						videoElement = document.getElementById('vid-' + elementId);
						$(event.target).hide();
						$(videoElement).show();
						var source = $(videoElement).find('source');


						var mp4Video = source[0];
						mp4Video.src = $(mp4Video).attr('id');
						var ogvVideo = source[1];
						ogvVideo.src = $(ogvVideo).attr('id');

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

					}

				};


				/* Remove Product from users home page */

				$scope.removeProduct = function(event, index, productID) {

					var data = {};

					data.productID = productID;

					//alert(productID);

					var ajaxURL = $(event.currentTarget).attr('data-path');
					var callback = $scope.removeLeadsFromList;
					$scope.makeAjaxCall(index, ajaxURL, data, callback);

					//console.log(data);
					//console.log(ajaxURL);
				};

				$scope.makeAjaxCall = function(index, ajaxURL, data, callbackFn) {

					var options = {};

					// Options can include _csrf.token & headerName
					options.token = $scope.serverToken;
					options.header = $scope.serverHeader;
					postService.postData(ajaxURL, data, options).then(function(response) {
						$scope.removeProductsFromList(data);

					});

				};

				$scope.removeProductsFromList = function(data) {

					var myid = data.productID;
					$scope['expiredProduct' + myid] = true;
					console.log($scope);

				};


			}
		]);
})();