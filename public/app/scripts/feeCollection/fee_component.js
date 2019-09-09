(function () {
    'use strict';
    var App = angular.module('app');
    App.controller('feeComponentCtrl', feeComponentController);
    feeComponentController.$inject = ['$scope', '$localStorage', '$window', 'feeComponentService', '$http'];

    function feeComponentController($scope, $localStorage, $window,feeComponentService, $http) {
        $http.get('/accounts').then(function (response, err) {
            $scope.names = response.data;
        });
        $http.get('/components/').then(function (response, err) {
            $scope.componentData = response.data;
        });
        $scope.showFeeComponent = function (values) {
            $scope.selectedComponent = values;
        };
        $scope.createFeeComponent = function (details) {
            feeComponentService.createFee(details, function (result, err) {
                if (!err) {
                    console.log(result);
                    $scope.componentData.push(result.data);
                    $scope.components={};
                }
                else {
                    console.log(err);
                }
            });
        }
        $scope.editFeeComponent = function (details) {
            // var query={name:details.name,accountName:details.accountName};
            var id = details._id;
            delete details["_id"];
            feeComponentService.updateFee(id, details,function (result, err) {
                if (!err) {
                    console.log(result);
                }
                else {
                    console.log(err);
                }
            });
        }

        $scope.deleteFeeComponent = function () {
            // console.log($scope.selectedComponent._id);
            feeComponentService.removeById($scope.selectedComponent._id, function(result,err){
                if (!err) {
                    console.log(result);
                    $scope.componentData.splice($scope.componentData.indexOf($scope.selectedComponent),1);
                }
                else {
                    console.log(err);
                }
            });
        };
    }
})();