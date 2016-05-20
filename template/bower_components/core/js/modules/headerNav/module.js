(function() {
	'use strict';
	angular.module('headerNav', [])
		.directive('saasHeaderNav', function() {
			return {
				restrict: 'A',
				link: function($scope, el, attr) {

					// Desktop only
					if ($('html').hasClass('no-touch')) {

						var $links = $(el).children();
						var $rollovers = $(el).find('.rollover');

						// Link rollovers
						$links.bind('mouseover', function(e) {

							$(e.currentTarget).children().filter('div').show();

						});

						// Leave the list
						el.find('li').bind('mouseout', function(e) {

							$rollovers.hide();

						});
					}

				}
			};
		})
		.controller('navigationCtrl', ['$scope', '$rootScope', '$modal', 'postService', '$http',
			function($scope, $rootScope, $modal, postService, $http) {


				$scope.navDisplay = false;
				$scope.nav = {};
				$scope.nav = {
					'tools': navInit.tools || false,
					'subTools': {
						'shopTools': navInit.subTools.shopTools || false,
						'help': navInit.subTools.help || false,
						'login': navInit.subTools.login || false,
						'myTools': navInit.subTools.myTools || false,
						'myAccount': navInit.subTools.myAccount || false
					},
					'aboutus': navInit.aboutus || false,
					'insight': navInit.payment || false,
					'offer': navInit.offer || false,
					'subOffer': {
						'offers': navInit.subOffer.offers || false,
						'pricelessCities': navInit.subOffer.pricelessCities || false,

					}
				};



				$scope.mob = {
					'tools': false,
					'subTools': {
						'shopTools': navInit.subTools.shopTools || false,
						'help': navInit.subTools.help || false,
						'login': navInit.subTools.login || false,
						'myTools': navInit.subTools.myTools || false
					},
					'aboutus': false,
					'insight': false,
					'offer': navInit.offer || false,
					'subOffer': {
						'offers': navInit.subOffer.offers || false,
						'pricelessCities': navInit.subOffer.pricelessCities || false,

					}
				};

				$http.get(SaaS.location + '/docroot/assets/js/json_' + locale + '.properties').success(function(data) {
					$scope.i18nMessages = data;
				});

				$scope.clickNavigation = function(nav) {
					$scope.navDisplay = true;
					angular.forEach($scope.nav, function(value, key) {
						$scope.nav[key] = false;
					});

					$scope.nav[nav] = true;
				};

				$scope.clickMobNavigation = function(nav, val) {

					angular.forEach($scope.mob, function(value, key) {

						$scope.mob[key] = false;
					});

					$scope.mob[nav] = !val;
				};

				$scope.resetLanguage = function(langUrl, ajaxUrl, opt1, opt2) {

					var modalInstance = $modal.open({
						templateUrl: 'partials/lang-modal.html',
						controller: ModalInstanceCtrl,
						resolve: {
							confirmMessage: function() {
								return $scope.i18nMessages['navigation.language.selection.reset.confirmation.message'];
							},
							yesMessage: function() {
								return $scope.i18nMessages['navigation.language.selection.reset.yes.message'];
							},
							noMessage: function() {
								return $scope.i18nMessages['navigation.language.selection.reset.no.message'];
							}
						}
					});

					modalInstance.result.then(function() {

						$rootScope.showOverlay = true;

						var options = {};

						// Options can include _csrf.token & headerName
						options.token = opt1;
						options.header = opt2;

						postService.postData(ajaxUrl, {}, options).then(function(response) {

							if (response.data) {

								window.location.href = langUrl;
								$rootScope.showOverlay = false;

							} else {
								// Check for error
							}

						});

					}, function() {

						window.location.href = langUrl;

					});
				};

			}
		]);
})();