/*

    Handle Form field matching

    e.g. confirm password, re-enter email etc

*/

angular.module('saas')

    .directive('fieldActivator', function () {

        return {
            require: 'ngModel',
            priority: 0,
            link: function (scope, elem, attrs, ctrl) {

                // Find source field by name attribute
                var sourceField = '[name="'+attrs.fieldActivator+'"]';

                elem.on('blur', function (e) {
                    scope.$apply(function () {

                        if (!$(e.currentTarget).hasClass('ng-pristine')){
                            $(sourceField).parents('div.row').removeClass('ng-hide');
                            $(sourceField).focus();
                        }
                        
                    });
                });
            }

        }

    });
