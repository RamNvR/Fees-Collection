var accountDao = require('../daos/accountDao');
var appLogger = require('../logging/appLogger');
var mongodb = require('mongodb');
var validationInformationPath = require('../config/config.' + process.env.NODE_ENV).validationInformationPath
var validationRulesAndMessages = require(validationInformationPath);

function getAllCategories(callback) {
    accountDao.getAll(callback);
}

function createAccount(details,callback){
    accountDao.create(details,callback);
}
function updateAccount(id, details, callback) {
    accountDao.update(id, details, callback);
}
module.exports.updateAccount=updateAccount;
module.exports.getAllCategories=getAllCategories;
module.exports.createAccount=createAccount;