const puppeteer = require('puppeteer');
const express = require('express');
const { get } = require('cheerio/lib/api/traversing');
const port = 3300;    
const app = express();


async function getGraph() {
    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: null,
        args: [
            '--window-size=1200,800',
        ],
    });
    console.log("wait a second...");
    const page = await browser.newPage();
    await page.goto('https://coinalyze.net/bitcoin/usd/binance/btcusd_perp/price-chart-live/');
    
    await page.waitForTimeout(1800);
    console.log("graph udpated")
    await page.screenshot({ path: 'graph.png' });
    await browser.close();
    setTimeout(getGraph,120000);
}    
getGraph();
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/graph', async (req, res) => {
    res.sendFile('./graph.png', { root: __dirname });
})



app.listen(port, () =>
    console.log(`\nConnected to http://localhost:${port}/graph\t<-- Click to see graph`));
