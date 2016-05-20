/// <reference path="welcomePage/module.js">
"use strict";

describe('welcomePage tests', function() {

	beforeEach(function() {
		module('welcomePage');
	});

	it('Sample test is loaded', function() {
		expect(true).toEqual(true);
	});

});