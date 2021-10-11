const express = require('express');
const router = express.Router();
const cryptoData = require('./data');


router.post('/', function (req, res) {
  cryptoData.get(req, function (err, rows) {
    if (err) res.status(400).json(err);
    else res.json(rows)
  });
});

router.post('/update', function (req, res) {
  cryptoData.update(req, function (err, rows) {
    if (err) res.status(400).json(err);
    else res.json(rows);
  });
});

router.post('/insert', async (req, res) => { // scrap and put data in my db 
  let cryptoDataOBbj = [];

  let btcData = await cryptoData.create("Bitcoin", "bitcoinObj", 0.00112, 35);
  cryptoDataOBbj.push(btcData);

  cryptoData.get(req, function (err, rows) {
    if (err) {
      res.status(400).json(err);
    // }
    // if (res.price != btcData.price) {
    //   console.log( JSON.stringify(obj), btcData.price,"data is equal")
    //     res.json(rows);
    } else {
console.log(res.body, btcData.price,"data is equal")
    }
  });



//   let ethData = await cryptoData.create("Ethereum", "ethObj", 0.0164, 50);
// cryptoDataOBbj.push(ethData);

// let bnbData = await cryptoData.create("Binance-Coin", "bnbObj", 0.2, 50);
// cryptoDataOBbj.push(bnbData);

// let dotData = await cryptoData.create("Polkadot", "dotObj", 4.67, 117);
// cryptoDataOBbj.push(dotData);

// let ltcData = await cryptoData.create("Litecoin", "ltcObj", 0.375, 55);
// cryptoDataOBbj.push(ltcData);

// let thetaData = await cryptoData.create("Theta", "thetaObj", 5.1, 40);
// cryptoDataOBbj.push(thetaData);

// let cakeData = await cryptoData.create("Pancakeswap", "cakeObj", 13, 80);
// cryptoDataOBbj.push(cakeData);

// let grtData = await cryptoData.create("The-Graph", "grtObj", 130, 85);
// cryptoDataOBbj.push(grtData);

// let ksmData = await cryptoData.create("Kusama", "ksmObj", 0.82, 200);
// cryptoDataOBbj.push(ksmData);

// let chzData = await cryptoData.create("Chiliz", "chzData", 280, 0);
// cryptoDataOBbj.push(chzData);

// let chsbData = await cryptoData.create("Swissborg", "chsbObj", 55.3, 51);
// cryptoDataOBbj.push(chsbData);

// let waxData = await cryptoData.create("Wax", "waxObj", 700, 115);
// cryptoDataOBbj.push(waxData);

// let bandData = await cryptoData.create("Band-Protocol", "bandObj", 11.9, 85);
// cryptoDataOBbj.push(bandData);

// let repData = await cryptoData.create("Augur", "repObj", 10, 190);
// cryptoDataOBbj.push(repData);

// let tlmData = await cryptoData.create("Alien-Worlds", "tlmObj", 135, 0);
// cryptoDataOBbj.push(tlmData);

// let capsData = await cryptoData.create("Ternoa", "capsObj", 888, 60);
// cryptoDataOBbj.push(capsData);

// let sylData = await cryptoData.create("Xsl-labs", "sylObj", 55000, 90);
// cryptoDataOBbj.push(sylData);

// cryptoDataOBbj.forEach(element => {

//   cryptoData.insert(element, function (err, rows) {
//     if (err) return res.status(400).json(err);
//     else return res.json(rows);
//   });
// });
// });

// router.post('/delete', function (req, res) {
//   cryptoData.delete(req, function (err, rows) {
//     if (err) res.status(400).json(err);
//     else res.json(rows);
//   });
});

module.exports = router