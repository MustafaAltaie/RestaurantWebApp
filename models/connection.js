const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://MustafaAltaie:4435966@mustafacluster.tzl1h.mongodb.net/restaurantApp2?retryWrites=true&w=majority', function(){
    console.log('Connected to mongoose');
});

require('./schema');