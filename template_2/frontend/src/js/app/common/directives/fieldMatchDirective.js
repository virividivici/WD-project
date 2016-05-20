/*

    Handle Form field matching

    e.g. confirm password, re-enter email etc

*/

angular.module('saas')

    .directive('fieldMatch', function () {

        return {
            require: 'ngModel',
            priority: 0,
            link: function (scope, elem, attrs, ctrl) {

                // Find source field by name attribute
                var sourceField = '[name="'+attrs.fieldMatch+'"]';

                elem.on('blur', function () {
                    scope.$apply(function () {

                        // Is field valid - does it match source field?
                        var validity = elem.val() === $(sourceField).val();

                        // Add error var for displaying error
                        scope.hasError = !validity;

                        // Set field validity
                        ctrl.$setValidity('fieldMatch', validity);
                    });
                });
            }

        }

    });
