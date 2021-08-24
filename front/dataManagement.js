// A FAIRE 

// ajouter l'openInterest sur le graph 
// mettre le graph en eventclick sur l'image du btc ?? 
// Get les logos avec le back au lieu de les import à la main 
// Nettoyer les strings dans les fonctions de data.js 
// faire un tchek if le prix à changer alors on reload pour ne pas fetch les datas à chaque fois 
// ajouter lbc dollers en liquide + trading 

// EN COURS 

// URL
const url = "http://localhost:3000/api/v1/top10";
const chzUrl = "http://localhost:3000/api/v1/chz";
const repUrl = "http://localhost:3000/api/v1/rep";
const capsUrl = "http://localhost:3000/api/v1/caps";
const sylUrl = "http://localhost:3000/api/v1/syl";
const thetaUrl = "http://localhost:3000/api/v1/theta";
const linkUrl = "http://localhost:3000/api/v1/link";
const vetUrl = "http://localhost:3000/api/v1/vet";
const ksmUrl = "http://localhost:3000/api/v1/ksm";
const tlmUrl = "http://localhost:3000/api/v1/tlm";
const waxUrl = "http://localhost:3000/api/v1/wax";
const cakeUrl = "http://localhost:3000/api/v1/cake";

let minuts = 2;
let seconds = 00;
let fetched = false;

let totalTheoricPnl = 0;
let res = '';
let invested = 1390;
let cash = 537;
let trading = 140;
let actuallyInvested = 603;


let investissement = ["0.00118", "40 $",
    "0", "0 $",
    "0.2", "50 $",
    "1", "13 $",
    "0", "0 $",
    "0", "0 $",
    "5.1", "40 $",
    "12", "80 $",
    "0.29", "25 $",
    "280", "0 $",
    "500", "115 $",
    "7.7", "200 $",
    "90", "0 $",
    "888", "60 $",
    "55000", "80 $",]; // manque lbc trading et busd +70 + 537 + 150/100 
let j = 0;



function hidderController() {
    let btnContent = document.getElementById("totalTheoricPnlBtn");
    let totalTheoricWalletValue = actuallyInvested + cash + trading + totalTheoricPnl;
    if (btnContent.value == "Show your theoric wallet value") {
        document.getElementById("totalTheoricPnl").innerHTML = totalTheoricWalletValue.toFixed(2) + " $";
        document.getElementById("totalTheoricPnl").className = "animation";
        btnContent.value = "Hide your theoric wallet value";
    } else {
        btnContent.value = "Show your theoric wallet value";
        document.getElementById("totalTheoricPnl").innerHTML = " ";
        document.getElementById("totalTheoricPnl").className = " ";
    }
}

function dailyChangeColor() {
    const regexPositive = new RegExp(/\+/);

    document.querySelectorAll("div.box.dailyChange").forEach(elem => {
        if ((regexPositive).test(elem.innerHTML) == true) {
            elem.style.color = ("green");
        } else {
            elem.style.color = ("red");
        }
    });
}

async function viewData(data) {

    let i = 0;

    for (item of data) {
        let imgPath = ["btc", "eth", "bnb", "dot"]


        item.MarketCap = (item.MarketCap).substring(1, (item.MarketCap).length) + " $";
        item.Volume = (item.Volume).substring(1, (item.Volume).length) + " $";

        let actualPrice = (item.Price).replace(',', '')
        actualPrice = parseFloat((actualPrice));
        profit = ((actualPrice * parseFloat(investissement[j])) - parseFloat(investissement[j + 1]));

        totalTheoricPnl += profit;

        profit = profit.toFixed(2);

        res += `
        
        <div class="box "># ${item.Position}</div>  
        <div class="box Name"><img src="img/${imgPath[i]}.png" class="img"/>${item.Name}</div>        
        <div class="box ">${item.Price}</div>          
        <div class="box dailyChange">${item.DailyChange}</div>   
        
        <div class="box ">${item.MarketCap}</div>  
         
        <div class="box ">${item.Volume}</div>    
        
        <div class="box ">${item.CircuSupply}</div>   
             
        <div class="box ">${investissement[j]} for ${investissement[j + 1]}</div> 
              
        <div class="box ">${profit} $</div>       
        `
        i++;
        j += 2;
    }
    document.getElementById('data').innerHTML += res;
    ;
}

