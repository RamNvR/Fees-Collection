var express = require('express');
var router = express.Router();
var feeComponentService = require('../services/feeComponentService');
var appLogger = require('../logging/appLogger');
var config = require('../config/config.' + process.env.NODE_ENV);
var multer = require('multer');
const storage = require('multer-gridfs-storage')({
    url: config.dbConfig.url
});
const upload = multer({ storage: storage });
var gridfsDao = require('../daos/gridfsDao');

router.post('/add',function(req,res,next){
    feeComponentService.createFee(req.body,function(error,response){
        res.send(response);
    });
});

router.get('/', function (req, res) {
    feeComponentService.getAllCategories(function (err, response) {
        if (!err) {
            res.send(response);
        }
        else {
            res.status(500).send({ name: err.name, message: err.message });
        }
    });
});

// router.put('/updateFilter/:categoryName', function (req, res, next) {
//     var query = { categoryName: req.params.categoryName };
//     //console.log(query);
//     feeService.updateFilterDetails(query, req.body, function (error, response) {
//         res.send(response);
//     });
// });
router.put('/update/:id', function (req, res, next) {
    //var query = { id : req.params.id };
    feeComponentService.updateFee(req.params.id, req.body, function (error, response) {
        res.send(response);
    });
});
router.delete('/:id', function (req, res, next) {
    feeComponentService.remove(req.params.id, function (error, response) {
        res.send(response);
    });
});

module.exports = router;