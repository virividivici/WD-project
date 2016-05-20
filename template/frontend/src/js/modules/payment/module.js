(function() {
	'use strict';
	angular.module('payment', [])
	    .controller('npgCtrl',[ '$scope','$sce', '$parse', function($scope, $sce, $parse) {
            
            $scope.paymentForm = npgForm || {};
           

            $scope.trustSrc = function(src) {
                
                return $sce.trustAsResourceUrl(src);
            };
            
        }])
		.controller('paymentCtrl',[ '$scope', function($scope) {
			
			$scope.iframedisplay = false;
			$scope.submitDisabled= true;
			$scope.submitPayhost = function() {
			
				$scope.submitDisabled= true;
				return true;
			}
			$(window).load(function() {
				if($('#securePaymentWindow').length) {
					$('#securePaymentWindow').modal('show');
				}
			});
            
		}])
		.controller('momoCtrl',[ '$scope', '$http' , function($scope, $http) {
			
			$scope.displayVerification = false;
			$scope.displayVerificationErrorMsg = '';
			$scope.restUrl = SaaS.restlocation.split('/en/');

            $scope.sendVerificationCode= function(opt1, opt2){

				
            	$scope.restUrl = SaaS.restlocation.split('/en/');
				var options = {};

                options.token = opt1;
                options.header = opt2;
                var opts = angular.extend({
                    token: '',
                    header: ''
                }, options);
               
                var headers = {};
                headers[opts.header] = opts.token;
               	
                var mobileNumber = $("#moMobileNumber").intlTelInput("getNumber").split('+')[1];
             
                $scope.restUrl = SaaS.restlocation.split('/en/');
               	$http({
                    url: $scope.restUrl[0] + 'rest/momo/verificationcode/' + mobileNumber,
                    method: "GET",
                    data: {},
                    headers: headers
                    
                })
                .then(function(response) {
                        $scope.displayVerificationErrorMsg = false;
                        $scope.displayVerification = true;
                    },
                    function(response) { // optional
                        
                        $scope.displayVerificationErrorMsg = false;
                        $scope.displayVerification = true;
                    }
                );
            }


            $scope.requestPayment= function(opt1, opt2){

				
            	$scope.restUrl = SaaS.restlocation.split('/en/');
				var options = {};

                options.token = opt1;
                options.header = opt2;
                var opts = angular.extend({
                    token: '',
                    header: ''
                }, options);
               
                var headers = {};
                headers[opts.header] = opts.token;
               	
                var verificationcode = $("#verificationCode").val();
                console.log(verificationcode , headers);
                $scope.restUrl = SaaS.restlocation.split('/en/');
                console.log($scope.restUrl[0]);
               	$http({
                    url: $scope.restUrl[0] + 'rest/momo/verify/' + verificationcode,
                    method: "POST",
                    data: {},
                    headers: headers
                    
                })
                .then(function(response) {
                	
                	
		                if(response.status == 201)	{

		                 	$scope.displayVerification = true;
		                }
		                else {
		                 	$scope.displayVerificationErrorMsg = response.statusText;
		                    //$scope.displayVerification = false;
		                }


                    },
                    function(response) { // optional

	                    $scope.displayVerificationErrorMsg = response.statusText;
	                    $scope.displayVerification = false;
                    }
                );
            }

		}]);
//return loaded


})();