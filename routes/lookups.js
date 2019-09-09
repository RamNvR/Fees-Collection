var express = require('express');
var router = express.Router();
var lookupService = require('../services/lookupService');
var appLogger = require('../logging/appLogger');
var config = require('../config/config.' + process.env.NODE_ENV);
var multer = require('multer');
const storage = require('multer-gridfs-storage')({
    url: config.dbConfig.url
});
const upload = multer({ storage: storage });
var gridfsDao = require('../daos/gridfsDao');

router.post('/addLookup',function(req,res,next){
    lookupService.createLookup(req.body,function(error,response){
        res.send(response);
    });
});

router.get('/', function (req, res) {
    lookupService.getAllCategories(function (err, response) {
        if (!err) {
            res.send(response);
        }
        else {
            res.status(500).send({ name: err.name, message: err.message });
        }
    });
});
router.get('/:acname', function (req, res) {
    var query={categoryName:req.params.acname};
    lookupService.getByQuery(query,function (err, response) {
        if (!err) {
            res.send(response);
        }
        else {
            res.status(500).send({ name: err.name, message: err.message });
        }
    });
});

router.put('/update/:categoryName', function (req, res, next) {
    var query = { categoryName: req.params.categoryName };
    //console.log(query);
    lookupService.updateLookup(query, req.body, function (error, response) {
        res.send(response);
    });
});

module.exports = router;