angular.module('saas')

.controller('companyProductsCtrl', ['$scope', 'postService', function ($scope, postService) {
	
	$scope.products = productsJson;
	$scope.productsBackUp = angular.copy(productsJson);
	$scope.cancelImmediate = false;
	$scope.savedChanges = null;
	$scope.saveChangesButton = false;
	$scope.discardChanges = function() {
		$scope.products = angular.copy($scope.productsBackUp);
	}
	
	$scope.getTotal = function() {
		var total = 0;
		for (var i=0; i<$scope.products.length; i++) {
			if ($scope.products[i].checked == true) {
				total += $scope.products[i].price;
			}
		}
		return total;
	}
	
	$scope.updateCompanyProducts = function(ajaxUrl, opt1, opt2) {
		$scope.saveChangesButton = true;
		var postData = $scope.products;
	       
		var options = {};
		
		options.token = opt1;
		options.header = opt2;
		ajaxUrl = ajaxUrl + "/" + $scope.cancelImmediate;
		postService.postData(ajaxUrl, postData, options).then(function (response) {
		       $scope.saveChangesButton = false;
		       if(response.data.success == true){
			    $scope.savedChanges = true;
		       } else{
			    $scope.savedChanges = false;
		       }
		       
		       $scope.products = response.data.companyProducts;
		       $scope.productsBackUp = angular.copy(response.data.companyProducts);
		});
	}
}]);