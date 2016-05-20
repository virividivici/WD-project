/// <reference path="formComponents/module.js">
"use strict";

describe('Form Components and Builder', function() {

	var $element_tf0, $element_tf1, $element_tf2, $element_tf3, $element_tf4, $element_tf5, $element_tf6, $element_tf7, $element_tf8, $scope;
	beforeEach(module('formComponents'));


	beforeEach(inject(function($rootScope, $compile, $templateCache) {

		$templateCache.put('partials/formInputField.html', '<div ng-form name="subform"><label for="{{fieldID}}">{{label}}</label><input name="field" id="{{fieldID}}" ng-model="ngModel" class="{{customclass}}" placeholder="{{placeholder}}" /><div ng-if="subform.field.$dirty" ng-messages="subform.field.$error" ng-messages-include="js/validation_messages.html"></div></div>'); // standard form input field
		$templateCache.put('partials/formInputField-extra.html', '<div ng-form name="subform" style="outline:1px dotted #aaa;margin:10px 0;"><aside></aside><div>Custom template with some extra</div><label for="{{fieldID}}">{{label}}</label><input name="field" id="{{fieldID}}" ng-model="ngModel" class="{{customclass}}" placeholder="{{placeholder}}" /><div ng-if="subform.field.$dirty" ng-messages="subform.field.$error" ng-messages-include="js/validation_messages.html"></div></div>'); // custom form input field
		$templateCache.put('partials/formSelectField-checkbox.html', '<div ng-form name="subform"><label>{{label}}</label><label ng-repeat="option in optionList" class="{{customclass}}"><input type="checkbox" name="field" ng-model="$parent.ngModel[option.el_key]" ng-required="{{required}}"> {{option.el_val}}</label><div ng-if="subform.field.$dirty" ng-messages="subform.field.$error" ng-messages-include="js/validation_messages.html"></div></div>'); // checkbox fieldgroup
		$templateCache.put('partials/formSelectField-radio.html', '<div ng-form name="subform"><label>{{label}}</label><label ng-repeat="option in optionList" class="{{customclass}}"><input type="radio" name="field" ng-model="$parent.ngModel" ng-value="option.el_key" ng-required="{{required}}"> {{option.el_val}}</label><div ng-if="subform.field.$dirty" ng-messages="subform.field.$error" ng-messages-include="js/validation_messages.html"></div></div>'); // radio fieldgroup
		$templateCache.put('partials/formSelectField-select.html', '<div ng-form name="subform"><label for="{{fieldID}}">{{label}}</label><select name="field" id="{{fieldID}}" ng-model="ngModel" class="{{customclass}}" ng-required="{{required}}"><option ng-repeat="option in optionList" ng-value="option.el_key">{{option.el_val}}</option></select><div ng-if="subform.field.$dirty" ng-messages="subform.field.$error" ng-messages-include="js/validation_messages.html"></div></div>'); // select field
		$templateCache.put('partials/formElement-qtychanger.html', '<div ng-form name="subform"><label for="{{qtyfieldID}}">{{label}}</label><div class="{{customclass}} quantitychanger"><button ng-click="changeQty(\'-\')">-</button><input type="text" name="quantity" id="{{qtyfieldID}}" ng-model="ngModel" ng-keydown="keyEvent($event)" ng-keyup="keyEvent($event)" ng-change="checkField()" placeholder="" /><button ng-click="changeQty(\'+\')">+</button></div><div ng-if="subform.quantity.$dirty" ng-messages="subform.pwdcompare.$error" ng-messages-include="js/validation_messages.html"></div><!-- TODO async validation --></div>'); // qty changer fieldset
		$templateCache.put('partials/formElement-payment.html', '<div ng-form name="subform"><label for="{{paymentFieldID}}">{{label}}</label><div class="{{customclass}}"><div><label>Name on card</label><input type="text" ng-model="ngModel.nameOnCard" placeholder="Name on card" /></div><div class="{{cardtype}}">card type: {{cardtype}}</div><div><label>Card number</label><input type="text" name="cardnumber" id="{{paymentFieldID}}" ng-keydown="keyPress($event)" ng-model="ngModel.cardNumberFormatted" placeholder="Card number" /></div><div ng-if="cardtype == \'amex\'"><label>Issue number</label><input type="text" ng-model="ngModel.issueNumber" placeholder="Issue number" /></div><div><label>CVV</label><input type="text" ng-model="ngModel.cvv" placeholder="CVV" /></div></div><div ng-if="subform.quantity.$dirty" ng-messages="subform.pwdcompare.$error" ng-messages-include="js/validation_messages.html"></div><!-- TODO async validation --></div>'); // payment fieldset
		$templateCache.put('partials/formElement-password.html', '<div ng-form name="subform"><label for="{{pwdFieldID}}">Please write a password</label><input type="password" name="pwdfield" id="{{pwdFieldID}}" ng-model="ngModel" class="{{customclass}}" ng-required="true" placeholder="Please write a password" /><label for="{{compareFieldID}}">Please ensure the password</label><input type="password" name="pwdcompare" id="{{compareFieldID}}" ng-model="compare" class="{{customclass}}" ng-required="true" placeholder="Please ensure the password" compare-to="ngModel" /><div ng-if="subform.pwdcompare.$dirty" ng-messages="subform.pwdcompare.$error" ng-messages-include="js/validation_messages.html"></div></div>'); // password compare fieldset
		$templateCache.put('validation_messages.html', '<div ng-message="required">You did not enter a field</div><div ng-message="email">The value entered is not email</div><div ng-message="min">The minimum value is {{min}}</div><div ng-message="compareTo">The two given passwords are not the same</div><div ng-message="password">Sorry, but your password must contain an uppercase letter, a number, a haiku, a gang sign, a hieroglyph and a blood of a virgin.</div><div ng-message="pattern">The given phrase does not match with the predefined pattern ({{definedpattern}})</div>'); // validation messages

		$scope = $rootScope.$new();

		$element_tf0 = $compile(angular.element('<basic-input ng-model="testform.field0"></basic-input>'))($scope);
		$element_tf1 = $compile(angular.element('<basic-input type="text" ng-model="testform.field1" label="Not required text field" validationpattern="/^[a-zàâçéèëòôöù]{2,50}$/i"></basic-input>'))($scope);
		$element_tf2 = $compile(angular.element('<basic-input type="email" ng-model="testform.field2" label="Required email field" required="true" placeholder="Sample"></basic-input>'))($scope);
		$element_tf3 = $compile(angular.element('<basic-input type="password" ng-model="testform.field3" label="Custom tpl field" customtemplate="extra"></basic-input>'))($scope);
		$element_tf4 = $compile(angular.element('<select-input type="select" elements="selem1|selement 1;selem2|selement 2;selem3|selement 3" ng-model="testform.sfield1" label="Select field"></select-input>'))($scope);
		$element_tf5 = $compile(angular.element('<form-element password-validator ng-model="testform.pvalid"></form-element>'))($scope);
		$element_tf6 = $compile(angular.element('<form-element payment-field ng-model="testform.payment" label="payment component"></form-element>'))($scope);
		$element_tf7 = $compile(angular.element('<form-element qty-changer ng-model="testform.qtychng" canminus="false" canzero="false" label="quantity changer" defaultqty="1"></form-element>'))($scope);
		$element_tf8 = $compile(angular.element('<form-async-element ng-repeat="item in asyncFormElements"></form-async-element>'))($scope);

		$scope.$root.$digest();
	}));

	it('Should have a standard input field', function() {
		expect($element_tf1.find('input').length).toBe(1);
	});

	it('Should have a label with content', function() {
		expect($element_tf1.find('label')[0].innerHTML).toBe('Not required text field');
	});

	it('Can use pattern-validation', function() {
		var attr = $element_tf1.find('input')[0].getAttribute('ng-pattern');
		expect(attr).toBe('/^[a-zàâçéèëòôöù]{2,50}$/i');
	});

	it('Able to be required', function() {
		var attr = $element_tf2.find('input')[0].getAttribute('required');
		expect(attr).toBe('required');
	});

	it('Using custom field template', function() {
		expect($element_tf3.find('aside').length).toBe(1);
	});

});