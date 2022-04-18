

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

// var cryptoTicker = document.querySelector('.crypto-ticker').value
// var timeFrame = document.querySelector('.date').value

var requestUrl = 'https://api.binance.com/api/v3/klines?symbol=BTCBUSD&interval=1d&startTime=1641013200000&endTime=1649908800000'

function init() {
    getAPI()
}


function getAPI() {
    fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
        for (let i = 0; i < data.length; i++) {
            x.push(new Date(data[i][0]).toLocaleDateString("en-US"))
            opn.push(parseFloat(data[i][1]))
            high.push(parseFloat(data[i][2]))
            low.push(parseFloat(data[i][3]))
            cls.push(parseFloat(data[i][4]))
        }
      
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

        var data = [trace1];

        var layout = {
            dragmode: 'zoom',
            showlegend: false,
            xaxis: {
                autorange: true,
                title: 'Date',

            },
            yaxis: {
                autorange: true,
            },
            width: 1344,
            height: 750,
        };

    Plotly.newPlot('myDiv', data, layout, {staticPlot:true});
    });
};




// // EXAMPLE URL TO FETCH: 
// // https://api.binance.com/api/v3/klines?symbol=ETHBTC&interval=1d&startTime=1617249600000&endTime=1617854400000
// // returns an array of arrays
// // INTERVAL = EXAMPLE IS 1 DAY, DISPLAYED IN UNIX MS TIME
// // incomplete last date displays all data to the time it was called

// // Open Time, Open, High, Low, Close, Volume, Close Time --- Quote Asset Volume, Num of Trades, Taker Buy Base Asset Volume, Take Buy Quote Asset Volume, IGNORE

// // BELOW IS 4/1 TO 4/7

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

// for (var i = 0; i < exampleArray.length; i++) {
//     // console.log(exampleArray[i].slice(0,7))
//     var date = new Date(exampleArray[i][0]).toLocaleDateString("en-US")
//     var open = exampleArray[i][1]
//     var high = exampleArray[i][2]
//     var low = exampleArray[i][3]
//     var close = exampleArray[i][4]
//     var volume = exampleArray[i][5]
//     console.log(date, open, high, low, close, volume)
// }

// var masterDict = {}

// var x = []
// var opn = []
// var high = []
// var low = []
// var cls = []
// var volume = []

// for (let i = 0; i < exampleArray.length; i++) {
//     x.push(new Date(exampleArray[i][0]).toLocaleDateString("en-US"))
//     opn.push(exampleArray[i][1])
//     high.push(exampleArray[i][2])
//     low.push(exampleArray[i][3])
//     cls.push(exampleArray[i][4])
//     volume.push(exampleArray[i][5])
// }
// // console.log(x)
// // console.log(opn)
// // console.log(high)
// // console.log(low)
// // console.log(cls)
// // console.log(volume)

// // var d = new Date((exampleArray[0][6])).toLocaleDateString("en-US")
// // console.log(d)


// d3.csv('https://raw.githubusercontent.com/plotly/datasets/master/finance-charts-apple.csv', function(err, rows){

// function unpack(rows, key) {
//   return rows.map(function(row) {
//     return row[key];
//   });
// }

// var trace = {
//   x: x,
//   close: cls,
//   high: high,
//   low: low,
//   open: opn,

//   // cutomise colors
//   increasing: {line: {color: 'green'}},
//   decreasing: {line: {color: 'red'}},

//   type: 'candlestick',
//   xaxis: 'x',
//   yaxis: 'y'
// };

// var data = [trace];

// var layout = {
//   dragmode: 'zoom',
//   showlegend: false,
//   xaxis: {
//     autorange: true,
//     title: 'Date',
// 	 rangeselector: {
//         x: 0,
//         y: 1.2,
//         xanchor: 'left',
//         font: {size:8},
//         buttons: [{
//             step: 'month',
//             stepmode: 'backward',
//             count: 1,
//             label: '1 month'
//         }, {
//             step: 'month',
//             stepmode: 'backward',
//             count: 6,
//             label: '6 months'
//         }, {
//             step: 'all',
//             label: 'All dates'
//         }]
//       }
//   },
//   yaxis: {
//     autorange: true,
//   }
// };

// Plotly.newPlot('myDiv', data, layout);
// });





















































var submitEl= document.querySelector('#submit-button');
var startDate= moment('01012022','MMDDYYYY');//we need to bring this element from the DOM
var endDate= moment(); //we need to bring this element from the DOM
var arrayNews=[];




function getNews(evt){ // this needs to be invoked in an event listener for the button submit
  // evt.preventDefault();
  var newsUrl;
  var date;
  var daysTilEnd= endDate.diff(startDate,'days');;
  console.log(daysTilEnd);
  for (let i=0;i<=daysTilEnd;i++){ 
    date=moment(startDate,'MMDDYYYY').add(i,'days').format('MMDDYYYY')
    console.log(date)
    newsUrl= `https://cryptonews-api.com/api/v1?tickers=BTC&items=50&page=1&date=${date}-${date}&token=mbtk43afu0okyrzuc6feftmukl2zvrujlhv9nxdv`;
    console.log(newsUrl)
    fetchUrl(newsUrl,date);   //this is comented out so we can prevent fetching the API unnecesarily
  }
}

function fetchUrl(url,date){
  var result= new articles("","",'')
  // var page= url.split('&page=');
  // page=page[1].split('&')[0]
  // console.log(page);
  fetch(url)
  .then(function (response){
      if (response){
        return response.json();
      }
  }).then (function (data){
    console.log(data);
    console.log(data.total_pages);
    console.log(data.data.length);
    console.log(arrayNews);
    result.date=date;
    result.arti=data.data;
    // The following lines are commented out cause they bring the last page to get an accurate count on the articles for the day 
    // if(data.total_pages>1){
    //   newsUrl= `https://cryptonews-api.com/api/v1?tickers=BTC&items=50&page=${data.total_pages}&date=${date}-${date}&token=mbtk43afu0okyrzuc6feftmukl2zvrujlhv9nxdv`;
    //   fetch(newsUrl)
    //   .then(function (response){
    //       if (response){
    //         return response.json();
    //       }
    //   }).then (function (data){
    //     console.log(data);
    //     result.numOfArti= (data.total_pages-1)*50+data.data.length;
    //     console.log(result.numOfArti);
    //   });
    // } else{
      // result.numOfArti= data.data.length;
      // console.log(result);
    // }
    if(data.total_pages>1){
      result.numOfArti= ((data.total_pages)-1)*50+25; // I added only for the last page, given the case that we have 2 or more, because is the median 
      console.log(result);
    } else{
      result.numOfArti= data.data.length; //In case is only one page long we get the number of articles from the length of the array
      console.log(result);
    }
    arrayNews.push(result);
    store(arrayNews);
  })
}

function store (array){
  localStorage.setItem('historicArticles',JSON.stringify(array));
}


function getStoredArticles(){
  arrayNews= JSON.parse(localStorage.getItem('historicArticles'));
}

function articles(date,numOfArti,arti){
  this.date= date;
  this.numOfArti= numOfArti;
  this.arti=arti;
}

function setEventListeners(){
  submitEl.addEventListener('submit',getNews)
}

function init(){
  // setEventListeners();
  getStoredArticles();
  if (!arrayNews){ //we check arrayNews because the function 'getStoredArticles' assigns all the possible values stored to that variable
    arrayNews=[]; //doing this we avoid arrayNews being equal to undefined.
  } else{
    // here we should add the function that generates the graphic with the Stored Data
  }
}

init();
getNews();