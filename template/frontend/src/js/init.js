/* global angular */
"use strict";
/**
 * @ngdoc module
 * @name Darwin-SaaS
 * @requires ui.bootstrap
 * @requires [predefined]
 * @description Main application module and namespace for Darwin application.
 * It uses Bootstrap UI and all modules which are defined in `package.json`'s application dependencies' branch
 * @author BCSG Frontend Team
 * @version 1.0
 */
angular.module('Darwin-SaaS', ['ui.bootstrap', '<%=initComponents %>'])
	.constant("Modernizr", Modernizr)
	.config(function($sceDelegateProvider, $locationProvider) {
		/**
		 * @description Set up URL whitelist
		 * @memberOf Darwin-SaaS
		 * @requires $sceDelegateProvider
		 * @function config
		 */
		$sceDelegateProvider.resourceUrlWhitelist([
			'self',
			'https://mbotc-cdn.global.ssl.fastly.net/**',
			'https://mbotc-stage-cloudsaasportal.global.ssl.fastly.net/**'
		]);
	})
	.controller('MainCtrl', ['$scope', '$rootScope', '$timeout', '$location', '$anchorScroll', function($scope, $rootScope, $timeout, $location, $anchorScroll) {

		$rootScope.cartData = {};
		$rootScope.mobileMenu = false;
		$rootScope.cartMenu = false;

		$scope.scrollToLocation = function(path, anchor) {
			$location.path(path);
			$timeout(function() {
				$anchorScroll(anchor);
			},500);
		}
	}]);
$(document).ready(function(){

	/***country phone number dropdown***/
	if($("#moMobileNumber").length){

		$("#moMobileNumber").intlTelInput({
			defaultCountry: OpCo,
		    //allowExtensions: true,
		    //autoFormat: false,
		    //autoHideDialCode: false,
		    //autoPlaceholder: false,
		    //defaultCountry: "auto",
		    //geoIpLookup: function(callback) {
		    //   $.get('http://ipinfo.io', function() {}, "jsonp").always(function(resp) {
		    //     var countryCode = (resp && resp.country) ? resp.country : "";
		   //      callback(countryCode);
		    //   });
		   // },
		    //nationalMode: false,
		    numberType: "MOBILE",
		    onlyCountries: ['cm', 'ci', 'gn', 'za', 'ug', 'ng', 'sz', 'zm', 'gh', 'rw'],
		    //preferredCountries: ['cn', 'jp'],
		    utilsScript: SaaS.location + "js/base/utils.js"
		});

		$("#moMobileNumber").keyup(function(){

			if($(this).val().length < 5) {
				$('#errorMoMobileNumber').show();
				$(this).addClass('error');
				$('#moMobileNumberContainer').addClass('error');
			}
			else
			{
				$('#errorMoMobileNumber').hide();
				$(this).removeClass('error');
				$('#moMobileNumberContainer').removeClass('error');
			}

		});

	}

});