async function viewDataChz(dataChz) {
    res = '';
    dataChz.Position = "# " + (dataChz.Position).substring(1, 7);
    dataChz.Price = (dataChz.Price).substring(1, 10);
    dataChz.MarketCap = (dataChz.MarketCap).substring(11, 24) + " $";
    dataChz.Volume = (dataChz.Volume).substring(11, 22) + " $";
    dataChz.CircuSupply = (dataChz.CircuSupply).substring(18, 22) + "0.000.000 CHZ";
    dataChz.CircuSupply = (dataChz.CircuSupply).replaceAll('.', ',');


    let actualPrice = (dataChz.Price).replace(',', '')
    actualPrice = parseFloat((actualPrice));
    profit = ((actualPrice * parseFloat(investissement[j])) - parseFloat(investissement[j + 1]));
    totalTheoricPnl += profit;
    profit = profit.toFixed(2);

    res += `
    
    <div class="box ">${dataChz.Position}</div>  
    <div class="box Name"><img src="img/chz.png" class="img"></img>${dataChz.Name}</div>
    <div class="box Price">${dataChz.Price} $</div>   
    <div class="box dailyChange"> ${dataChz.DailyChange}</div>
    <div class="box MarketCap">${dataChz.MarketCap}</div>  
    <div class="box Volume">${dataChz.Volume}</div>   
    <div class="box Circu">${dataChz.CircuSupply}</div>  
    <div class="box invest">${investissement[j]} for ${investissement[j + 1]}</div>  
    <div class="box profit">${profit} $</div>  
    
    
    `;
    j += 2;
    document.getElementById('data').innerHTML += res;
    ;
}

async function viewDataRep(dataRep) {
    res = '';
    dataRep.Position = "# " + (dataRep.Position).substring(1, 7);
    dataRep.Price = (dataRep.Price).substring(1, 10);
    dataRep.MarketCap = (dataRep.MarketCap).substring(11, 22) + " $";
    dataRep.Volume = (dataRep.Volume).substring(11, 22) + " $";
    dataRep.CircuSupply = (dataRep.CircuSupply).substring(18, 28) + " REP";

    let actualPrice = (dataRep.Price).replace(',', '')
    actualPrice = parseFloat((actualPrice));
    (actualPrice)
    profit = ((actualPrice * parseFloat(investissement[j])) - parseFloat(investissement[j + 1]));
    totalTheoricPnl += profit;
    profit = profit.toFixed(2);

    res += `  
    <div class="box a">${dataRep.Position}</div>  
    <div class="box Name"><img src="img/rep.png" class="img"/>${dataRep.Name}</div>
    <div class="box Price">${dataRep.Price} $</div>   
    <div class="box dailyChange"> ${dataRep.DailyChange}</div>
    <div class="box MarketCap">${dataRep.MarketCap}</div>  
    <div class="box Volume">${dataRep.Volume}</div>   
    <div class="box Circu">${dataRep.CircuSupply}</div>  
    <div class="box invest">${investissement[j]} for ${investissement[j + 1]}</div> 
    <div class="box profit">${profit} $</div>  
    `;
    j += 2;
    document.getElementById('data').innerHTML += res;
    ;

}

