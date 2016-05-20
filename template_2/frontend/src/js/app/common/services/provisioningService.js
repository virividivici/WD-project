angular.module('saas').factory('provisioningService', function($http) {

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
    }

});