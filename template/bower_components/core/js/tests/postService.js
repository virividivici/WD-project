/// <reference path="postService/module.js">
"use strict";

describe('postService tests', function() {

	beforeEach(function() {
		module('postService');
	});

	it('Sample test is loaded', function() {
		expect(true).toEqual(true);
	});

});