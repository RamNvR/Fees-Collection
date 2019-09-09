(function () {
    'use strict';
    var App = angular.module('app');
    /**
     * RegExp when serialized as part of JSON.stringify gives empty object. This function is to avoid it and send it as RegExp string
     * @param {*} key 
     * @param {*} value 
     */
    function stringifyFilter(key, value) {
        if (value instanceof RegExp) {
            return value.toString();
        }
        return value;
    }
    /**
     * student service to perform CRUD operation on students. As the list of students are less, no need to search on the server side. Search will be done on client side by caching the list of students
     *  
     * @param {*} resource 
     */
    App.service('lookupService', lookupService);
    lookupService.$inject = ['$http', '$resource'];
    function lookupService($http, $resource) {
        this.getAllCategories = function (callback) {
            var Identity = $resource("/lookups");
            var Info = Identity.query(function (response) {
                callback(null, response);
            }, function (error) {
                callback(error, null);
            });
        };

        this.createLookup = function (value, callback) {
            //console.log(value);
            var responsePromise = $http({
                method: 'post',
                data: JSON.stringify(value),
                headers: { 'Content-Type': 'application/json' },
                url: '/lookups/addLookup/'
            });
            responsePromise.then(function (response) {
                callback(response, null);
            }, function (error) {
                callback(null, error);
            });
        };

        this.updateLookup = function (categoryName, details) {
            var values = { values: details };
            //console.log(details);
            var responsePromise = $http({
                method: 'put',
                data: JSON.stringify(values),
                headers: { 'Content-Type': 'application/json' },
                url: '/lookups/update/' + categoryName
            });
            responsePromise.then(function (responseData) {
                console.log(responseData);
            }, function (error) {
                console.log(error);
            });
        };
    }

    App.service('accountService', accountService);
    accountService.$inject = ['$http', '$resource'];
    function accountService($http, $resource) {
        this.createAccount = function (value, callback) {
            var responsePromise = $http({
                method: 'post',
                data: JSON.stringify(value),
                headers: { 'Content-Type': 'application/json' },
                url: '/accounts/addAccount/'
            });
            responsePromise.then(function (response) {
                callback(response, null);
            }, function (error) {
                callback(null, error);
            });
        };
        this.updateAccount = function (id, details, callback) {
            // var values={accountName:details};
            var responsePromise = $http({
                method: 'put',
                data: details,
                headers: { 'Content-Type': 'application/json' },
                url: '/accounts/update/' + id
            });
            responsePromise.then(function (response) {
                callback(response, null);
            }, function (error) {
                callback(null, error);
            });
        };
    }

    App.service('feeComponentService', feeComponentService);
    feeComponentService.$inject = ['$http', '$resource'];
    function feeComponentService($http, $resource) {
        this.createFee = function (value, callback) {
            var responsePromise = $http({
                method: 'post',
                data: JSON.stringify(value),
                headers: { 'Content-Type': 'application/json' },
                url: '/components/add/'
            });
            responsePromise.then(function (response) {
                callback(response, null);
            }, function (error) {
                callback(null, error);
            });
        }
        this.updateFee = function (id, details, callback) {
            // var values={accountName:details};
            var responsePromise = $http({
                method: 'put',
                data: details,
                headers: { 'Content-Type': 'application/json' },
                url: '/components/update/' + id
            });
            responsePromise.then(function (response) {
                callback(response, null);
            }, function (error) {
                callback(null, error);
            });
        };
        this.removeById = function (id, callback) {
            //console.log(details);
            var responsePromise = $http({
                method: 'delete',
                url: '/components/' + id
            });
            responsePromise.then(function (response) {
                callback(response, null);
            }, function (error) {
                callback(null, error);
            });
        }
    }
    App.service('feeTemplateService', feeTemplateService);
    feeTemplateService.$inject = ['$http', '$resource'];
    function feeTemplateService($http, $resource) {
        this.createTemplate = function (value, callback) {
            var responsePromise = $http({
                method: 'post',
                data: JSON.stringify(value),
                headers: { 'Content-Type': 'application/json' },
                url: '/templates/add/'
            });
            responsePromise.then(function (response) {
                callback(response, null);
            }, function (error) {
                callback(null, error);
            });
        }
        this.updateTemplate = function (id, details, callback) {
            var responsePromise = $http({
                method: 'put',
                data: details,
                headers: { 'Content-Type': 'application/json' },
                url: '/templates/update/' + id
            });
            responsePromise.then(function (response) {
                callback(response, null);
            }, function (error) {
                callback(null, error);
            });
        };
        this.updateDetails = function (query, details, callback) {
            var values={components:details};
            var responsePromise = $http({
                method: 'put',
                data: values,
                headers: { 'Content-Type': 'application/json' },
                url: '/templates/updateByQuery/' + query
            });
            responsePromise.then(function (response) {
                callback(response, null);
            }, function (error) {
                callback(null, error);
            });
        };
        this.removeById = function (id, callback) {
            //console.log(details);
            var responsePromise = $http({
                method: 'delete',
                url: '/templates/' + id
            });
            responsePromise.then(function (response) {
                callback(response, null);
            }, function (error) {
                callback(null, error);
            });
        }
    }

    App.service('feeStructureService', feeStructureService);
    feeStructureService.$inject = ['$http', '$resource'];
    function feeStructureService($http, $resource) {
        this.createStructure = function (value, callback) {
            var responsePromise = $http({
                method: 'post',
                data: JSON.stringify(value),
                headers: { 'Content-Type': 'application/json' },
                url: '/feeStructure/'
            });
            responsePromise.then(function (response) {
                callback(response, null);
            }, function (error) {
                callback(null, error);
            });
        }
        this.getFeeStructure = function (id, callback) {
            var responsePromise = $http({
                method: 'get',
                headers: { 'Content-Type': 'application/json' },
                url: '/feeStructure/' + id
            });
            responsePromise.then(function (response) {
                callback(response, null);
            }, function (error) {
                callback(null, error);
            });
        }
        this.getComponents = function (type, callback) {
            var responsePromise = $http({
                method: 'get',
                headers: { 'Content-Type': 'application/json' },
                url: '/feeStructure/components/' + type
            });
            responsePromise.then(function (response) {
                callback(null, response);
            }, function (error) {
                callback(error, null);
            });
        }
        this.updateStructure = function (id, details, callback) {
            var responsePromise = $http({
                method: 'put',
                data: details,
                headers: { 'Content-Type': 'application/json' },
                url: '/feeStructure/update/' + id
            });
            responsePromise.then(function (response) {
                callback(null,response);
            }, function (error) {
                callback(error, null);
            });
        };
        this.removeById = function (id, callback) {
            var responsePromise = $http({
                method: 'delete',
                url: '/feeStructure/' + id
            });
            responsePromise.then(function (response) {
                callback(response, null);
            }, function (error) {
                callback(null, error);
            });
        };
    }
})();