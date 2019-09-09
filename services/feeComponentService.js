var baseDao = require('../daos/baseDao');
var appLogger = require('../logging/appLogger');
var mailService = require('./mailService');
var smsService = require('./smsService');
var gridfsDao = require('../daos/gridfsDao');
var mongodb = require('mongodb');

var config = require('../config/config.' + process.env.NODE_ENV);
var emailConfig = config.emailConfig;
var feeComponentDao= require('../daos/feeComponentDao');

function createFee(details,callback){
    feeComponentDao.create(details,callback);
}

function getAllCategories(callback) {
    feeComponentDao.getAll(callback);
}

function updateFee(id, details, callback) {
    feeComponentDao.updateById(id, details, callback);
}
function remove(id,callback){
    feeComponentDao.remove(id,callback);
}
module.exports.createFee=createFee;
module.exports.getAllCategories=getAllCategories;
module.exports.updateFee=updateFee;
module.exports.remove=remove;