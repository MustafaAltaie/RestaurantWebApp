const express = require('express');
const exphbs = require('express-handlebars');
const bodyP = require('body-parser');
const controllers = require('./controllers/controllers');
const path = require('path');
const upload = require('express-fileupload');
const fs = require('fs');
const socket = require('socket.io');

var app = express();
var port = process.env.PORT || 3000;
var server = app.listen(port);

var io = socket(server);

io.on('connection', function(socket){
    socket.on('orderSent', function(){
        io.sockets.emit('orderSent');
    });
});

console.log('App is using port: ' + port);

app.use(bodyP.urlencoded({
    extended: true
}));

app.use(upload());

app.engine('html', exphbs.engine({
    extname: 'html',
    defaultLayout: 'mainLayout'
}));

app.set('view engine', 'html');

app.use(express.static(path.join(__dirname, '')));

app.use('', controllers);