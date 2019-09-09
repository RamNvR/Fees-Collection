var emailService = require('../email/sendgridmail');

module.exports.sendMail = function (record, mailType, mailParams, callback) {
    emailService.mail(record, mailType, mailParams, function (emailError, emailResponse) {
        if (!emailError) {
            console.log("Successfully sent email to user %s. Status code: %s", record.email, emailResponse.statusCode);
            callback(null,emailResponse);
        } else {
            console.error("Error %s", record.email);
            callback(emailError,null);
        }
    });
}