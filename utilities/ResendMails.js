const studentsService = require("../services/studentsService");
const studentsDao = require("../daos/studentsDao");
const dbUtil = require('../daos/MongodDbUtil');

dbUtil.connect(function (err, db) {
    if (err) {
        console.error("Not able to connect to MongoDB");
    } else {
        process.nextTick(getFunction(processStudents, db));
    }
});

function getFunction(fn, arg) {
    //TODO use arguments variable
    return function () {
        return fn(arg);
    }
}

function processStudents(db) {
    var listName = process.argv[2];

    if (listName == "GLOBAL_LIST") {
        studentsDao.getByQuery({ globalOptingStatus: "PENDING" }, ["rollNumber", "name", "email"], sendMailsToStudents);
    }
}

function sendMailsToStudents(err, records) {
    studentsService.sendGlobalListInviteEmail(records, process.argv[3], processEmailResponse);
}

function processEmailResponse(err, emailStatus) {
    if (!err) {
        console.log("Successfully sent email to students pending confirmation");
    } else {
        console.log("Error while resending pending confirmation emails " + err);
    }
    process.nextTick(function () {
        process.exit(1);
    });
}