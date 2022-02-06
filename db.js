var mysql = require('mysql');
var connection = mysql.createPool({
    host: 'localhost',
    user: 'cbym5024_wishk',
    // user     : 'root',
    password: 'Futurama31',
    // password: '',
    // database : 'cryptowallet'
    database: 'cbym5024_cryptocrawler',
    port: 3306
});


module.exports = connection;