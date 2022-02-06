const db = require("../db");
const helpers = require("../helpers/helpers");

var tableName = "user";

var user = {
    get: function (req, callback) {
        
        return helpers.makeWhereSql(db, req, callback, tableName);
    },

    insert: function (req, callback) {
        req.body.role = "U";
        return helpers.makeInsertSql(db, req, callback, tableName);
    },

    update: function (req, callback) {
        return helpers.makeUpdateSql(db, req, callback, tableName);
    },

    delete: function (req, callback) {

        return helpers.makeDeleteSql(db, req, callback, tableName);
    },

    login: function (req, callback) {
        let body = req.body;
        let email = body.email;
        let mdp = body.mdp;
        let request = { where: { email: email, mdp: mdp } }
        this.get(request, function (err, rows) {
            if (err || rows == undefined || rows.length == 0) {   // test row if not empty 
                return callback("Impossible de trouver l'user",err,"test", null);
            }
            if (rows[0].mdp == mdp) {
                return callback(null, rows);
            } else {
                return callback("Please enter a password :)", null);
            }
        });
    },
}

module.exports = user;

