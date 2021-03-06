const axios = require('axios');
const cheerio = require('cheerio');

const helpers = require("../helpers/helpers");

const db = require("../db");
const { json } = require('express/lib/response');
const res = require('express/lib/response');
var tableName = "cryptodata";

let keysCryptoObj = [
    "name",
    "price",
    "dailyChange",
    "balek",
    "balek",
    "balek",
    "balek",
    "position",
    "marketCap",
    "volume",
    "circuSupply",
    "investInCrypto",
    "investInDollars",
    "theoricPnl",
    "id"
]

var cryptoData = {
    create: async function (cryptoName, cryptoObj, investInCrypto, InvestInDollars, idUser) { // insert done in the controller

        cryptoObj = {};
        try {
            const siteUrl = 'https://coinmarketcap.com/currencies/' + cryptoName + '/';
            const { data } = await axios({
                method: "GET",
                url: siteUrl,
            })
            const $ = cheerio.load(data);

            cryptoObj["name"] = cryptoName;
            const selector = '#__next > div > div > div > div > div > div > div > div > div > div > div > div > table > tbody > tr > td';
   $(selector).each((parentIdx, parentElem) => {

                parentIdx += 1;
                if (parentIdx === 1 || parentIdx === 2 || parentIdx === 7) {

                    let tdValue = $(parentElem).text();

                    if (parentIdx === 2) {
                        tdValue = $('span:last-child', $(parentElem).html()).text();
                    }
                    if (tdValue) {
                        cryptoObj[keysCryptoObj[parentIdx]] = tdValue;
                    }
                    parentIdx++;
                }
            })

            const selector2 = '#__next > div > div.main-content > div > div > div > div > div > div > div > div > div > div > ';
            let i = 0; // because i needed a weird selector and i didn't wanted a DataStruct with 20 elements 

            $(selector2).each((parentIdx2, parentElem2) => {
                parentIdx2 += 8;
                let tdValue = $(parentElem2).text();

                if (tdValue && parentIdx2 == 9 || parentIdx2 == 16) {
                    cryptoObj[keysCryptoObj[8 + i]] = tdValue;
                    parentIdx2++;
                    i++;
                } else {
                    cryptoObj[keysCryptoObj[8 + i]] = "0";
                }
            })
            //cleaning data 
            cryptoObj[keysCryptoObj[7]] = cryptoObj[keysCryptoObj[7]].slice(1); // remove '#' from positions 
            cryptoObj[keysCryptoObj[10]] = $('div:first-child', $('div.sc-16r8icm-0.inUVOz')).html(); // CircuSupp
            cryptoObj[keysCryptoObj[11]] = investInCrypto.replace(",", "."); // investInCrypto
            cryptoObj[keysCryptoObj[12]] = InvestInDollars.replace(",", ".");; // invest in dolls 

            let actualPrice = parseFloat((cryptoObj[keysCryptoObj[1]]).replace(',', '').replace('$', '')); // remove ','  & '$' and parse it 
            profit = ((actualPrice * parseFloat(cryptoObj[keysCryptoObj[11]])) - parseFloat(cryptoObj[keysCryptoObj[12]]));
            // (price * invest in crypto) - invest in dollar
            profit = Math.round(profit * 100) / 100
            cryptoObj[keysCryptoObj[13]] = profit;
            cryptoObj[keysCryptoObj[14]] = idUser;

            // check if dailyChange positive or -              
            arrowSelector = '#__next > div > div > div > div > div > div > div > div > div > span > span';
            let downArrow = $(arrowSelector).hasClass('icon-Caret-down');

            downArrow ? cryptoObj[keysCryptoObj[2]] = "-" + cryptoObj[keysCryptoObj[2]] : cryptoObj[keysCryptoObj[2]] = "+" + cryptoObj[keysCryptoObj[2]];

        } catch (err) {
            console.error(err);
        }
        return cryptoObj;
    },

    insert: function (req, callback) {
        return helpers.makeInsertSql(db, req, callback, tableName);
    },

    get: function (req, callback) {
        return helpers.makeWhereSql(db, req, callback, tableName);
    },

    update: function (req, callback) {
        return helpers.makeUpdateSql(db, req, callback, tableName);
    },

    delete: function (req, callback) {
        return helpers.makeDeleteSql(db, req, callback, tableName);
    },
}

module.exports = cryptoData;