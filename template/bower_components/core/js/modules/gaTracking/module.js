/**
 * Directive for tracking user events and send to Google Analytics
 * @author Miklos Urban <miklos.urban@bcsg.com>
 * @description Initialize and set up a Google Analytics tracker and handle a directive for link clicking.
 * If as an attribute the `ga-tracking` is present on an element, when clicking the script get it's type (button, inner or outside link),
 * the target (if link), and the message or description which going to send to Google An.
 * If there is no given message, the script takes the content of `title` attribute, if not present, get the first 64 chars of inner HTML content.
 * If all fails the message will be `element`, point that the user was clicked on something which isn't properly named.
 * @dependency `ga` [async] Google Anaylitics script in `window`
 */
(function() {
	"use strict";
	angular.module('gaTracking', [])
		.factory('ga', ['$window',
			function($window) {
				return function() {
					if (angular.isArray(arguments[0])) {
						for (var i = 0; i < arguments.length; ++i) {
							ga.apply(this, arguments[i]);
						}
						return;
					}
					if ($window.ga) {
						$window.ga.apply(this, arguments);
					}
				};
			}
		])
		.run(['$rootScope', '$location', 'ga',
			function($rootScope, $location, ga) {
				$rootScope.$on('$routeChangeStart', function() {
					ga('set', 'page', $location.url());
				});
			}
		])
		.directive('gaTracking', ['ga',
			function(ga) {
				return {
					restrict: 'A',
					link: function($scope, iElm, iAttrs) {
						var bindEvent = iAttrs.gaOn || 'click',
							onEvent = function() {
								var message = iAttrs.gaTracking,
									command = null,
									action = null,
									category = null,
									href = iElm.attr('href');

								message = (message.length === 0) ?
									((iElm[0].title.length === 0) ?
									((iElm[0].innerText.length === 0) ?
										'element' : iElm[0].innerText) : iElm[0].title) : message;
								href = (href && href === '#') ? null : href;
								action = (href) ? href : 'click';
								category = (href && href[0] !== '#' ? (href.match(/\/\//) ? 'link-out' : 'link-in') : 'button');
								command = ['send', 'event', category, action, message];
								ga.apply(null, command);
							};
						if (bindEvent === 'init') {
							onEvent();
						} else {
							iElm.bind(bindEvent, onEvent);
						}
					}
				};
			}
		]);
})();