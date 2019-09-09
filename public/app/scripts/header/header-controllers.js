

(function () {
    'use strict';
    var App = angular.module('app');

    App.controller('HeaderController', HeaderController);
    HeaderController.$inject = ['$scope', '$rootScope', '$state', '$stateParams'];

    function HeaderController($scope, $rootScope, $state, $stateParams) {
        $scope.$on('$includeContentLoaded', function () {
            // Transparent header functionality
            $scope.helpers.uiHandleHeader();
        });
    }

    
})();
