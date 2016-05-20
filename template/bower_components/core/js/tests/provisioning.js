/// <reference path="provisioning/module.js">
"use strict";

describe('Provisioning tests', function() {

	beforeEach(function() {
		module('provisioning');
	});

	it('Sample test is loaded', function() {
		expect(true).toEqual(true);
	});

});