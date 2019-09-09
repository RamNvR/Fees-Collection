(function () {
    'use strict';
    var App = angular.module('app');
    App.controller('feeTemplateCtrl', feeTemplateController);
    feeTemplateController.$inject = ['$scope', '$localStorage', '$window','feeTemplateService','$http'];

    function feeTemplateController($scope, $localStorage, $window,feeTemplateService, $http) {
        $http.get('/components/').then(function (response, err) {
            $scope.componentData=response.data;
        });
        $http.get('/templates/').then(function (response, err) {
            $scope.templates = response.data;
        });
        $scope.showTemplate = function (values) {
            $scope.selectedComponent = values;
        };
        $scope.createFeeTemplate = function (details) {
            // $scope.templates.push(details);
            feeTemplateService.createTemplate(details, function (result, err) {
                if (!err) {
                    $scope.templates.push(result.data);
                    console.log(result);
                }
                else {
                    console.log(err);
                }
                 $scope.feeTemplates={};
            });
        };
        $scope.editFeeTemplate = function (details) {
            console.log(details);
            var id = details._id;
            delete details["_id"];
            feeTemplateService.updateTemplate(id, details,function (result, err) {
                if (!err) {
                    console.log(result);
                }
                else {
                    console.log(err);
                }
            });   
        }

        $scope.deleteFeeTemplate = function () {
            // console.log($scope.selectedComponent._id);
            feeTemplateService.removeById($scope.selectedComponent._id, function(result,err){
                if (!err) {
                    console.log(result);
                    $scope.templates.splice($scope.templates.indexOf($scope.selectedComponent,1));
                }
                else {
                    console.log(err);
                }
            });
        };
    }
})();