async function viewDataCaps(dataCaps) {
    res = '';
    dataCaps.Position = "# " + (dataCaps.Position).substring(1, 7);
    dataCaps.Price = (dataCaps.Price).substring(1, 10);
    dataCaps.MarketCap = (dataCaps.MarketCap).substring(11, 21) + " $";
    dataCaps.Volume = (dataCaps.Volume).substring(11, 18) + " $";
    dataCaps.CircuSupply = (dataCaps.CircuSupply).substring(18, 29) + " CAPS";

    let actualPrice = (dataCaps.Price).replace(',', '')
    actualPrice = parseFloat((actualPrice));
    profit = ((actualPrice * parseFloat(investissement[j])) - parseFloat(investissement[j + 1]));
    totalTheoricPnl += profit;
    profit = profit.toFixed(2);

    res += `
    
    <div class="box a">${dataCaps.Position}</div>  
    <div class="box Name"><img src="img/caps.png" class="img"/>${dataCaps.Name}</div>
    <div class="box Price">${dataCaps.Price} $</div>   
    <div class="box dailyChange"> ${dataCaps.DailyChange}</div>
    <div class="box MarketCap">${dataCaps.MarketCap}</div>  
    <div class="box Volume">${dataCaps.Volume}</div>   
    <div class="box Circu">${dataCaps.CircuSupply}</div>  
    <div class="box invest">${investissement[j]} for ${investissement[j + 1]}</div> 
    <div class="box profit">${profit} $</div>  
    `;
    j += 2;
    document.getElementById('data').innerHTML += res;
    ;
}

async function viewDataSyl(dataSyl) {
    res = '';
    dataSyl.Position = "# " + (dataSyl.Position).substring(1, 7);
    dataSyl.Price = (dataSyl.Price).substring(1, 10);
    dataSyl.MarketCap = (dataSyl.MarketCap).substring(25, 39);
    dataSyl.Volume = (dataSyl.Volume).substring(11, 17) + " $";
    dataSyl.CircuSupply = (dataSyl.CircuSupply).substring(30, 44) + " SYL";

    let actualPrice = (dataSyl.Price).replace(',', '')
    actualPrice = parseFloat((actualPrice));
    profit = ((actualPrice * parseFloat(investissement[j])) - parseFloat(investissement[j + 1]));
    totalTheoricPnl += profit;
    profit = profit.toFixed(2);

    res += `
    
    <div class="box a">${dataSyl.Position}</div>  
    <div class="box Name"><img src="img/syl.png" class="img"/>${dataSyl.Name}</div>
    <div class="box Price">${dataSyl.Price} $</div>   
    <div class="box dailyChange"> ${dataSyl.DailyChange}</div>
    <div class="box MarketCap">${dataSyl.MarketCap}</div>  
    <div class="box Volume">${dataSyl.Volume}</div>   
    <div class="box Circu">${dataSyl.CircuSupply}</div>  
    <div class="box invest">${investissement[j]} for ${investissement[j + 1]}</div> 
    <div class="box profit">${profit} $</div>  
    `;
    j += 2;
    document.getElementById('data').innerHTML += res;
    dailyChangeColor();
}

async function viewDataTheta(dataTheta) {
    res = '';
    dataTheta.Position = "# " + (dataTheta.Position).substring(1, 7);
    dataTheta.Price = (dataTheta.Price).substring(1, 10);
    dataTheta.MarketCap = (dataTheta.MarketCap).substring(11, 24) + " $";
    dataTheta.Volume = (dataTheta.Volume).substring(11, 22) + " $";
    dataTheta.CircuSupply = (dataTheta.CircuSupply).substring(18, 22) + "0.000.000 THETA";
    dataTheta.CircuSupply = (dataTheta.CircuSupply).replaceAll('.', ',');

    let actualPrice = (dataTheta.Price).replace(',', '')
    actualPrice = parseFloat((actualPrice));
    profit = ((actualPrice * parseFloat(investissement[j])) - parseFloat(investissement[j + 1]));
    totalTheoricPnl += profit;
    profit = profit.toFixed(2);

    res += `
    
    <div class="box a">${dataTheta.Position}</div>  
    <div class="box Name"><img src="img/theta.png" class="img"/>${dataTheta.Name}</div>
    <div class="box Price">${dataTheta.Price} $</div>   
    <div class="box dailyChange"> ${dataTheta.DailyChange}</div>
    <div class="box MarketCap">${dataTheta.MarketCap}</div>  
    <div class="box Volume">${dataTheta.Volume}</div>   
    <div class="box Circu">${dataTheta.CircuSupply}</div>  
    <div class="box invest">${investissement[j]} for ${investissement[j + 1]}</div> 
    <div class="box profit">${profit} $</div>  
    `;
    j += 2;
    document.getElementById('data').innerHTML += res;
    ;
}

