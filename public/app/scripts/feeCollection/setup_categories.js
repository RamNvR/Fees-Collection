(function () {
    'use strict';
    var App = angular.module('app');
    App.controller('categorySetupCtrl', categorySetupController);
    categorySetupController.$inject = ['$scope', '$localStorage', '$window', 'lookupService','$http'];

    function categorySetupController($scope, $localStorage, $window, lookupService, $http) {
        $http.get('/lookups/').then(function(response,err) {
            $scope.categoryData = response.data;
        });
        $scope.showCategory = function (values) {
            $scope.selectedData = values;
        };
        $scope.editCategory = function (details) {
            console.log(details);
            lookupService.updateLookup(details.categoryName, details.values);
        }
        $scope.createCategory = function (value) {
            lookupService.createLookup(value, function (result, err) {
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