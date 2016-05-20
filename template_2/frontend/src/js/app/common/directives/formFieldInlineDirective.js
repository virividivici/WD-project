/* 

    Handle Form field loading

*/

angular.module('saas')

    .directive('formFieldInline', function () {

        return {
            restrict: 'E',
            templateUrl: SaaS.location+'/docroot/assets/partials/form-field-inline-tpl.html',
            replace: true,
            require: '^form',
            scope: {

                fieldPath:      '@',
                formType:       '@',
                fieldName:      '@',
                fieldValue:     '@',
                fieldRequired:  '@',
                fieldMaxLength: '@',
                fieldMinLength: '@',
                fieldMax:       '@',
                fieldMin:       '@',
                fieldPattern:   '@', 
                inputFields:    '=',
                fieldLabel:     '@'
            },
            controller: function($scope) {

                $scope.init = function (value) {

                    this.$parent.inputFields = value;

                }

            }, 

            compile: function(tElement, attrs) {

                var $input = $(tElement.children()).find('input');
                if (attrs.fieldMaxLength) {

                    //add max-length
                    $input.attr('maxlength', attrs.fieldMaxLength);
                }

                if (attrs.fieldMinLength) {

                    //add max-length
                    $input.attr('minlength', attrs.fieldMinLength);
                }

                if (attrs.fieldPattern) {

                    //add max-length
                    $input.attr('ng-pattern', attrs.fieldPattern);
                }


                return function (scope, element, attrs, formController) {
                     var _scope = scope;

                    // Don't do standard validation if a 'match' field
                    if (scope.match) {
                        return false;
                    }

                    // Trigger error check on change/leave of form input
                    $(element).on('blur', '.form-control', function (e) {

                        
                        if (!$(e.currentTarget).hasClass('ng-pristine') && $(e.currentTarget).hasClass('ng-invalid')) {

                            // Error
                            _scope.$apply(function () {
                                _scope.hasError = true;
                            });

                        }
                        else if($(e.currentTarget).hasClass('ng-pristine') && !$(e.currentTarget).val() && $(e.currentTarget).attr('required') == 'required'){
                            
                            // Error for required pristine field
                            _scope.$apply(function () {
                                _scope.hasError = true;
                            });
                            
                        }
                        else {

                            // No error
                            _scope.$apply(function () {
                                _scope.hasError = false;
                            });

                        }

                });

                }


            },

            link: function (scope, element, attrs, formController) {

                var $input = $(element.children()).find('input');

 

                $(element).on('change blur', '.form-control', function (e) {

                     //debugger;

                    if (!$(e.currentTarget).hasClass('ng-pristine') && $(e.currentTarget).hasClass('ng-invalid')) {

                        $(element).addClass('error');

                    }
                    else {
                        $(element).removeClass('error');
                    }

                });



            }
        }

    }); 


    // Only validate email after blur out of field... less annoying
    // From http://www.ng-newsletter.com/posts/validations.html and http://plnkr.co/edit/g3uuGT?p=preview
    // .directive('tqValidateAfter', [function() {
    //     var validate_class = "tq-validate";
    //     return {
    //     restrict: 'A',
    //     require: 'ngModel',
    //     link: function(scope, element, attrs, ctrl) {
    //       ctrl.validate = false;

    //       element.bind('focus', function(evt) {
    //         if(ctrl.validate && ctrl.$invalid) // if we focus and the field was invalid, keep the validation
    //         {
    //           element.addClass(validate_class);
    //           scope.$apply(function() {ctrl.validate = true;});
    //         }
    //         else
    //         {
    //           element.removeClass(validate_class);
    //           scope.$apply(function() {ctrl.validate = false;});
    //         }

    //       }).bind('blur', function(evt) {
    //         element.addClass(validate_class);
    //         scope.$apply(function() {ctrl.validate = true;});
    //       });
    //     }
    //     }
    // }]);