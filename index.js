const express = require('express');
const exphbs = require('express-handlebars');
const bodyP = require('body-parser');
const controllers = require('./controllers/controllers');

var app = express();
var port = process.env.PORT || 3000;
app.listen(port);

console.log('App is using port: ' + port);

app.use(bodyP.urlencoded({
    extended: true
}));

app.engine('html', exphbs.engine({
    extname: 'html',
    defaultLayout: 'mainLayout'
}));

app.set('view engine', 'html');

app.use('', controllers);