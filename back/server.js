var app = require('./app');
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;

var server = app.listen(port, function() {
    app.use(bodyParser.urlencoded({ extended: false }));           
    console.log("localhost:",port);
    const all_routes = require('express-list-endpoints');
    console.log(all_routes(app));
 
});