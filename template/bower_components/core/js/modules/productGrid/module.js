(function() {
	'use strict';
	angular.module('productGrid', [])
		.controller('productGridCtrl', ['$scope', 'KKDataService',
			function($scope, KKDataService) {

				KKDataService.getAllProducts().then(function(data) {

					$scope.products = data.r.productArray;

				});

				// DEBUGGING
				var options = {
					storeId: 'store2',
					custId: -62
				};

				KKDataService.addBasketItem(options).then(function(data) {

					// Add a test item to the basket...

					//console.log('addBasketItem', data);


					KKDataService.getBasketItems(options).then(function(data) {

						// ...then do a request to get the basket items back

						//console.log('getBasketItems', data);

					});

				});

			}
		])
		.directive('saasProductGrid', function() {
			return {
				restrict: 'A',
				transclude: true,
				templateUrl: 'partials/product-grid-tpl.html',
				link: function($scope, el, attr) {

					// Do click events

					// and UI interactions
					$scope.increment = function(item) {
						item.clickCount += 1;
					};
				}
			};
		})
		.directive('resize', ['$window',
			function($window) {
				return function(scope, element) {
					var w = angular.element($window);
					scope.getWindowDimensions = function() {
						return {

							'w': w.width()
						};
					};
					scope.$watch(scope.getWindowDimensions, function(newValue, oldValue) {

						scope.windowWidth = newValue.w;

						var offset = $('div#promoBlock').offset().left + $('div#promoBlock').outerWidth();

						var wid = scope.windowWidth - offset;


						scope.promoWidth = wid + 'px';

					}, true);

					w.bind('resize', function() {
						scope.$apply();
					});
				};
			}
		])
		.controller('shopToolsController', ['$scope',
			function($scope) {

				$scope.shopToolsFacet = false;
				$scope.windowWidth = $(window).outerWidth();

				var offset = $('div#promoBlock').offset().left + $('div#promoBlock').outerWidth();

				var wid = $(window).outerWidth() - offset;


				$scope.promoWidth = wid + 'px';
			}
		]);
})();