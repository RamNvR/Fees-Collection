
var msg91 = require("msg91")("185855ArSUMFtL5a1d5e18", "PSGTEK", "4");
var appLogger = require('../logging/appLogger');

function sendMessage(otpDetails, callback) {
    var mobileNo = otpDetails.mobileNumber;
    var messageText = "Your OTP for verifying your Mobile No is " + otpDetails.code + " Please enter it in your SIS Profile page.";
    msg91.send(mobileNo, messageText, function (err, response) {
        if (!err) {
            appLogger.info('check msg');
            callback(null, response);
        }
        else {
            appLogger.info('error dont check msg');
            callback(err, null);
        }
    });
}


module.exports.sendMessage = sendMessage;