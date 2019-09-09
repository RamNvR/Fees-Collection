var express = require('express');
var router = express.Router();
var studentService = require('../services/studentService');
var appLogger = require('../logging/appLogger');
var config = require('../config/config.' + process.env.NODE_ENV);
var multer = require('multer');
const storage = require('multer-gridfs-storage')({
    url: config.dbConfig.url
});
const upload = multer({ storage: storage });

//get all students details
router.get('/', function (req, res, next) {
    studentService.getAllStudentlist(function (err, response) {
        if (!err) {

            res.send(response);
        }
        else {
            res.status(500).send({ name: err.name, message: err.message });
        }
    });
});

router.get('/projection/id/:id', function (req, res, next) {
    studentService.getStudentDetailsByIdWithProjection(req.params.id, function (err, response) {
        if (!err) {
            res.send(response);

        }
        else {
            res.status(500).send({ name: err.name, message: err.message });
        }
    });
});



router.get('/projection/name', function (req, res, next) {
    studentService.getStudentDetailsByNameWithProjection(req.body.criteria, function (err, response) {
        if (!err) {
            res.send(response);

        }
        else {
            res.status(500).send({ name: err.name, message: err.message });
        }
    });
});



router.get('/nationality/:id', function (req, res, next) {
    studentService.getStudentNationalityById(parseInt(req.params.id, 10), function (err, response) {
        if (!err) {
            res.send(response);
        }
        else {
            res.status(500).send({ name: err.name, message: err.message });
        }
    });
});


router.delete('/:id', function (req, res, next) {
    studentService.removeStudent(parseInt(req.params.id, 10), function (err, response) {
        if (!err) {
            res.send(response);
        }
        else {
            res.status(500).send({ name: err.name, message: err.message });
        }
    });
});

router.post('/dirty/attachments', function (req, res, next) {
    studentService.removeDirtyAttachmentsForStudent(req.body.files, function (err, response) {
        if (!err) { 
            res.send(response);
        }
        else {            
            res.status(500).send({ name: err.name, message: err.message });
        }
    });
});

// insert student details
router.post('/', function (req, res, next) {
    studentService.createStudent(req.body, function (err, response) {
        if (!err) {
            appLogger.info("Successfully created a Student %s \\n", req.body.name);
            res.send(response);
        }
        else {
            appLogger.error(err, "Error while trying to create student %s \\n ", req.body.name);
            res.status(500).send({ name: err.name, message: err.message });
        }
    });
});

//get all students details
router.post('/distinct/fields', function (req, res, next) {
    var query = req.body.query;
    var keyName = req.body.keyName;
    studentService.getDistinctValuesFromStudents(keyName, query, function (err, response) {
        if (!err) {
            res.send(response);
        }
        else {
            res.status(500).send({ name: err.name, message: err.message });
        }
    });
});

router.post('/:id/sections/:sectionName', function (req, res, next) {
    var updateSectionReq = {
        rollNumber: req.params.id,
        sectionName: req.params.sectionName,
        detailsToUpdate: req.body
    };
    studentService.addSectionItem(updateSectionReq, function (err, response) {
        if (!err) {
            appLogger.info("Successfully created a Student %s \\n", req.body.name);
            res.send(response);
        }
        else {
            appLogger.error(err, "Error while trying to create student %s \\n ", req.body.name);
            res.status(500).send({ name: err.name, message: err.message });
        }
    });
});


router.put('/:id/sections/:sectionName/:itemIndex', function (req, res, next) {

    studentService.updateStudentSectionItem(req.params.id, req.params.sectionName, parseInt(req.params.itemIndex), req.body, function (err, response) {
        if (!err) {
            res.send(response);
        }
        else {
            res.status(500).send({ name: err.name, message: err.message });
        }
    });
});

router.delete('/:id/sections/:sectionName/:itemIndex', function (req, res, next) {
    var indexToDelete = parseInt(req.params.itemIndex);
    studentService.deleteSectionItem(req.params.id, req.params.sectionName, indexToDelete, function (err, result) {
        if (!err) {
            res.send(result);
        } else {
            res.status(500).send({ name: err.name, message: err.message });
            return;
        }
    });
});

router.put('/:id/sections/:sectionName', function (req, res, next) {
    studentService.updateStudentSection(req.params.id, req.body, function (err, response) {
        if (!err) {
            res.send(response);
        }
        else {
            res.status(500).send({ name: err.name, message: err.message });
        }
    });
});

