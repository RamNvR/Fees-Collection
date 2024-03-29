var studentDao = require('../daos/studentDao');
var appLogger = require('../logging/appLogger');
var mailService = require('./mailService');
var smsService = require('./smsService');
var gridfsDao = require('../daos/gridfsDao');

var config = require('../config/config.' + process.env.NODE_ENV);
var emailConfig = config.emailConfig;

function getAllStudentlist(callback) {
    studentDao.getAll(callback);
}

function getStudentTCById(rollNumber, callback) {
    var criteria = { rollNumber: rollNumber };
    var fieldsRequired = ["rollNumber", "fullName", "tcNo", "tcDate"];
    filterStudents(criteria, fieldsRequired, function (filterErr, student) {
        if (!filterErr) {
            //delete student[0]["_id"];
            callback(null, student);
        }
        else {
            callback(filterErr, null);
        }
    });
}



function createStudent(studentDetails, callback) {
    studentDao.create(studentDetails, callback);
}



function getStudentById(rollNumber, callback) {
    studentDao.getById({ rollNumber: rollNumber }, callback);
}


function rollNumberChange(rollNumber, studentDetails, callback) {
    studentDao.update({ rollNumber: rollNumber }, studentDetails, callback);
}

function updateStudentSection(rollNumber, studentDetails, callback) {
    studentDao.update({ rollNumber: rollNumber }, studentDetails, callback);
}

function updateStudentCoreDetails(rollNumber, studentDetails, callback) {
    studentDao.update({ rollNumber: rollNumber }, studentDetails, callback);
}

function addSectionItem(updateSectionReq, callback) {
    var rollNumber = updateSectionReq.rollNumber;
    var sectionName = updateSectionReq.sectionName;
    var detailsToUpdate = {};
    detailsToUpdate[sectionName] = updateSectionReq.detailsToUpdate;

    studentDao.updateArrayByQuery({ rollNumber: rollNumber }, detailsToUpdate, callback);
}

function deleteSectionItem(rollNumber, sectionName, itemIndex, callback) {
    var criteria = { rollNumber: rollNumber };
    var itemToDelete = {};
    itemToDelete[sectionName] = {
        "itemIndex": itemIndex
    };

    studentDao.removeItemInArrayByQuery(criteria, itemToDelete, callback);
}

function updateStudentSectionItem(rollNumber, sectionName, itemIndex, studentRecord, callback) {
    var criteria = { rollNumber: rollNumber };
    criteria[sectionName + ".itemIndex"] = itemIndex;

    var detailsToUpdate = {};
    detailsToUpdate[sectionName + ".$"] = studentRecord[sectionName];

    studentDao.update(criteria, detailsToUpdate, callback);
}

function getStudentDetailsByIdWithProjection(rollNumber, callback) {
    var criteria = { rollNumber: rollNumber };
    var fieldsRequired = ["rollNumber", "fullName", "courseCode", "email"];
    filterStudents(criteria, fieldsRequired, function (filterErr, student) {
        if (!filterErr) {
            //delete student[0]["_id"];
            callback(null, student);
        }
        else {
            callback(filterErr, null);
        }
    });
}


function getStudentDetailsByNameWithProjection(filterQuery, callback) {
    var criteria = filterQuery;
    var fieldsRequired = ["rollNumber", "fullName", "courseCode", "email"];
    filterStudents(criteria, fieldsRequired, function (filterErr, student) {
        if (!filterErr) {
            //delete student[0]["_id"];
            callback(null, student);
        }
        else {
            callback(filterErr, null);
        }
    });
}

function getStudentNationalityById(rollNumber, callback) {
    var criteria = { rollNumber: rollNumber };
    var fieldsRequired = ["rollNumber", "name", "degree", "stream", "nationality"];
    filterStudents(criteria, fieldsRequired, function (filterErr, student) {
        if (!filterErr) {
            //delete student[0]["_id"];
            callback(null, student);
        }
        else {
            callback(filterErr, null);
        }
    });
}

function filterStudents(criteria, projection, callback) {
    Object.keys(criteria).forEach(function (prop) {
        if ((criteria[prop]) && (typeof criteria[prop] === "string") && (criteria[prop].startsWith("/"))) {
            criteria[prop] = new RegExp(criteria[prop].substring(1, criteria[prop].length - 1));
        }
    });
    studentDao.getByQuery(criteria, projection, callback);
}

function removeStudent(rollNumber, callback) {
    studentDao.remove(rollNumber, callback);
}

function sendConfCodeToEmail(emailDetails, callback) {
    var mailParams = [emailDetails.code];
    if ((!emailDetails.email) || (emailConfig.mockEmail)) {
        emailDetails.email = (emailConfig.mockEmail) ? emailConfig.mockEmail : "arun@psgsoftwaretechnologies.com";
    }
    appLogger.info("About to send email verification code to %s ", emailDetails.email);
    mailService.sendMail(emailDetails, "emailVerification", mailParams, function (emailError, emailResponse) {
        if (!emailError) {
            appLogger.info("Successfully sent email verification code to user %s. Status code: %s", emailDetails.email, emailResponse.statusCode);
            callback(null, emailDetails.email);
        } else {
            appLogger.error("Error %s", emailDetails.email);
            callback(emailDetails.email, null);
        }
    });
}

function sendOTPtoMobile(otpDetails, callback) {
    smsService.sendMessage(otpDetails, callback);
}

