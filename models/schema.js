const mongoose = require('mongoose');

var newItem = new mongoose.Schema({
    catigory: {type: String},
    title: {type: String},
    price: {type: String},
    description: {type: String}
});
mongoose.model('items', newItem);

var theCurrency = new mongoose.Schema({
    currencyTyp: {type: String}
});
mongoose.model('currency', theCurrency);

var newUser = new mongoose.Schema({
    userFirstName: {type: String},
    userLastName: {type: String},
    userEmail: {type: String},
    userNumber: {type: String},
    userPassword: {type: String},
    userAddress: {type: String},
    userMessage: {type: String}
});
mongoose.model('users', newUser);

var newOrder = new mongoose.Schema({
     order: {type: String},
     clientName: {type: String},
     clientNumber: {type: String},
     clientAddress: {type: String},
     orderDate: {type: String},
     message: {type: String}
});
mongoose.model('orders', newOrder);

var newMessage = mongoose.Schema({
    name: {type: String},
    email: {type: String},
    message: {type: String},
    date: {type: String}
});
mongoose.model('messages', newMessage);