router.put('/:id', function (req, res, next) {
    studentService.updateStudentCoreDetails(req.params.id, req.body, function (err, response) {
        if (!err) {
            res.send(response);
        }
        else {
            res.status(500).send({ name: err.name, message: err.message });
        }
    });
});


router.post('/filter', function (req, res, next) {
    var criteria = req.body.criteria;
    studentService.filterStudents(criteria, function (err, response) {
        if (!err) {
            res.send(response);
        }
        else {
            res.status(500).send({ name: err.name, message: err.message });
        }
    });
});

router.post('/verify/email/code', function (req, res, next) {
    var emailDetails = req.body;
    studentService.sendConfCodeToEmail(emailDetails, function (err, response) {
        if (!err) {
            res.send(response);
        }
        else {
            res.status(500).send({ name: err.name, message: err.message });
        }
    });
});

router.post('/verify/mobile/otp', function (req, res, next) {
    var otpDetails = req.body;
    studentService.sendOTPtoMobile(otpDetails, function (err, response) {
        if (!err) {
            res.send(response);
        }
        else {
            res.status(500).send({ name: err.name, message: err.message });
        }
    });
});



router.get('/:id', function (req, res, next) {

    studentService.getStudentById(req.params.id, function (err, response) {
        if (!err) {

            res.send(response);
            appLogger.info("Successfully read a Student %d \\n", req.params.id);
        }
        else {
            appLogger.error(err, "Error while trying to read student %d \\n", req.params.id);
            res.status(500).send({ name: err.name, message: err.message });
        }
    });
});

router.get('/TC/:id', function (req, res, next) {

    studentService.getStudentTCById(parseInt(req.params.id, 10), function (err, response) {
        if (!err) {
            res.send(response);
            appLogger.info("Successfully read a Student TC %d \\n", parseInt(req.params.id, 10));
        }
        else {
            res.status(500).send({ name: err.name, message: err.message });
            appLogger.error(err, "Error while trying to read student TC %d \\n", parseInt(req.params.id, 10));
        }
    });
});

router.put('/rollNumberChange/:id', function (req, res, next) {
    studentService.rollNumberChange(parseInt(req.params.id, 10), req.body, function (err, response) {
        if (!err) {
            res.send(response);
        }
        else {
            res.status(500).send({ name: err.name, message: err.message });
        }
    });
});

// update student details by roll number
router.put('/file/upload', upload.array("fileAttachment"), function (req, res, next) {
    if (!((req.files) && (req.files.length > 0))) {
        res.send({ message: "No files to upload" });
        return;
    }
    res.send(req.files);
});


// update student details by roll number
router.put('/displayPicture/upload', upload.single("displayPicture"), function (req, res, next) {
    if (!req.file) {
        res.send({ message: "No files to upload" });
        return;
    }
    var attachmentDetails = {};
    var uploadedFile = req.file;
    attachmentDetails = {
        id: uploadedFile.id.toString(),
        contentType: uploadedFile.contentType,
        filename: uploadedFile.filename,
        originalname: uploadedFile.originalname,
        contentType: uploadedFile.contentType,
        size: uploadedFile.size
    };

    var rollNumber = req.body.rollNumber;
    if (rollNumber instanceof Array) {
        if (rollNumber.length > 0) {
            rollNumber = rollNumber[0];
        }
    }

    studentService.uploadDisplayPicture(rollNumber, { displayPicture: attachmentDetails }, function (err, response) {
        if (!err) {
            res.send(response);
        }
        else {
            res.status(500).send({ name: err.name, message: err.message });
        }
    });
});

router.get('/:id/displayPicture/:fileName', function (req, res, next) {
    studentService.openDisplayPicture({ rollNumber: req.params.id, attachedFileName: req.params.fileName }, res);
});

router.get('/:id/open/:sectionName/:index/:fieldName/:fileName', function (req, res, next) {
    studentService.openAttachment({ rollNumber: req.params.id, sectionName: req.params.sectionName, index: req.params.index, fieldName: req.params.fieldName, fileName: req.params.fileName }, res);
});


router.delete('/:id/displayPicture/:fileName', function (req, res, next) {
    studentService.deleteAttachment({ rollNumber: req.params.id, attachedFileName: req.params.fileName }, function (err, result) {
        if (!err) {
            res.send(result);
        } else {
            res.status(500).send({ name: err.name, message: err.message });
            return;
        }
    });
});

module.exports = router;


