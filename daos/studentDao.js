var mongodb = require('./MongodDbUtil');
var dao = require("./baseDao")("students");
module.exports = dao;

function getDistinctValues(keyName, query, callback) {
    if (typeof query == "function") {
        callback = query;
        query = null;
    }
    var db = mongodb.getDb();
    var coll = db.collection(this.getCollectionName());
    coll.distinct(keyName, query, function (err, result) {
        if (!err) {
            callback(null, result);
        } else {
            callback(err, null);
        }
    });
}
module.exports.getDistinctValues = getDistinctValues;