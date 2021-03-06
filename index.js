//Stock Market Portofolio App

const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const request = require('request');
const path = require('path');
const bodyParser = require('body-parser');

//Majoritatea cloudurilor prefera sa foloseasca porturile lor de aia am pus sau.
const PORT = process.env.PORT || 5000;


// use body parser middleware
app.use(bodyParser.urlencoded({extended:false}));


//Set handlebars middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


//Set handlebar index GET route.
 app.get('/stocks.html', function (req, res) {
    call_api( function(doneAPI) {
        res.render('stocks',{
            stock: doneAPI
        });
    },'swn');
    
});

//Set handlebar index POST route.
app.post('/', function (req, res) {
    call_api ( function(doneAPI) {
        res.render('stocks',{
            stock: doneAPI,
        });
 }, req.body.stock_ticker);   
});

//create call_api function

function call_api(finishedAPI,ticker){
    //API KEY pk_a76f8e36e6654855a196bd559508743a
  request('https://cloud.iexapis.com/stable/stock/' + ticker + '/quote/?token=pk_a76f8e36e6654855a196bd559508743a',{json:true},(err, res,body)=>{
  if(err) 
  {
      return console.log(err);
    }
  if(res.statusCode === 200)
  {finishedAPI(body);}
    });
    
};

function randomStock() {
  return Math.random();
}


//--------------------------------------------------------------

app.get('/', function (req, res) {
    res.render('about');
});



//create route to about 
app.get('/about.html', function (req, res) {
    res.render('about');
});


//create route to login 
app.get('/login.html', function (req, res) {
  res.render('login');
});


//create route to register 
app.get('/register.html', function (req, res) {
  res.render('register');
});



//Create a static folder => public
app.use(express.static(path.join(__dirname, 'public')));
//path defines the path to public also routing files for static file

app.listen(PORT, () => console.log('Server Listening on port ' + PORT));


//Set handlebar index GET route.
app.get('/home.html', function (req, res) {
  call_api( function(doneAPI) {
      res.render('home',{
          stock: doneAPI
      });
  },'swn');
  
});