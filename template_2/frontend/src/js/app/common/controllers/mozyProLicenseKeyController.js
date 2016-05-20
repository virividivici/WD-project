angular.module('saas')

    .controller('mozyLicenseKeyCtrl', ['$scope', function ($scope) {

       $scope.licenseObj = obj;

       $scope.currentOS = $scope.licenseObj.os;

       $scope.setCurrentOS = function(currentOS) {

        alert(currentOS);
       }
       
    }]); 