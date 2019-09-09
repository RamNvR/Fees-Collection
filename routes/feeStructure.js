var express = require('express');
var router = express.Router();
var feeStructureService = require('../services/feeStructureService');
var appLogger = require('../logging/appLogger');
var config = require('../config/config.' + process.env.NODE_ENV);
var multer = require('multer');
const storage = require('multer-gridfs-storage')({
    url: config.dbConfig.url
});
const upload = multer({ storage: storage });
var gridfsDao = require('../daos/gridfsDao');

router.post('/',function(req,res,next){
    feeStructureService.createStructure(req.body,function(error,response){
        res.send(response);
    });
});

router.get('/', function (req, res) {
    feeStructureService.getAllFees(function (err, response) {
        if (!err) {
            res.send(response);
        }
        else {
            res.status(500).send({ name: err.name, message: err.message });
        }
    });
});

router.get('/:id', function (req, res) {
    var mongoid = req.params.id;
    feeStructureService.getFeeStructure(mongoid,function (err, response) {
        if (!err) {
            res.send(response);
        }
        else {
            res.status(500).send({ name: err.name, message: err.message });
        }
    });
});
router.get('/components/:type',function(req,res){
    var query={};
    query["selectedTemplate.templateName"]=req.params.type;
    feeStructureService.getComponents(query,function (req, response) {
        res.send(response);
    });
})
router.put('/update/:id', function (req, res, next) {
    // var query = { id: req.params.id };
    feeStructureService.updateStructure(req.params.id, req.body, function (error, response) {
        res.send(response);
    });
});

router.delete('/:id', function (req, res, next) {
    feeStructureService.remove(req.params.id, function (error, response) {
        res.send(response);
    });
});

module.exports = router;