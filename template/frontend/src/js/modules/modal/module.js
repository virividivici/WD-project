(function() {
	'use strict';
	angular.module('modal', ['ui.bootstrap']).controller('videoModalCtrl', function ($scope, $modal, $log) {

		$scope.items = ['item1', 'item2', 'item3'];

		$scope.animationsEnabled = true;

		$scope.open = function (size) {

			var modalInstance = $modal.open({
				animation   : $scope.animationsEnabled,
				templateUrl : 'video-modal.html',
				controller  : 'ModalInstanceCtrl',
				size        : size,
				resolve     : {
					items: function () {
						return $scope.items;
					}
				}
			});

			/* Autoplay first video in modal when rendered */
			modalInstance.rendered.then(function() {
				var $vid = $('.modal-dialog').find('video');

				if(typeof $vid !== undefined){
					$vid[0].play();
				}
			});
		};

		$scope.toggleAnimation = function () {
			$scope.animationsEnabled = !$scope.animationsEnabled;
		};

	});

	// Please note that $modalInstance represents a modal window (instance) dependency.
	// It is not the same as the $modal service used above.

	angular.module('modal').controller('ModalInstanceCtrl', function ($scope, $modalInstance, items) {

		$scope.items = items;
		$scope.selected = {
			item: $scope.items[0]
		};

		$scope.ok = function () {
			$modalInstance.close($scope.selected.item);
		};

		$scope.cancel = function () {
			$modalInstance.dismiss('cancel');
		};
	});
})();