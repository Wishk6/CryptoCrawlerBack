const axios = require('axios');
const cheerio = require('cheerio');


const keysCryptoObjTop10 = [
    "Position",
    "Name",
    "Price",
    "DailyChange",
    "WeeklyChange",
    "MarketCap",
    "Volume",
    "CircuSupply"
]

const keysCryptoObj = [
    "Name",
    "Price",
    "DailyChange",
    "Low/high",
    "TradingVolume",
    "Volume",
    "Dominance",
    "Position",
    "MarketCap",
    "FullMarketCap",
    "Volume",
    "CircuSupply",
]

var data = {

    getCryptoPriceChz: async function () {
        let coinObjChz = {};
        try {                                                     /*HERE*/
            const siteUrl = 'https://coinmarketcap.com/currencies/chiliz/'; // change cryptoName HERE to see an other cryptoData
            const { data } = await axios({
                method: "GET",
                url: siteUrl,
            })
            const $ = cheerio.load(data);

            coinObjChz[keysCryptoObj[0]] = 'Chiliz'
            const selector = '#__next > div > div.main-content > div.sc-57oli2-0.dEqHl.cmc-body-wrapper > div > div.sc-16r8icm-0.jKrmxw.container > div > div.sc-16r8icm-0.sc-19zk94m-1.gRSJaB > div.sc-16r8icm-0.iutcov > div.sc-16r8icm-0.hgKnTV > div > div:nth-child(2) > table > tbody > tr > td';

            $(selector).each((parentIdx, parentElem) => {

                parentIdx += 1;
                if (parentIdx === 1 || parentIdx === 2 || parentIdx === 7) {
                    //  $(parentElem).each((childIdx, childElem) => {
                    let tdValue = $(parentElem).text();

                    if (parentIdx === 2) {
                        tdValue = $('span:last-child', $(parentElem).html()).text();
                    }
                    if (tdValue) {
                        coinObjChz[keysCryptoObj[parentIdx]] = tdValue;
                    }
                    parentIdx++;
                }
            })

            const selector2 = '#__next > div > div.main-content > div.sc-57oli2-0.dEqHl.cmc-body-wrapper > div > div.sc-16r8icm-0.eMxKgr.container > div.n78udj-0.jskEGI > div > div.sc-16r8icm-0.fggtJu.statsSection > div > div';

            $(selector2).each((parentIdx2, parentElem2) => {

                let tdValue = $(parentElem2).text();
                parentIdx2 += 8;

                if (tdValue && parentIdx2 != 9) {

                    coinObjChz[keysCryptoObj[parentIdx2]] = tdValue;
                    parentIdx2++;
                }
            })

            arrowSelector = '#__next > div > div.main-content > div.sc-57oli2-0.dEqHl.cmc-body-wrapper > div > div.sc-16r8icm-0.eMxKgr.container > div.n78udj-0.jskEGI > div > div.sc-16r8icm-0.kjciSH.priceSection > div.sc-16r8icm-0.kjciSH.priceTitle > span > span';

            let downArrow = $(arrowSelector).hasClass('icon-Caret-down');

            if (downArrow) {
                coinObjChz[keysCryptoObj[2]] = "-" + coinObjChz[keysCryptoObj[2]];
            } else {
                coinObjChz[keysCryptoObj[2]] = "+" + coinObjChz[keysCryptoObj[2]];
            }


        } catch (err) {
            console.error(err);
        }
        console.log("Chz price reloaded");

        return coinObjChz;
    },

    getCryptoPriceTheta: async function () {
        let coinObjTheta = {};
        try {                                                     /*HERE*/
            const siteUrl = 'https://coinmarketcap.com/currencies/theta/'; // change cryptoName HERE to see an other cryptoData
            const { data } = await axios({
                method: "GET",
                url: siteUrl,
            })
            const $ = cheerio.load(data);

            coinObjTheta[keysCryptoObj[0]] = 'Theta'
            const selector = '#__next > div > div.main-content > div.sc-57oli2-0.dEqHl.cmc-body-wrapper > div > div.sc-16r8icm-0.jKrmxw.container > div > div.sc-16r8icm-0.sc-19zk94m-1.gRSJaB > div.sc-16r8icm-0.iutcov > div.sc-16r8icm-0.hgKnTV > div > div:nth-child(2) > table > tbody > tr > td';

            $(selector).each((parentIdx, parentElem) => {

                parentIdx += 1;
                if (parentIdx === 1 || parentIdx === 2 || parentIdx === 7) {
                    //  $(parentElem).each((childIdx, childElem) => {
                    let tdValue = $(parentElem).text();

                    if (parentIdx === 2) {
                        tdValue = $('span:last-child', $(parentElem).html()).text();
                    }
                    if (tdValue) {
                        coinObjTheta[keysCryptoObj[parentIdx]] = tdValue;
                    }
                    parentIdx++;
                }
            })

            const selector2 = '#__next > div > div.main-content > div.sc-57oli2-0.dEqHl.cmc-body-wrapper > div > div.sc-16r8icm-0.eMxKgr.container > div.n78udj-0.jskEGI > div > div.sc-16r8icm-0.fggtJu.statsSection > div > div';

            $(selector2).each((parentIdx2, parentElem2) => {

                let tdValue = $(parentElem2).text();
                parentIdx2 += 8;

                if (tdValue && parentIdx2 != 9) {

                    coinObjTheta[keysCryptoObj[parentIdx2]] = tdValue;
                    parentIdx2++;
                }
            })

            arrowSelector = '#__next > div > div.main-content > div.sc-57oli2-0.dEqHl.cmc-body-wrapper > div > div.sc-16r8icm-0.eMxKgr.container > div.n78udj-0.jskEGI > div > div.sc-16r8icm-0.kjciSH.priceSection > div.sc-16r8icm-0.kjciSH.priceTitle > span > span';

            let downArrow = $(arrowSelector).hasClass('icon-Caret-down');

            if (downArrow) {
                coinObjTheta[keysCryptoObj[2]] = "-" + coinObjTheta[keysCryptoObj[2]];
            } else {
                coinObjTheta[keysCryptoObj[2]] = "+" + coinObjTheta[keysCryptoObj[2]];
            }

        } catch (err) {
            console.error(err);
        }
        console.log("Theta price reloaded");
        return coinObjTheta;
    },

    getCryptoPriceCaps: async function () {

        coinObj = {};
        try {                                                     /*HERE*/
            let siteUrl = 'https://coinmarketcap.com/currencies/ternoa/'; // change cryptoName HERE to see an other cryptoData
            let { data } = await axios({
                method: "GET",
                url: siteUrl,
            })
            let $ = cheerio.load(data);

            coinObj[keysCryptoObj[0]] = 'Ternoa'
            let selector = '#__next > div > div.main-content > div.sc-57oli2-0.dEqHl.cmc-body-wrapper > div > div.sc-16r8icm-0.jKrmxw.container > div > div.sc-16r8icm-0.sc-19zk94m-1.gRSJaB > div.sc-16r8icm-0.iutcov > div.sc-16r8icm-0.hgKnTV > div > div:nth-child(2) > table > tbody > tr > td';

            $(selector).each((parentIdx, parentElem) => {
                parentIdx += 1;
                if (parentIdx === 1 || parentIdx === 2 || parentIdx === 7) {
                    //  $(parentElem).each((childIdx, childElem) => {
                    let tdValue = $(parentElem).text();

                    if (parentIdx === 2) {
                        tdValue = $('span:last-child', $(parentElem).html()).text();
                    }
                    if (tdValue) {
                        coinObj[keysCryptoObj[parentIdx]] = tdValue;
                    }
                    parentIdx++;
                }
            })

            const selector2 = '#__next > div > div.main-content > div.sc-57oli2-0.dEqHl.cmc-body-wrapper > div > div.sc-16r8icm-0.eMxKgr.container > div.n78udj-0.jskEGI > div > div.sc-16r8icm-0.fggtJu.statsSection > div > div';

            $(selector2).each((parentIdx2, parentElem2) => {

                let tdValue = $(parentElem2).text();
                parentIdx2 += 8;

                if (tdValue && parentIdx2 != 9) {

                    coinObj[keysCryptoObj[parentIdx2]] = tdValue;
                    parentIdx2++;
                }
            })

            arrowSelector = '#__next > div > div.main-content > div.sc-57oli2-0.dEqHl.cmc-body-wrapper > div > div.sc-16r8icm-0.eMxKgr.container > div.n78udj-0.jskEGI > div > div.sc-16r8icm-0.kjciSH.priceSection > div.sc-16r8icm-0.kjciSH.priceTitle > span > span';

            let downArrow = $(arrowSelector).hasClass('icon-Caret-down');

            if (downArrow) {
                coinObj[keysCryptoObj[2]] = "-" + coinObj[keysCryptoObj[2]];
            } else {
                coinObj[keysCryptoObj[2]] = "+" + coinObj[keysCryptoObj[2]];
            }

        } catch (err) {
            console.error(err);
        }
        console.log("caps price reloaded");
        return coinObj;
    },

    getCryptoPriceRep: async function () {
        let coinObjRep = {};
        try {                                                     /*HERE*/
            const siteUrl = 'https://coinmarketcap.com/currencies/augur/'; // change cryptoName HERE to see an other cryptoData
            const { data } = await axios({
                method: "GET",
                url: siteUrl,
            })
            const $ = cheerio.load(data);

            coinObjRep[keysCryptoObj[0]] = 'Rep'
            const selector = '#__next > div > div.main-content > div.sc-57oli2-0.dEqHl.cmc-body-wrapper > div > div.sc-16r8icm-0.jKrmxw.container > div > div.sc-16r8icm-0.sc-19zk94m-1.gRSJaB > div.sc-16r8icm-0.iutcov > div.sc-16r8icm-0.hgKnTV > div > div:nth-child(2) > table > tbody > tr > td';

            $(selector).each((parentIdx, parentElem) => {

                parentIdx += 1;
                if (parentIdx === 1 || parentIdx === 2 || parentIdx === 7) {
                    //  $(parentElem).each((childIdx, childElem) => {
                    let tdValue = $(parentElem).text();

                    if (parentIdx === 2) {
                        tdValue = $('span:last-child', $(parentElem).html()).text();
                    }
                    if (tdValue) {
                        coinObjRep[keysCryptoObj[parentIdx]] = tdValue;
                    }
                    parentIdx++;
                }
            })

            const selector2 = '#__next > div > div.main-content > div.sc-57oli2-0.dEqHl.cmc-body-wrapper > div > div.sc-16r8icm-0.eMxKgr.container > div.n78udj-0.jskEGI > div > div.sc-16r8icm-0.fggtJu.statsSection > div > div';

            $(selector2).each((parentIdx2, parentElem2) => {

                let tdValue = $(parentElem2).text();
                parentIdx2 += 8;

                if (tdValue /*&& parentIdx2 != 9*/) {

                    coinObjRep[keysCryptoObj[parentIdx2]] = tdValue;
                    parentIdx2++;
                }
            })

            arrowSelector = '#__next > div > div.main-content > div.sc-57oli2-0.dEqHl.cmc-body-wrapper > div > div.sc-16r8icm-0.eMxKgr.container > div.n78udj-0.jskEGI > div > div.sc-16r8icm-0.kjciSH.priceSection > div.sc-16r8icm-0.kjciSH.priceTitle > span > span';

            let downArrow = $(arrowSelector).hasClass('icon-Caret-down');

            if (downArrow) {
                coinObjRep[keysCryptoObj[2]] = "-" + coinObjRep[keysCryptoObj[2]];
            } else {
                coinObjRep[keysCryptoObj[2]] = "+" + coinObjRep[keysCryptoObj[2]];
            }

        } catch (err) {
            console.error(err);
        }
        console.log("Rep price reloaded");

        return coinObjRep;
    },

    getCryptoPriceSyl: async function () {
        let coinObjSyl = {};
        try {                                                     /*HERE*/
            let siteUrl = 'https://coinmarketcap.com/currencies/xsl-labs/'; // change cryptoName HERE to see an other cryptoData
            let { data } = await axios({
                method: "GET",
                url: siteUrl,
            })
            let $ = cheerio.load(data);

            coinObjSyl[keysCryptoObj[0]] = 'Syl'
            let selector = '#__next > div > div.main-content > div.sc-57oli2-0.dEqHl.cmc-body-wrapper > div > div.sc-16r8icm-0.jKrmxw.container > div > div.sc-16r8icm-0.sc-19zk94m-1.gRSJaB > div.sc-16r8icm-0.iutcov > div.sc-16r8icm-0.hgKnTV > div > div:nth-child(2) > table > tbody > tr > td';

            $(selector).each((parentIdx, parentElem) => {

                parentIdx += 1;
                if (parentIdx === 1 || parentIdx === 2 || parentIdx === 7) {
                    //  $(parentElem).each((childIdx, childElem) => {
                    let tdValue = $(parentElem).text();

                    if (parentIdx === 2) {
                        tdValue = $('span:last-child', $(parentElem).html()).text();
                    }
                    if (tdValue) {
                        coinObjSyl[keysCryptoObj[parentIdx]] = tdValue;
                    }
                    parentIdx++;
                }
            })

            const selector2 = '#__next > div > div.main-content > div.sc-57oli2-0.dEqHl.cmc-body-wrapper > div > div.sc-16r8icm-0.eMxKgr.container > div.n78udj-0.jskEGI > div > div.sc-16r8icm-0.fggtJu.statsSection > div > div';

            $(selector2).each((parentIdx2, parentElem2) => {

                let tdValue = $(parentElem2).text();
                parentIdx2 += 8;

                if (tdValue /*&& parentIdx2 != 9*/) {

                    coinObjSyl[keysCryptoObj[parentIdx2]] = tdValue;
                    parentIdx2++;
                }
            })

            arrowSelector = '#__next > div > div.main-content > div.sc-57oli2-0.dEqHl.cmc-body-wrapper > div > div.sc-16r8icm-0.eMxKgr.container > div.n78udj-0.jskEGI > div > div.sc-16r8icm-0.kjciSH.priceSection > div.sc-16r8icm-0.kjciSH.priceTitle > span > span';

            let downArrow = $(arrowSelector).hasClass('icon-Caret-down');

            if (downArrow) {
                coinObjSyl[keysCryptoObj[2]] = "-" + coinObjSyl[keysCryptoObj[2]];
            } else {
                coinObjSyl[keysCryptoObj[2]] = "+" + coinObjSyl[keysCryptoObj[2]];
            }

            console.log("Syl price reloaded");
            return coinObjSyl;
        } catch (err) {
            console.error(err);
        }

    },

    getCryptoPriceLink: async function () {
        let coinObjLink = {};
        try {                                                     /*HERE*/
            let siteUrl = 'https://coinmarketcap.com/currencies/chainlink/'; // change cryptoName HERE to see an other cryptoData
            let { data } = await axios({
                method: "GET",
                url: siteUrl,
            })
            let $ = cheerio.load(data);

            coinObjLink[keysCryptoObj[0]] = 'Chainlink'
            let selector = '#__next > div > div.main-content > div.sc-57oli2-0.dEqHl.cmc-body-wrapper > div > div.sc-16r8icm-0.jKrmxw.container > div > div.sc-16r8icm-0.sc-19zk94m-1.gRSJaB > div.sc-16r8icm-0.iutcov > div.sc-16r8icm-0.hgKnTV > div > div:nth-child(2) > table > tbody > tr > td';

            $(selector).each((parentIdx, parentElem) => {

                parentIdx += 1;
                if (parentIdx === 1 || parentIdx === 2 || parentIdx === 7) {
                    //  $(parentElem).each((childIdx, childElem) => {
                    let tdValue = $(parentElem).text();

                    if (parentIdx === 2) {
                        tdValue = $('span:last-child', $(parentElem).html()).text();
                    }
                    if (tdValue) {
                        coinObjLink[keysCryptoObj[parentIdx]] = tdValue;
                    }
                    parentIdx++;
                }
            })

            const selector2 = '#__next > div > div.main-content > div.sc-57oli2-0.dEqHl.cmc-body-wrapper > div > div.sc-16r8icm-0.eMxKgr.container > div.n78udj-0.jskEGI > div > div.sc-16r8icm-0.fggtJu.statsSection > div > div';

            $(selector2).each((parentIdx2, parentElem2) => {

                let tdValue = $(parentElem2).text();
                parentIdx2 += 8;

                if (tdValue /*&& parentIdx2 != 9*/) {

                    coinObjLink[keysCryptoObj[parentIdx2]] = tdValue;
                    parentIdx2++;
                }
            })

            arrowSelector = '#__next > div > div.main-content > div.sc-57oli2-0.dEqHl.cmc-body-wrapper > div > div.sc-16r8icm-0.eMxKgr.container > div.n78udj-0.jskEGI > div > div.sc-16r8icm-0.kjciSH.priceSection > div.sc-16r8icm-0.kjciSH.priceTitle > span > span';

            let downArrow = $(arrowSelector).hasClass('icon-Caret-down');

            if (downArrow) {
                coinObjLink[keysCryptoObj[2]] = "-" + coinObjLink[keysCryptoObj[2]];
            } else {
                coinObjLink[keysCryptoObj[2]] = "+" + coinObjLink[keysCryptoObj[2]];
            }

            console.log("Link price reloaded");
            return coinObjLink;
        } catch (err) {
            console.error(err);
        }

    },

    getCryptoPriceVet: async function () {
        let coinObjVet = {};
        try {                                                     /*HERE*/
            const siteUrl = 'https://coinmarketcap.com/currencies/vechain/'; // change cryptoName HERE to see an other cryptoData
            const { data } = await axios({
                method: "GET",
                url: siteUrl,
            })
            const $ = cheerio.load(data);

            coinObjVet[keysCryptoObj[0]] = 'Vechain'
            const selector = '#__next > div > div.main-content > div.sc-57oli2-0.dEqHl.cmc-body-wrapper > div > div.sc-16r8icm-0.jKrmxw.container > div > div.sc-16r8icm-0.sc-19zk94m-1.eToEXD > div.sc-16r8icm-0.iutcov > div.sc-16r8icm-0.hgKnTV > div > div:nth-child(2) > table > tbody > tr > td';

            $(selector).each((parentIdx, parentElem) => {

                parentIdx += 1;
                if (parentIdx === 1 || parentIdx === 2 || parentIdx === 7) {
                    //  $(parentElem).each((childIdx, childElem) => {
                    let tdValue = $(parentElem).text();

                    if (parentIdx === 2) {
                        tdValue = $('span:last-child', $(parentElem).html()).text();
                    }
                    if (tdValue) {
                        coinObjVet[keysCryptoObj[parentIdx]] = tdValue;
                    }
                    parentIdx++;
                }
            })

            const selector2 = '#__next > div > div.main-content > div.sc-57oli2-0.dEqHl.cmc-body-wrapper > div > div.sc-16r8icm-0.eMxKgr.container > div.n78udj-0.jskEGI > div > div.sc-16r8icm-0.fggtJu.statsSection > div > div';

            $(selector2).each((parentIdx2, parentElem2) => {

                let tdValue = $(parentElem2).text();
                parentIdx2 += 8;

                if (tdValue && parentIdx2 != 9) {

                    coinObjVet[keysCryptoObj[parentIdx2]] = tdValue;
                    parentIdx2++;
                }
            })

            arrowSelector = '#__next > div > div.main-content > div.sc-57oli2-0.dEqHl.cmc-body-wrapper > div > div.sc-16r8icm-0.eMxKgr.container > div.n78udj-0.jskEGI > div > div.sc-16r8icm-0.kjciSH.priceSection > div.sc-16r8icm-0.kjciSH.priceTitle > span > span';

            let downArrow = $(arrowSelector).hasClass('icon-Caret-down');

            if (downArrow) {
                coinObjVet[keysCryptoObj[2]] = "-" + coinObjVet[keysCryptoObj[2]];
            } else {
                coinObjVet[keysCryptoObj[2]] = "+" + coinObjVet[keysCryptoObj[2]];
            }

        } catch (err) {
            console.error(err);
        }
        console.log("Vet price reloaded");
        return coinObjVet;
    },

    getCryptoPriceKsm: async function () {
        let coinObjKsm = {};
        try {                                                     /*HERE*/
            let siteUrl = 'https://coinmarketcap.com/currencies/kusama/'; // change cryptoName HERE to see an other cryptoData
            let { data } = await axios({
                method: "GET",
                url: siteUrl,
            })
            let $ = cheerio.load(data);

            coinObjKsm[keysCryptoObj[0]] = 'Kusama'
            let selector = '#__next > div > div.main-content > div.sc-57oli2-0.dEqHl.cmc-body-wrapper > div > div.sc-16r8icm-0.jKrmxw.container > div > div.sc-16r8icm-0.sc-19zk94m-1.gRSJaB > div.sc-16r8icm-0.iutcov > div.sc-16r8icm-0.hgKnTV > div > div:nth-child(2) > table > tbody > tr > td';

            $(selector).each((parentIdx, parentElem) => {

                parentIdx += 1;
                if (parentIdx === 1 || parentIdx === 2 || parentIdx === 7) {
                    //  $(parentElem).each((childIdx, childElem) => {
                    let tdValue = $(parentElem).text();

                    if (parentIdx === 2) {
                        tdValue = $('span:last-child', $(parentElem).html()).text();
                    }
                    if (tdValue) {
                        coinObjKsm[keysCryptoObj[parentIdx]] = tdValue;
                    }
                    parentIdx++;
                }
            })

            const selector2 = '#__next > div > div.main-content > div.sc-57oli2-0.dEqHl.cmc-body-wrapper > div > div.sc-16r8icm-0.eMxKgr.container > div.n78udj-0.jskEGI > div > div.sc-16r8icm-0.fggtJu.statsSection > div > div';

            $(selector2).each((parentIdx2, parentElem2) => {

                let tdValue = $(parentElem2).text();
                parentIdx2 += 8;

                if (tdValue /*&& parentIdx2 != 9*/) {

                    coinObjKsm[keysCryptoObj[parentIdx2]] = tdValue;
                    parentIdx2++;
                }
            })

            arrowSelector = '#__next > div > div.main-content > div.sc-57oli2-0.dEqHl.cmc-body-wrapper > div > div.sc-16r8icm-0.eMxKgr.container > div.n78udj-0.jskEGI > div > div.sc-16r8icm-0.kjciSH.priceSection > div.sc-16r8icm-0.kjciSH.priceTitle > span > span';

            let downArrow = $(arrowSelector).hasClass('icon-Caret-down');

            if (downArrow) {
                coinObjKsm[keysCryptoObj[2]] = "-" + coinObjKsm[keysCryptoObj[2]];
            } else {
                coinObjKsm[keysCryptoObj[2]] = "+" + coinObjKsm[keysCryptoObj[2]];
            }

            console.log("Ksm price reloaded");
            return coinObjKsm;
        } catch (err) {
            console.error(err);
        }

    },

    getCryptoPriceTlm: async function () {
        let coinObjTlm = {};
        try {                                                     /*HERE*/
            let siteUrl = 'https://coinmarketcap.com/currencies/alien-worlds/'; // change cryptoName HERE to see an other cryptoData
            let { data } = await axios({
                method: "GET",
                url: siteUrl,
            })
            let $ = cheerio.load(data);

            coinObjTlm[keysCryptoObj[0]] = 'Alien Worlds'
            let selector = '#__next > div > div.main-content > div.sc-57oli2-0.dEqHl.cmc-body-wrapper > div > div.sc-16r8icm-0.jKrmxw.container > div > div.sc-16r8icm-0.sc-19zk94m-1.gRSJaB > div.sc-16r8icm-0.iutcov > div.sc-16r8icm-0.hgKnTV > div > div:nth-child(2) > table > tbody > tr > td';

            $(selector).each((parentIdx, parentElem) => {

                parentIdx += 1;
                if (parentIdx === 1 || parentIdx === 2 || parentIdx === 7) {
                    //  $(parentElem).each((childIdx, childElem) => {
                    let tdValue = $(parentElem).text();

                    if (parentIdx === 2) {
                        tdValue = $('span:last-child', $(parentElem).html()).text();
                    }
                    if (tdValue) {
                        coinObjTlm[keysCryptoObj[parentIdx]] = tdValue;
                    }
                    parentIdx++;
                }
            })

            const selector2 = '#__next > div > div.main-content > div.sc-57oli2-0.dEqHl.cmc-body-wrapper > div > div.sc-16r8icm-0.eMxKgr.container > div.n78udj-0.jskEGI > div > div.sc-16r8icm-0.fggtJu.statsSection > div > div';

            $(selector2).each((parentIdx2, parentElem2) => {

                let tdValue = $(parentElem2).text();
                parentIdx2 += 8;

                if (tdValue /*&& parentIdx2 != 9*/) {

                    coinObjTlm[keysCryptoObj[parentIdx2]] = tdValue;
                    parentIdx2++;
                }
            })

            arrowSelector = '#__next > div > div.main-content > div.sc-57oli2-0.dEqHl.cmc-body-wrapper > div > div.sc-16r8icm-0.eMxKgr.container > div.n78udj-0.jskEGI > div > div.sc-16r8icm-0.kjciSH.priceSection > div.sc-16r8icm-0.kjciSH.priceTitle > span > span';

            let downArrow = $(arrowSelector).hasClass('icon-Caret-down');

            if (downArrow) {
                coinObjTlm[keysCryptoObj[2]] = "-" + coinObjTlm[keysCryptoObj[2]];
            } else {
                coinObjTlm[keysCryptoObj[2]] = "+" + coinObjTlm[keysCryptoObj[2]];
            }

            console.log("Tlm price reloaded");
            return coinObjTlm;
        } catch (err) {
            console.error(err);
        }

    },

    getCryptoPriceWax: async function () {
        let coinObjWax = {};
        try {                                                     /*HERE*/
            let siteUrl = 'https://coinmarketcap.com/currencies/wax/'; // change cryptoName HERE to see an other cryptoData
            let { data } = await axios({
                method: "GET",
                url: siteUrl,
            })
            let $ = cheerio.load(data);

            coinObjWax[keysCryptoObj[0]] = 'Wax'
            let selector = '#__next > div > div.main-content > div.sc-57oli2-0.dEqHl.cmc-body-wrapper > div > div.sc-16r8icm-0.jKrmxw.container > div > div.sc-16r8icm-0.sc-19zk94m-1.gRSJaB > div.sc-16r8icm-0.iutcov > div.sc-16r8icm-0.hgKnTV > div > div:nth-child(2) > table > tbody > tr > td';

            $(selector).each((parentIdx, parentElem) => {

                parentIdx += 1;
                if (parentIdx === 1 || parentIdx === 2 || parentIdx === 7) {
                    //  $(parentElem).each((childIdx, childElem) => {
                    let tdValue = $(parentElem).text();

                    if (parentIdx === 2) {
                        tdValue = $('span:last-child', $(parentElem).html()).text();
                    }
                    if (tdValue) {
                        coinObjWax[keysCryptoObj[parentIdx]] = tdValue;
                    }
                    parentIdx++;
                }
            })

            const selector2 = '#__next > div > div.main-content > div.sc-57oli2-0.dEqHl.cmc-body-wrapper > div > div.sc-16r8icm-0.eMxKgr.container > div.n78udj-0.jskEGI > div > div.sc-16r8icm-0.fggtJu.statsSection > div > div';

            $(selector2).each((parentIdx2, parentElem2) => {

                let tdValue = $(parentElem2).text();
                parentIdx2 += 8;

                if (tdValue /*&& parentIdx2 != 9*/) {

                    coinObjWax[keysCryptoObj[parentIdx2]] = tdValue;
                    parentIdx2++;
                }
            })

            arrowSelector = '#__next > div > div.main-content > div.sc-57oli2-0.dEqHl.cmc-body-wrapper > div > div.sc-16r8icm-0.eMxKgr.container > div.n78udj-0.jskEGI > div > div.sc-16r8icm-0.kjciSH.priceSection > div.sc-16r8icm-0.kjciSH.priceTitle > span > span';

            let downArrow = $(arrowSelector).hasClass('icon-Caret-down');

            if (downArrow) {
                coinObjWax[keysCryptoObj[2]] = "-" + coinObjWax[keysCryptoObj[2]];
            } else {
                coinObjWax[keysCryptoObj[2]] = "+" + coinObjWax[keysCryptoObj[2]];
            }

        } catch (err) {
            console.error(err);
        }
        console.log("Wax price reloaded");
        return coinObjWax;
    },

    getCryptoPriceCake: async function () {
        let coinObjCake = {};
        try {                                                     /*HERE*/
            let siteUrl = 'https://coinmarketcap.com/currencies/pancakeswap/'; // change cryptoName HERE to see an other cryptoData
            let { data } = await axios({
                method: "GET",
                url: siteUrl,
            })
            let $ = cheerio.load(data);

            coinObjCake[keysCryptoObj[0]] = 'PancakeSwap'
            let selector = '#__next > div > div.main-content > div.sc-57oli2-0.dEqHl.cmc-body-wrapper > div > div.sc-16r8icm-0.jKrmxw.container > div > div.sc-16r8icm-0.sc-19zk94m-1.gRSJaB > div.sc-16r8icm-0.iutcov > div.sc-16r8icm-0.hgKnTV > div > div:nth-child(2) > table > tbody > tr > td';

            $(selector).each((parentIdx, parentElem) => {

                parentIdx += 1;
                if (parentIdx === 1 || parentIdx === 2 || parentIdx === 7) {
                    //  $(parentElem).each((childIdx, childElem) => {
                    let tdValue = $(parentElem).text();

                    if (parentIdx === 2) {
                        tdValue = $('span:last-child', $(parentElem).html()).text();
                    }
                    if (tdValue) {
                        coinObjCake[keysCryptoObj[parentIdx]] = tdValue;
                    }
                    parentIdx++;
                }
            })

            const selector2 = '#__next > div > div.main-content > div.sc-57oli2-0.dEqHl.cmc-body-wrapper > div > div.sc-16r8icm-0.eMxKgr.container > div.n78udj-0.jskEGI > div > div.sc-16r8icm-0.fggtJu.statsSection > div > div';

            $(selector2).each((parentIdx2, parentElem2) => {

                let tdValue = $(parentElem2).text();
                parentIdx2 += 8;

                if (tdValue && parentIdx2 != 9) {

                    coinObjCake[keysCryptoObj[parentIdx2]] = tdValue;
                    parentIdx2++;
                }
            })

            arrowSelector = '#__next > div > div.main-content > div.sc-57oli2-0.dEqHl.cmc-body-wrapper > div > div.sc-16r8icm-0.eMxKgr.container > div.n78udj-0.jskEGI > div > div.sc-16r8icm-0.kjciSH.priceSection > div.sc-16r8icm-0.kjciSH.priceTitle > span > span';

            let downArrow = $(arrowSelector).hasClass('icon-Caret-down');

            if (downArrow) {
                coinObjCake[keysCryptoObj[2]] = "-" + coinObjCake[keysCryptoObj[2]];
            } else {
                coinObjCake[keysCryptoObj[2]] = "+" + coinObjCake[keysCryptoObj[2]];
            }

            console.log("Cake price reloaded");
            return coinObjCake;
        } catch (err) {
            console.error(err);
        }

    },

    getCryptoPriceTop10: async function () {

        let coinArr = [];
        let keyIdx = 0;
        let coinObjTop10 = {};
        try {

            const siteUrl = 'https://coinmarketcap.com/en/';
            const { data } = await axios({
                method: "GET",
                url: siteUrl,
            })

            const $ = cheerio.load(data);
            const elemSelector = '#__next > div.bywovg-1.sXmSU > div.main-content > div.sc-57oli2-0.dEqHl.cmc-body-wrapper > div > div:nth-child(1) > div.h7vnx2-1.bFzXgL > table > tbody > tr'

            $(elemSelector).each((parentIdx, parentElem) => {  // console.log parenElem  pour voir toutes les methods possibles 
                keyIdx = 0;
                coinObjTop10 = {};
                    $(parentElem).children().each((childIdx, childElem) => {

                        let tdValue = $(childElem).text();

                        if (keyIdx === 1 || keyIdx === 6 || keyIdx === 5) {   // here  I change .volume and .name to get cleaned data  
                            tdValue = $('p:first-child', $(childElem).html()).text(); // get first elem of Name and Volume
                        }

                        if (keyIdx === 5) { // MarketCap
                            tdValue = $('span:last-child', $(childElem).html()).text();  // get the last span in .marketCap data 
                        }

                        if (keyIdx == 2) {
                            tdValue = tdValue.replace("$", " ")
                            tdValue = tdValue + " $"
                        }
                        if (tdValue) {  // test struct 
                            coinObjTop10[keysCryptoObjTop10[keyIdx]] = tdValue;
                            keyIdx++
                        }

                    })
                    let arrowSelector = '#__next > div > div.main-content > div.sc-57oli2-0.dEqHl.cmc-body-wrapper > div > div:nth-child(1) > div.h7vnx2-1.bFzXgL > table > tbody > tr:nth-child(1) > td:nth-child(5) > span > span';

                    let downArrow = $(arrowSelector).hasClass('icon-Caret-down');
        
                    if (downArrow) {
                        coinObjTop10[keysCryptoObjTop10[3]] = "-" + coinObjTop10[keysCryptoObjTop10[3]];
                    } else {
                        coinObjTop10[keysCryptoObjTop10[3]] = "+" + coinObjTop10[keysCryptoObjTop10[3]];
                    }

                    if (coinObjTop10[keysCryptoObjTop10[1]] == "Bitcoin" || coinObjTop10[keysCryptoObjTop10[1]] == "Ethereum" || coinObjTop10[keysCryptoObjTop10[1]] == "Binance Coin" || coinObjTop10[keysCryptoObjTop10[1]] == "Polkadot") {
                        coinArr.push(coinObjTop10);
                    }
               
    
            })

            console.log("price top10 reloaded");

            return coinArr;
        } catch (err) {
            console.error(err);
        }
    }
}

module.exports = data;