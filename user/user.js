const db = require("../db");
const helpers = require("../helpers/helpers");

var tableName = "user";

var user = {
    get: function (req, callback) {
        return helpers.makeWhereSql(db, req, callback, tableName);
    },

    insert: function (req, callback) {
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
        console.log(body);
        let request = {  where : {email: email} }
        this.get(request, function (err, rows) {
            if (err || rows == undefined ||rows.length == 0) {
                return callback("Impossible de trouver l'user", null);
            } else {
                console.log(rows);
                if (rows[0].mdp == mdp) {
                    return callback(null, rows);
                } else {
                    return callback("Les mdp ne conviennent pas", null);
                }
            }
        });

    },

}

module.exports = user;

