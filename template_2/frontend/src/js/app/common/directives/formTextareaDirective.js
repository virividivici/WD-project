/*

    Handle Form Textarea loading

*/

angular.module('saas')

    .directive('formTextarea', function () {

        return {
            restrict: 'E',
            templateUrl: SaaS.location+'/docroot/assets/partials/textarea-tpl.html',
            replace: true,
            require: '^form',
            scope: {

                fieldPath:      '@',
                fieldName:      '@',
                fieldTitle:     '@',
                fieldValue:     '@',
                fieldRequired:  '@',
                fieldMaxLength: '@',
                match:          '@',
                inputFields:    '='
            },
            controller: function($scope) {

                $scope.hasError = false;

                $scope.init = function (value) {

                    this.$parent.inputFields = value;

                }

            },
            compile: function(tElement, attrs) {

                // Build template based on whether field is required
                // and/or whether field matching validation should occur

                var $label = $(tElement.children()).find('label');
                var $input = $(tElement.children()).find('textarea');

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
                     $(tElement.children()).find('textarea').attr('maxlength', attrs.fieldMaxLength); 
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
                        else {

                            // No error
                            _scope.$apply(function () {
                                _scope.hasError = false;
                            });
                        }

                    });
                };
            }

        }

    });