function uploadDisplayPicture(rollNumber, displayPicture, callback) {
    studentDao.getById({ rollNumber: rollNumber }, function (err, student) {
        if (!err) {
            if (!student.displayPicture) {
                studentDao.update({ rollNumber: rollNumber }, displayPicture, callback);
            }
            else {
                gridfsDao.dropAttachment(student.displayPicture.id, function (attachErr, attachRes) {
                    if (!attachErr) {
                        studentDao.update({ rollNumber: rollNumber }, displayPicture, callback);
                    }
                });
            }
        }
    });
}

function uploadAttachment(rollNumber, sectionName, index, attachment, callback) {
    studentDao.getById({ rollNumber: rollNumber }, function (err, student) {
        if (!err) {
            if (!student.attachment) {
                studentDao.update({ rollNumber: rollNumber }, sectionName, index, attachment, callback);
            }
            else {
                gridfsDao.dropAttachment(student.attachment.id, function (attachErr, attachRes) {
                    if (!attachErr) {
                        studentDao.update({ rollNumber: rollNumber }, attachment, callback);
                    }
                });
            }
        }
    });
}

function openDisplayPicture(openAttachReq, res) {
    getStudentById(openAttachReq.rollNumber, function (err, student) {
        if (!err) {
            if (!student.displayPicture) {
                // callback(new Error("No display picture exist for given student roll number"), null);
                return;
            }
            var displayPictureDetails = {};
            if (student.displayPicture.originalname == openAttachReq.attachedFileName) {
                displayPictureDetails = student.displayPicture;
            }
            else {
                // callback(new Error("No matching attachments with give name"), null);
                return;
            }

            gridfsDao.openAttachment(displayPictureDetails, res);
        }
    });
}

function openAttachment(openAttachReq, res) {
    getStudentById(openAttachReq.rollNumber, function (err, student) {
        if (!err) {
            var item;
            if (!student[openAttachReq.sectionName]) {
                // callback(new Error("No display picture exist for given student roll number"), null);
                return;
            }

            var item = student[openAttachReq.sectionName];
            if (student[openAttachReq.sectionName] instanceof Array) {
                for (var i = 0; i < student[openAttachReq.sectionName].length; i++) {
                    var sectionItem = student[openAttachReq.sectionName][i];
                    if (sectionItem.itemIndex == openAttachReq.index) {
                        item = sectionItem;
                        break;
                    }
                }
            }
            if (item) {
                var fileDetails = item[openAttachReq.fieldName].find(function (attachment) {
                    return (attachment.originalname == openAttachReq.fileName);
                });
                if (fileDetails) {
                    gridfsDao.openAttachment(fileDetails, res);
                }
                else {
                    return;
                }
            }
        }
    });
}

function deleteAttachment(deleteReq, callback) {
    getStudentById(deleteReq.rollNumber, function (err, student) {
        if (!err) {
            if (!student.displayPicture) {
                callback(new Error("No display picture exist for given student roll number"), null);
                return;
            }
            var displayPictureDetails = {};
            if (student.displayPicture.originalname == deleteReq.attachedFileName) {
                displayPictureDetails = student.displayPicture;
            }
            else {
                callback(new Error("No matching attachments with give name"), null);
                return;
            }
            studentDao.updateToUnset({ rollNumber: deleteReq.rollNumber, "displayPicture.id": displayPictureDetails.id }, { displayPicture: "" }, function (err, res) {
                if (!err) {
                    //delete attachment from gridfs
                    gridfsDao.dropAttachment(displayPictureDetails.id, function (attachErr, attachRes) {
                        callback(attachErr, attachRes);
                    });
                }
            });
        }
    });

}

function getDistinctValuesFromStudents(keyName, query, callback) {
    studentDao.getDistinctValues(keyName, query, callback)
}

function removeDirtyAttachmentsForStudent(files, callback) {
    var processedFiles = [];
    files.forEach(function (file) {
        gridfsDao.dropAttachment(file.id, function (attachErr, attachRes) {
            if (!attachErr) {
                processedFiles.push(file);
                if (processedFiles.length == files.length) {
                    callback(null, processedFiles);
                }
            }
        });
    })
}


module.exports.getStudentDetailsByIdWithProjection = getStudentDetailsByIdWithProjection;
module.exports.createStudent = createStudent;
module.exports.getAllStudentlist = getAllStudentlist;
module.exports.getStudentById = getStudentById;
module.exports.updateStudentSection = updateStudentSection;
module.exports.updateStudentCoreDetails = updateStudentCoreDetails;
module.exports.removeStudent = removeStudent;
module.exports.filterStudents = filterStudents;
module.exports.getStudentNationalityById = getStudentNationalityById;
module.exports.rollNumberChange = rollNumberChange;
module.exports.getStudentTCById = getStudentTCById;
module.exports.sendConfCodeToEmail = sendConfCodeToEmail;
module.exports.sendOTPtoMobile = sendOTPtoMobile;
module.exports.uploadDisplayPicture = uploadDisplayPicture;
module.exports.openDisplayPicture = openDisplayPicture;
module.exports.openAttachment = openAttachment;
module.exports.deleteAttachment = deleteAttachment;
module.exports.getStudentDetailsByNameWithProjection = getStudentDetailsByNameWithProjection;
module.exports.addSectionItem = addSectionItem;
module.exports.updateStudentSectionItem = updateStudentSectionItem;
module.exports.getDistinctValuesFromStudents = getDistinctValuesFromStudents;
module.exports.deleteSectionItem = deleteSectionItem;
module.exports.removeDirtyAttachmentsForStudent = removeDirtyAttachmentsForStudent;