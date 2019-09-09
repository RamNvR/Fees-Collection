var mongodbUtil = require('./MongodDbUtil');
var GridFSBucket = mongodbUtil.getMongodb().GridFSBucket;

function dropAttachment(fileId, callback) {
    var db = mongodbUtil.getDb();
    var grid = new GridFSBucket(db, {
        bucketName: 'fs'
    });
    grid.delete(mongodbUtil.ObjectID(fileId), function (err, result) {
        if (!err) {
            callback(null, { message: "Deleted Attachment successfully" });
        } else {
            callback(err, null);
        }
    });
}

function openAttachment(attachmentDetails, res) {
    var db = mongodbUtil.getDb();
    var grid = new GridFSBucket(db, {
        bucketName: 'fs'
    });
    res.set('Content-Type', attachmentDetails.contentType);
    res.set('Content-Disposition', 'attachment; filename="' + encodeURI(attachmentDetails.originalname) + '"');
    grid.openDownloadStream(mongodbUtil.ObjectID(attachmentDetails.id)).pipe(res).on('error', function (error) {
        res.status(500).send({ name: error.name, message: error.message });
    }).
        on('finish', function () {
            // console.log('done!');
        });
}

module.exports.openAttachment = openAttachment;
module.exports.dropAttachment = dropAttachment;
