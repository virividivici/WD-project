/*

    Handle Form Select loading

*/

angular.module('saas')

    .directive('formSelectInline', function () {

        return {
            restrict: 'E',
            templateUrl: SaaS.location+'/docroot/assets/partials/form-select-inline-tpl.html',
            replace: true,
            transclude: true,
            require: '^form',
            scope: {
                fieldPath:      '@',
                formType:       '@',
                fieldName:      '@',
                fieldTitle:     '@',
                fieldValue:     '@',
                fieldRequired:  '@',
                inputFields:    '=',
                optionsFromJson:'=',
                inlineAjaxUrl:  '@',
                inlineAjaxFn:   '&',
                inlineSubmit:   '@',
                inputDisabled:  '='
            },
            controller: function ($scope, $element, $timeout) {

                $scope.init = function (value) {


                    if (!value) {
                        this.selectedItem = 'Please select';
                    }
                    else {
                        this.inputFields = value;
                        // Return capitalized version (HACKY - should have access to this.items and get key/value)
                        // currently waiting for angular to make the select box items and then select the correct text
                        // Bad, bad, bad...

                        var self = this;
                        var _value = value;

                        $timeout(function () {

                            // The selector is to stop causing issues with repeated output on page:
                            self.selectedItem = $('option[value="'+_value+'"]:first').text();

                        }, 100);

                    }

                }


                

                // Update the selected item in <span>
                $scope.onUpdate = function (options) {

                    this.selectedItem = this.items[options.selectedItem];
                    
                    if($scope.inlineSubmit){
                        $element.closest("form").submit();
                    }
                }



                var _scope = $scope;

                $scope.$watch('inputFields', function (value, oldVal) {

                    // When value changes update selectedItem variable (display name)
                    // Fired in provisioning flow when updating user details

                    if (!value) {
                        _scope.selectedItem = 'Please select';
                    }
                    else {
                        _scope.selectedItem = _scope.items[value];
                    }

                });

                // Watch for changes to options for select
                $scope.$watch('optionsFromJson', function (value, oldVal) {
                    // Re make options if a change
                    var items = {}

                   if (typeof _scope.optionsFromJson !== 'undefined') {
                        
                        _.each(value, function (option) {
                            //console.log('here is option: ', value);
                            items[option.id] = option.value;
                            //console.log(option.id, option.value);
                        });

                        _scope.items = items;

                    }
                });

            },
            link: function (scope, element, attrs, formController) {
                 
                
                var items = {};
                var className = $(element).attr('id');
            
                var el = $('.'+className);
                
                // Set model items to select options
                // Checks to see if options from json attribute is used
                if (typeof scope.optionsFromJson !== 'undefined') {
                   

                    // Must be in the format of [{id: 1, value: ''}, ...]
                    // Loops through and adds to options
                    _.each(scope.optionsFromJson, function (option) {
                        
                        items[option.id] = option.value;
                        //console.log(option.id, option.value);
                    });

                }else{
                    // Grabs current options and adds into angular options before clearing later
                    _.each(el, function (option) {
                         
                        items[option.value] = $(option).attr("data");
                        
                    });

                }

                // Remove initial items
                el.remove();

                // Set items to data
                scope.items = items;

                // HACKY:
                // Bind to change & blur events and check for class
                // var $frmElem = $(element).find('.form-control');

                // Custom way to set error state styles to selct
                $(element).on('change blur', '.form-control', function (e) {

                    // debugger;

                    if (!$(e.currentTarget).hasClass('ng-pristine') && $(e.currentTarget).hasClass('ng-invalid')) {

                        $(element).addClass('error');
                        $(element).find('.col-sm-5.error').removeClass('hidden');
                        // scope.isError = true;

                    }
                    else {
                        $(element).removeClass('error');
                        $(element).find('.col-sm-5.error').addClass('hidden');
                        // scope.isError = false;

                    }

                });
                // Custom way of setting focus styles on select
                $(element).on('focus', '.form-control', function (e) {
                    $(element).find('span.input-lg').addClass('focused');
                });
                // Custom way of unsetting focus styles on select
                $(element).on('blur', '.form-control', function (e) {
                    $(element).find('span.input-lg').removeClass('focused');
                });

            }
        }

    });