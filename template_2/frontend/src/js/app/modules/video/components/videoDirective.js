angular.module('videoModule')

.directive('videoLink', function(){
    return{
        restrict: 'EA',
        transclude: true,
        templateUrl: SaaS.location+'/docroot/assets/partials/video-link.html',
        //controller:'videoController',
        controller: function($scope, $modal, $log) {
          //$scope.items = ['item1', 'item2', 'item3'];
          $scope.open = function () {

            var modalInstance = $modal.open({
              templateUrl: 'myModalContent.html',
              controller: ModalInstanceCtrl,
               resolve: {
                 items: function () {
                   return $scope.items;
                 }
               }
            });

            // modalInstance.result.then(function (selectedItem) {
            //   $scope.selected = selectedItem;
            // }, function () {
            //   $log.info('Modal dismissed at: ' + new Date());
            // });
          };
        },
        replace: true
    }
});