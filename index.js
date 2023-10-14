const express = require('express');
const exphbs = require('express-handlebars');
const bodyP = require('body-parser');
const fileUpload = require('express-fileupload');
const path = require('path');
const controllers = require('./controllers/controllers');
const cors = require('cors');

var app = express();
var port = process.env.PORT || 3000;
app.listen(port);

console.log('App is using port: ' + port);

app.use(bodyP.json());

app.use(fileUpload());

app.use(cors());

app.engine('html', exphbs.engine({
    extname: 'html',
    defaultLayout: 'mainLayout'
}));

app.set('view engine', 'html');

app.use('', controllers);

app.use(express.static(path.join(__dirname, '')));