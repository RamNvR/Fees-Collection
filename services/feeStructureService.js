var baseDao = require('../daos/baseDao');
var appLogger = require('../logging/appLogger');
var mailService = require('./mailService');
var smsService = require('./smsService');
var gridfsDao = require('../daos/gridfsDao');
var mongodb = require('mongodb');

var config = require('../config/config.' + process.env.NODE_ENV);
var emailConfig = config.emailConfig;
var feeDao = require('../daos/feeDao');

function createStructure(details, callback) {
    feeDao.create(details, callback);
}

function getAllFees(callback) {
    feeDao.getAll(callback);
}
function getFeeStructure(id,callback) {
    feeDao.getById(id,callback);
}
function remove(id,callback){
    feeDao.remove(id,callback);
}
function updateStructure(id, details, callback) {
    feeDao.update(id, details, callback);
}
function getComponents(query,callback){
    feeDao.getByQuery(query,callback);
}
module.exports.createStructure = createStructure;
module.exports.getFeeStructure = getFeeStructure;
module.exports.getAllFees = getAllFees;
module.exports.remove=remove;
module.exports.updateStructure=updateStructure;
module.exports.getComponents=getComponents;