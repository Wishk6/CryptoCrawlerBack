var mysql      = require('mysql');
var connection = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'cryptowallet'
});


module.exports=connection;