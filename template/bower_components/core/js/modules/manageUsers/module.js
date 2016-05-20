(function() {
	'use strict';
	angular.module('manageUsers', [])
		.filter('userFilter', function() {
			//custom filter
			return function(users, searchText, currentTabArray) {
				//set up the regex to search against search term loosely
				var searchRegx = new RegExp(searchText, "i");
				//check if any search terms or tabs are selected
				if (searchText === undefined && currentTabArray == []) {
					//If not return whole user list
					return users;
				}
				//if search criteria, set up empty return object
				var result = [];
				//loop throug all users
				for (i = 0; i < users.length; i++) {
					//group first and last name
					var fullName = users[i].firstName + " " + users[i].lastName;
					//first check search term against email and name
					if (fullName.search(searchRegx) != -1 ||
						users[i].email.search(searchText) != -1) {
						//check if there is a tab selected
						if (currentTabArray.length) {
							//if so grab first letter of last name
							var firstLetter = users[i].lastName.substring(0, 1).toLowerCase();
							//check if current last name first letter matches current array of allowed letters
							if (currentTabArray.indexOf(firstLetter) > -1) {
								//if yes push into shown array
								result.push(users[i]);
							}
						} else {
							//no tab selected add this to shown list
							result.push(users[i]);
						}

					}
				}
				//return user list to be shown
				return result;
			};
		})
		.controller('myProfileCtrl', ['$scope', '$http',
			function($scope, $http) {

				$scope.addressSearchResult = '';

				function addressComplete_Interactive_Find_v2_00End(response, formId) {

					// Test for an error
					if (response.Items.length == 1 && typeof(response.Items[0].Error) != "undefined") {
						// Show the error message
						alert(response.Items[0].Description);
					} else {
						// Check if there were any items found
						if (response.Items.length === 0)
							alert("Sorry, there were no results");
						else {

							$scope[formId] = response.Items;
							if (formId == 'addressSearchResult2') {
								$scope.findAddressDisplay2 = true;
							}
						}
					}
				}

				$scope.AddressComplete_Interactive_Find_v2_00Begin = function(Key, SearchTerm, LastId, SearchFor, Country, LanguagePreference, formID) {

					var url = "https://ws1.postescanada-canadapost.ca/AddressComplete/Interactive/Find/v2.00/json3.ws?"; // TODO this has to be implemented on server side, do not ask 3rd party from frontend

					// Build the query string
					url += "&Key=" + encodeURIComponent(Key); //AA11-AA11-AA11-AA11
					url += "&SearchTerm=" + encodeURIComponent(SearchTerm); //k1a0b1
					url += "&LastId=" + encodeURIComponent(LastId); //
					url += "&SearchFor=" + encodeURIComponent(SearchFor); //Everything
					url += "&Country=" + encodeURIComponent(Country); //CAN
					url += "&LanguagePreference=" + encodeURIComponent(LanguagePreference); //EN

					$http.get(url)
						.success(function(response) {
							addressComplete_Interactive_Find_v2_00End(response, formID);
						});

				};

				$scope.pickBusinessAddress = function() {

					var address = $scope.businessAddress.Text.split(',');
					var holder = '';
					for (i = 1; i < address.length - 2; i++) {
						holder = holder + address[i];
					}
					$scope.address.streetName = holder.trim();
					$scope.address.city = address[address.length - 2].trim();
					$scope.address.county = address[address.length - 1].trim();
				};

			}
		])
		.controller('manageUsersCtrl', ['$scope', 'postService', '$http',
			function($scope, postService, $http) {

				// Define list of results
				$scope.results = json;

				// Define current visible result
				$scope.currentResults = $scope.results;
				// Init current tab to null
				$scope.currentTab = "";
				// Init tabArray to empty object
				$scope.currentTabArray = [];
				// Init error header to empty
				$scope.ajaxErrorHeader = "";

				$scope.confirmBgClass = '';

				$http.get(SaaS.location + '/docroot/assets/js/json_' + locale + '.properties').success(function(data) {
					$scope.i18nMessages = data;
				});

				$scope.setUserStatusDisplay = function(userId, userStatus) {

					$scope['userStatusModel' + userId] = userStatus;

				};

				$scope.getUserStatusDisplay = function(userId) {

					var status = $scope['userStatusModel' + userId];

					if (typeof $scope.i18nMessages === 'undefined') {
						return status;
					}
					return $scope.i18nMessages[status];
				};

				$scope.setUserGroupDisplay = function(userId, allUserRole, userGroupId) {

					angular.forEach(allUserRole, function(listObj, index) {
						// Once found remove from scope                    
						if (listObj.id == userGroupId) {
							$scope['userRoleModel' + userId] = listObj.displayName;
						}
					});
				};

				$scope.getUserGroupDisplay = function(userId) {

					var group = $scope['userRoleModel' + userId];

					if (typeof $scope.i18nMessages === 'undefined') {
						return status;
					}
					return $scope.i18nMessages[group];
				};

				$scope.updateMe = function(item) {

					$scope[item] = true;
				};

				$scope.processTab = function(array) {
					//check if tab being clicked for a second time (to turn off)
					if ($scope.currentTabArray[0] === array[0]) {
						//reset
						$scope.currentTabArray = [];
					} else {
						//set to clicked tab array
						$scope.currentTabArray = array;
					}
				};

				//var dataUrls = $($event.currentTarget).parents('form').attr('data-ajax-urls');

				$scope.changeUserGroup = function(userId, value, url) {
					$scope.roleIsLoading = true;
					//Set ajax URL from options sent through
					var ajaxURL = url + userId + '/' + value;
					// Create data object so that postData in return object is ready to use in callbacks
					var data = {};
					data.userId = userId;
					data.value = value;
					data.origin = "Change Group";
					var callback = $scope.changeUserGroupCallback;
					// Make the Ajax call
					$scope.makeAjaxCall(ajaxURL, data, callback);
				};

				$scope.changeUserGroupCallback = function(response) {

					$scope.roleIsLoading = false;
					$scope['userRoleModel' + response.postData.userId] = response.data.displayName;
					$scope['editrole' + response.postData.userId] = false;
				};

				$scope.changeUserStatus = function(userId, value, url) {
					$scope.statusIsLoading = true;
					var ajaxURL = url + userId + '/' + value;
					// Create data object so that postData in return object is ready to use in callbacks
					var data = {};
					data.userId = userId;
					data.value = value;
					data.origin = "Change Status";
					var callback = $scope.changeUserStatusCallback;
					// Make the Ajax call
					$scope.makeAjaxCall(ajaxURL, data, callback);

				};

				$scope.changeUserStatusCallback = function(response) {
					$scope.statusIsLoading = false;
					$scope['userStatusModel' + response.postData.userId] = response.data.displayName;
					$scope['editstatus' + response.postData.userId] = false;
				};

				$scope.unsubscribeProduct = function(userId, value, url) {
					$scope['removingLicence' + userId + value] = true;
					var ajaxURL = url + userId + '/' + value;
					// Create data object so that postData in return object is ready to use in callbacks
					var data = {};
					data.userId = userId;
					data.value = value;
					data.origin = "Unsubscribe Product";

					// Set a function to run on a custom callback
					var callback = $scope.unsubscribeProductCallback;

					// Make the Ajax call
					$scope.makeAjaxCall(ajaxURL, data, callback);
				};

				$scope.confirmRemoveUser = function(item) {

					$scope[item] = true;
				};

				$scope.cancelRemoveUser = function(item) {

					$scope[item] = false;
				};

				$scope.removeUser = function(event, userId) {

					// Handle 'remove User' button

					var data = {};
					data.userId = userId;
					data.origin = "Remove User";

					// // save local copy
					// var _scope = $scope;

					var ajaxURL = $(event.currentTarget).attr('data-path');

					var callback = $scope.removeUserCallback;

					$scope.makeAjaxCall(ajaxURL, data, callback);

				};

				$scope.unsubscribeProductCallback = function(response, identifier) {

					// Hunt to find the original product clicked
					angular.forEach($scope.results.users, function(userObject, key) {

						// Loop all users until response user is found
						if (userObject.id == response.postData.userId) {

							// Once found loop all products
							angular.forEach(userObject.products, function(product, key) {

								// Once found remove from scope
								if (product.productId == response.postData.value) {
									userObject.products.splice($.inArray(product, userObject.products), 1);
								}
							});

						}

					});

				};

				$scope.confirmRemoveUserLicence = function(identifier, userId, productId) {

					$scope[identifier + userId + productId] = true;

				};

				$scope.cancelRemoveUserLicence = function(identifier, userId, productId) {

					$scope[identifier + userId + productId] = false;

				};

				$scope.removeUserCallback = function(response) {
					// success so remove user

					// Find the user in results, based on id
					var newUsers = _.reject($scope.results.users, function(el) {
						return el.id === response.postData.userId;
					});

					// remove user
					$scope.results.users = newUsers;

					$scope.currentTab = "";
					$scope.currentTabArray = [];

					// Remove from current users
					newUsers = _.reject($scope.currentResults.users, function(el) {
						return el.id === response.postData.userId;
					});

					// remove the user
					$scope.currentResults.users = newUsers;
				};

				$scope.makeAjaxCall = function(ajaxURL, data, callbackFn) {

					var options = {};

					// Options can include _csrf.token & headerName
					options.token = $scope.serverToken;
					options.header = $scope.serverHeader;

					postService.postData(ajaxURL, data, options).then(function(response) {

						if (response.data.success) {

							// Reset error
							$scope.ajaxErrorHeader = '';

							// Check to see if there is a custom callback
							if (callbackFn) {
								// Run custom callback
								callbackFn(response);
							}

						} else {
							// If there is an error set model vars to show in UI (if applicable)
							$scope.ajaxErrorHeader = data.origin;
							$scope.ajaxErrorMessage = response.data.error;
						}

					});

				};

			}
		])
		.controller('registrationCtrl', ['$scope', '$http', 'postService', '$sce', '$compile', '$timeout',
			function($scope, $http, postService, $sce, $compile, $timeout) {

				$timeout(function() {
					$http.get(SaaS.location + '/docroot/assets/js/json_' + locale + '.properties').success(function(data) {
						$scope.i18nMessages = data;
					});

				}, 0);


				$scope.userData = {
					"user": {
						"firstName": provisioningWrapper.user.firstName,
						"lastName": provisioningWrapper.user.lastName,
						"password": '',
						"password2": '',
						"marketingEmail": provisioningWrapper.user.marketingEmail,
						"marketingPhone": provisioningWrapper.user.marketingPhone,
						"account": {
							"name": provisioningWrapper.user.account.name,
						},
						"email": provisioningWrapper.user.email,
						"confirmEmail": provisioningWrapper.user.email,
						"mobileNumber": provisioningWrapper.user.mobileNumber
					},
					"address": {
						"postCode": provisioningWrapper.address.postCode,
						"streetName": provisioningWrapper.address.streetName,
						"secondLine": provisioningWrapper.address.secondLine,
						"city": provisioningWrapper.address.city,
						"county": provisioningWrapper.address.county,
						"country": 'Canada'
					}
				};

				$scope.billingAddressDD = ' ';
				$scope.registerSuccess = cybersourceError;
				$scope.cybersourceError = cybersourceError;
				if (cybersourceError) {
					$scope.radioSwitch = 'cyber';
				}

				$scope.registerSubmit = true;
				$scope.buttonDisabled = false;
				$scope.paymentFormFields = provisioningWrapper.paymentForm || {};
				if (provisioningWrapper.paymentForm !== null) {
					$scope.paymentFormFields.action = provisioningWrapper.paymentForm.action;
				} else {
					$scope.paymentFormFields.action = '#';
				}
				$scope.addressSearchResult = '';
				$scope.addressSearchResult2 = '';
				$scope.businessAddress = 'hello work';
				$scope.paymentAddress = 'hello';
				$scope.step1 = "active-step";
				$scope.step2 = "not-active-step";
				$scope.findAddressDisplay2 = false;
				$scope.errorMessages = [];

				$scope.trustSrc = function(src) {
					return $sce.trustAsResourceUrl(src);
				};

				$scope.sameAddress = function(check, postCode, streetName, city, state, country, submitButtonId) {


					if (!check) {

						$('input#bill_to_address_postal_code').val(postCode);

						$('input#bill_to_address_line1').val(streetName);

						$('input#bill_to_address_city').val(city);

						$('input#bill_to_address_state').val(state);

						$('input#bill_to_address_country').val(country);

					} else {
						$('input#bill_to_address_postal_code').val("");
						$('input#bill_to_address_line1').val("");
						$('input#bill_to_address_city').val("");
						$('input#bill_to_address_state').val("");
						$('input#bill_to_address_country').val("");
					}
					if (submitButtonId) {
						$('#' + submitButtonId).attr('disabled', false);
					}


				};

				$scope.registerUserAccount = function(formData, ajaxUrl, opt1, opt2) {

					$('#registerDetailsError').hide();

					$scope.buttonDisabled = true;
					$scope.registerSubmit = false;

					postData = $scope.userData;

					var options = {};

					options.token = opt1;
					options.header = opt2;

					postService.postData(ajaxUrl, postData, options).then(function(response) {

						if (response.data.success) {

							$scope.step1 = "not-active-step";
							$scope.step2 = "active-step";
							$scope.paymentFormFields = response.data.paymentForm;
							$scope.registerSuccess = true;
							$("html, body").animate({
								scrollTop: 0
							}, "slow");
						} else {

							angular.forEach(response.data.errors, function(value, key) {

								$scope.errorMessages.push($scope.i18nMessages[value.code]);

							});
							$('#registerDetailsError').show();
							$scope.buttonDisabled = false;
							$scope.registerSubmit = true;
						}

					});

				};

				function addressComplete_Interactive_Find_v2_00End(response, formId) {

					// Test for an error
					if (response.Items.length == 1 && typeof(response.Items[0].Error) != "undefined") {
						// Show the error message
						alert(response.Items[0].Description);
					} else {
						// Check if there were any items found
						if (response.Items.length === 0)
							alert("Sorry, there were no results");
						else {

							$scope[formId] = response.Items;
							if (formId == 'addressSearchResult2') {
								$scope.findAddressDisplay2 = true;
							}
						}
					}
				}

				$scope.AddressComplete_Interactive_Find_v2_00Begin = function(Key, SearchTerm, LastId, SearchFor, Country, LanguagePreference, formID) {

					var url = "https://ws1.postescanada-canadapost.ca/AddressComplete/Interactive/Find/v2.00/json3.ws?"; // TODO same as above, put this to server side

					// Build the query string
					url += "&Key=" + encodeURIComponent(Key); //AA11-AA11-AA11-AA11
					url += "&SearchTerm=" + encodeURIComponent(SearchTerm); //k1a0b1
					url += "&LastId=" + encodeURIComponent(LastId); //
					url += "&SearchFor=" + encodeURIComponent(SearchFor); //Everything
					url += "&Country=" + encodeURIComponent(Country); //CAN
					url += "&LanguagePreference=" + encodeURIComponent(LanguagePreference); //EN

					$http.get(url)
						.success(function(response) {
							addressComplete_Interactive_Find_v2_00End(response, formID);
						});

				};

				$scope.pickBusinessAddress = function() {

					var address = $scope.businessAddress.Text.split(',');
					var holder = '';
					for (i = 1; i < address.length - 2; i++) {
						holder = holder + address[i];
					}
					$scope.userData.address.streetName = holder.trim();
					$scope.userData.address.city = address[address.length - 2].trim();
					$scope.userData.address.county = address[address.length - 1].trim();
				};

				$scope.pickPaymentAddress = function(submitButtonId) {
					$scope.paymentAddress = $('select#billingAddressDD').val();

					var address = $scope.addressSearchResult2[$scope.paymentAddress].Text.split(',');
					var holder = '';
					for (i = 1; i < address.length; i++) {
						holder += address[i];
					}

					$('input#bill_to_address_line1').val(holder.trim());
					$('input#bill_to_address_city').val(address[address.length - 2].trim());
					$('input#bill_to_address_state').val(address[address.length - 1].trim());
					if (submitButtonId) {
						$('#' + submitButtonId).attr('disabled', false);
					}
				};
			}
		]);
})();