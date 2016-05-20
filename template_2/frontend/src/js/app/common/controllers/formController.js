angular.module('saas')

    .controller('formCtrl', ['$scope', 'postService', 'getService', '$http', function ($scope, postService, getService, $http ) {
        $scope.emailSent = false;
        $scope.buttonDisabled = false;

        /*employeesDataUrl = '/rest/eesales/autocomplete/00';
        $scope.employeeData = getService.getData(employeesDataUrl).then(function (response) {
          if (response.data) {
            return response.data;
          }
          else {
              //console.log("error get employees data: "+response);
          }
        });*/

        // Angular filter doesnt't work with the promises so the piace of code above doesnt work beacuse the get service in src/js/app/common/services/getService.js uses the promises with 'then'
        // To try a solution to move this code in the 'getServices.js' 
        $scope.employeeData = null;
        $http.get('/rest/eesales/autocomplete/00').success(function(data) {
            $scope.employeeData = data;
        });

        $scope.sendMoreInfoEmail = function(formData,ajaxUrl , opt1 , opt2 ) {
            
            $scope.buttonDisabled = true;
            $('#floatingBarsG').show();
            //$scope.formDisplay = true;
           
            var options = {};

            // Options can include _csrf.token & headerName
            options.token = opt1;
            options.header = opt2;
          
            postService.postData(ajaxUrl, formData, options).then(function (response) {
               


                if (response.data.success) {

                   $scope.emailSent = true;
                   $scope.emailSentError = false;
                   $scope.emailSentErrorSpin = true;

                }
                else {
                    // Check for error
                    
                  
                   $scope.emailSentError = true;
                   $scope.emailSentErrorSpin = true;
                   $scope.buttonDisabled = false;

                }

            });
            


        }

    }]);

//     // Set form status when submit occurs
//     $scope.errorOnSubmit = false;


//     $scope.addToModel = function(item) {

//         debugger;

//         console.log('addToModel', item);
//     }


//     this.returnAddToModel = function (item) {

//         $scope.addToModel(item);

//     }



//     $scope.onSubmit = function () {

//         // TODO if error then update errorOnSubmit var & show global messages

//         // if ($scope.myForm.$valid) {
//         //     $scope.errorOnSubmit = false;
//         // }
//         // else {
//         //     event.preventDefault();

//         //     $scope.errorOnSubmit = true;

//         //     $scope.setErrorMessageText();
//         // }

//     }

//     $scope.setErrorMessageText = function () {

//         // Build error message text
//         var _label = '';
//         var outputHTML = "<h2 class='messageHeader'>To continue, please correct the following:</h2>";

//         _.each($scope.myForm.$error, function (errorType) {

//             _.each(errorType, function (error) {

//                 // Get label text
//                 _label = $(myForm).find("[name='"+error.$name+"']").parent().find('label').text();
//                 _label = _label.replace(' *', '');

//                 outputHTML += '<p class="messageText">' +
//                                 '<span aria-hidden="true" class="icon-Warningation"></span>' +
//                                 _label + ' was not recognised. Please try again.' +
//                             '</p>';

//             });

//         });


//         $(myForm).find('.message').html(outputHTML);
//     }

// }]);