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
var newsX = []
var newsY = []
let newsDate
let newsCount
let trimArticles = []
var trimmerArticles = []
var firstDate
var lastDate
var startIndex
var endIndex
var submitEl= document.querySelector('#form-submit');
var startDtEl= document.querySelector('#start-date');
var endDtEl= document.querySelector('#end-date');
var startDate;
var endDate;
let arrayNews=[];

var arrayStoredNews=[];
var inputBTC= document.querySelector('#BTC');
var inputETH= document.querySelector('#ETH');
var orbitSlides= document.getElementsByClassName('orbit-slide');



startDtEl.setAttribute('max',`${moment().format('YYYY-MM-DD')}`);
endDtEl.setAttribute('max',`${moment().format('YYYY-MM-DD')}`);

function getNews(evt){
  evt.preventDefault();
  startDate= moment(startDtEl.value);
  endDate= moment(endDtEl.value);
  var newsUrl;
  var date;
  var daysTilEnd= endDate.diff(startDate,'days');;
//   console.log(daysTilEnd);
  for (let i=0;i<=daysTilEnd;i++){ 
    date=moment(startDate,'MMDDYYYY').add(i,'days').format('MMDDYYYY')
    // console.log(date)
    newsUrl= `https://cryptonews-api.com/api/v1?tickers=BTC&items=50&page=1&date=${date}-${date}&token=mbtk43afu0okyrzuc6feftmukl2zvrujlhv9nxdv`;
    // console.log(newsUrl)
    fetchUrl(newsUrl,date);   //this is comented out so we can prevent fetching the API unnecesarily
  }
  startDate = moment(startDtEl.value);
    endDate = moment(endDtEl.value).add(1, 'days');
    var requestUrl = ('https://api.binance.com/api/v3/klines?symbol=BTCBUSD&interval=1d&startTime=' + startDate + '&endTime=' + endDate)
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
        
        // arrayNews = JSON.parse(localStorage.getItem('historicArticles'));
        console.log(arrayNews)
        arrayNews.sort((a,b) => a.date - b.date)
        console.log(arrayNews)

        for (let k = 0; k < arrayNews.length; k++) {
            if (typeof(arrayNews[k].numOfArti) != 'string') {
            trimArticles.push(arrayNews[k])
            }
        }
        console.log(trimArticles)
        trimArticles = trimArticles.filter((v,i,a) => a.findIndex(v2=>(v2.date===v.date))===i)
        console.log(trimArticles)

        firstDate = moment(startDate).format('MMDDYYYY')
        lastDate = moment(endDate).format('MMDDYYYY')

        for (var j = 0; j < trimArticles.length; j++) {
            newsDate = moment(trimArticles[j].date, 'MMDDYYYY')
            newsCount = trimArticles[j].numOfArti
            newsX.push(newsDate._i)
            newsY.push(newsCount)
            trimmerArticles.push([newsDate, newsCount])
        }

        startIndex = newsX.indexOf(firstDate)
        endIndex = newsX.indexOf(lastDate)
        newsY = newsY.slice(startIndex, endIndex)
        console.log(newsY)

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
    })
}

function fetchUrl(url,date){
  var result= new articles("","",'')
  var page= url.split('&page=');
  page=page[1].split('&')[0]
//   console.log(page);
  fetch(url)
  .then(function (response){
      if (response){
        return response.json();
      }
  }).then (function (data){
    // console.log(data);
    // console.log(typeof(data.total_pages));
    // console.log(data.data.length);
    // console.log(arrayNews);
    result.date=date;
    result.arti=data.data;
    // The following lines bring the last page to get an accurate count on the articles for the day 
    if(data.total_pages > 1){
      newsUrl= `https://cryptonews-api.com/api/v1?tickers=BTC&items=50&page=${data.total_pages}&date=${date}-${date}&token=mbtk43afu0okyrzuc6feftmukl2zvrujlhv9nxdv`;
      fetch(newsUrl)
      .then(function (response){
          if (response){
            return response.json();
          }
      }).then (function (data){
        console.log(data);
        result.numOfArti= (data.total_pages-1)*50+data.data.length;
        console.log(result);
      });
    } else{
      result.numOfArti= data.data.length;
      console.log(result);
    }
    arrayNews.push(result);
    console.log(arrayNews)
    store(arrayNews);
  })
}



function store(array){
  localStorage.setItem('historicArticles',JSON.stringify(array));
}


function getStoredArticles(){
  arrayStoredNews=(JSON.parse(localStorage.getItem('historicArticles')));
  if (!arrayStoredNews){ //we check arrayNews because the function 'getStoredArticles' assigns all the possible values stored to that variable
    arrayStoredNews=[]; //doing this we avoid arrayNews being equal to undefined.
  } else{
    populateArticles(arrayStoredNews);
  }
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
  setEventListeners();
  getStoredArticles();
}

function populateArticles(array){
  var dates=[];
  var index=0;
  for (let i=0;i<array.length;i++){
    dates.push(new Date(moment(array[i].date,'MMDDYYYY').format('YYYY-MM-DD')));
  }
//   console.log(dates);
  var maxDate= new Date(Math.max.apply(null, dates));
  for (let j=0;j<dates.length;j++){
    if(dates[j].getDate === maxDate.getDate){
      index=j;
    }
  }
//   console.log(index)


  for(let i=0;i<5;i++){
    orbitSlides[i].innerHTML=`
      <div class="card centered-axis-x" style="width: 400px;">
          <div class="card-divider">
          <h6>${array[index].arti[i].title}</h6>
          </div>
          <div class="card-section">
              <p>${array[index].arti[i].text} <a href=${array[index].arti[i].news_url} target:'_blank'>Read more</a></p>
          </div>
      </div>
    `
}
}
init();


