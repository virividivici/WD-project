/// <reference path="payment/module.js">
"use strict";

describe('Payment tests', function() {

	beforeEach(function() {
		module('payment');
	});

	it('Sample test is loaded', function() {
		expect(true).toEqual(true);
	});

});