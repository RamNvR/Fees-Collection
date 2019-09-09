(function () {
    'use strict';
    var App = angular.module('app');
    App.controller('createFeeStructureCtrl', createFeeStructureController);
    createFeeStructureController.$inject = ['$scope', '$localStorage', '$window', 'feeStructureService','feeTemplateService', '$http', '$stateParams'];

    function createFeeStructureController($scope, $localStorage, $window, feeStructureService,feeTemplateService, $http, $stateParams) {
        $scope.additionalComponents=[];
        $scope.paymentOptionList = [
            { mode: "Online"},
            { mode: "DD/Cheque"},
            { mode: "Cash"}
        ];

        $http.get('/templates/').then(function (response, err) {
            $scope.templates = response.data;
            angular.forEach($scope.templates, function (rec) {
                delete rec._id;
                delete rec.remarks;
            });
        });

        $http.get('/components/').then(function (response, err) {
            $scope.componentData = response.data;
        });

        $scope.loadFeeComponents = function () {
            $scope.componentDetails=[];
            $scope.componentName = this.fee.selectedTemplate.components;
            angular.forEach($scope.componentName, function (rec) {
                $scope.componentDetails.push({ componentName: rec, amount: " " });
            });
        }

        $scope.loadAdditionalComponents = function () {
            $scope.componentDetails.push({ componentName: this.extraComponents, amount: " " });
            //console.log($scope.componentDetails.componentName);
        }
        
        $scope.years = [];
        var d = new Date().getFullYear();
        d -= 5;
        for (var i = 0; i <= 10; i++) {
            $scope.years.push((d + i) + " - " + (d + i + 1));
        }

        $scope.model = {
            selectedPaymentOptionList: []
        }
        $scope.checkPaymentModeSelected = function () {
            var name = this.pay.mode;
            if (this.pay.selected) {
                $scope.model.selectedPaymentOptionList.push(name);
                if ($scope.model.selectedPaymentOptionList.length == $scope.paymentOptionList.length) {
                    $scope.master = true;
                }
            }
            else {
                $scope.master = false;
                var id = $scope.model.selectedPaymentOptionList.indexOf(name);
                $scope.model.selectedPaymentOptionList.splice(id, 1);
            }
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
        $scope.addFee = function (details) {
            angular.forEach($scope.componentDetails,function(x){
                $scope.additionalComponents.push(x.componentName);
            });
            feeTemplateService.updateDetails(this.fee.selectedTemplate.templateName,$scope.additionalComponents,function(result,err){
                if (!err) {
                    console.log(result);
                }
                else {
                    console.log(err);
                }
            });
            delete details.selectedTemplate.components;
            details.selectedTemplate['componentDetails'] = $scope.componentDetails;
            details.paymentMode = $scope.model.selectedPaymentOptionList;
            feeStructureService.createStructure(JSON.parse(angular.toJson(details)), function (result, err) {
                if (!err) {
                    console.log(result);
                    swal({
                        text: 'created Successfully',
                        showCancelButton: false,
                        confirmButtonColor: '#d26a5c',
                        confirmButtonText: 'Ok',
                        preConfirm: function () {
                            return new Promise(function (resolve) {
                                setTimeout(function () {
                                    resolve()
                                }, 50)
                            })
                        }
                    }).then(
                        function (result) {
                            $window.location.href = "#!/browseFeeStructure";
                        }
                    )
                }
                else {
                    console.log(err);
                }
            });
        };
        $scope.clearSearch = function () {
            $scope.fee = null;
        }
        // $scope.isChecked = function(mode){
        //     var match = false;
        //     for(var i=0 ; i < $scope.fee.paymentMode.length; i++) {
        //       if($scope.fee.paymentMode[i] == mode){
        //         match = true;
        //         break;
        //       }
        //     }
        //     return match;
        // };
        // $scope.isCheckedAll = function(){
        //     var match = false;
        //     if ($scope.paymentOptionList.length ==$scope.fee.paymentMode.length) {
        //         match = true;
        //         }
        //         return match;
        // };    
        
    }

})();