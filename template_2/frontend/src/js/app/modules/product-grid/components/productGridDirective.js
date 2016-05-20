angular.module('productGridModule').directive('saasProductGrid', function() {
    return {
        restrict: 'A',
        transclude: true,
        templateUrl: SaaS.location+'/docroot/assets/partials/product-grid-tpl.html',
        link: function ($scope, el, attr) {

            // Do click events

            // and UI interactions
            $scope.increment = function(item){
			    item.clickCount += 1;
			}
        }
    }
});
