var lookupDao = require('../daos/lookupDao');
var appLogger = require('../logging/appLogger');
var mongodb = require('mongodb');
var validationInformationPath = require('../config/config.' + process.env.NODE_ENV).validationInformationPath
var validationRulesAndMessages = require(validationInformationPath);

function createLookup(details,callback){
    lookupDao.create(details,callback);
}

function getAllCategories(callback) {
    lookupDao.getAll(callback);
}

function updateLookup(query, details, callback) {
    lookupDao.updateMany(query, details, callback);
}
function getByQuery(query,callback){
    lookupDao.getByQuery(query,callback);
}
module.exports.createLookup=createLookup;
module.exports.getAllCategories=getAllCategories;
module.exports.updateLookup=updateLookup;
module.exports.getByQuery=getByQuery;