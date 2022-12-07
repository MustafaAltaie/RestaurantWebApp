require('../models/connection');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Client = mongoose.model('clients');

router.get('/', function(req, res){
    // Name.findByIdAndRemove(req.params.idName, function(){
    //     res.redirect('/t');
    // });
    Client.find(function(err, data){
        if(!err){
            res.render('./layouts/index', {
                clientList: data
            });
        }
    }).lean();
});

router.get('/addRemove', function(req, res){
    Client.find(function(err, data){
        if(!err){
            res.render('./layouts/manage', {
                clientList: data
            });
        }
    }).lean();
});

router.post('/newClient', function(req, res){
    if(req.body.clientId == ''){
        var client = new Client();
        client.name = req.body.name;
        client.homeNumber = req.body.homeNumber;
        client.cityName = req.body.cityName;
        client.cityNumber = req.body.cityNumber;
        client.rent = req.body.rent;
        client.streetName = req.body.streetName;
        client.streetNumber = req.body.streetNumber;
        client.park = req.body.park;
        client.save(function(){
            res.redirect('/');
        }); 
    }
    else{
        Client.findByIdAndUpdate({_id: req.body.clientId}, req.body, {new: true}, function(err){
            if(!err) res.redirect('/');
        });
    }
});

router.get('/deleteClient/:id', function(req, res){
    Client.findByIdAndRemove(req.params.id, function(){
        res.redirect('/');
    });
});

module.exports = router;