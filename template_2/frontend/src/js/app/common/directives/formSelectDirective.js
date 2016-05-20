/*

    Handle Form Select loading

*/


angular.module('saas')

    // Use custom <form-select> tags
    .directive('formSelect', function () {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            require: '^form',

            templateUrl: SaaS.location+'/docroot/assets/partials/form-select-tpl.html',

            scope: {
                fieldPath:      '@',
                formType:       '@',
                fieldName:      '@',
                fieldTitle:     '@',
                fieldValue:     '@',
                fieldRequired:  '@',
                inputFields:    '='
            },


            controller: function ($scope, $timeout) {
              var _scope = $scope;

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
                    self.selectedItem = $('option[value="'+_value+'"').text();
                  }, 100);
                }
              }

              // function _log(t, d) {
              //   console.info('%c%s%c: %o', 'font-weight:bold;color:fuchsia', t, 'font-weight:normal;color:black', d)
              // }

              // $scope.onUpdate = function(data) {
              //   _log('onUpdate', { data: data, inputFields: _scope.inputFields, selectedItem: _scope.selectedItem })
              // }

              $scope.$watch('inputFields', function(value, oldVal) {
                // When value changes update selectedItem variable (display name)
                // Fired in provisioning flow when updating user details
                // _log('$watch - inputFields', { value, oldVal, _scope })

                // Update the selected item in <span>
                _scope.selectedItem = 'Please select';

                if (value && value !== oldVal) {
                  _scope.items.forEach(function(item) {
                    if (item.value === value) {
                      _scope.selectedItem = item.label
                    }
                  })
                }

                // Required to make sure regular forms work with this crappy directive.
                $('[name="' + $scope.fieldName + '"]').val()
              });
            },


            link: function(scope, element, attrs, formController) {
                var items = [];

                var el = $('.' + $(element).attr('id'));

                // Set model items to select options
                _.each(el, function (option) {
                  items.push({
                    value: option.value,
                    label: $(option).attr("data")
                  })
                });

                // Remove initial items
                el.remove();

                // Set items to data
                scope.items = items;

                // Bind to change & blur events and check for class
                $(element).on('change blur', '.form-control', function (e) {
                    if (!$(e.currentTarget).hasClass('ng-pristine') && $(e.currentTarget).hasClass('ng-invalid')) {
                        $(element).addClass('error');
                        $(element).find('.col-sm-6.error').removeClass('hidden');
                        $(element).find('span.input-lg').addClass('error');
                    }
                    else if($(e.currentTarget).hasClass('ng-pristine') && $(e.currentTarget).attr('required') == 'required'){
                        // Error for required pristine field
                        $(element).addClass('error');
                        $(element).find('.col-sm-6.error').removeClass('hidden');
                        $(element).find('span.input-lg').addClass('error');
                    }
                    else {
                        $(element).removeClass('error');
                        $(element).find('.col-sm-6.error').addClass('hidden');
                        $(element).find('span.input-lg').removeClass('error');
                    }
                });

                $(element).on('focus', '.form-control', function (e) {
                    $(element).find('span.input-lg').addClass('focused');
                });

                $(element).on('blur', '.form-control', function (e) {
                    $(element).find('span.input-lg').removeClass('focused');
                });

            }
        }

    });
