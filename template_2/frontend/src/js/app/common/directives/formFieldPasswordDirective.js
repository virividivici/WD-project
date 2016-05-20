/*

    Handle Form field loading

*/
 
angular.module('saas')

    .directive('formPassword', function () {

        return {
            restrict: 'E',
            templateUrl: SaaS.location+'/docroot/assets/partials/form-password-tpl.html',
            replace: true,
            require: '^form',
            scope: {

                fieldPath:      '@',
                formType:       '@',
                fieldName:      '@',
                fieldTitle:     '@',
                fieldValue:     '@',
                fieldRequired:  '@',
                fieldMaxLength: '@',
                fieldMinLength: '@',
                fieldMax:       '@',
                fieldPattern:   '@',              
                fieldMin:       '@',
                fieldDisabled:  '@',
                match:          '@',
                activator:      '@',
                inputFields:    '='
            },
            controller: function($scope) {

                $scope.hasError = false;

                $scope.init = function (value) {

                    this.$parent.inputFields = value;
                    this.inputFields = value;
                    

                }


            },
            compile: function(tElement, attrs) {

                // Build template based on whether field is required
                // and/or whether field matching validation should occur

                var $label = $(tElement.children()).find('label');
                var $input = $(tElement.children()).find('input');
              
                // Check for field matches
                if (attrs.match) {

                    // add directive and field name to match
                    $input.attr('field-match', attrs.match);

                    // add error message
                    $(tElement).find('p').html('<span aria-hidden="true" class="icon-Warningation"></span>{{fieldTitle}} field doesn\'t match');
                }
                else if (attrs.fieldRequired && (attrs.fieldRequired === 'required' || attrs.fieldRequired === 'true')) {
                    // Update required fields

                    // update label with *
                    $label.html($label.html() + ' *');

                    // add 'required' to input
                    $input.attr('required', 'required');
                     

                } 

                if (attrs.fieldMaxLength) {

                    //add max-length
                    $input.attr('maxlength', attrs.fieldMaxLength);
                }

                if (attrs.fieldMinLength) {

                    //add max-length
                    $input.attr('minlength', attrs.fieldMinLength);
                }

                 if (attrs.fieldMax) {

                    //add max-length
                    $input.attr('max', attrs.fieldMax);
                }

                if (attrs.fieldMin) {

                    //add max-length
                    $input.attr('min', attrs.fieldMin);
                }

                if (attrs.fieldPattern) {

                    //add max-length
                    $input.attr('ng-pattern', attrs.fieldPattern);
                }

                if (attrs.fieldDisabled) {

                    //add max-length
                    $input.attr('disabled', attrs.fieldDisabled);
                }

                if (attrs.activator) {

                    //override model
                    $input.attr('field-activator', attrs.activator);
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
	    }
	    }

    });
