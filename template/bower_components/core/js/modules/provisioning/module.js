(function() {
	'use strict';
	angular.module('provisioning', [])
		.factory('provisioningService', ['$http',
			function($http) {

				function getProvisioningData(ajaxURL) {

					return $http.get(ajaxURL).then(function(result) {

						return result.data;

					});

				}

				function postProvisioningData(ajaxURL, postData, options) {

					var opts = angular.extend({
						token: '',
						header: ''
					}, options);

					var headers = {};
					headers[opts.header] = opts.token;

					return $http({
							url: ajaxURL,
							method: "POST",
							data: postData,
							headers: headers
							// headers: {'Content-Type': 'application/x-www-form-urlencoded'}
						})
						.then(function(response) {

								//debugger;

								// success
								return response.data;
							},
							function(response) { // optional
								// failed

								return response;
							}
						);
				}

				return {
					getProvisioningData: getProvisioningData,
					postProvisioningData: postProvisioningData
				};
			}
		])
		.controller('provisioningCtrl', ['$scope', 'provisioningService',
			function($scope, provisioningService) {

				// Set initial state to empty - match to first form

				$scope.isLoading = false;
				$scope.guesses = 0;


				if (typeof initialDefinedState != "undefined") {
					$scope.state = initialDefinedState;
				} else {
					$scope.state = '';
				}


				$scope.money = 0;
				//debugger;

				$scope.inlineSubmit = function(targetState) {

					// Show target state inline (without ajax or refresh)

					event.preventDefault();

					$scope.state = targetState;

				};


				$scope.ajaxSubmit = function(event, ajaxURL) {

					event.preventDefault();

					$scope.isLoading = true;

					// Format provisioning data:
					//debugger;

					// Set product to string before passing back to server
					// $scope.productJson = $scope.product.stringify();

					// Wrap data in 'user' object
					var data = {
						'user': $scope.user,
						'product': $scope.product,
						'kkProduct': $scope.kkProduct,
						'productJson': $scope.productJson,
						'accountJson': $scope.accountJson,
						'billingPostcode': $scope.billingPostcode,
						'emailToPurchase': $scope.emailToPurchase,
						'sendEmailToMaster': $scope.sendEmailToMaster,
						'continueWithExistingAccount': $scope.continueWithExistingAccount,
						'memorableQuestionId': $scope.memorableQuestionId,
						'emailMaster': $scope.emailMaster,
						'editPaymentDetails': $scope.editPaymentDetails,
						'account': $scope.account,
						'eeCRMFound': $scope.eeCRMFound,
						'eeBrand': $scope.eeBrand,
						'eeSegment': $scope.eeSegment,
						'failedAttempts': $scope.failedAttempts,
						'error': $scope.error,
						'setUpNewCompany': $scope.setUpNewCompany,
						'setUpNewMaster': $scope.setUpNewMaster,
						'state': $scope.state
					};


					// Prepare data for submit:
					// Remove any email confirmation - only required for FE validation
					delete data.user.confirmEmail;
					// Remove secret question check - only required for FE validation
					delete data.user.memorableAnswerCheck;


					var options = {};

					var $input = $(event.currentTarget).parents('form').find('input[type="hidden"]');

					// Options can include _csrf.token & headerName
					options.token = $input.val();
					options.header = $input.attr('data_header');

					//provisioningService.postProvisioningData(ajaxURL, $scope.data).then(function (data) {
					provisioningService.postProvisioningData(ajaxURL, data, options).then(function(data) {

						//debugger;

						// On success:

						$scope.isLoading = false;

						// Put returned data into scope
						$scope.title = data.title;
						$scope.user = data.user;
						$scope.error = data.error;
						$scope.productJson = data.productJson;
						$scope.accountJson = data.accountJson;
						$scope.billingPostcode = data.billingPostcode;
						$scope.emailToPurchase = data.emailToPurchase;
						$scope.sendEmailToMaster = data.sendEmailToMaster;
						$scope.continueWithExistingAccount = data.continueWithExistingAccount;
						$scope.memorableQuestionId = data.memorableQuestionId;
						$scope.emailMaster = data.emailMaster;
						$scope.editPaymentDetails = data.editPaymentDetails;
						$scope.account = data.account;
						$scope.eeCRMFound = data.eeCRMFound;
						$scope.eeBrand = data.eeBrand;
						$scope.eeSegment = data.eeSegment;
						$scope.failedAttempts = data.failedAttempts;
						$scope.error = data.error;
						$scope.setUpNewCompany = data.setUpNewCompany;
						$scope.setUpNewMaster = data.setUpNewMaster;
						$scope.state = data.state;

						// Process product JSON into object
						$scope.product = $scope.getDataFromJSON(data.productJson);

						// Move to next page/form
						$scope.inlineSubmit(data.state);

					});

					return false;

				};


				$scope.getDataFromJSON = function(dataStr) {

					// Parse JSON string into actual JSON
					var data = JSON && JSON.parse(dataStr) || $.parseJSON(dataStr);

					return data;
				};


				$scope.checkMemorableAnswer = function(path) {

					$scope.guesses += 1;

					if ($scope.user.memorableAnswerCheck === $scope.user.memorableAnswer) {
						$('form[name=captureAdditionalInfo]').submit();
					}

				};


				// Custom validation

				$scope.paymentModulusValid = function() {

					//debugger;

					// Confirm that all DD details are correct before modulus check
					// return (paymentDetails.user.holderName.$valid && all other fields);
					return (paymentDetails.user.holderName.$valid);

				};

				$scope.doModulusCheck = function() {

					// Do modulus check
					// TODO:

					// if successful
					$scope.modulusCheck = true;

				};


				$scope.setupDirectDebit = function() {

					// TODO: do check & set up

					$scope.inlineSubmit('ddSuccess');

				};


				$scope.validateCCDetails = function() {

					// TODO: Validate form fields

				};


				$scope.makeCCPayment = function() {

					// TODO: Make Credit card payment through service and deal with response

				};

			}
		]);
})();