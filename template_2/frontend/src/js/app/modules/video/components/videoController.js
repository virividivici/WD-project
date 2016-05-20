var ModalInstanceCtrl = function ($scope, $modalInstance, confirmMessage) {
//var ModalInstanceCtrl = function ($scope, $modalInstance, items) {
	// EB-1704 - display message according to the confirmMessage instead of hardcoded one.
	// and display default when confirmMessage variable is undefined or empty
   if (typeof confirmMessage === 'undefined' || confirmMessage === '') 
   {
	   confirmMessage = 'Are you sure you want to proceed with this action?';
   }
   $scope.confirmMessage = confirmMessage;
  // $scope.selected = {
  //   item: $scope.items[0]
  // };

  // $scope.ok = function () {
  //   $modalInstance.close($scope.selected.item);
  // };

  $scope.ok = function () {
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
};