async function viewDataLink(dataLink) {
    res = '';
    dataLink.Position = "# " + (dataLink.Position).substring(1, 7);
    dataLink.Price = (dataLink.Price).substring(1, 10);
    dataLink.MarketCap = (dataLink.MarketCap).substring(11, 24) + " $";
    dataLink.Volume = (dataLink.Volume).substring(11, 24) + " $";
    dataLink.CircuSupply = (dataLink.CircuSupply).substring(18, 29) + " LINK";

    let actualPrice = (dataLink.Price).replace(',', '')
    actualPrice = parseFloat((actualPrice));
    profit = ((actualPrice * parseFloat(investissement[j])) - parseFloat(investissement[j + 1]));
    totalTheoricPnl += profit;
    profit = profit.toFixed(2);

    res += `
    
    <div class="box a">${dataLink.Position}</div>  
    <div class="box Name"><img src="img/link.png" class="img"/>${dataLink.Name}</div>
    <div class="box Price">${dataLink.Price} $</div>   
    <div class="box dailyChange"> ${dataLink.DailyChange}</div>
    <div class="box MarketCap">${dataLink.MarketCap}</div>  
    <div class="box Volume">${dataLink.Volume}</div>   
    <div class="box Circu">${dataLink.CircuSupply}</div>  
    <div class="box invest">${investissement[j]} for ${investissement[j + 1]}</div> 
    <div class="box profit">${profit} $</div>  
    `;
    j += 2;
    (j);
    document.getElementById('data').innerHTML += res;
    ;
}

async function viewDataCake(dataCake) {
    res = '';
    dataCake.Position = "# " + (dataCake.Position).substring(1, 7);
    dataCake.Price = (dataCake.Price).substring(1, 10);
    dataCake.MarketCap = (dataCake.MarketCap).substring(11, 24) + " $";
    dataCake.Volume = (dataCake.Volume).substring(11, 22) + " $";
    dataCake.CircuSupply = (dataCake.CircuSupply).substring(18, 29) + " CAKE";
    dataCake.CircuSupply = (dataCake.CircuSupply).replaceAll('.', ',');

    let actualPrice = (dataCake.Price).replace(',', '')
    actualPrice = parseFloat((actualPrice));
    profit = ((actualPrice * parseFloat(investissement[j])) - parseFloat(investissement[j + 1]));
    totalTheoricPnl += profit;
    profit = profit.toFixed(2);
    res += `
    
    <div class="box a">${dataCake.Position}</div>  
    <div class="box Name"><img src="img/cake.png" class="img"/>${dataCake.Name}</div>
    <div class="box Price">${dataCake.Price} $</div>   
    <div class="box dailyChange"> ${dataCake.DailyChange}</div>
    <div class="box MarketCap">${dataCake.MarketCap}</div>  
    <div class="box Volume">${dataCake.Volume}</div>   
    <div class="box Circu">${dataCake.CircuSupply}</div>  
    <div class="box invest">${investissement[j]} for ${investissement[j + 1]}</div> 
    <div class="box profit">${profit} $</div>  
    `;
    j += 2;
    document.getElementById('data').innerHTML += res;
    ;
}

