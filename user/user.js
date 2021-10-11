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

    delete : function(req,callback){

        return helpers.makeDeleteSql(db, req, callback, tableName);
    },

}

module.exports = user;