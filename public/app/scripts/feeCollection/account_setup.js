(function () {
    'use strict';
    var App = angular.module('app');
    App.controller('accountSetupCtrl', accountSetupController);
    accountSetupController.$inject = ['$scope', '$stateParams','$localStorage', '$window','accountService','$http'];

    function accountSetupController($scope, $stateParams,$localStorage, $window, accountService, $http) {
        $http.get('/accounts/').then(function (response, err) {
            $scope.accounts = response.data;
        });

        $scope.showAccount = function (details) {
            $scope.selectedAccount=details;
        };
        $scope.saveAccount=function(details){
            accountService.createAccount(details, function (result, err) {
                if (!err) {
                    console.log(result);
                    $scope.accounts.push(details);
                    $scope.account={};
                }
                else {
                    console.log(err);
                }
            });
        }
        $scope.editAccount = function (details) {
            var id=details._id;
            delete details["_id"];
            accountService.updateAccount(id,details,function (result, err) {
                if (!err) {
                    console.log(result);
                }
                else {
                    console.log(err);
                }
            });
        }
    }
})();