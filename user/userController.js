const express = require('express');
const router = express.Router();
var userService = require('./user');
 
router.post('/', function (req, res) {
    userService.get(req, function(err, rows){
        if(err) res.status(400).json(err);
        else res.json(rows)
    });
});
 
router.post('/update', function (req, res) {
    userService.update(req, function(err, rows){
        if(err) res.status(400).json(err);
        else res.json(rows);
    });
});

router.post('/insert', function (req, res) {
    userService.insert(req, function(err, rows){
        if(err) res.status(400).json(err);
        else res.json(rows);
    });
});
 
router.post('/delete', function (req, res) {
    userService.delete(req, function(err, rows){
        if(err) res.status(400).json(err);
        else res.json(rows);
    });
});

router.post('/login', function (req, res) {
    userService.login(req, function(err, rows){
        if(err) res.status(400).json(err);
        else res.json(rows);
    });
});
 
module.exports = router;