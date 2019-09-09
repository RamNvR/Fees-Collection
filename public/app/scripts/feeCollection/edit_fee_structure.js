(function () {
    'use strict';
    var App = angular.module('app');
    App.controller('editFeeStructureCtrl', editFeeStructureController);
    editFeeStructureController.$inject = ['$scope', '$localStorage', '$window', 'feeStructureService', '$http', '$stateParams'];

    function editFeeStructureController($scope, $localStorage, $window, feeStructureService, $http, $stateParams) {
        $scope.fee ={};
        if ($stateParams.id) {
            $scope.currentOperation = "Edit";
            var mongoId = $stateParams.id;
            loadFeeStructure(mongoId);
        }

        $http.get('/templates/').then(function (response, err) {
            $scope.templates = response.data;
        });

        $http.get('/components/').then(function (response, err) {
            $scope.componentData = response.data;
        });

        $scope.loadComponents=function(query){
            feeStructureService.getComponents(query, function (err, result) {
                if (!err) {
                    $scope.fee.selectedTemplate.components = result.data[0].selectedTemplate.components;
                    //console.log($scope.fee.selectedTemplate.components);
                }
                else{
                    console.log(err);
                }
            });
        };
        
        function loadFeeStructure(mongoId) {
            feeStructureService.getFeeStructure(mongoId, function (response, err) {
                if (!err) {
                    $scope.fee = response.data;
                    $scope.model.selectedPaymentOptionList=$scope.fee.paymentMode;
                }
                else {
                    console.log(err);
                }
            });
        }

        $scope.years = [];
        var d = new Date().getFullYear();
        d -= 5;
        for (var i = 0; i <= 10; i++) {
            $scope.years.push((d + i) + " - " + (d + i + 1));
        }

        $scope.paymentOptionList = [
            { mode: 'Online' },
            { mode: 'Cash' },
            { mode: 'DD/Cheque' }
        ];

        $scope.checkPaymentModeSelected = function () {
            var _name = this.pay.mode;
            if (this.pay.selected) {
                $scope.model.selectedPaymentOptionList.push(_name);
                if ($scope.model.selectedPaymentOptionList.length == $scope.paymentOptionList.length) {
                    $scope.master = true;
                }
            } else {
                $scope.master = false;
                var index = $scope.model.selectedPaymentOptionList.indexOf(_name);
                $scope.model.selectedPaymentOptionList.splice(index, 1);
            }
        }

        $scope.model = {
            selectedPaymentOptionList: []
        }

        $scope.isSelectAll = function () {
            $scope.model.selectedPaymentOptionList = [];
            if ($scope.master) {
                $scope.master = true;
                for (var i = 0; i < $scope.paymentOptionList.length; i++) {
                    $scope.model.selectedPaymentOptionList.push($scope.paymentOptionList[i].mode);
                }
            }
            else {
                $scope.master = false;
            }
            angular.forEach($scope.paymentOptionList, function (item) {
                item.selected = $scope.master;
            });
        }

        $scope.updateFee = function (details) {
            var id=details._id;
            delete details._id;
            details.paymentMode = $scope.model.selectedPaymentOptionList;
            feeStructureService.updateStructure(id,details, function (result, err) {
                if (!err) {
                    console.log(result);
                }
                else {
                    console.log(err);
                }
            });
        };

        $scope.isChecked = function (mode) {
            var match = false;
            for (var i = 0; i < $scope.fee.paymentMode.length; i++) {
                if ($scope.fee.paymentMode[i] == mode) {
                    match = true;
                    break;
                }
            }
            return match;
        };
        
        $scope.isCheckedAll = function () {
            var match = false;
            if ($scope.paymentOptionList.length == $scope.fee.paymentMode.length) {
                match = true;
            }
            return match;
        };
    }
})();