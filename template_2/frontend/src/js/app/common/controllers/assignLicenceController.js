angular.module('saas')

    .controller('assignLicenceCtrl', ['$scope', function ($scope) {
        
        $scope.checkList = [];
        $scope.checkListTrue = false;

         // fix for ie8 
        if(!Array.prototype.indexOf) {

            Array.prototype.indexOf = function(val) {
                return jQuery.inArray(val, this);
            };
        }
        // fix fo ie8 end

        // fix for ie8 
         if(!Array.prototype.indexOf) {

            Array.prototype.indexOf = function(val) {
                return jQuery.inArray(val, this);
            };
        }
        // fix fo ie8 end

        $scope.updateCheckList = function(item){

            if($scope.checkList.indexOf(item) == -1){
                $scope.checkList.push(item);
            }else{
                $scope.checkList.splice($scope.checkList.indexOf(item), 1);
            }
            
            
            if($scope.checkList.length !== 0){
                $scope.checkListTrue = true;
            }else {

                $scope.checkListTrue = false;
            }
        }

    }]);