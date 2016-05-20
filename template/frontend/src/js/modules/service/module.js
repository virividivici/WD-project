(function() {
	'use strict';
	angular.module('service', [])
		
		 .factory('postService', function($http) {

	        function postData(ajaxURL, postData, options) {

            var opts = angular.extend({
                token: '',
                header: ''
            }, options);
              // console.log('token',options.token,'header' ,options.header);
            var headers = {};
            headers[opts.header] = opts.token;
            var postData = postData;

            return $http({
                    url: ajaxURL,
                    method: "POST",  
                    data: postData,
                    headers: headers
                    // headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                })
                .then(function(response) {

                        var returnData = {
                            postData: response.config.data,
                            data: response.data
                        }

                        // success
                        return returnData;
                    },
                    function(response) { // optional
                        // failed

                        return response;
                    }
                );
        }

        return {
            postData: postData
        }
    });
})();