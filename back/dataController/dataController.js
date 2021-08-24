const express = require('express');
const router = require('express-promise-router')();

const bodyParser = require('body-parser');
router.use(bodyParser.json());

const data = require('./data');


router.get('/top10', async (req, res) => {
    let newDataTop10 = await data.getCryptoPriceTop10();
    res.send(newDataTop10);
});

router.get('/caps', async (req, res) => {
    let capsData = await data.getCryptoPriceCaps();
    res.send(capsData);
});

router.get('/chz', async (req, res) => {
    let chzData = await data.getCryptoPriceChz();
    res.send(chzData);
});

router.get('/rep', async (req, res) => {
    let repData = await data.getCryptoPriceRep();
    res.send(repData);
});

router.get('/syl', async (req, res) => {
    let sylData = await data.getCryptoPriceSyl();
    res.send(sylData);
});

router.get('/theta', async (req, res) => {
    let thetaData = await data.getCryptoPriceTheta();
    res.send(thetaData);
});

router.get('/link', async (req, res) => {
    let linkData = await data.getCryptoPriceLink();
    res.send(linkData);
});

router.get('/vet', async (req, res) => {
    let vetData = await data.getCryptoPriceVet();
    res.send(vetData);
});

router.get('/ksm', async (req, res) => {
    let ksmData = await data.getCryptoPriceKsm();
    res.send(ksmData);
});

router.get('/tlm', async (req, res) => {
    let tlmData = await data.getCryptoPriceTlm();
    res.send(tlmData);
});

router.get('/wax', async (req, res) => {
    let waxData = await data.getCryptoPriceWax();
    res.send(waxData);
});

router.get('/cake', async (req, res) => {
    let cakeData = await data.getCryptoPriceCake();
    res.send(cakeData);
});

module.exports = router