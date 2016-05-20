angular.module('saas')

.controller('companyEditStatusCtrl', ['$scope', 'postService', function ($scope, postService) {
	
	$scope.userStatuses = userStatuses;
	$scope.accountStatuses = accountStatuses;	
	$scope.editStatus = wrapperJson;
	$scope.savedChanges = null;
	$scope.saveChangesButton = false;
	$scope.discardChanges = function() {
		$scope.editStatus = angular.copy($scope.editStatusBackUp);
		initialiseStatuses();
	}
	
	function initialiseStatuses() {
		for (var i=0; i<$scope.userStatuses.length; i++) {
			for (var j=0; j<$scope.editStatus.users.length; j++) {
				if ($scope.userStatuses[i].name == $scope.editStatus.users[j].status.name) {
					$scope.editStatus.users[j].status = $scope.userStatuses[i];
				}
			}
		}
	}
	
	initialiseStatuses();

	$scope.editStatusBackUp = angular.copy($scope.editStatus);
	
	$scope.getTotal = function() {
		var total = 0;
		for (var i=0; i<$scope.products.length; i++) {
			if ($scope.products[i].checked == true) {
				total += $scope.products[i].price;
			}
		}
		return total;
	}
	
	$scope.updateCompanyStatus = function(ajaxUrl, opt1, opt2) {
		
		$scope.saveChangesButton = true;
		var postData = $scope.editStatus;
	       
		var options = {};
		
		options.token = opt1;
		options.header = opt2;
		
		postService.postData(ajaxUrl, postData, options).then(function (response) {
		       
			$scope.saveChangesButton = false;
			
		       if(response.data.success == true){
			    $scope.savedChanges = true;
		       } else{
			    $scope.savedChanges = false;
		       }
		       
		       $scope.editStatus = response.data;
		       initialiseStatuses();
		       $scope.editStatusBackUp = angular.copy($scope.editStatus);
		});
	}
}]);
