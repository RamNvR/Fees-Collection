var baseDao = require('../daos/baseDao');
var appLogger = require('../logging/appLogger');
var mailService = require('./mailService');
var smsService = require('./smsService');
var gridfsDao = require('../daos/gridfsDao');
var mongodb = require('mongodb');

var config = require('../config/config.' + process.env.NODE_ENV);
var emailConfig = config.emailConfig;
var feeTemplateDao= require('../daos/feeTemplateDao');

function createTemplate(details,callback){
    feeTemplateDao.create(details,callback);
}

function getAllCategories(callback) {
    feeTemplateDao.getAll(callback);
}

function updateTemplate(id, details, callback) {
    feeTemplateDao.updateById(id, details, callback);
}
function updateTemplateComponents(query, details, callback) {
    feeTemplateDao.updateToSetQuery(query, details, callback);
}
function remove(id,callback){
    feeTemplateDao.remove(id,callback);
}
module.exports.createTemplate=createTemplate;
module.exports.getAllCategories=getAllCategories;
module.exports.updateTemplate=updateTemplate;
module.exports.updateTemplateComponents=updateTemplateComponents;
module.exports.remove=remove;