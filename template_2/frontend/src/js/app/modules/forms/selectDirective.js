/*

    Handle individual select boxes
    ie. NOT in a form

*/

angular.module('saas')

    // .controller('saasSelectCtrl', function ($scope) {


    // })

    .directive('saasSelect', function() {
        return {
            restrict: 'A',
            templateUrl: SaaS.location+'/docroot/assets/partials/select-tpl.html',
            transclude: true,
            replace: true,
            scope: true,
            link: function ($scope, elem, attrs) {

                debugger;

                var items = [];

                // Set model items to select options
                _.each(elem.find('select').find('option'), function (option) {

                    items.push({
                        id: option.value,
                        name: option.text
                    });

                });

                // Remove initial items
                elem.find('select').find('option').remove();

                // Set items to data
                $scope.items = items;

            },
            controller: function ($scope) {
                // Set inital item list
                $scope.items = [];

                // Set default text
                $scope.selectedItem = { id: 0, name: 'Please Select'};
            }
        }
    });