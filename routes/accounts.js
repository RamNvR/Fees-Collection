var express = require('express');
var router = express.Router();
var accountService = require('../services/accountService');
var appLogger = require('../logging/appLogger');
var config = require('../config/config.' + process.env.NODE_ENV);
var multer = require('multer');
const storage = require('multer-gridfs-storage')({
    url: config.dbConfig.url
});
const upload = multer({ storage: storage });
var gridfsDao = require('../daos/gridfsDao');

router.get('/', function(req,res)
{
    accountService.getAllCategories(function(err,response){
        if (!err) {
            res.send(response);
        }
        else {
            res.status(500).send({ name: err.name, message: err.message });
        }
    });
});
router.post('/addAccount',function(req,res,next){
    accountService.createAccount(req.body,function(error,response){
        res.send(response);
    });
});
router.put('/update/:id', function (req, res, next) {
    // var query = { id: req.params.id };
    accountService.updateAccount(req.params.id, req.body, function (error, response) {
        res.send(response);
    });
});
module.exports=router;