(function() {
	'use strict';
	angular.module('language', [])
		
		.controller('languageCtrl', ['$scope', '$http', 
			function($scope, $http) {

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

		}
	]);
})();