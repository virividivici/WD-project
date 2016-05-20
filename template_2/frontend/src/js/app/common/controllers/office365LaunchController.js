angular.module('saas')

    .controller('office365LaunchCtrl', ['$scope', '$http' , '$sce', '$timeout', function ($scope, $http, $sce, $timeout) {

       $scope.officeOrders = obj.orders;
       $scope.iFrameUrl="";
       $scope.loading= true;


       $scope.getOfficeIframe = function( ajaxUrl, orderRef, orderLineRef){

       	$scope.iFrameUrl = "";
       	$scope.loading= true;
       	var restAPI = ajaxUrl + orderRef + '/' + orderLineRef;

       	//console.log(restAPI);

		$http.get( restAPI )
	        .success(function(response) {

	            //console.log(response);

	            if (response.result == 'success') {
	            	// if not successful, bind errors to error variables
	                //console.log('success');
	                $scope.iFrameUrl = $sce.trustAsResourceUrl(response.atts.iFrameURL +'KEY');
	               
	                $timeout(function(){$scope.loading = false;}, 1000);
	                

	            } else {
	            	//console.log('error')
	            }
	        });

       }

    }]);