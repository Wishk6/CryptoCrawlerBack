const express = require('express');
const router = express.Router();
const cryptoData = require('./data');


router.post('/', async (req, res) => {
  cryptoData.get(req, function (err, rows) {
    if (err) res.status(400).json(err);
    else res.status(200).json(rows)
  });
});



router.post('/insert', async (req, res) => { // to ad a crypto  

  if (req.body[0].name != undefined) {
    let newData = await cryptoData.create(req.body[0].name, "newCryptoObj", req.body[0].investInCrypto, req.body[0].investInDollars, req.body[0].id);
    cryptoData.insert(newData, function (err, rows) {
      if (err) res.status(400).json(err);
      else res.status(200).json(rows)
    });
  }
});

router.post('/delete', async (req, res) => { // to remove a crypto 
  cryptoData.delete(req, function (err, rows) {
    if (err) res.status(400).json(err);
    else res.status(200).json(rows)
  });
});


module.exports = router