/// <reference path="gaTracking/module.js">
"use strict";

describe('gaTracking tests', function() {
	var ga, window, compileElement;

	beforeEach(function() {
		module('gaTracking');
	});

	beforeEach(inject(function(_ga_, $window, $rootScope, $compile) {
		ga = _ga_;
		window = $window;
		window.gaCalled = false;
		window.ga = function() {
			window.gaCalled = arguments;
		}
		spyOn(window, 'ga').and.callThrough();

		compileElement = function(html) {
			return $compile(angular.element(html))($rootScope.$new());
		}

	}));

	describe('gaTracking factory', function() {

		it('should pass params', function() {
			ga('send', 'pageview');
			expect(window.ga).toHaveBeenCalledWith('send', 'pageview')
		});

		it('should not throw anything', function() {
			delete window.ga;
			expect(window.ga).toBeUndefined();
			ga('send', 'pageview');
			expect(window.gaCalled).toBeFalsy();
		});

	});

	describe('gaTracking directive', function() {
		var el;

		it('should call on click', function() {
			el = compileElement('<button ga-tracking="testmsg">button</button>')
			expect(window.ga).not.toHaveBeenCalled();
			el.triggerHandler('click');
			expect(window.ga).toHaveBeenCalledWith('send', 'event', 'button', 'click', 'testmsg');
		});

	});


});