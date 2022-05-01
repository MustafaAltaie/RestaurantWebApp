require('../models/connection');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const fs = require('fs');

const NewOption = mongoose.model('option');
const NewItem = mongoose.model('items');
const NewCurrency = mongoose.model('currency');
const NewOrder = mongoose.model('order');

router.get('/', function(req, res){
    NewOption.find(function(err, optionData){
        NewItem.find(function(err, NewItemData){
            NewCurrency.find(function(err, NewCurrencyData){
                fs.readdir('Slider Images', function(err, sliderImages){
                    res.render('./layouts/index', {
                        optionList: optionData,
                        NewItemData: NewItemData,
                        sliderImages: sliderImages,
                        NewCurrencyData: NewCurrencyData
                    });
                });
            }).lean();
        }).lean();
    }).lean();
});

router.get('/manage', function(req, res){
    NewOption.find(function(err, optionData){
        NewItem.find(function(err, NewItemData){
            NewCurrency.find(function(err, NewCurrencyData){
                fs.readdir('Slider Images', function(err, sliderImages){
                    res.render('./layouts/manage', {
                        optionList: optionData,
                        NewItemData: NewItemData,
                        sliderImages: sliderImages,
                        NewCurrencyData: NewCurrencyData
                    });
                });
            }).lean();
        }).lean();
    }).lean();
});

router.post('/newOption', function(req, res){
    if(req.body._id == ''){
        var newOption = new NewOption();
        newOption.name = req.body.name;
        newOption.save(function(){
            res.redirect('/manage');
        });
    }
    else{
        NewOption.findByIdAndUpdate({_id: req.body._id}, req.body, {new: true}, function(){
            res.redirect('/manage');
        });
    }
});

router.get('/deleteItem/:id', function(req, res){
    NewOption.findByIdAndRemove(req.params.id, function(){
        res.redirect('/manage');
    });
});

router.post('/newItem', function(req, res){
    if(req.body._id == ''){
        var newItem = new NewItem();
        newItem.catigory = req.body.catigory;
        newItem.prise = req.body.prise;
        newItem.title = req.body.title;
        newItem.text = req.body.text;
        newItem.uniqueNumber = req.body.uniqueNumber;
        newItem.save(function(){
            var file = req.files.file;
        file.mv('Item Images/' + req.body.uniqueNumber + '.jpg', function(){});
            res.redirect('/manage');
        });
    }
    else{
        NewItem.findByIdAndUpdate({_id: req.body._id}, req.body, {new: true}, function(){
            res.redirect('/manage');
        });
    }
});

router.get('/deleteItem/:id/:uniqueN', function(req, res){
    NewItem.findByIdAndRemove(req.params.id, function(){
        fs.unlinkSync('Item Images/' + req.params.uniqueN + '.jpg', function(){});
        res.redirect('/manage');
    });
});

router.post('/addSlideImage', function(req, res){
    fs.readdir('Slider Images', function(err, files){
        var file = req.files.file;
        file.mv('Slider Images/slide' + parseInt(files.length + 1) + '.jpg', function(){});
    });
    res.redirect('/manage');
});

router.get('/deleteSlider/:id', function(req, res){
    fs.readdir('Slider Images', function(err, files){
        fs.unlinkSync('Slider Images/slide' + req.params.id + '.jpg', function(){});
        if(req.params.id < files.length)
        fs.renameSync('Slider Images/slide' + files.length + '.jpg', 'Slider Images/slide' + req.params.id + '.jpg');
    });
    res.redirect('/manage');
});

router.get('/siteCarrency/:id/:crncy', function(req, res){
    if(req.params.id == 'n'){
        var newCurrency = new NewCurrency();
        newCurrency.currency = req.params.crncy;
        newCurrency.save(function(){
            res.redirect('/manage');
        });
    }
    else{
        NewCurrency.findByIdAndUpdate({_id: req.params.id}, {currency: req.params.crncy}, {new: true}, function(){
            res.redirect('/manage');
        });
    }
});

router.get('/termsAndConditions', function(req, res){
    res.render("./layouts/termsAndConditions");
});

router.post('/sendOrder', function(req, res){
    var newOrder = new NewOrder();
    newOrder.clientName = req.body.clientName;
    newOrder.clientNumber = req.body.clientNumber;
    newOrder.tableNumber = req.body.tableNumber;
    newOrder.paymentMethod = req.body.paymentMethod;
    newOrder.dateAndTime = req.body.dateAndTime;
    newOrder.itemOrder = req.body.itemOrder;
    newOrder.totalPrice = req.body.totalPrice;
    newOrder.save(function(){
        res.redirect('/orderReceived/' + req.body.clientName);
    });
});

router.get('/orderReceived/:id', function(req, res){
    res.render('./layouts/orderReceived', {clientName: req.params.id});
});

router.get('/orders', function(req, res){
    NewOrder.find(function(err, NewOrderData){
        res.render('./layouts/orders', {
            orderList: NewOrderData
        });
    }).lean();
});

router.get('/deleteOrder/:id', function(req, res){
    NewOrder.findByIdAndRemove(req.params.id, function(){
        res.redirect('/orders');
    });
});

module.exports = router;