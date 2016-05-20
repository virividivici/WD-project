angular.module('saas').factory('teleSearchService', function($http) {

    function searchCustomers() {

        return $http.get('/rest/user/getUser').then(function(result) {
            return result.data;
        });

    }


    function getUserDetails(postData, options) {

        var opts = angular.extend({
            token: '',
            header: ''
        }, options);

        var headers = {};
        headers[opts.header] = opts.token;

        debugger;

        return $http({
                url: '/rest/user/getUser',
                method: "POST",
                data: postData,
                headers: headers
                // headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
            .then(function(response) {

                    debugger;

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
        getUserDetails: getUserDetails
    }

});