(function() {
	'use strict';
	angular.module('inviteUsers', [])
		.controller('inviteUsersCtrl', ['$scope',
			function($scope) {

				$scope.newUserList = {
					'users': json
				};

				$scope.addUser = function(array) {

					var newUser = {
						'firstname': '',
						'lastname': '',
						'email': '',
						'role': ''
					};

					$scope.newUserList.users.push(newUser);
				};

				$scope.removeUser = function(id) {
					var user_to_remove = $scope.newUserList[id];
					$scope.newUserList.users.splice(id, 1);
				};

				$scope.submitNewUserList = function() {
					console.log('your list sir', $scope.newUserList);
				};

				$scope.TooltipDemoCtrl = function($scope) {
					$scope.dynamicTooltip = 'about role';
				};



			}
		]);
})();