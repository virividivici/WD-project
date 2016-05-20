(function() {
	'use strict';
	angular.module('tabAccordion', [])
		.directive('tabAccordion', function() {
			return {
				restrict: 'E',
				transclude: true,
				scope: {},
				controller: function($scope, $element) {
					var tabs = $scope.tabs = [];

					$scope.select = function(tab) {
						angular.forEach(tabs, function(tab) {
							tab.isOpen = false;
						});
						tab.isOpen = true;
					};

					this.returnSelect = function(tab) {
						$scope.select(tab);
					};

					this.addTab = function(tab) {
						if (tabs.length === 0) $scope.select(tab);
						tabs.push(tab);
					};
				},
				templateUrl: 'partials/tab-accordion-wrapper.html',
				replace: true
			};
		})
	.directive('tabpanel', function() {
		return {
			require: '^tabAccordion',
			restrict: 'E',
			transclude: true,
			scope: {
				title: '@'
			},
			link: function(scope, element, attrs, tabsAccordionCtrl) {

				//scope.isOpen = false;
				tabsAccordionCtrl.addTab(scope);

				scope.$watch('isOpen', function(value) {
					if (value) {
						tabsAccordionCtrl.returnSelect(scope);
					}
				});
			},
			templateUrl: 'partials/tab-accordion-tab.html',
			replace: true
		};
	});
})();