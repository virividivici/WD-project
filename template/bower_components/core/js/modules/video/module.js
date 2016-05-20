(function() {
	'use strict';
	angular.module('video', [])
		.directive('videoLink', function() {
			return {
				restrict: 'EA',
				transclude: true,
				templateUrl: 'partials/video-link.html',
				//controller:'videoController',
				controller: function($scope, $modal, $log) {
					//$scope.items = ['item1', 'item2', 'item3'];
					$scope.open = function() {

						var modalInstance = $modal.open({
							templateUrl:'partials/video-modal.html',
							controller: function($scope, $modalInstance, confirmMessage, yesMessage, noMessage) {
								//var ModalInstanceCtrl = function ($scope, $modalInstance, items) {
								$scope.confirmMessage = confirmMessage;
								$scope.noMessage = noMessage;
								$scope.yesMessage = yesMessage;
								// $scope.selected = {
								//   item: $scope.items[0]
								// };

								// $scope.ok = function () {
								//   $modalInstance.close($scope.selected.item);
								// };

								$scope.ok = function() {
									$modalInstance.close();
								};

								$scope.cancel = function() {
									$modalInstance.dismiss('cancel');
								};
							},
							// resolve: {
							//   items: function () {
							//     return $scope.items;
							//   }
							// }
						});

						// modalInstance.result.then(function (selectedItem) {
						//   $scope.selected = selectedItem;
						// }, function () {
						//   $log.info('Modal dismissed at: ' + new Date());
						// });
					};
				},
				replace: true
			};
		})
		.controller('saasVideoCtrl', ['$scope',
			function($scope) {

				$scope.displayVideo = false;

				$scope.playVideo = function(elementId, event) {

					$("video").each(function() {
						if (navigator.appVersion.indexOf("MSIE 8.") == -1) {
							this.pause();
						}

					});
					//Detect if IE 8
					if (navigator.appVersion.indexOf("MSIE 8.") != -1) {

						$scope.displayVideo = true;
					} else {

						var videoElement = document.getElementById(elementId);
						//console.log(videoElement);

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

								console.log(videoElement.webkitRequestFullscreen);
								videoElement.webkitRequestFullscreen();
							}
						}


						videoElement.play();

					}

				};
			}
		]);
})();