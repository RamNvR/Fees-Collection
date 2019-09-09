const path = require('path');
var express = require('express');
var router = express.Router();
var appLogger = require('../logging/appLogger');

// get all students details
router.get('/config', function (req, res, next) {
    res.sendFile(path.join(__dirname, '../config/authConfig.' + process.env.NODE_ENV + '.js'));
});

// get all students based on filter query
router.post('/filter', function (req, res, next) {
    var criteria = req.body.criteria;    
    studentsService.filterStudents(criteria, function (err, response) {
        if (!err) {
            res.send(response);
        }
        else {
            res.status(500).send({ name: err.name, message: err.message });
        }
    });
});

// get all students based on filter query and save students
router.post('/filter/save', function (req, res, next) {
    var criteria = req.body.criteria;
    var placementSchedule = req.body.placementSchedule;
    placementSchedule["placementStatus"] = PlacementStatus.ELIGIBLE;
    studentsService.filterAndSaveStudents(criteria, placementSchedule, function (err, response) {
        if (!err) {
            res.send(response);
        }
        else {
            res.status(500).send({ name: err.name, message: err.message });
        }
    });
});

// get all students based on filter query and save students
router.post('/filter/add/save', function (req, res, next) {
    var criteria = req.body.criteria;
    var placementSchedule = req.body.placementSchedule;
    placementSchedule["placementStatus"] = PlacementStatus.ELIGIBLE_MANUAL;
    studentsService.filterAndSaveStudents(criteria, placementSchedule, function (err, response) {
        if (!err) {
            res.send(response);
        }
        else {
            res.status(500).send({ name: err.name, message: err.message });
        }
    });
});

// get student details by roll number
router.get('/:id', function (req, res, next) {
    studentsService.getStudentById(req.params.id, function (err, response) {
        if (!err) {
            res.send(response);
        }
        else {
            res.status(500).send({ name: err.name, message: err.message });
        }
    });
});

// get student details by roll number
router.get('/projection/:id', function (req, res, next) {
    studentsService.getStudentByIdWithProjection(req.params.id, function (err, response) {
        if (!err) {
            res.send(response);
        }
        else {
            res.status(500).send({ name: err.name, message: err.message });
        }
    });
});

// get all students details by department
router.get('/department/:id', function (req, res, next) {
    studentsService.getAllStudentByDept(req.params.id, function (err, response) {
        if (!err) {
            res.send(response);
        }
        else {
            res.status(500).send({ name: err.name, message: err.message });
        }
    });
});

// get students opting list by department
router.get('/optedIn/:id', function (req, res, next) {
    studentsService.getStudentOptingListByDept(req.params.id, function (err, response) {
        if (!err) {
            res.send(response);
        }
        else {
            res.status(500).send({ name: err.name, message: err.message });
        }
    });
});

//get all students opting list across all departments
router.get('/status/opt/in', function (req, res, next) {
    studentsService.getStudentsOptingList(function (err, response) {
        if (!err) {
            res.send(response);
        }
        else {
            res.status(500).send({ name: err.name, message: err.message });
        }
    });
});

// get students opt out list by department
router.get('/optedOut/:id', function (req, res, next) {
    studentsService.getStudentOptoutListByDept(req.params.id, function (err, response) {
        if (!err) {
            res.send(response);
        }
        else {
            res.status(500).send({ name: err.name, message: err.message });
        }
    });
});


// get students list of department by global Opting status : filters
router.get('/globalOptingStatus/:id1/:id2', function (req, res, next) {
    studentsService.getStudentListByGlobalOptingStatus(req.params.id1,req.params.id2, function (err, response) {
        if (!err) {
            res.send(response);
        }
        else {
            res.status(500).send({ name: err.name, message: err.message });
        }
    });
});

// get placed students details by department
router.get('/placed/:id', function (req, res, next) {
    studentsService.getPlacedListByDept(req.params.id, function (err, response) {
        if (!err) {
            res.send(response);
        }
        else {
            res.status(500).send({ name: err.name, message: err.message });
        }
    });
});

// get not placed students details by department
router.get('/notplaced/:id', function (req, res, next) {
    studentsService.getNotPLacedListByDept(req.params.id, function (err, response) {
        if (!err) {
            res.send(response);
        }
        else {
            res.status(500).send({ name: err.name, message: err.message });
        }
    });
});
//get all students placed list across all departments
router.get('/status/placed', function (req, res, next) {
    studentsService.getStudentsPlacedList(function (err, response) {
        if (!err) {
            res.send(response);
        }
        else {
            res.status(500).send({ name: err.name, message: err.message });
        }
    });
});

// get students with arrears details by department
router.get('/arrears/:id', function (req, res, next) {
    studentsService.getArrearsListByDept(req.params.id, function (err, response) {
        if (!err) {
            res.send(response);
        }
        else {
            res.status(500).send({ name: err.name, message: err.message });
        }
    });
});

// get students without arrears details by department
router.get('/withoutArrears/:id', function (req, res, next) {
    studentsService.getWithoutArrearsListByDept(req.params.id, function (err, response) {
        if (!err) {
            res.send(response);
        }
        else {
            res.status(500).send({ name: err.name, message: err.message });
        }
    });
});
// // get students eligibility list by department
// router.get('/eligible/:id', function (req, res, next) {
//     studentMasterService.getStudentEligibleListByDept(req.params.id, function (err, response) {
//         if (!err) {
//             res.send(response);
//         }
//         else {
//             res.status(500).send({ name: err.name, message: err.message });
//         }
//     });
// });

// update for opting list by roll number
router.put('/opting/:id', function (req, res, next) {
    studentsService.updateForOptingList(req.params.id, req.body.rollNumbers, function (err, response) {
        if (!err) {
            res.send(response);
        }
        else {
            res.status(500).send({ name: err.name, message: err.message });
        }
    });
});

// update for placed student list by roll number
router.put('/placed', function (req, res, next) {
    studentsService.updateForPlacedList(req.body, function (err, response) {
        if (!err) {
            res.send(response);
        }
        else {
            res.status(500).send({ name: err.name, message: err.message });
        }
    });
});

// publish global list and send email to everyone to optin/optout for placement cycle
router.put('/globalList/invite', function (req, res, next) {
    studentsService.inviteGlobalList(req.body, function (err, response) {
        if (!err) {
            res.send(response);
        }
        else {
            res.status(500).send({ name: err.name, message: err.message });
        }
    });
});

module.exports = router;