async function viewDataVet(dataVet) {
    res = '';
    dataVet.Position = "# " + (dataVet.Position).substring(1, 7);
    dataVet.Price = (dataVet.Price).substring(1, 10);
    dataVet.MarketCap = (dataVet.MarketCap).substring(11, 24) + " $";
    dataVet.Volume = (dataVet.Volume).substring(11, 22) + " $";
    dataVet.CircuSupply = (dataVet.CircuSupply).substring(18, 23) + "0.000.000 VET";
    dataVet.CircuSupply = (dataVet.CircuSupply).replaceAll('.', ',');

    let actualPrice = (dataVet.Price).replace(',', '')
    actualPrice = parseFloat((actualPrice));
    profit = ((actualPrice * parseFloat(investissement[j])) - parseFloat(investissement[j + 1]));
    totalTheoricPnl += profit;
    profit = profit.toFixed(2);

    res += `
    
    <div class="box a">${dataVet.Position}</div>  
    <div class="box Name"><img src="img/vet.png" class="img"/>${dataVet.Name}</div>
    <div class="box Price">${dataVet.Price} $</div>   
    <div class="box dailyChange"> ${dataVet.DailyChange}</div>
    <div class="box MarketCap">${dataVet.MarketCap}</div>  
    <div class="box Volume">${dataVet.Volume}</div>   
    <div class="box Circu">${dataVet.CircuSupply}</div>  
    <div class="box invest">${investissement[j]} for ${investissement[j + 1]}</div>  
    <div class="box profit">${profit} $</div>  
    `;
    j += 2;
    document.getElementById('data').innerHTML += res;
}

async function viewDataWax(dataWax) {
    res = '';
    dataWax.Position = "# " + (dataWax.Position).substring(1, 7);
    dataWax.Price = (dataWax.Price).substring(1, 10);
    dataWax.MarketCap = (dataWax.MarketCap).substring(11, 22) + " $";
    dataWax.Volume = (dataWax.Volume).substring(11, 24) + " $";
    dataWax.CircuSupply = (dataWax.CircuSupply).substring(18, 22) + "0.000.000 WAXP";
    dataWax.CircuSupply = (dataWax.CircuSupply).replaceAll('.', ',');

    let actualPrice = (dataWax.Price).replace(',', '')
    actualPrice = parseFloat((actualPrice));
    profit = ((actualPrice * parseFloat(investissement[j])) - parseFloat(investissement[j + 1]));
    totalTheoricPnl += profit;
    profit = profit.toFixed(2);
    res += `
    
    <div class="box a">${dataWax.Position}</div>  
    <div class="box Name"><img src="img/wax.png" class="img"/>${dataWax.Name}</div>
    <div class="box Price">${dataWax.Price} $</div>   
    <div class="box dailyChange"> ${dataWax.DailyChange}</div>
    <div class="box MarketCap">${dataWax.MarketCap}</div>  
    <div class="box Volume">${dataWax.Volume}</div>   
    <div class="box Circu">${dataWax.CircuSupply}</div>  
    <div class="box invest">${investissement[j]} for ${investissement[j + 1]}</div>  
    <div class="box profit">${profit} $</div>  
    `;
    j += 2
    document.getElementById('data').innerHTML += res;
    ;
}

async function viewDataTlm(dataTlm) {
    res = '';
    dataTlm.Position = "# " + (dataTlm.Position).substring(1, 7);
    dataTlm.Price = (dataTlm.Price).substring(1, 10);
    dataTlm.MarketCap = (dataTlm.MarketCap).substring(11, 22) + " $";
    dataTlm.Volume = (dataTlm.Volume).substring(11, 22) + " $";
    dataTlm.CircuSupply = (dataTlm.CircuSupply).substring(18, 29) + " TLM";

    let actualPrice = (dataTlm.Price).replace(',', '')
    actualPrice = parseFloat((actualPrice));
    profit = ((actualPrice * parseFloat(investissement[j])) - parseFloat(investissement[j + 1]));
    totalTheoricPnl += profit;
    profit = profit.toFixed(2);
    res += `
    
    <div class="box a">${dataTlm.Position}</div>  
    <div class="box Name"><img src="img/tlm.png" class="img"/>${dataTlm.Name}</div>
    <div class="box Price">${dataTlm.Price} $</div>   
    <div class="box dailyChange"> ${dataTlm.DailyChange}</div>
    <div class="box MarketCap">${dataTlm.MarketCap}</div>  
    <div class="box Volume">${dataTlm.Volume}</div>   
    <div class="box Circu">${dataTlm.CircuSupply}</div>  
    <div class="box invest">${investissement[j]} for ${investissement[j + 1]}</div>  
    <div class="box profit">${profit} $</div>  
    `;
    j += 2;
    document.getElementById('data').innerHTML += res;
    ;
}

