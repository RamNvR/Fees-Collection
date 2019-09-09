const dbUtil = require('../daos/MongodDbUtil');
var appLogger = require('../logging/appLogger');
const studentService = require('../services/studentService');
const programs = ["BE (SW)", "BE", "BSc", "BTech", "ME", "MSc", "MTech"];
const authService = require('../services/authService');

function getProgramName(degreeName) {
    if (degreeName === "MASTER OF COMPUTER APPLICATIONS") {
        return "MCA";
    } else {
        return "";
    }
}

const fieldSpec = {
    "Roll No.": "rollNumber",
    "Name": "studentName",
    "Sem": "currentSem",
    "Programmes": function enrichmentFunction(row, colValue, studentRecord) {
        var pgmPrefix = programs.find(function (pgm, index) {
            return colValue.startsWith(pgm);
        });
        if (!pgmPrefix) {
            pgmPrefix = getProgramName(colValue);
            studentRecord.branchName = colValue;
        } else {
            studentRecord.programName = pgmPrefix;
            studentRecord.branchName = colValue.substr(pgmPrefix.length).trim();
        }
        studentRecord.degreeName = colValue;
    }
};

//connect to DB and process the Excel file
dbUtil.connect(function (err, db) {
    if (err) {
        appLogger.error("Not able to connect to MongoDB");
    } else {
        processExcelFile(db);
    }
});

function processExcelFile(db) {
    var xlsx = require('node-xlsx');

    // var obj = xlsx.parse(__dirname + '/../omr_input/PSG_coimbatore.xlsx');
    var obj = xlsx.parse(process.argv[2]);

    if (obj.length > 0) {
        var sheet = obj[0];
        var studentRecordsToInsert = processExcelRows(sheet.data);

        insertStudentInList(0, studentRecordsToInsert, function (err, response) {
            if (!err) {
                console.log("Response: " + response);

                //create login ids
                authService.createUsers(studentRecordsToInsert, function (usersErr, response) {
                    if (!usersErr) {
                        console.log("User account created successfully");

                        process.nextTick(function() {
                            process.exit(1);
                        });
                    }
                });

            } else {
                console.log("Error: " + err);
            }
        });
    }
}

/**
 * Insert students one after the other sequentially
 * 
 * @param {*} index 
 * @param {*} students 
 * @param {*} finalCallback 
 */
function insertStudentInList(index, students, finalCallback) {
    if (index >= students.length) {
        finalCallback(null, students.length + " Students inserted successfully");
        return;
    }
    var studentRecord = students[index];
    studentService.createStudent(studentRecord, function (err, response) {
        if (!err) {
            appLogger.info(studentRecord.rollNumber + " inserted successfully");
        } else {
            appLogger.info(studentRecord.rollNumber + " insertion failed. Error:" + err.message);
        }
        index++;
        insertStudentInList(index, students, finalCallback);
    });
}

function processExcelRows(sheetData) {
    var fieldNames = sheetData[0];

    var studentRecords = [];
    sheetData.forEach(function (row, rowIndex) {
        if (rowIndex == 0) {
            return; //header row
        }

        var studentRecord = {};

        row.forEach(function (propValue, index) {
            var excelPropName = fieldNames[index];

            var mapping = fieldSpec[excelPropName];

            if (typeof mapping == "string") {
                //straight mapping, assign them directly
                if (typeof row[index] == "string") {
                    studentRecord[mapping] = row[index].toUpperCase();
                } else {
                    studentRecord[mapping] = row[index];
                }

            } else if (typeof mapping == "function") {
                mapping(row, row[index], studentRecord);
            }

        });

        studentRecords.push(studentRecord);
    });

    //appLogger.info(JSON.stringify(registrationRecords));
    return studentRecords;
}