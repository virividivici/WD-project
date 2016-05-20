angular.module('productGridModule').controller('productGridCtrl', ['$scope', 'KKDataService', function ($scope, KKDataService) {

    KKDataService.getAllProducts().then(function (data) {

        $scope.products = data.r.productArray;

    });

    // DEBUGGING
    var options = {
        storeId: 'store2',
        custId: -62
    };

    KKDataService.addBasketItem(options).then(function (data) {

        // Add a test item to the basket...

        //console.log('addBasketItem', data);


        KKDataService.getBasketItems(options).then(function (data) {

            // ...then do a request to get the basket items back

            //console.log('getBasketItems', data);

        });

    })

}]);
