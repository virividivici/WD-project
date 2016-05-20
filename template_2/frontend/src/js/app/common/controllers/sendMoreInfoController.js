angular.module('saas')
	.controller('sendMoreInforCtrl', ['$scope', 'postService', 'getService', '$http', function($scope, postService, getService, $http) {
		
		/*employeesDataUrl = '/rest/eesales/autocomplete/00';
		$scope.employeeData = getService.getData(employeesDataUrl).then(function (response) {
			if (response.data) {
               return response.data;
	        }
            else {
            	//console.log("error get employees data: "+response);
            }
		});*/

		// Angular filter doesnt't work with the promises so the piace of code above doesnt work beacuse the get service in src/js/app/common/services/getService.js uses the promises with 'then'
		// To try a solution to move this code in the 'getServices.js' 
		$scope.employeeData = null;
        $http.get('/rest/eesales/autocomplete/00').success(function(data) {
            $scope.employeeData = data;
            //$scope.artistOrder = 'name';
            //alert($scope.employeeData);
        });


		 	$scope.emailSent = false;
	        $scope.buttonDisabled = false;
			$scope.errorList1 = null;
	        $scope.sendMoreInfoEmail = function(formData,ajaxUrl , opt1 , opt2 ) {
	            $scope.buttonDisabled = true;
	            $('#floatingBarsG').show();
	            //$scope.formDisplay = true;
	           
	            var options = {};

	            // Options can include _csrf.token & headerName
	            options.token = opt1;
	            options.header = opt2;
	            postService.postData(ajaxUrl, formData, options).then(function (response) {
	               
	            	if (response.data.success) {

	                   $scope.emailSent = true;
	                   $scope.emailSentError = false;
	                   $scope.emailSentErrorSpin = true;

	                }
	                else {
	                    // Check for error
	                    
	                  
	                   $scope.emailSentError = true;
	                   $scope.emailSentErrorSpin = true;
	                   $scope.buttonDisabled = false;
					   $scope.errorList1=response.data.errorMessage;

	                }

	            });
	           }		
	}]);