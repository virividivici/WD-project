(function() {
	'use strict';
	angular.module('payment', ['ngSanitize'])
		.controller('paymentCtrl', ['$scope', '$http', 'postService', '$sce', '$compile',
			function($scope, $http, postService, $sce, $compile) {

				// Get initial data into scope
				$scope.formData = json || {};
				$scope.modulusCheck = false;
				$scope.modulusCheckNO = false;

				$scope.findAddressDisplay2 = false;
				$scope.showDetails = false;
				// Fix issue setting form action to URL with different domain
				$scope.trustSrc = function(src) {
					return $sce.trustAsResourceUrl(src);
				};

				//     $scope.findAddressFromPostcode = function (event, customConfig, method) {

				//         var formNames={};
				//         //console.log(method);
				//         if(method == 'credit'){
				//             if(customConfig){
				//                 customConfig.address1 ? formNames.address1 = customConfig.address1 : formNames.address1 = "bill_to_address_line1";
				//                 customConfig.town ? formNames.town = customConfig.town : formNames.town = "bill_to_address_city";
				//                 customConfig.postcode ? formNames.postcode = customConfig.postcode : formNames.postcode = "bill_to_address_postal_code";


				//             }else{
				//                 formNames.address1 = "bill_to_address_line1";                    
				//                 formNames.town = "bill_to_address_city";
				//                 formNames.postcode = "bill_to_address_postal_code";
				//             }

				//         }else{
				//             if(customConfig){
				//                 customConfig.address1 ? formNames.address1 = customConfig.address1 : formNames.address1 = "accAddress1";
				//                 customConfig.address2 ? formNames.address2 = customConfig.address2 : formNames.address2 = "accAddress2";
				//                 customConfig.town ? formNames.town = customConfig.town : formNames.town = "accTown";
				//                 customConfig.postcode ? formNames.postcode = customConfig.postcode : formNames.postcode = "accPostCode";
				//             }else{
				//                 formNames.address1 = "accAddress1";
				//                 formNames.address2 = "accAddress2";
				//                 formNames.town = "accTown";
				//                 formNames.postcode = "accPostCode";
				//             }

				//         }


				//         // Use service to find postcode
				//         var _scope = $scope;
				//         var $form = $(event.currentTarget).parents('form');
				//         var cp_obj = CraftyPostcodeCreate();

				//         cp_obj.set("access_token", "5db81-bbb52-7bebe-010f9"); // TFC's temp access token
				//         // cp_obj.set("access_token", "xxxxx-xxxxx-xxxxx-xxxxx"); // access token

				//         // Free postcodes for testing
				//         // AA11AA, AA11AB, AA11AD and AA11AE

				//         cp_obj.set("result_elem_id", $form.attr('name')+"-postcode");
				//         cp_obj.set("first_res_line", 'Please Select');
				//         cp_obj.set("res_autoselect", 0);

				//         cp_obj.set("form", $form.attr('name'));
				//         // cp_obj.set("elem_company"  , "companyname");
				//         cp_obj.set("elem_street1"  , formNames.address1);
				//           if(method == 'debit'){
				//         cp_obj.set("elem_street2"  , formNames.address2);
				// }
				//         // cp_obj.set("elem_street3"  , "address3");
				//         cp_obj.set("elem_town"     , formNames.town);
				//         // cp_obj.set("elem_county"   , "county");
				//         cp_obj.set("elem_postcode" , formNames.postcode);
				//         // callback on success
				//         cp_obj.set("on_result_ready", function () {
				//             $scope.postCodeCheckError = '';
				//             $scope.selectedPostCode = 'Please Select';
				//             $scope.postCodeFind = $form.attr('name')+"-postcode";
				//             // Remove select on click
				//             var $selectOuter = $('#'+$form.attr('name')+"-postcode");
				//             // $select.find('select').addClass('form-control input-lg');
				//             var $select = $selectOuter.find('select');
				//             $select.addClass('form-control input-lg');
				//             $select.attr("ng-model","selectedPostCode");
				//             $select.attr("ng-change","updateSelectedPostcode()");
				//             // $select.attr('sass-select', 'sass-select');

				//             // var ngSelect = angular.element($select.find('select'));

				//             //debugger;

				//             var newNgSelect = $compile($selectOuter.parent())($scope);

				//             // $select.after(newNgSelect);

				//             $scope.$apply();

				//         });

				//         // callback on selection
				//         cp_obj.set("on_result_selected", function () {
				//             $scope.postCodeCheckError = '';
				//             $scope.postCodeCheck = $form.attr('name')+"-postcode";

				//             // OLD FIELD LOOP... DO NOT DELETE UNTIL TELESALES FLOW FULLY COMPLETE AND WORKING

				//                 // Loop through fields and add them to the scope (if not already in there)
				//                 // this adds the result of the lookup to the scope
				//                 // _.each($form.find('.address input'), function (field) {
				//                 //     
				//                 //     // push the content
				//                 //     if (!$scope[$(field).attr('name')]) {
				//                 //         $scope[$(field).attr('name')] = $(field).val();
				//                 //     }
				//                 //
				//                 // });

				//             _.each(formNames, function (value, key) {

				//                 //var field = $form.find("input[name="+value+"]");


				//                 //Due to auto generated fields being added into the scope in an array with unknown length, 
				//                 //we have to loop through this array to assign scope values correctly to allow for angularJS 
				//                 //validation to work correctly.

				//                 if(customConfig){

				//                     var currentFieldName = $('input[name=' + value + ']').attr('name');

				//                     var currentValue = $('input[name=' + value + ']').val();


				//                     var generatedFields = $scope.formData.fields;

				//                     _.each(generatedFields, function (field) {

				//                         if(field.name == currentFieldName){
				//                             field.value = currentValue;

				//                         }

				//                     });
				//                 }

				//                 if (!$scope[$(this[value]).attr('name')]) {

				//                     $scope[value] = $("input[name='" + value+ "']").val();

				//                 }
				//                 if(method == 'debit'){
				//                     $('input#dd-proceed').attr('disabled',false);

				//                 }
				//             });

				//             // Update the scope
				//             $scope.$apply();

				//             // Do cleanup:
				//             // remove select wrapper contents
				//             //$('#'+$form.attr('name')+"-postcode").html('');

				//             // show 'find postcode' button again

				//         });

				//         // On error just show the other fields
				//         cp_obj.set("on_error", function () {

				//             $scope.postCodeCheckError = $form.attr('name')+"-postcode";

				//             // Check if field empty or not. Error happens only if empty
				//             if($('input[name='+formNames.postcode+']').val() !== ''){
				//                 $scope.$apply();
				//             }

				//         });

				//         cp_obj.doLookup();

				//     }

				//     $scope.updateSelectedPostcode = function () {
				//         //debugger;
				//         var $select = $(event.currentTarget);
				//         if ($scope.selectedPostCode != $select.val()) {
				//             $scope.selectedPostCode = $select.val();

				//             $scope.$apply();
				//         }

				//     }


				//     $scope.doModulusCheck = function (AccountNumber, SortCode) {

				//         var validBankAccount = BankAccountValidation_Interactive_Validate_v2_00('JE28-DY24-YN89-WJ82', AccountNumber, SortCode);
				//         validBankAccount.then(function(data){

				//             if(data.Items[0].IsCorrect){


				//                 $('.modulusCheckNo').hide();
				//                 $('.modulusCheck').show();
				//                 $scope.modulusCheck = true;
				//                 $scope.modulusCheckNO = false; 

				//             }else{

				//                $('.modulusCheckNo').show();
				//                $('.modulusCheck').hide(); 
				//                $scope.modulusCheck = false;
				//                $scope.modulusCheckNO = true; 

				//             }
				//         });



				//         //$scope.modulusCheck = true;

				//     }

				function addressComplete_Interactive_Find_v2_00End(response, formId) {

					// Test for an error
					$scope.showDetails = true;
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

					var url = "https://ws1.postescanada-canadapost.ca/AddressComplete/Interactive/Find/v2.00/json3.ws?";

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

				$scope.pickPaymentAddress = function() {
					$scope.paymentAddress = $('select#billingAddressDD').val();

					var address = $scope.addressSearchResult2[$scope.paymentAddress].Text.split(',');
					var holder = '';
					for (i = 1; i < address.length; i++) {
						holder += address[i];
					}

					$('input#bill_to_address_line1').val(holder.trim());
					$('input#bill_to_address_city').val(address[address.length - 2].trim());
					$('input#bill_to_address_state').val(address[address.length - 1].trim());
				};
				$scope.weMustGoBack = function() {
					window.history.back();
				};

			}
		]);
})();