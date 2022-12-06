const mongoose = require('mongoose');

var newClient = new mongoose.Schema({
    name: {type: String},
    homeNumber: {type: String},
    cityName: {type: String},
    cityNumber: {type: String},
    rent: {type: String},
    streetName: {type: String},
    streetNumber: {type: String}
});
mongoose.model('clients', newClient);