(function() {
	'use strict';
	angular.module('navigation', [])
		
		.controller('navigationCtrl', ['$scope', '$window', '$http', function($scope, $window, $http) {

			$scope.mobileViewDetect = window.innerWidth > 415? false : true;
			
			$scope.navTransparent = false;
			$scope.languageMenu = false;
			$scope.nav = {};
			$scope.nav = {
				'marketplace': navInit.marketplace || false,
				'help': navInit.help || false,
				'manageApps': navInit.manageApps || false,
				'managePeople': navInit.managePeople || false,
				'myProfile': navInit.myProfile || false,
				'dashboard': navInit.dashboard || false,
				'myPayment': navInit.myPayments || false,
				'login': navInit.login || false
			};

			$scope.detectMarketplaceUrl = function(){
				var pageLinkArr = $window.location.href.split("/");
				var relativeUrl = pageLinkArr[pageLinkArr.length-1];
				if (relativeUrl == "marketplace") {
					$scope.navTransparent = true;
				}
				else {
					$scope.navTransparent = false;
				}
			}
			$scope.detectMarketplaceUrl();

			$scope.resetLanguage = function(langUrl, ajaxUrl, opt1, opt2) {
					
					var options = {};
					// Options can include _csrf.token & headerName
					options.token = opt1;
					options.header = opt2;

					$http({
	                        url: ajaxUrl,
	                        method: "POST",
	                        data: {},
	                        headers: options
	                    })
	                    .then(function(response) {
	                        window.location.href = langUrl;
	                    
	                    },
	                    function(response) { // optional
	                        window.location.href = langUrl;
	                    });


			}

			


			$scope.toggleDropdowns = function(dropdown) {
				
				if (dropdown == 'language') {
					
					$scope.languageSelected = !$scope.languageSelected;
					$scope.cartOpen = false;
					$scope.myProfileSelected = false;
				}
				else if (dropdown == 'profile') {
					
					$scope.myProfileSelected = !$scope.myProfileSelected;
					$scope.languageSelected = false;
					$scope.cartOpen = false;
					
				}
				else if (dropdown == 'shoppingCart') {
					
					$scope.cartOpen = !$scope.cartOpen;
					$scope.languageSelected = false;
					$scope.myProfileSelected = false;
				}
			}
			if($('.dropdown-menu').length > 0) {
				$(document).mouseup(function (e) {
			
				    var containerUser = $('.dropdown-menu');

				    if (!containerUser.is(e.target) // if the target of the click isn't the container...
				        && containerUser.has(e.target).length === 0) // ... nor a descendant of the container
				    {
				    	var scope = angular.element($(".dropdown-menu")).scope();
				        scope.$apply(function(){
					        $scope.myProfileSelected = false;	
					        if(e.target.className == 'pull-left hidden-sm active') {
				        		$scope.myProfileSelected = !$scope.myProfileSelected;
				        	}        
					    });
				    }
				});
			}
			if($('.language-panel').length > 0) {
				$(document).mouseup(function (e) {
				
				    var containerLanguage = $('.language-panel');
				    var selectLanguage = $('.locale');

				    if (!containerLanguage.is(e.target) // if the target of the click isn't the container...
				        && containerLanguage.has(e.target).length === 0 && !selectLanguage.is(e.target) // if the target of the click isn't the container...
				        && selectLanguage.has(e.target).length === 0) // ... nor a descendant of the container
				    {
				    	var scope = angular.element($(".language-panel")).scope();
				        scope.$apply(function(){
				        	
					        $scope.languageSelected = false;	
					        if(e.target.className == 'pull-left selected') {
				        		$scope.languageSelected = !$scope.languageSelected;
				        	}        
					    });
				    }
				});
			}
		}]);
})();