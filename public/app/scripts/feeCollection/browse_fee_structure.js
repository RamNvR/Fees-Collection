(function () {
    'use strict';
    var App = angular.module('app');
    App.controller('browseFeeStructureCtrl', browseFeeStructureController);
    browseFeeStructureController.$inject = ['$scope', '$localStorage', '$window', '$http','feeStructureService'];

    function browseFeeStructureController($scope, $localStorage, $window, $http, feeStructureService) {
        $http.get('/feeStructure/').then(function (response, err) {
            $scope.feeStructures = response.data;
        });
        $scope.deleteFeeStructure = function (value) {
            feeStructureService.removeById(value._id, function(result,err){
                if (!err) {
                    console.log(result);
                    $scope.feeStructures.splice($scope.feeStructures.indexOf($scope.value),1);
                }
                else {
                    console.log(err);
                }
            });
        };
    }
})();