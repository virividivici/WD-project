/*

    Password validation
*/

angular.module('saas')

    .directive('passwordValidate', function() {
    return {
        require: 'ngModel',
        link: function($scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function(viewValue) {

                $scope.pwdValidLength = (viewValue && viewValue.length >= 7 ? 'valid' : undefined);
                $scope.pwdHasLetter = (viewValue && /[A-Z]/.test(viewValue)) ? 'valid' : undefined;
                $scope.pwdHasLowLetter = (viewValue && /[a-z]/.test(viewValue)) ? 'valid' : undefined;
                $scope.pwdHasNumber = (viewValue && /\d/.test(viewValue)) ? 'valid' : undefined;

                if($scope.pwdValidLength && $scope.pwdHasLowLetter && $scope.pwdHasLetter && $scope.pwdHasNumber) {
                    ctrl.$setValidity('pwd', true);
                    return viewValue;
                } else {
                    ctrl.$setValidity('pwd', false);                    
                    return undefined;
                }

            });
        }
    };
});