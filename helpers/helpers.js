const query = require('../helpers/functions');

var helpers = {

    makeWhereSql(db, req, callback,tableName) {
        // {
        //     "where" : {
        //         "firstName" : "louis"
        //             , "idCategories": "[2,1]"
        //     }
        // }

        //getting all our stuff in the body with some condition

        var body = (typeof req.body != "undefined") ? query.cleanQuery(req.body) : req;
        var where = (typeof body.where != "undefined") ? body.where : ""
        // only deserve to precise SQL columns to get, if only is not in the body it'll replace by a SQL * 
        let only = (typeof body.only != "undefined") && Array.isArray(body.only) && body.only.length > 0 ? body.only.join(',') : "*"; 
        if (where == "") {

            let query = "SELECT " + only + " FROM  " + tableName;
            console.log("get " + tableName + " query ->" + query);
            return db.query(query, function (err, res) {
                if (err) return callback(err);
                else {
                    return callback(null, res)};
            });
        } else {
            let whereSend = [];
            for (const [key, value] of Object.entries(where)) {
                (typeof value == "number") ? whereSend.push(key + " = " + value) : null;
                (typeof value == "string") ? whereSend.push(key + " = '" + value + "'") : null;
                (Array.isArray(value)) && value.length > 0 ? whereSend.push(key + " IN(" + value.join(",") + ")") : null;
            }
            let query = "SELECT " + only + " FROM  " + tableName+" WHERE " + whereSend.join(" AND ");
            console.log("get " + tableName + " query ->" + query);
            return db.query(query, function (err, res) {
                if (err) return callback(err);
                else{

                    return callback(null, res);
                }

            });
        }

    },

makeUpdateSql(db, req, callback, tableName) {

        //getting all our stuff in the body with some condition
        var body = (typeof (req.body) != 'undefined') ? query.cleanQuery(req.body) : req;
        var where = (typeof body.where != "undefined") ? body.where : "";
        var update =  (typeof body.update != "undefined") ? body.update : "";


        // generating arrays composed by SQL piece of queries, they'll be .join() after.
        var whereSend = query.WhereSql(where);
        var updateSend = query.UpdateSql(update);
        if(updateSend.length == 0 && whereSend.length == 0 ){
            console.log("error updating");
            return callback("NO UPDATE");
        } else {
            let query = "UPDATE " + tableName + " SET " + updateSend.join(" , ") + " WHERE "+ whereSend.join(" AND ");
            return db.query(query, callback);
        }
        // condition on the callback 
    },

    makeInsertSql(db, req, callback, tableName) {
    //getting all our stuff in the body with some condition
    var body = (typeof (req.body) != 'undefined') ? query.cleanQuery(req.body) : req;
        var keys = [];
        var values = [];
        for (const [key, value] of Object.entries(body)) {
            if (value != null && value != "") {
                typeof value == "string"
                    ? values.push("'" + value + "'")
                    : typeof value == "int" ?
                        values.push(value) : values.push("'" + JSON.stringify(value) + "'");
                keys.push(key);
            }
        }
        let query = "INSERT INTO " + tableName + " (" +
            keys.join(",") +
            ") VALUES  (" +
            values.join(",") +
            ")";

        console.log("INSERT " + tableName + " QUERY ->", query);

        return db.query(query, function(err, res){
            if(err) {
              return 1;
           }
     return 0
        })
    },
makeDeleteSql : function(db, req, callback, tableName){
        //getting all our stuff in the body with some condition
        var body = (typeof req.body != "undefined") ? query.cleanQuery(req.body) : req;
        var where =  (typeof body.where != "undefined") ? body.where : ""
         // generating arrays composed by SQL piece of queries, they'll be .join() after.
        var whereSend = query.WhereSql(where);
        if(whereSend.length > 0) console.log("delete " + tableName + " query -> " + "DELETE FROM " + tableName + " WHERE " + whereSend.join(" AND "));
        return (whereSend.length > 0) ? db.query("DELETE FROM " + tableName + " WHERE " + whereSend.join(" AND "),callback) :  callback("no delete");
    },
}

module.exports = helpers;