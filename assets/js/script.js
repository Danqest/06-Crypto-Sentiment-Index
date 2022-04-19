// All endpoints return either a JSON object or array.
// Data is returned in ascending order. Oldest first, newest last.
// All time and timestamp related fields are in milliseconds.
var endPointURL0 = 'https://api.binance.com/'
var endPointURL1 = 'https://api1.binance.com/'
var endPointURL2 = 'https://api2.binance.com/'
var endPointURL3 = 'https://api3.binance.com/'
var requestHeader = 'api/v3/'

var x = []
var opn = []
var high = []
var low = []
var cls = []
var exampleArray = []
var arrayNews = []
var newsX = []
var newsY = []
var trimArticles = []

// var cryptoTicker = document.querySelector('.crypto-ticker').value
// var timeFrame = document.querySelector('.date').value

var requestUrl = 'https://api.binance.com/api/v3/klines?symbol=BTCBUSD&interval=1d&startTime=1641013200000&endTime=1650340800000'

function init() {
    // getStoredArticles()
    getAPI()
}


function getAPI() {
    fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
        for (var i = 0; i < data.length; i++) {
            x.push(new Date(data[i][0]).toLocaleDateString("en-US"))
            opn.push(parseFloat(data[i][1]))
            high.push(parseFloat(data[i][2]))
            low.push(parseFloat(data[i][3]))
            cls.push(parseFloat(data[i][4]))
        }
        
        arrayNews = JSON.parse(localStorage.getItem('historicArticles'));


        for (var j = 0; j < arrayNews.length; j++) {
            var newsDate = arrayNews[j].date
            var newsCount = arrayNews[j].numOfArti
            newsX.push(newsDate)
            newsY.push(newsCount)
            trimArticles.push([newsDate, newsCount])
        }
        
        trimArticles.sort(function(a, b) {return a[0]-b[0]})
      
        var trace1 = {
        x: x,
        close: cls,
        high: high,
        low: low,
        open: opn,

        // cutomise colors
        increasing: {line: {color: 'green'}},
        decreasing: {line: {color: 'red'}},

        type: 'candlestick',
        xaxis: 'x',
        yaxis: 'y'
        };

        var trace2 = {
            x: x,
            y: newsY,

            mode: 'lines+markers',
            xaxis: 'x2',
            yaxis: 'y2',
            line: {
                color: 'blue'
            }
        }

        var data = [trace1, trace2]

        var layout = {
            showlegend: false,
            grid: {
                rows: 2,
                columns: 1,
                pattern: 'independent',
                roworder: 'top to bottom',
            },
            xaxis: {
                // title: 'Date',
                rangeslider: {
                    visible: false
                }
            },
            yaxis: {
                title: 'Price',
                autorange: 'true'
            },
            xaxis2: {
                matches: 'x'
            },
            yaxis2: {
                title: 'Article Count',
                color: 'blue',
            },
            width: 1344,
            height: 750,
        };

    Plotly.newPlot('myDiv', data, layout, {staticPlot:true});
    });
};




// EXAMPLE URL TO FETCH: 
// https://api.binance.com/api/v3/klines?symbol=ETHBTC&interval=1d&startTime=1617249600000&endTime=1617854400000
// returns an array of arrays
// INTERVAL = EXAMPLE IS 1 DAY, DISPLAYED IN UNIX MS TIME
// incomplete last date displays all data to the time it was called

// Open Time, Open, High, Low, Close, Volume, Close Time --- Quote Asset Volume, Num of Trades, Taker Buy Base Asset Volume, Take Buy Quote Asset Volume, IGNORE

// BELOW IS 4/1 TO 4/7

// let exampleArray = 
// [
// [1617321600000,"0.03351200","0.03630000","0.03314300","0.03619000","300198.17200000",1617407999999,"10309.15126161",361393,"149152.16700000","5124.61721012","0"],
// [1617408000000,"0.03619000","0.03626500","0.03458500","0.03520900","271274.39700000",1617494399999,"9608.31598544",319925,"138316.27700000","4899.94038079","0"],
// [1617494400000,"0.03520400","0.03596100","0.03491900","0.03566900","186558.86000000",1617580799999,"6620.49334391",229410,"93017.51700000","3301.23637700","0"],
// [1617580800000,"0.03566800","0.03610500","0.03521000","0.03563700","230293.70800000",1617667199999,"8207.89357751",312027,"110438.30500000","3936.37862681","0"],
// [1617667200000,"0.03564100","0.03660500","0.03560800","0.03641500","235222.68600000",1617753599999,"8498.17194028",326595,"113119.83200000","4086.89736999","0"],
// [1617753600000,"0.03641900","0.03659100","0.03470800","0.03509400","248961.59800000",1617839999999,"8852.94185430",360125,"118137.38200000","4202.26530036","0"],
// [1617840000000,"0.03508000","0.03593000","0.03497000","0.03581600","186761.61700000",1617926399999,"6625.87315253",233037,"89840.86000000","3187.35728312","0"]
// ]



// function buildArrays(exampleArray) {
//     for (let i = 0; i < exampleArray.length; i++) {
//         x.push(new Date(exampleArray[i][0]).toLocaleDateString("en-US"))
//         opn.push(parseFloat(exampleArray[i][1]))
//         high.push(parseFloat(exampleArray[i][2]))
//         low.push(parseFloat(exampleArray[i][3]))
//         cls.push(parseFloat(exampleArray[i][4]))
//     }
//     console.log(x)
//     console.log(opn)
//     console.log(high)
//     console.log(low)
//     console.log(cls)
//     console.log(exampleArray)
// }


// console.log(x)
// console.log(opn)
// console.log(high)
// console.log(low)
// console.log(cls)
// console.log(exampleArray)

// function getStoredArticles(){
//     arrayNews = JSON.parse(localStorage.getItem('historicArticles'));
//   }


// arrayNews = JSON.parse(localStorage.getItem('historicArticles'));


// for (var i = 0; i < arrayNews.length; i++) {
//     var dataDate = arrayNews[i].date
//     var dataCount = arrayNews[i].numOfArti
//     trimArticles.push([dataDate, dataCount])
// }
// trimArticles = trimArticles.sort(function(a, b){return a[0]-b[0]})



// console.log(trimArticles)

init()

// for (let i = 0; i < trimArticles.length; i++) {
//     newsX.push(new Date(trimArticles[i][0]).toLocaleDateString("en-US"))
//     newsY.push(parseFloat(trimArticles[i][1]))
// }
// console.log(newsX)
// console.log(newsY)