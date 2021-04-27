//Stock Market Portofolio App

const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const request = require('request');
const path = require('path');
const PORT = process.env.PORT || 5000;
//Majoritatea clodurilor prefera sa foloseasca porturile lor de aia am pus sau.

//Set handlebars middleware

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//Set handlebar routes.
app.get('/', function (req, res) {
    call_api( function(doneAPI) {
        res.render('home',{
            stock: doneAPI
        });
    });
});
//create route to about 
app.get('/about.html', function (req, res) {
    res.render('about');
});

//create call_api function
function call_api(finishedAPI){
//API KEY pk_a76f8e36e6654855a196bd559508743a
request('https://cloud.iexapis.com/stable/stock/gme/quote?token=pk_a76f8e36e6654855a196bd559508743a',{json:true},(err, res,body)=>{
  if(err) {return console.log(err);}
  if(res.statusCode === 200)
  finishedAPI(body);
});
};

//Create a static folder => public
app.use(express.static(path.join(__dirname, 'public')));
//path defines the path to public also routing files for static file

app.listen(PORT, () => console.log('Server Listening on port ' + PORT));