async function viewDataKsm(dataKsm) {
    res = '';
    dataKsm.Position = "# " + (dataKsm.Position).substring(1, 7);
    dataKsm.Price = (dataKsm.Price).substring(1, 10);
    dataKsm.MarketCap = (dataKsm.MarketCap).substring(11, 24) + " $";
    dataKsm.Volume = (dataKsm.Volume).substring(11, 22) + " $";
    dataKsm.CircuSupply = (dataKsm.CircuSupply).substring(18, 27) + " KSM";
    dataKsm.CircuSupply = (dataKsm.CircuSupply).replaceAll('.', ',');

    let actualPrice = (dataKsm.Price).replace(',', '')
    actualPrice = parseFloat((actualPrice));
    profit = ((actualPrice * parseFloat(investissement[j])) - parseFloat(investissement[j + 1]));
    totalTheoricPnl += profit;
    profit = profit.toFixed(2);
    res += `

    
    <div class="box a">${dataKsm.Position}</div> 
    <div class="box Name"><img src="img/ksm.png" class="img ksm"/>${dataKsm.Name}</div>
    <div class="box Price">${dataKsm.Price} $</div>   
    <div class="box dailyChange"> ${dataKsm.DailyChange}</div>
    <div class="box MarketCap">${dataKsm.MarketCap}</div>  
    <div class="box Volume">${dataKsm.Volume}</div>   
    <div class="box Circu">${dataKsm.CircuSupply}</div>  
    <div class="box invest">${investissement[j]} for ${investissement[j + 1]}</div>  
    <div class="box profit">${profit} $</div>  
    `;
    j += 2;
    document.getElementById('data').innerHTML += res;
    ;
}

async function fetchHandler() {
    try {
        await Promise.all([    // mettre dans l'ordre ici 
            await fetchGet(url, viewData),
            await fetchGet(linkUrl, viewDataLink),
            await fetchGet(vetUrl, viewDataVet),
            await fetchGet(thetaUrl, viewDataTheta),
            await fetchGet(cakeUrl, viewDataCake),
            await fetchGet(ksmUrl, viewDataKsm),
            await fetchGet(chzUrl, viewDataChz),
            await fetchGet(waxUrl, viewDataWax),
            await fetchGet(repUrl, viewDataRep),
            await fetchGet(tlmUrl, viewDataTlm),
            await fetchGet(capsUrl, viewDataCaps),
            await fetchGet(sylUrl, viewDataSyl)
        ]);

        return 1;
    } catch (err) {
        (err);
    }
}
fetchHandler();


async function fetchGet(url, func) {

    const req = await fetch(url);
    func(await req.json());
    if (req) {
        fetched = true;
    }
    else {
        ("error fetching");
        return 1;
    }
}

// function clock() {

//     if (minuts >= 0 && seconds >= 0) {

//         if (seconds > 0) {
//             seconds -= 1;
//         }
//         if (minuts == 1 && seconds == 0) {

//             minuts = 0;
//             seconds = 59;
//             return minuts, seconds

//         }
//         if (seconds == 0 && minuts != 0) {
//             minuts -= 1;
//             seconds = 59;
//         }
//         if (minuts == 0 && seconds == 0) {
//             minuts = 2;
//             clock();
//         }
//         return minuts, seconds


//     }
// }
// setInterval(() => {

//     clock()
//     document.getElementById("mins").innerHTML = minuts + "m ";
//     document.getElementById("secs").innerHTML = seconds + "s";
// }, 1000);
