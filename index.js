//Stock Market Portofolio App

const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');

const path = require('path');
const PORT = process.env.PORT || 5000;
//Majoritatea clodurilor prefera sa foloseasca porturile lor de aia am pus sau.

//Set handlebars middleware

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//Set handlebar routes.
app.get('/', function (req, res) {
    res.render('home',{
        stuff: 'This is stuff...'
    });
});
//create route to about 
app.get('/about.html', function (req, res) {
    res.render('about');
});

//API KEY pk_a76f8e36e6654855a196bd559508743a

//Create a static folder => public
app.use(express.static(path.join(__dirname, 'public')));
//path defines the path to public also routing files for static file

app.listen(PORT, () => console.log('Server Listening on port ' + PORT));
