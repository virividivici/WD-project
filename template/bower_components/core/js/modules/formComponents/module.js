/* global angular */
(function() {
	'use strict';
	/**
	 * @ngdoc module
	 * @name formComponents
	 * @requires ngMessages
	 * @description
	 *   Directive and method set for form creation, validation and usage
	 *
	 *   All fields are living in their own independent and isolated scope, with own validation and behaviour.
	 *   Each field has it's own template, which can be overwrite, extend and change.
	 *
	 *   Template applying order:
	 *     core templates -> (opt.) project templates -> (opt.) custom template -> (opt.) custom class
	 *
	 *   So in default, all directive will use it's own template, however, those templates are able to change if
	 *   a new template file placed in the proper partials folder. The building process will use those files instead of
	 *   core templates to deploy them into the docroot folder. On the page, in the model or in the control however we
	 *   able to define a custom name for a given field, or a custom class which makes the application to change the
	 *   loaded/applied template but only in runtime.
	 *
	 *   Validation messages are loaded from a common validation template file, which can be customized by the link and
	 *   dependency description which written in the template file.
	 *
	 *   It assumes the present of an existing `<form>`, otherwise it's use it as standard form with own fields.
	 *
	 * @property formHelperServices {service} {@link formHelperServices}
	 * @property basicInput {directive} {@link basicInput}
	 * @property selectInput {directive} {@link selectInput}
	 * @property formElement {directive} {@link formElement}
	 * @property formAsyncElement {directive} {@link formAsyncElement}
	 * @property passwordValidator {directive} {@link passwordValidator}
	 * @property compareTo {directive} {@link compareTo}
	 * @property paymentField {directive} {@link paymentField}
	 * @property qtyChanger {directive} {@link qtyChanger}
	 * @author Miklos Urban <miklos.urban@bcsg.com>
	 * @version 1.0
	 */
	angular.module('formComponents', ['ngMessages'])
	/**
	 * @ngdoc service
	 * @description Collection of useful methods which used on form input creation and usage
	 * @name formHelperServices
	 */
	.factory('formHelperServices', function() {
		return {
			/**
			 * @description Generate 32bit long string as ID for form elements' identification
			 * @method giveID
			 * @memberOf formHelperServices
			 * @example
			 * formHelperServices.giveID() // -> 'f2bc'
			 * @return {string}
			 */
			giveID: function giveID() {
				return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
			}
		};
	})
	/**
	 * @ngdoc directive
	 * @name wheelEvent
	 * @description
	 *   Restricted: A
	 *
	 *   This directive is initialize crossbrowser-compatile mousewheel event handler, and send
	 *   1/-1 values in current $scope, based on scroll direction.
	 *   The emitted event's name is `mousewheelEvent`
	 *
	 */
	.directive('wheelEvent', function() {
		return {
			restrict: 'A',
			link: function($scope, iElm, iAttrs, controller) {
				function sendwheelEvent(event) {
					var delta = event.wheelDelta || (event.detail) * -1;
					$scope.$emit('mousewheelEvent', ((delta < 0) ? -1 : 1));
				}
				iElm.on('mousewheel', sendwheelEvent);
				iElm.on('DOMMouseScroll', sendwheelEvent);
			}
		};
	})
	/**
	 * @ngdoc directive
	 * @name basicInput
	 * @requires formHelperServices
	 * @description
	 *   Restricted: E
	 *
	 *   Implement a directive for simple and basic, text-based input fields.
	 *
	 *   Requires: `ngModel`, `type`
	 *   `ngModel` is a {string} and inherited from the original `$scope`.
	 *   `type` can be any valid HTML text-based input type, such as text, email, password, number, date, etc.
	 *   The automatic field validations primarily are based on this property
	 *   Note: Text fields with higher complexity like date, number, etc suggested to use components instead.
	 *
	 *   Optional attributes: `placeholder`, `label`, `required`, `validationpattern`, `validationhelper`,
	 *   `customclass`, `customtemplate`.
	 *   Note:
	 *   - `placeholder` is a standard text mask in the input field's value area. Not going to apply on number, date, etc fields
	 *   - `label` is the content of `<label>` belongs to the `<input>`. If not provided, the label still going to be present, however empty
	 *   - `reqired` is a flag to show that given field is required, so the form can't be valid with empty value
	 *   - `validationpattern` is a RegExp, it defines validation pattern to be check on the field
	 *   - `validationhelper` has to be present if `validationpattern` is given, and vica-versa. This will shown in the validation error
	 *   message as detailed description of wrong value
	 *   - `customclass` is an optional list of class name(s) which will apply on the root template element, each word will be a separate class
	 *   - `customtemplate` is a string which will append to the factory-default template name and makes the compiler to a different
	 *   one to load and use
	 *
	 * @return {string} HTML
	 * @example
	 *   // in HTML
	 *   <form name="testform1" novalidate>
	 *     <basic-input type="email"
	 *       ng-model="testform.field1"
	 *       placeholder="placeholder for email value"
	 *       label="Label Text"></basic-input>
	 *   </form>
	 *
	 *   // in controller
	 *   $scope.testform = {}  // -> field1 -> value
	 *                         // $scope.testform1.$valid -> valid?
	 *
	 *   // as compiled
	 *   <form name="testform1" novalidate="" class="ng-pristine ng-invalid ng-invalid-email">
	 *     <div ng-form="" name="subform" type="email" ng-model="testform.field1" placeholder="placeholder for email value" label="Label Text" class="ng-pristine ng-valid ng-untouched ng-isolate-scope ng-valid-email">
	 *       <label for="field_ad5f" class="ng-binding">Label Text</label>
	 *       <input name="field" id="field_ad5f" ng-model="ngModel" class="ng-valid-email" placeholder="placeholder for email value" type="email">
	 *       <!-- ngIf: subform.field.$dirty -->
	 *     </div>
	 *   </form>
	 *
	 *
	 * @example
	 *   // in HTML
	 *   <form name="testform1" novalidate>
	 *     <basic-input type="text"
	 *       ng-model="testform.field2"
	 *       required="true"
	 *       validationpattern="/^[a-zàâçéèëòôöù\d\%40()\-'&\s]{2,50}$/i"
	 *       validationhelper="A to Z plus some special letters, and longer than 2 but no longer than 50 chars"
	 *       customtemplate="extrared"
	 *       placeholder="requred text value"
	 *       label="Label for required text"></basic-input>
	 *   </form>
	 *
	 *   // in controller
	 *   $scope.testform = {}  // -> field2 -> value
	 *                         // $scope.testform1.$valid -> valid?
	 *
	 *   // as compiled
	 *   <form name="testform1" novalidate="" class="ng-pristine ng-invalid ng-invalid-required ng-valid-pattern">
	 *     <div ng-form="" name="subform" type="text" ng-model="testform.field2" required="required" validationpattern="/^[a-zàâçéèëòôöù\d\%40()\-'&amp;\s]{2,50}$/i" validationhelper="A to Z plus some special letters, and longer than 2 but no longer than 50 chars" placeholder="requred text value" label="Label for required text" class="ng-pristine ng-untouched ng-isolate-scope ng-invalid ng-invalid-required ng-valid-pattern">
	 *       <label for="field_b4e1" class="ng-binding">Label for required text</label>
	 *       <input name="field" id="field_b4e1" ng-model="ngModel" class="ng-invalid ng-invalid-required ng-valid-pattern" placeholder="requred text value" type="text" ng-required="true" ng-pattern="/^[a-zàâçéèëòôöù\d\%40()\-'&amp;\s]{2,50}$/i" required="required">
	 *       <!-- ngIf: subform.field.$dirty -->
	 *     </div>
	 *   </form>
	 *
	 */
	.directive('basicInput', ['formHelperServices', 'APP_CONST',
		function(formHelperServices, APP_CONST) {
			return {
				restrict: 'E',
				priority: 1000,
				scope: {
					ngModel: '=',
					placeholder: '@',
					customclass: '@',
					label: '@'
				},
				require: 'ngModel',
				replace: true,
				templateUrl: function($element, $attrs) {
					var customTemplate = ($attrs.customtemplate) ? '-' + $attrs.customtemplate : '';
					return APP_CONST.appRoot + 'partials/formInputField' + customTemplate + '.html';
				},
				compile: function compile($element, $attrs) {
					var input = $element.find('input');
					if (input !== undefined) {
						input[0].setAttribute('type', $attrs.type);

						if ($attrs.required !== undefined) {
							input[0].setAttribute('ng-required', 'true');
						}
						if ($attrs.compareto !== undefined) {
							input[0].setAttribute('compare-to', $attrs.compareto);
						}
						if ($attrs.validationpattern !== undefined) {
							input[0].setAttribute('ng-pattern', $attrs.validationpattern);
						}

					} else {
						throw new Error('The template does not contain input field (or the template has not been loaded by an error)');
					}

					return function($scope, iElm, iAttrs) {
						$scope.fieldID = 'field_' + formHelperServices.giveID();
						$scope.definedpattern = iAttrs.validationhelper;
					};
				}
			};
		}
	])
	/**
	 * @ngdoc directive
	 * @name selectInput
	 * @requires formHelperServices
	 * @requires $http
	 * @description
	 *   Restricted: E
	 *
	 *   Implement a directive for group-based, selectable input fields.
	 *
	 *   Requires: `ngModel`, `type`, `elements`
	 *   `ngModel` is a {string} and inherited from the original `$scope`.
	 *   `type` can be `select`, `radio`, `checkbox`
	 *   `elements` is the list of given items. You can use 3 type of element initialisation:
	 *   1. Array-based list: set each key/value pair in the format of `[key|foo;key2|bar]`
	 *   2. Pre-defined variable in window scope: `var = [{el_key: 'key', el_val: 'foo'},{el_key: 'key2', el_val: 'bar'}]`, requested as: `var::varaiblename`
	 *   3. Ajax-request response in the same format as window variable, requested as: `get::api/get`
	 *
	 *   Optional attributes:
	 *   - `selectedindex` is the default seleted element's index, the default is `0`
	 *   - `label` is the content of label
	 *
	 * @return {string} HTML
	 * @example
	 *   // in HTML
	 *   <form name="testform1" novalidate>
	 *     <select-input type="select"
	 *       elements="[selem1|selement 1;selem2|selement 2;selem3|selement 3]"
	 *       ng-model="testform.sfield1"
	 *       selectedindex="1"
	 *       label="select field"></select-input>
	 *
	 *     <select-input type="select"
	 *       elements="var::fromsite"
	 *       ng-model="testform.sfield2"
	 *       label="select field"></select-input>
	 *
	 *     <select-input type="select"
	 *       elements="get::get/items"
	 *       ng-model="testform.sfield3"
	 *       label="select field"></select-input>
	 *   </form>
	 *
	 *   // as compiled
	 *   <form name="testform1" novalidate="" class="ng-pristine ng-valid ng-valid-required">
	 *     <div ng-form="" name="subform" type="select" elements="[selem1|selement 1;selem2|selement 2;selem3|selement 3]" ng-model="testform.sfield1" selectedindex="0" label="select field" class="ng-pristine ng-valid ng-untouched ng-isolate-scope ng-valid-required">
	 *       <label for="field_92ea" class="ng-binding">select field</label>
	 *       <select name="field" id="field_92ea" ng-model="ngModel" ng-options="option.el_val for option in optionList" class="ng-valid-required" ng-required="">
	 *         <option value="0" label="selement 1">selement 1</option>
	 *         <option value="1" selected="selected" label="selement 2">selement 2</option>
	 *         <option value="2" label="selement 3">selement 3</option>
	 *       </select>
	 *       <!-- ngIf: subform.field.$dirty -->
	 *     </div>
	 *
	 *     <div ng-form="" name="subform" type="select" elements="var::fromsite" ng-model="testform.sfield2" label="select field" class="ng-pristine ng-valid ng-untouched ng-isolate-scope ng-valid-required">
	 *       <label for="field_23d1" class="ng-binding">select field</label>
	 *       <select name="field" id="field_23d1" ng-model="ngModel" ng-options="option.el_val for option in optionList" class="ng-valid-required" ng-required="">
	 *         <option value="0" selected="selected" label="bar fromsite">bar fromsite</option>
	 *         <option value="1" label="bar2 fromsite">bar2 fromsite</option>
	 *       </select>
	 *       <!-- ngIf: subform.field.$dirty -->
	 *     </div>
	 *
	 *     <div ng-form="" name="subform" type="select" elements="get::get/items" ng-model="testform.sfield3" label="select field" class="ng-pristine ng-valid ng-untouched ng-isolate-scope ng-valid-required">
	 *       <label for="field_b239" class="ng-binding">select field</label>
	 *       <select name="field" id="field_b239" ng-model="ngModel" ng-options="option.el_val for option in optionList" class="ng-valid ng-valid-required" ng-required="">
	 *         <option value="0" selected="selected" label="bar fromserver">bar fromserver</option>
	 *         <option value="1" label="bar2 fromserver">bar2 fromserver</option>
	 *         <option value="2" label="bar3 fromserver">bar3 fromserver</option>
	 *       </select>
	 *       <!-- ngIf: subform.field.$dirty -->
	 *     </div>
	 *   </form>
	 *
	 */
	.directive('selectInput', ['formHelperServices', '$http', 'APP_CONST',
		function(formHelperServices, $http, APP_CONST) {
			return {
				restrict: 'E',
				priority: 1000,
				scope: {
					ngModel: '=',
					customclass: '@',
					required: '@',
					label: '@'
				},
				require: 'ngModel',
				replace: true,
				templateUrl: function($element, $attrs) {
					var customTemplate = ($attrs.customtemplate) ? '-' + $attrs.customtemplate : '',
						type = $attrs.type;
					return APP_CONST.appRoot + 'partials/formSelectField' + '-' + type + customTemplate + '.html';
				},
				compile: function compile($element, $attrs) {
					return function($scope, iElement, iAttrs, ngModel) {
						var elements = [],
							selectedindex = ($attrs.selectedindex !== undefined) ? parseInt($attrs.selectedindex, 10) : 0,
							listdata = null,
							i = 0,
							setValues = function setValues(elements) {
								$scope.optionList = elements;
								$scope.ngModel = $scope.optionList[selectedindex];
							};

						$scope.fieldID = 'field_' + formHelperServices.giveID();

						if ($attrs.elements !== undefined) {
							if ($attrs.elements[0] === '[' && $attrs.elements[$attrs.elements.length - 1] === ']') {
								try {
									listdata = $attrs.elements.substring(0, $attrs.elements.length - 1).substring(1).split(';');
									for (i = 0; i < listdata.length; i += 1) {
										elements.push({
											el_key: listdata[i].split('|')[0],
											el_val: listdata[i].split('|')[1]
										});
									}
									setValues(elements);
								} catch (err) {
									throw new Error(err);
								}
							} else if ($attrs.elements.indexOf('var::') > -1) {
								try {
									listdata = $attrs.elements.split('::')[1];
									elements = window[listdata];
									setValues(elements);
								} catch (err) {
									throw new Error(err);
								}
							} else if ($attrs.elements.indexOf('get::') > -1) {
								try {
									$http.get('/' + $attrs.elements.split('::')[1])
										.success(function(data) {
											setValues(data);
										})
										.error(function(data, status) {
											throw new Error(data, status);
										});
								} catch (err) {
									throw new Error(err);
								}
							}
						}
					};
				}
			};
		}
	])
	.directive("dropdownformcomponents", [ 'APP_CONST', function(APP_CONST) {
		return {
			restrict: "A",
			transclude:true,
			//templateUrl: "partials/dropdown.html",
			templateUrl: function($element, $attrs) {
				//var customTemplate = ($attrs.customtemplate) ? '-' + $attrs.customtemplate : '';
				return APP_CONST.appRoot + 'partials/dropdown.html';
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
					//console.log("[in directive] selected: "+scope.selected[scope.propertyvaluename]);
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
					//console.log("title: "+title);

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
	}])
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







	/**
	 * @ngdoc directive
	 * @name formElement
	 * @description
	 *   Restricted: E
	 *
	 *   Standard form element directive to hold complex form components.
	 *
	 * @property passwordValidator {directive} {@link passwordValidator}
	 * @property paymentField {directive} {@link paymentField}
	 * @property qtyChanger {directive} {@link qtyChanger}
	 */
	.directive('formElement', function() {
		return {
			name: 'formElement',
			restrict: 'E',
			priority: 1000,
			replace: false
		};
	})
	/**
	 * @ngdoc directive
	 * @name formAsyncElement
	 * @requires $compile
	 */
	.directive('formAsyncElement', ['$compile',
		function($compile) {
			return {
				restrict: 'E',
				priority: 800,
				replace: true,
				link: function($scope, $element) {
					var newfElement = '',
						content = null,
						attribs = [];

					if ($scope.item.shape !== 'component') {
						attribs.push('type="' + $scope.item.type + '"');
					} else {
						attribs.push($scope.item.type);
					}

					($scope.item.model) ? attribs.push('ng-model="' + $scope.item.model + '"') : false;
					($scope.item.placeholder) ? attribs.push('placeholder="' + $scope.item.placeholder + '"') : false;
					($scope.item.required) ? attribs.push('ng-required="' + $scope.item.required + '"') : false;
					($scope.item.label) ? attribs.push('label="' + $scope.item.label + '"') : false;
					($scope.item.validationpattern) ? attribs.push('validationpattern="' + $scope.item.validationpattern + '"') : false;
					($scope.item.validationhelper) ? attribs.push('validationhelper="' + $scope.item.validationhelper + '"') : false;
					($scope.item.customtemplate) ? attribs.push('customtemplate="' + $scope.item.customtemplate + '"') : false;
					($scope.item.customclass) ? attribs.push('customclass="' + $scope.item.customclass + '"') : false;
					($scope.item.canminus) ? attribs.push('canminus="' + $scope.item.canminus + '"') : false;
					($scope.item.canzero) ? attribs.push('canzero="' + $scope.item.canzero + '"') : false;
					($scope.item.defaultqty) ? attribs.push('defaultqty="' + $scope.item.defaultqty + '"') : false;

					if ($scope.item.elements) {
						var i = 0,
							list = [];
						for (i; i < $scope.item.elements.length; i += 1) {
							list.push($scope.item.elements[i].key + '|' + $scope.item.elements[i].value);
						}
						attribs.push('elements="' + list.join(';') + '"');
					}

					switch ($scope.item.shape) {
						case 'basic':
							newfElement = $compile('<basic-input ' + attribs.join(' ') + '></basic-input>');
							break;
						case 'select':
							newfElement = $compile('<select-input ' + attribs.join(' ') + '></select-input>');
							break;
						case 'component':
							newfElement = $compile('<form-element ' + attribs.join(' ') + '></form-element>');
							break;
					}
					content = newfElement($scope);
					$element.append(content);
				}
			};
		}
	])
	/**
	 * @ngdoc directive
	 * @name passwordValidator
	 * @requires formHelperServices
	 * @description
	 *   Restricted: A
	 *
	 *   A directive for create two password fields and implement a logic which compare their values.
	 *   Building logic and usage is the same as on {@link basicInput} field.
	 *
	 *   The component will be valid if the second field is equal to the first field.
	 *   The first field's value always proganated to `$scope`.
	 *
	 *   Requires: `ngModel`
	 * @example
	 *   // in HTML
	 *   <form name="testform1" novalidate>
	 *     <form-element password-validator ng-model="testform.pvalid"></form-element>
	 *   </form>
	 *
	 *   // in controller
	 *   $scope.testform = {}  // -> pvalid -> value
	 *                         // $scope.testform1.$valid -> valid?
	 *
	 *   // as compiled
	 *   <form name="testform1" novalidate="" class="ng-pristine ng-invalid ng-invalid-required">
	 *     <div ng-form="" name="subform" password-validator="" ng-model="testform.pvalid" class="ng-pristine ng-untouched ng-isolate-scope ng-invalid ng-invalid-required ng-valid-compare-to">
	 *       <label for="field_24fd">Please write a password</label>
	 *       <input type="password" name="pwdfield" id="field_24fd" ng-model="ngModel" class="ng-invalid ng-invalid-required" ng-required="true" placeholder="Please write a password" required="required">
	 *       <label for="field_39d7">Please ensure the password</label>
	 *       <input type="password" name="pwdcompare" id="field_39d7" ng-model="compare" class="ng-invalid ng-invalid-required ng-valid-compare-to" ng-required="true" placeholder="Please ensure the password" compare-to="ngModel" required="required">
	 *       <!-- ngIf: subform.pwdcompare.$dirty -->
	 *     </div>
	 *   </form>
	 *
	 */
	.directive('passwordValidator', ['formHelperServices', 'APP_CONST',
		function(formHelperServices, APP_CONST) {
			return {
				restrict: 'A',
				priority: 900,
				scope: {
					ngModel: '=',
					customclass: '@'
				},
				require: 'ngModel',
				replace: true,
				templateUrl: function($element, $attrs) {
					var customTemplate = ($attrs.customtemplate) ? '-' + $attrs.customtemplate : '';
					return APP_CONST.appRoot + 'partials/formElement-password' + customTemplate + '.html';
				},
				link: function($scope) {
					$scope.pwdFieldID = 'field_' + formHelperServices.giveID();
					$scope.compareFieldID = 'field_' + formHelperServices.giveID();
				}
			};
		}
	])
	/**
	 * @ngdoc directive
	 * @name compareTo
	 * @description
	 *   Validation directive for comparing two fields' value
	 *   This directive is not used in it's own, as all form fields has a separated and isolated scope,
	 *   and not possible to access their data in this way.
	 */
	.directive('compareTo', function() {
		return {
			require: 'ngModel',
			scope: {
				otherModelValue: '=compareTo'
			},
			link: function($scope, iElm, iAttrs, ngModel) {

				ngModel.$validators.compareTo = function(modelValue) {
					return modelValue == $scope.otherModelValue;
				};

				$scope.$watch('otherModelValue', function() {
					ngModel.$validate();
				});
			}
		};
	})
	/**
	 * @ngdoc directive
	 * @name paymentField
	 * @requires formHelperServices
	 * @todo Must to extend with further fields, such as name on card, etc
	 * @description
	 *   Restricted: A
	 */
	.directive('paymentField', ['formHelperServices', 'APP_CONST',
		function(formHelperServices, APP_CONST) {
			return {
				restrict: 'A',
				priority: 900,
				scope: {
					ngModel: '=',
					customclass: '@',
					label: '@'
				},
				require: 'ngModel',
				replace: true,
				templateUrl: function($element, $attrs) {
					var customTemplate = ($attrs.customtemplate) ? '-' + $attrs.customtemplate : '';
					return APP_CONST.appRoot + 'partials/formElement-payment' + customTemplate + '.html';
				},
				link: function($scope, iElm, iAttrs, ngModel) {
					var getCardType = function getCardType(number) {
							if (number.match(new RegExp("^4")) !== null) { // 4
								$scope.maxlength = 16;
								return "visa";
							}
							if (number.match(new RegExp("^5[1-5]")) !== null) { // 55
								$scope.maxlength = 16;
								return "mastercard";
							}
							if (number.match(new RegExp("^3[47]")) !== null) { // 34
								$scope.maxlength = 15;
								return "amex";
							}
							if (number.match(new RegExp("^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)")) !== null) { // 6011
								$scope.maxlength = 16;
								return "discover";
							}
							if (number.match(new RegExp("^36")) !== null) { // 36
								$scope.maxlength = 15;
								return "diners";
							}
							if (number.match(new RegExp("^35(2[89]|[3-8][0-9])")) !== null) { // 3528
								$scope.maxlength = 16;
								return "jcb";
							}
							return '';
						},
						formatCardNumber = function formatCardNumber(number) {
							var formatted = '',
								i = 0,
								j = 0;
							number = number.toString();

							for (i; i < number.length; i += 1) {
								if (j === 4) {
									formatted += '-';
									j = 1;
								} else {
									j += 1;
								}
								formatted += number[i];
							}
							return formatted;
						};

					$scope.maxlength = 19;
					$scope.paymentFieldID = 'field_' + formHelperServices.giveID();

					$scope.keyPress = function keyPress(event) {
						var fstring = ($scope.ngModel !== undefined) ? $scope.ngModel.cardNumberFormatted : '',
							e = event;

						if (e.keyCode === 8 &&
							fstring[fstring.length - 1] === '-') {
							$scope.ngModel.cardNumberFormatted = fstring.substring(0, fstring.length - 2);
						}
						if ([46, 8, 9, 27, 13, 110, 190, 109, 189, 32].indexOf(e.keyCode) !== -1 ||
							(e.keyCode === 65 && e.ctrlKey === true) ||
							(e.keyCode === 86 && e.ctrlKey === true) ||
							e.keyCode >= 35 && e.keyCode <= 40) {
							return;
						}
						if ((e.shiftKey ||
								(e.keyCode < 48 || e.keyCode > 57)) &&
							(e.keyCode < 96 || e.keyCode > 105)) {
							e.preventDefault();
						}
					};

					$scope.$watch('ngModel.cardNumberFormatted', function(val, oldval) {
						if (val !== undefined && val !== '' && val !== null && val.length !== 0) {
							var number = val.replace(/\D/g, '');
							$scope.cardtype = getCardType(number);
							$scope.ngModel.cardNumber = number;
							$scope.ngModel.cardNumberFormatted = formatCardNumber(number);
						}
					});
				}
			};
		}
	])
	/**
	 * @ngdoc directive
	 * @name qtyChanger
	 * @requires formHelperServices
	 * @description
	 *   Restricted: A
	 *
	 *   This directive is creating a component with buttons and an input field to provide number-based user input, typically for quantity handling.
	 *   The value can be change by
	 *   - the buttons in posite or negative direction
	 *   - top/bottom or left/right keys
	 *   - mouse wheel scrolling up/down or
	 *   - written into the input field directly
	 *
	 *   There are validation rules applied which deny the improper value input, such as text or invalid characters, while
	 *   the control keys are enabled, so the user experience isn't break, ctrl/command keys, clipboard, delete or backspace, or
	 *   other mouse events such as right click, copy/paste are avaliable.
	 *
	 *   Requires: `ngModel` {string} and inherited from the original `$scope`.
	 *
	 *   Optional attributes:
	 *   - `customclass` [optional] is an optional list of class name(s) which will apply on the root template element, each word will be a separate class
	 *   - `label` [optional] is the content of `<label>` belongs to the `<input>`. If not provided, the label still going to be present, however empty
	 *   - `canminus` [optional] defines if the value can lower than `0` (negative) or not
	 *   - `canzero` [optional] defines if the value can be a `0` or not
	 *   - `step` [optional] shows the value stepping in default it's `1`.
	 *   - `min` [optional] is the minimum value of this input. This field is setting after the default value, so *recommended to be lower or equal to default*.
	 *   - `max` [optional] is the avaliable maximum value of this field
	 *   - `prefix` [optional] will show before the value _in the field_
	 *   - `suffix` [optional] will show after the value _in the field_
	 *   - `defaultqty` [optional] is the default value of the field. If not present this will be the minimum value, if that not present either, this going to be `1`
	 *   - `addbutton` [optional] is the content of plus button. If not set, this will be `+`
	 *   - `removebutton` [optional] is the content of minus button. If not set, this will be `-`
	 *
	 *
	 * @example
	 *   // in HTML
	 *   <form-element qty-changer
	 *     ng-model="testform.qtychng"
	 *     canminus="false"
	 *     canzero="false"
	 *     prefix="HDD: "
	 *     suffix="GB"
	 *     step="15"
	 *     min="15"
	 *     max="110"
	 *     label="quantity changer"
	 *     addbutton="+"
	 *     removebutton="-"
	 *     defaultqty="15"></form-element>
	 *
	 *   // in controller
	 *   $scope.testform = {}  // -> field2 -> value
	 *                         // $scope.testform1.$valid -> valid?
	 *
	 *   // as compiled
	 *   <form name="testform1" novalidate="" class="ng-pristine ng-valid">
	 *     <div ng-form="" name="subform" qty-changer="" ng-model="testform.qtychng" canminus="false" canzero="false" prefix="HDD:" suffix="GB" step="15" min="15" max="110" label="quantity changer" addbutton="+" removebutton="-" defaultqty="15" class="ng-pristine ng-valid ng-untouched ng-isolate-scope">
	 *       <label for="field_c62b" class="ng-binding">quantity changer</label>
	 *       <div class=" quantitychanger">
	 *         <button ng-click="changeQuantity('-')" class="ng-binding">-</button>
	 *         <input id="field_c62b" ng-model="formattedValue" wheel-event="" type="text" name="quantity" ng-focus="focusEvent($event)" ng-blur="focusEvent($event)" ng-keydown="keyboardEvent($event)" ng-keyup="keyboardEvent($event)" ng-change="checkFieldValue()" class="ng-pristine ng-valid ng-touched">
	 *         <input type="hidden" ng-model="ngModel" class="ng-pristine ng-untouched ng-valid">
	 *         <button ng-click="changeQuantity('+')" class="ng-binding">+</button>
	 *       </div>
	 *       <!-- ngIf: subform.quantity.$dirty -->
	 *     </div>
	 *   </form>
	 *
	 */
	.directive('qtyChanger', ['formHelperServices', 'APP_CONST',
		function(formHelperServices, APP_CONST) {
			return {
				restrict: 'A',
				priority: 900,
				scope: {
					ngModel: '=',
					customclass: '@',
					label: '@',
					canminus: '@',
					canzero: '@',
					step: '@',
					min: '@',
					max: '@',
					prefix: '@',
					suffix: '@',
					defaultqty: '@',
					addbutton: '@',
					removebutton: '@'
				},
				require: 'ngModel',
				replace: true,
				templateUrl: function($element, $attrs) {
					var customTemplate = ($attrs.customtemplate) ? '-' + $attrs.customtemplate : '';
					return APP_CONST.appRoot + 'partials/formElement-qtychanger' + customTemplate + '.html';
				},
				link: function($scope, iElm, iAttrs, ngModel) {
					var step = ($scope.step !== undefined) ? parseInt($scope.step, 10) : 1,
						valuePrefix = ($scope.prefix !== undefined) ? $scope.prefix : '',
						valueSuffix = ($scope.suffix !== undefined) ? $scope.suffix : '',
						canZero = ($scope.canzero !== undefined && $scope.canzero === 'true') ? true : false,
						canMinus = ($scope.canminus !== undefined && $scope.canminus === 'true') ? true : false,
						minValue = ($scope.min !== undefined) ? parseInt($scope.min, 10) : false,
						maxValue = ($scope.max !== undefined) ? parseInt($scope.max, 10) : false,
						startval = $scope.defaultqty || minValue || 1,
						changeAmount = function changeAmount(val) {
							$scope.subform.quantity.$rollbackViewValue();
							$scope.ngModel = val;
						},
						checkFieldValue = function checkFieldValue(val) {
							val = step * (Math.round(val / step));
							if (val === 0 && !canZero) {
								val = startval;
							}
							if (val <= 0 && !canMinus) {
								val = startval;
							}
							if (minValue && val <= minValue) {
								val = minValue;
							}
							if (maxValue && val >= maxValue) {
								val = maxValue;
							}
							return val;
						},
						setFormat = function setFormat(val) {
							return valuePrefix + val.toString() + valueSuffix;
						};

					$scope.qtyfieldID = 'field_' + formHelperServices.giveID();

					changeAmount(startval);
					$scope.formattedValue = setFormat($scope.ngModel);

					$scope.focusEvent = function focusEvent(event) {
						if (event.type === 'focus') {
							$scope.formattedValue = $scope.ngModel;
						}
						if (event.type === 'blur') {
							$scope.formattedValue = setFormat($scope.ngModel);
						}
					};

					$scope.keyboardEvent = function keyboardEvent(event) {
						if ([38, 39].indexOf(event.keyCode) !== -1) {
							event.preventDefault();
							if (event.type === 'keyup') {
								$scope.changeQuantity('+');
							}
							return false;
						}
						if ([37, 40].indexOf(event.keyCode) !== -1) {
							event.preventDefault();
							if (event.type === 'keyup') {
								$scope.changeQuantity('-');
							}
							return false;
						}
						if ([46, 8, 9, 27, 13, 110, 190].indexOf(event.keyCode) !== -1 ||
							(event.keyCode === 65 && event.ctrlKey === true) ||
							(event.keyCode === 86 && event.ctrlKey === true) ||
							event.keyCode >= 35 && event.keyCode <= 40) {
							return;
						}
						if ((event.shiftKey || (event.keyCode < 48 || event.keyCode > 57)) && (event.keyCode < 96 || event.keyCode > 105)) {
							event.preventDefault();
							return false;
						}
						if (event.type == 'keyup') {
							changeAmount(checkFieldValue($scope.formattedValue));
						}
					};

					$scope.changeQuantity = function changeQuantity(direction) {
						var qty = parseInt($scope.ngModel, 10),
							newValue = 0;
						if (direction === '-') {
							newValue = qty - step;
						}
						if (direction === '+') {
							newValue = qty + step;
						}
						changeAmount(checkFieldValue(newValue));
						$scope.formattedValue = setFormat($scope.ngModel);
					};

					$scope.$on('mousewheelEvent', function(event, data) {
						if (data === -1) {
							$scope.changeQuantity('-');
						}
						if (data === 1) {
							$scope.changeQuantity('+');
						}
						$scope.$apply();
					});
				}
			};
		}
	]);
})();