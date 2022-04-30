const mongoose = require('mongoose');

var newOption = new mongoose.Schema({
    name: {type: String}
});
mongoose.model('option', newOption);

var newItem = new mongoose.Schema({
    catigory: {type: String},
    prise: {type: String},
    title: {type: String},
    text: {type: String},
    uniqueNumber: {type: String}
});
mongoose.model('items', newItem);

var newCurrency = new mongoose.Schema({
    currency: {type: String}
});
mongoose.model('currency', newCurrency);

var newOrder = new mongoose.Schema({
    clientName: {type: String},
    clientNumber: {type: String},
    tableNumber: {type: String},
    paymentMethod: {type: String},
    dateAndTime: {type: String},
    itemOrder: {type: String},
    totalPrice: {type: String}
});
mongoose.model('order', newOrder);