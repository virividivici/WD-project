(function() {
	'use strict';
	angular.module('formBuilder', [])
		
		.directive('counter', function() {
			return {
				restrict: 'A',
				scope: {
					value: '=value',
					ext: '=ext'
				},
				template: '<a href="javascript:;" class="counter-minus" ng-click="minus()"><i class="fa fa-minus"></i></a>'+
                  '<input type="text" class="counter-field form-control input-lg" ng-model="value" ng-change="changed()" >{{ext}}'+
                  '<a  href="javascript:;" class="counter-plus" ng-click="plus()"><i class="fa fa-plus"></i></a>',
				link: function(scope, element, attributes) {
					// Make sure the value attribute is not missing.
					if (angular.isUndefined(scope.value)) {
						throw "Missing the value attribute on the counter directive.";
					}

					var min = angular.isUndefined(attributes.min) ? null : parseInt(attributes.min);
					var max = angular.isUndefined(attributes.max) ? null : parseInt(attributes.max);
					var step = angular.isUndefined(attributes.step) ? 1 : parseInt(attributes.step);
					var ext = attributes.ext;
					scope.value = min;
					scope.ext = ext;
					element.addClass('counter-container');

					// If the 'editable' attribute is set, we will make the field editable.
					scope.readonly = angular.isUndefined(attributes.editable) ? true : false;

					/**
					 * Sets the value as an integer.
					 */
					var setValue = function(val) {
						scope.value = parseInt(val);
					};

					// Set the value initially, as an integer.
					setValue(scope.value);

					/**
					 * Decrement the value and make sure we stay within the limits, if defined.
					 */
					scope.minus = function() {
						if (min && (scope.value <= min || scope.value - step <= min) || min === 0 && scope.value < 1) {
							setValue(min);
							return false;
						}
						setValue(scope.value - step);
					};

					/**
					 * Increment the value and make sure we stay within the limits, if defined.
					 */
					scope.plus = function() {
						if (max && (scope.value >= max || scope.value + step >= max)) {
							setValue(max);
							return false;
						}
						setValue(scope.value + step);
					};

					/**
					 * This is only triggered when the field is manually edited by the user.
					 * Where we can perform some validation and make sure that they enter the
					 * correct values from within the restrictions.
					 */
					scope.changed = function() {
						// If the user decides to delete the number, we will set it to 0.
						if (!scope.value) setValue(0);

						// Check if what's typed is numeric or if it has any letters.
						if (/[0-9]/.test(scope.value)) {
							setValue(scope.value);
						} else {
							setValue(scope.min);
						}

						// If a minimum is set, let's make sure we're within the limit.
						if (min && (scope.value <= min || scope.value - step <= min)) {
							setValue(min);
							return false;
						}

						// If a maximum is set, let's make sure we're within the limit.
						if (max && (scope.value >= max || scope.value + step >= max)) {
							setValue(max);
							return false;
						}

						// Re-set the value as an integer.
						setValue(scope.value);
					};
				}
			};
		})
        /**
        <!-- ng-model set the variable that you bind with your controller
             field-value set the the "first value" in the input field
             field-model set the "name" of the ng-model in the directive. In this way from your controller you can get the value of the input field
             field-name set the "name" of the input field. It's a dynamic variable you can assign dynamically different input name   
		-->   
		<!-- Example HTML
		<form-field field-name='fieldName' field-value="'${provisioningWrapper.accessCode!""}'" field-model="codeValue" ng-model="codeValue" 
		field-path="accessCode" form-type="text"  field-title="Access Code"  field-required="true" field-pattern="/^[\d\-+\s]{10,15}$/i"
		 field-error-message="[@spring.message 'registration.form.error.invalid' /]"></form-field>
		-->
        */ 
		.directive('formFieldEXP', function($compile) {
			return {
				restrict: 'E',
				templateUrl: SaaS.location + 'partials/form-field-tplexp.html',
				replace: true,
				require: '^form',
				scope: {
					model: '=ngModel',
					fieldPath: '@',
					fieldDesc: '@',
					formType: '@',
					fieldName: '@',
					fieldTitle: '@',
					fieldErrorMessage: '@',
					fieldValue: '=',
					fieldRequired: '@',
					fieldMaxLength: '@',
					fieldMinLength: '@',
					fieldMax: '@',
					fieldPattern: '@',
					fieldMin: '@',
					fieldDisabled: '@',
					fieldPlaceholder: '@',
					match: '@',
					activator: '@',
					fieldModel: '='
				},
				compile: function(element, attrs, transclude) {
					
					element.children()[0].querySelector('input').setAttribute("type",attrs.formType);
					element.children()[0].querySelector('input').setAttribute("path",attrs.fieldPath);
					element.children()[0].querySelector('input').setAttribute("name",attrs.fieldName);
					element.children()[0].querySelector('input').setAttribute("id",attrs.fieldName);
					if ( attrs.fieldPattern != undefined ) { element.children()[0].querySelector('input').setAttribute("ng-pattern",attrs.fieldPattern);};
					if ( attrs.fieldMaxLength != undefined ) { element.children()[0].querySelector('input').setAttribute("maxlength",attrs.fieldMaxLength);};
					if ( attrs.fieldMinLength != undefined ) { element.children()[0].querySelector('input').setAttribute("minlength",attrs.fieldMinLength);};
					if ( attrs.fieldMax != undefined ) {element.children()[0].querySelector('input').setAttribute("max",attrs.fieldMax);};
					if ( attrs.fieldMin != undefined ) {element.children()[0].querySelector('input').setAttribute("min",attrs.fieldMin);};
					if ( attrs.activator != undefined ) {element.children()[0].querySelector('input').setAttribute("field-activator",attrs.activator);};
					if ( attrs.fieldPlaceholder != undefined ) {element.children()[0].querySelector('input').setAttribute("placeholder",attrs.fieldPlaceholder);};
					if ( attrs.fieldRequiredValue != undefined ) {element.children()[0].querySelector('input').setAttribute("required",attrs.fieldRequiredValue);};
					if ( attrs.fieldMatchValue != undefined ) {element.children()[0].querySelector('input').setAttribute("field-match",attrs.fieldMatchValue);};
					if ( attrs.fieldModel != undefined ) {element.children()[0].querySelector('input').setAttribute("ng-model",attrs.fieldModel);};

					if (attrs.fieldDisabled) {
						element.children()[0].querySelector('input').setAttribute('disabled', attrs.fieldDisabled);
					}

					if (attrs.match) {
					
						element.children()[0].querySelector('input').setAttribute("required","required");
						
						var Title = attrs.fieldTitle + " *"
						element.children()[0].querySelector('input').setAttribute("fieldTitle",Title);
						element.children()[0].querySelector('input').setAttribute("fieldMatchValue",attrs.match);

						//scope.fieldTitle = scope.fieldTitle + " *"
						//scope.fieldMatchValue = attrs.match;
					
					} else if (attrs.fieldRequired && (attrs.fieldRequired === 'required' || attrs.fieldRequired === 'true')) {

						element.children()[0].querySelector('input').setAttribute("required","required");
						//scope.fieldTitle = scope.fieldTitle + " *"
						var Title = attrs.fieldTitle + " *"
						element.children()[0].querySelector('input').setAttribute("fieldTitle",Title);
					}

					return {
          				pre: function(scope, element, attrs){
          					
          					element.children()[0].querySelector('input').setAttribute("name",scope.fieldName);
            				
            				scope.hasError = false;
							//scope.fieldPattern2 = "/^[\d\-+\s]{10,15}$/i";

							var input_model = element.children()[0].querySelector('input').getAttribute("ng-model");							
							scope[input_model] = attrs.fieldValue;

							scope.$watch(input_model,function(newValue, oldValue){
								
								scope.model = newValue;
							});


							if (!scope.match) {

								scope.leaveInput = function(){

									var ng_pristine_state = angular.element(element.children()[0].querySelector('input')).hasClass('ng-pristine');
									var ng_invalid_state = angular.element(element.children()[0].querySelector('input')).hasClass('ng-invalid');
									var ng_dirty_state = angular.element(element.children()[0].querySelector('input')).hasClass('ng-dirty');
									var input_value = element.children()[0].querySelector('input').value;
									var input_required = element.children()[0].querySelector('input').getAttribute("required");
									var check_input_required = ""
									if (input_required == 'required') {check_input_required = true}else{check_input_required = false};

									console.log("ng-pristine && ng-invalid: "+ng_pristine_state+" "+ng_invalid_state);
									

									if (!ng_pristine_state && ng_invalid_state) {
											
											scope.hasError = true;

									} else if ( ng_pristine_state && !input_value && check_input_required) {

											scope.hasError = true;
									
									} else if ( ng_dirty_state && !input_value && input_required == 'required') {

											scope.hasError = true;

									} else {

											scope.hasError = false;

									}
								}
							}
					
						}
      				}
				}
			};
		})
		.directive('formField', function () {

	        return {
	            restrict: 'E',
	            templateUrl: SaaS.location+'partials/form-field-tpl.html',
	            replace: true,
	            require: '^form',
	            scope: {

	                fieldPath:      '@',
	                fieldDesc:      '@', 
	                formType:       '@',
	                fieldName:      '@',
	                fieldTitle:     '@',
	                fieldCustomeErrorMessage:     '@',
	                fieldErrorMessage:     '@',
	                fieldValue:     '@',
	                fieldRequired:  '@',
	                fieldMaxLength: '@',
	                fieldMinLength: '@',
	                fieldMax:       '@',
	                fieldPattern:   '@',              
	                fieldMin:       '@',
	                fieldDisabled:  '@',
	                fieldPlaceholder:'@',
	                match:          '@',
	                activator:      '@',
	                inputFields:    '='
	            },
	            link:function(scope,element,attrs){
	               
	             
	 
	                $compile(element)(scope);
	            },
	            controller: function($scope) {

	                $scope.hasError = false;

	                $scope.init = function (value) {

	                    this.$parent.inputFields = value;
	                    this.inputFields = value;
	                    var fieldValidation = this.fieldPattern.split('/i')[0];	                   
						var validationExtract = fieldValidation.split(/\/(.+)?/)[1];
						var patt = new RegExp(validationExtract);
						//this madness is brough to you by crazy DBIT time management issues
						if(this.fieldName.indexOf('vatNumber') > -1){
		                   
		                    if(value.length > 0 && !patt.test(value)){
		                    	
		                    	$scope.hasError = true;
		                    	
		                    }
		                }
	                    

	                }


	            },
	            compile: function(tElement, attrs) {

	                // Build template based on whether field is required
	                // and/or whether field matching validation should occur

	                var $label = $(tElement.children()).find('label');
	                var $input = $(tElement.children()).find('input');
	                
	                

	                // Check for field matches
	                if (attrs.match) {

	                    //add these two line for password match and required field

	                     $input.attr('required', 'required');
	                     $label.html($label.html() + ' *');


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

	                if (attrs.fieldPlaceholder) {

	                    //override model
	                    $input.attr('placeholder', attrs.fieldPlaceholder);
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

	    })

		 .directive('formPassword', function () {

	        return {
	            restrict: 'E',
	            templateUrl: SaaS.location+'partials/form-password-tpl.html',
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

	    })
		.directive("dropdownformbuilder", function( ) {
			return {
				restrict: "A",
				transclude:true,
				//templateUrl: "partials/dropdown.html",
				templateUrl: function($element, $attrs) {
					//var customTemplate = ($attrs.customtemplate) ? '-' + $attrs.customtemplate : '';
					return SaaS.location + 'partials/dropdown.html';
				},
				scope: {
					placeholder: "@",
					dlist: "=",
					selected: "=",
					propertyname: "@",
					propertyvaluename: "@",
					staticversion: "@",
					selectname:"@",
					errormessage:"@",
					required:"@",
					positionselecterrorclass:"@"
				},
				link: function(scope, iElm, attrs, ctrl, transclude) {
					scope.listVisible = false;
					scope.isPlaceholder = true;
					scope.showerror = true;
					var slist = [];
					transclude(scope.$parent, function(clone, scope) {
		                var staticList = clone[1].children;
		                angular.forEach(angular.element( staticList  ), function(value, key){
		 					var name = value.innerHTML;
		 					var val = value.value;
		 					var strOption = '{"name":"'+name+'","value":"'+val+'"}';
		 					var ObjOption = JSON.parse(strOption);
		 					slist.push(ObjOption);
						});
		            });
		           
		            if (scope.staticversion == "true") {
		            	scope.listItems = slist;	
		            }else{
		            	scope.listItems = scope.dlist;	
		            }

		            /* FIX for IE8 */
		            function isIE () {
		  					var myNav = navigator.userAgent.toLowerCase();
		  					return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
					}
					if (isIE () == 8) {
						$(iElm).find(".dropdown-list").hide();
					}
					/* FIX for IE8 */

					scope.select = function(item) {
						scope.isPlaceholder = false;
						scope.selected = item;
						console.log("[in directive] selected: "+scope.selected[scope.propertyvaluename]);
						scope.listVisible = false;
						/* FIX for IE8 */
						if (isIE () == 8) {
		 					$(iElm).find(".dropdown-list").hide();
		 				}
		 				/* FIX for IE8 */
						
					};

					scope.isSelected = function(item) {
						return item[scope.propertyname] === scope.selected[scope.propertyname];
					};

					scope.show = function() {
						scope.listVisible = true;
						var title = angular.element(iElm.children()[0]);
						console.log("title: "+title);

						function isIE () {
		  					var myNav = navigator.userAgent.toLowerCase();
		  					return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
						}

						/* FIX for IE8 */
						if (isIE () == 8) {
							$(iElm).find(".dropdown-list").show();
						}
						/* FIX for IE8 */

					};

					scope.$watch("selected", function(value) {
						scope.isPlaceholder = scope.selected[scope.propertyname] === undefined;
						scope.display = scope.selected[scope.propertyname];
					});
				}
			};
		})
		/* SIMPLE CONTROLLER TO USE WITH THE DIRECTIVE
		.controller('MainCtrl', ['$scope', '$routeParams', 'AjaxService',
		    function($scope,$routeParams, AjaxService) {
		      $scope.msg = 'dropdown list:';


		    $scope.cars = [{
				name: "BMW",
				value: "bmw"
			}, {
				name: "Ford",
				value: "ford"
			}, {
				name: "Fiat",
				value: "fiat"
			}];
			$scope.car = "";
			$scope.$watch("car", function(value) {
				console.log("[in controlelr] car value: "+$scope.car.value);
				console.log("[in controller] car name: "+$scope.car.name);
			});

		}]);
		*/
		.directive('typeahead', function($timeout) {
		  return {
		    restrict: 'A',
		    transclude:true,
		    templateUrl: SaaS.location + 'partials/typeahead.html',
		    scope: {
				dlist: '=',
				placeholder:'@',
				title: '@',
				subtitle:'@',
				model: '=',
				selectname:'@',
				staticversion:'@',
				onSelect:'&'
			},
			link:function(scope,elem,attrs,ctrl,transclude){
				//var selected_index = "null"
			    scope.handleSelection=function(selectedItem,index){
					//selected_index = index;
					//console.log("selected index: "+index );
					scope.model=selectedItem;
					scope.current=0;
				 	scope.selected=true;        
				 	//console.log("selected: "+scope.selected);
				 	$timeout(function(){
						scope.onSelect();
				  	},200);
			  	};

			  	//console.log( elem.children()[0].querySelector('.typeahead_list').children);

			  	var slist = [];
			  	var scopeParent = scope;
				transclude(scope.$parent, function(clone, scope) {
					//console.log(clone);
		            var staticList = clone[1].children;
		            angular.forEach(angular.element( staticList  ), function(value, key){
							//console.log(value);
							var name = value.innerHTML;
							//console.log(value.innerHTML);
							var value = value.value;

							var strOption = '{"'+scopeParent.title+'":"'+name+'","'+scopeParent.subtitle+'":"'+value+'"}';
							//console.log(strOption);
							var ObjOption = JSON.parse(strOption);
							slist.push(ObjOption);
					});
		        });

				scope.$watch('dlist',function(){
					//console.log("in dlist");
					if (scope.staticversion == "true") {
			        	scope.listItems = slist;	
			        }else{
			        	scope.listItems = scope.dlist;	
			        }
				});
		        

			  	scope.hoverIn = function(index){
		    		scope.currentIndex = index;
		    		//console.log("scope.currentIndex hoverIn: "+scope.currentIndex);
				};

				scope.currentIndex = 0;
				//console.log("scope.currentIndex start: "+scope.currentIndex);

			  	

			  	/* FIX for IE8 */
		        function isIE () {
					var myNav = navigator.userAgent.toLowerCase();
					return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
				}
				if (isIE () == 8) {
					$(elem).find(".typeahead_list").hide();
				}
				scope.$watch('model.length',function(){
					//console.log("model lentgh: "+scope.model.length);
					if (isIE () == 8) {
						if ( scope.model.length == 0 || scope.selected == true) {
							$(elem).find(".typeahead_list").hide();
						}else if ( scope.model.length > 0 && scope.selected == false ) {
							$(elem).find(".typeahead_list").show();
						}
					}
				});
				/* FIX for IE8 */
				

			  	scope.current=0;
			  	scope.selected=true;
			  	scope.setCurrent=function(index){
					scope.current=index;
			  	};
			}
		  }
		})
		.directive('formDateField', function () {

        return {
            restrict: 'E',
            templateUrl: SaaS.location+'partials/form-date-field-tpl.html',
            replace: true,
            require: '^form',
            scope: {

                fieldPath:      '@',
                fieldDesc:      '@', 
                formType:       '@',
                fieldName:      '@',
                fieldTitle:     '@',
                fieldErrorMessage:     '@',
                fieldValue:     '@',
                fieldRequired:  '@',              
                fieldPattern:   '@',             
              
                fieldDisabled:  '@',
              
                match:          '@',
                activator:      '@',
                inputFields:    '='
            },
            link:function(scope,element,attrs){
            
                $compile(element)(scope);
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

                    //add these two line for password match and required field

                     $input.attr('required', 'required');
                     $label.html($label.html() + ' *');


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

              

                
                if (attrs.fieldPattern) {

                    //add max-length
                    //$input.attr('ng-pattern', attrs.fieldPattern);
                }

                if (attrs.fieldDisabled) {

                    //add max-length
                    $input.attr('disabled', attrs.fieldDisabled);
                }

                if (attrs.activator) {

                    //override model
                    $input.attr('field-activator', attrs.activator);
                }

                if (attrs.fieldPlaceholder) {

                    //override model
                    $input.attr('placeholder', attrs.fieldPlaceholder);
                }
              

                return function (scope, element, attrs, formController) {

                    var _scope = scope;

                                      // Don't do standard validation if a 'match' field
                    if (scope.match) {
                        return false;
                    }
                    $(element).on('focus', '.form-control', function (e) {
                       
                        $('header .mobileNav').css({position:'absolute'});
                        return true;
                    });
                    // Trigger error check on change/leave of form input
                    $(element).on('blur', '.form-control', function (e) {

                        var currentYear= new Date().getFullYear();
                        var currentMonth= new Date().getMonth() + 1;
                        $('header .mobileNav').css({position:'fixed'});
                        if($(e.currentTarget).attr('id')=='yearField') {                            
                            if($(e.currentTarget).val()==currentYear) {                              
                                if ($(e.currentTarget).prev('#monthField').val() <= currentMonth) {                                    
                                    $(e.currentTarget).addClass('ng-invalid');
                                    _scope.$apply(function () {
                                        _scope.hasError = true;
                                    });
                                }else {
                                    $(e.currentTarget).removeClass('ng-invalid');
                                     _scope.$apply(function () {
                                        _scope.hasError = false;
                                    });
                                }
                            }

                            if($(e.currentTarget).val() > currentYear) { 
                                $(e.currentTarget).removeClass('ng-invalid');
                                $(e.currentTarget).next('#monthField').removeClass('ng-invalid');
                                 _scope.$apply(function () {
                                        _scope.hasError = false;
                                    });
                            }

                            if($(e.currentTarget).val() < currentYear) { 
                                $(e.currentTarget).addClass('ng-invalid');
                                 _scope.$apply(function () {
                                        _scope.hasError = true;
                                    });
                            }
                        }

                        if($(e.currentTarget).attr('id')=='monthField') { 
                            if($(e.currentTarget).next('#yearField').val()==currentYear) { 
                                if ($(e.currentTarget).val() <= currentMonth) {         
                                    $(e.currentTarget).addClass('ng-invalid');
                                    _scope.$apply(function () {
                                        _scope.hasError = true;
                                    });
                                }else {
                                    $(e.currentTarget).removeClass('ng-invalid');
                                     _scope.$apply(function () {
                                        _scope.hasError = false;
                                    });
                                }
                            }

                        }

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

    	})
		.directive('passwordValidate', function() {
			return {
				require: 'ngModel',
				link: function($scope, elm, attrs, ctrl) {
					ctrl.$parsers.unshift(function(viewValue) {

						$scope.pwdValidLength = (viewValue && viewValue.length >= 9 ? 'valid' : undefined);
						$scope.pwdHasLetter = (viewValue && /[A-Z]/.test(viewValue)) ? 'valid' : undefined;
						$scope.pwdHasLowLetter = (viewValue && /[a-z]/.test(viewValue)) ? 'valid' : undefined;
						$scope.pwdHasNumber = (viewValue && /\d/.test(viewValue)) ? 'valid' : undefined;

						if ($scope.pwdValidLength && $scope.pwdHasLowLetter && $scope.pwdHasLetter && $scope.pwdHasNumber) {
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
		
})();