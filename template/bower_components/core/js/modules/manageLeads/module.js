(function() {
	'use strict';
	angular.module('manageLeads', [])
		.controller('manageLeadsCtrl', ['$scope', 'postService',
			function($scope, postService) {

				$scope.leadResults = leadjson;
				$scope.ajaxErrorHeader = "";

				// console.log($scope);
				$scope.removeLead = function(event, index, coreProductStatusId, staffNo) {

					// Handle 'remove User' button
					var data = {};
					data.coreProductStatusId = coreProductStatusId;
					data.staffNo = staffNo;
					data.origin = "Remove Lead";



					// // save local copy
					// var _scope = $scope;

					console.log(data);

					var ajaxURL = $(event.currentTarget).attr('data-path');

					var callback = $scope.removeLeadsFromList;

					$scope.makeAjaxCall(index, ajaxURL, data, callback);

					console.log(ajaxURL);

				};

				$scope.makeAjaxCall = function(index, ajaxURL, data, callbackFn) {

					var options = {};

					// Options can include _csrf.token & headerName
					options.token = $scope.serverToken;
					options.header = $scope.serverHeader;

					//console.log(options);
					postService.postData(ajaxURL, data, options).then(function(response) {

						//console.log(response.data);
						//if (response.data = "true") { //  <-  this not gonna work anyway :)



							//alert("test");
							// $scope.ajaxErrorHeader = '';
							// if(callbackFn){
							//     callbackFn(response);
							// }

						//}

						$scope.removeLeadsFromList(index);

					});

				};

				$scope.removeLeadsFromList = function(index) {
					//lead_to_remove = $scope.leadResults[coreProductStatusId];
					$scope.leadResults.splice(index, 1);
					//console.log(index);

				};


			}
		]);
})();