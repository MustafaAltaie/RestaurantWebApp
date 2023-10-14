require('../models/connection');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const fs = require('fs');
const Item = mongoose.model('items');
const AppCurrency = mongoose.model('currency');
const NewUser = mongoose.model('users');
const NewOrder = mongoose.model('orders');
const NewMessage = mongoose.model('messages');
const Nexmo = require('nexmo');

router.get('/', function(req, res){
    res.render('./layouts/index');
});

router.get('/foods', function(req, res){
    fs.readdir('foodSlider/', function(err, files){
        Item.find(function(err, items){
            AppCurrency.find(function(err, currencyType){
                res.render('./layouts/foodList', {
                    imageSliderImages: files,
                    itemList: items,
                    currencyTyp: currencyType
                });
            }).lean();
        }).lean();
    });
});

router.get('/favorite', function(req, res){
    Item.find(function(err, items){
        AppCurrency.find(function(err, currencyType){
            res.render('./layouts/favorite', {
                itemList: items,
                currencyTyp: currencyType
            });
        }).lean();
    }).lean();
});



router.get('/account', function(req, res){
    res.render('./layouts/account');
});

router.get('/contact', function(req, res){
    res.render('./layouts/contact');
});

router.get('/about', function(req, res){
    res.render('./layouts/about');
});



router.get('/manage', function(req, res){
    res.render('./layouts/manage/index');
});

router.get('/manage/foods', function(req, res){
    fs.readdir('foodSlider/', function(err, files){
        Item.find(function(err, items){
            AppCurrency.find(function(err, currencyType){
                res.render('./layouts/manage/foodList', {
                    imageSliderImages: files,
                    itemList: items,
                    currencyTyp: currencyType
                });
            }).lean();
        }).lean();
    });
});



router.post('/newItem', function(req, res){
    if(req.body._id == ""){
        var item = new Item();
        item.catigory = req.body.catigory;
        item.title = req.body.title;
        item.price = req.body.price;
        item.description = req.body.description;
        item.save(function(){
            var file = req.files.file;
            file.mv('food items/' + req.body.title + '.jpg', function(){
                res.redirect('/manage/foods');
            });
        });
    }
    else{
        if(req.files){
            if(req.body.oldTitle == ""){
                Item.findByIdAndUpdate({_id: req.body._id}, req.body, {new: true}, function(){
                    var file = req.files.file;
                    file.mv('food items/' + req.body.title + '.jpg', function(){});
                    res.redirect('/manage/foods');
                });
            }
            else{
                fs.unlinkSync('food items/' + req.body.oldTitle + '.jpg', function(){});
                Item.findByIdAndUpdate({_id: req.body._id}, req.body, {new: true}, function(){
                    var file = req.files.file;
                    file.mv('food items/' + req.body.title + '.jpg', function(){});
                    res.redirect('/manage/foods');
                });
            }
        }
        else{
            if(req.body.oldTitle == ""){
                Item.findByIdAndUpdate({_id: req.body._id}, req.body, {new: true}, function(){
                    res.redirect('/manage/foods');
                });
            }
            else{
                fs.renameSync('food items/' + req.body.oldTitle + '.jpg', 'food items/' + req.body.title + '.jpg');
                Item.findByIdAndUpdate({_id: req.body._id}, req.body, {new: true}, function(){
                    res.redirect('/manage/foods');
                });
            }
        }
    }
});

router.post('/addImageSlide', function(req, res){
    var file = req.files.file;
    fs.readdir('foodSlider/', function(err, files){
        file.mv('foodSlider/item' + parseInt(files.length + 1) + '.jpg', function(){
            res.redirect('/manage/foods');
        });
    });
});

router.post('/deleteImageSlide', function(req, res){
    fs.readdir('foodSlider/', function(err, files){
        fs.unlinkSync('foodSlider/' + req.body.imageName + '.jpg', function(){});
        if(files.length != req.body.imageNum)
        fs.renameSync('foodSlider/item' + files.length + '.jpg', 'foodSlider/item' + req.body.imageNum + '.jpg');
        res.redirect('/manage/foods');
    });
});

router.post('/currencyType', function(req, res){
    if(req.body._id != "")
    AppCurrency.findByIdAndRemove(req.body._id, function(){});
    var newCrncy = new AppCurrency();
    newCrncy.currencyTyp = req.body.currency;
    newCrncy.save(function(){
        res.redirect('/manage/foods');
    });
});

router.post('/deleteItem', function(req, res){
    Item.findByIdAndRemove(req.body._id, function(){
        fs.readdir('food items/', function(err, files){
            if(files.includes(req.body.title + '.jpg'))
            fs.unlinkSync('food items/' + req.body.title + '.jpg', function(){});
        });
        res.redirect('/manage/foods');
    });
});


router.post('/newUser', async function(req, res){
    var email = await NewUser.find({userEmail: req.body.userEmail}).exec();
    if(email.length == 0){
        var newUser = new NewUser();
        newUser.userFirstName = req.body.userFirstName;
        newUser.userLastName = req.body.userLastName;
        newUser.userEmail = req.body.userEmail;
        newUser.userNumber = req.body.userNumber;
        newUser.userAddress = req.body.userAddress;
        newUser.userPassword = req.body.userPassword;
        newUser.userMessage = req.body.userMessage;
        newUser.save(function(){
            if(req.files){
                var file = req.files.file;
                file.mv('user pictures/' + req.body.userEmail + '.jpg', function(){});
            }
            res.redirect('/account');
        });
    }
    else
    console.log(email[0].userEmail)
});

var thisEmail = '';
var thisPassword = '';

router.post('/signing', function(req, res){
    NewUser.find({userEmail: req.body.email}, function(err, info){
        try{
            if(req.body.email == info[0].userEmail){
                if(req.body.password == info[0].userPassword){
                    res.send();
                    thisEmail = req.body.email;
                    thisPassword = req.body.password;
                }
                else{
                    console.log('Not correct');
                }
            }
        }
        catch{
            console.log('Not correct email');
        }
    });
});

router.get('/test', function(req, res){
    NewUser.find({userEmail: thisEmail}, function(err, info){
        res.render('./layouts/test', {
            infoList: info
        });
    }).lean();
});


router.get('/manageAccount/:email', async function(req, res){
    var email = await NewUser.find({userEmail: req.params.email}).exec();
    res.render('./layouts/manageAccount', {
        myMessage: email[0].userMessage
    });
});

router.post('/UpdatePersonalInfo', async function(req, res){
    var email = await NewUser.find({userEmail: req.body.userEmail}).exec();
    if(req.files){
        if(req.body.userEmail != req.body.oldEmail){
            if(email.length == 0){
                fs.readdir('user pictures/', function(err, allFiles){
                    for(i = 0; i < allFiles.length; i++)
                    if(allFiles[i] == req.body.oldEmail + '.jpg')
                    fs.unlinkSync('user pictures/' + req.body.oldEmail + '.jpg', function(){});
                });
                NewUser.findByIdAndUpdate({_id: req.body._id}, req.body, {new: true}, function(){}).clone().catch(function(err){console.log(err)});
                var file = req.files.file;
                file.mv('user pictures/' + req.body.userEmail + '.jpg', function(){});
                res.end();
            }
            else
            console.log('the email already taken!');
        }
        else{
            var file = req.files.file;
            file.mv('user pictures/' + req.body.userEmail + '.jpg', function(){});
            NewUser.findByIdAndUpdate({_id: req.body._id}, req.body, {new: true}, function(){}).clone().catch(function(err){console.log(err)});
            res.end();
        }
    }
    else{
        if(req.body.userEmail != req.body.oldEmail){
            if(email.length == 0){
                NewUser.findByIdAndUpdate({_id: req.body._id}, req.body, {new: true}, function(){}).clone().catch(function(err){console.log(err)});
                fs.renameSync('user pictures/' + req.body.oldEmail + '.jpg', 'user pictures/' + req.body.userEmail + '.jpg');
                res.end();
            }
            else
            console.log('the email already taken!');
        }
        else{
            NewUser.findByIdAndUpdate({_id: req.body._id}, req.body, {new: true}, function(){}).clone().catch(function(err){console.log(err)});
            res.end();
        }
    }
});

router.post('/resetPassword', function(req, res){
    const nexmo = new Nexmo({
        apiKey: '2162914b',
        apiSecret: 'sxTnNpXhFgbYEET9'
    });
    const from = "MaRestaurant";
    const to = req.body.number;
    const text = 'Enter ' + req.body.code + ' to reset the password.';
    nexmo.message.sendSms(from, to, text);
    console.log(req.body.number + ', ' + req.body.code)
    res.end();
});

router.get('/completeOrder', function(req, res){
    res.render('./layouts/sendOrder');
});

router.get('/termsAndConditions', function(req, res){
    res.render('./layouts/terms');
});

router.post('/sendOrder', function(req, res){
    var newOrder = new NewOrder();
    newOrder.order = req.body.order;
    newOrder.clientName = req.body.clientName;
    newOrder.clientNumber = req.body.clientNumber;
    newOrder.clientAddress = req.body.clientAddress;
    newOrder.orderDate = req.body.orderDate;
    newOrder.message = req.body.message;
    newOrder.save(function(){
        res.send();
    });
});

router.get('/orders', function(req, res){
    NewOrder.find(function(err, data){
        res.render('./layouts/orders', {
            orderList: data
        });
    }).lean();
});

router.get('/orderReveived', function(req, res){
    res.render('./layouts/orderReceived');
});

router.post('/deleteOrder', function(req, res){
    NewOrder.findByIdAndRemove(req.body._id, function(){
        res.end();
    });
});

router.post('/newMessage', function(req, res){
    var newMessage = new NewMessage();
    newMessage.name = req.body.name;
    newMessage.email = req.body.email;
    newMessage.message = req.body.message;
    newMessage.date = req.body.date;
    newMessage.save(function(){
        res.end();
    });
});

router.get('/messages', function(req, res){
    NewMessage.find(function(err, messages){
        res.render('./layouts/messages', {
            messageList: messages
        });
    }).lean();
});

router.post('/removeMessage', function(req, res){
    NewMessage.findByIdAndRemove(req.body._id, function(){
        res.end();
    });
});

router.get('/allUsers', function(req, res){
    NewUser.find(function(err, data){
        res.render('./layouts/manage/allUsers', {
            usersList: data
        });
    }).lean();
});

router.post('/updateUser', function(req, res){
    if(req.body.oldEmail != req.body.userEmail){
        fs.renameSync('user pictures/' + req.body.oldEmail + '.jpg', 'user pictures/' + req.body.userEmail + '.jpg');
        NewMessage.findOneAndUpdate({email: req.body.oldEmail}, {email: req.body.userEmail}, {new: true}, function(){}).clone().catch(function(err){console.log(err)});
    }
    NewUser.findByIdAndUpdate({_id: req.body._id}, req.body, {new: true}, function(){});
    res.end();
});

router.post('/deleteUser', function(req, res){
    fs.readdir('user pictures/', function(err, files){
        for(i = 0; i < files.length; i++){
            if(files[i] == req.body.email + '.jpg'){
                fs.unlinkSync('user pictures/' + req.body.email + '.jpg', function(){});
                break;
            }
        }
    });
    NewUser.findByIdAndRemove(req.body._id, function(){
        res.end();
    });
});

router.post('/sendChat', async function(req, res){
    await NewUser.findOneAndUpdate({_id: req.body._id}, {userMessage: req.body.userMessage}, {new: true}, function(){
        res.end();
    }).clone().catch(function(err){console.log(err)});
});

router.post('/deleteChat', async function(req, res){
    await NewUser.findOneAndUpdate({userEmail: req.body.email}, {userMessage: req.body.newMessage}, {new: true}, function(){
        res.end();
    }).clone().catch(function(err){console.log(err)});
});

router.post('/replyMessage', async function(req, res){
    let email = await NewUser.find({userEmail: req.body.email}).exec();
    let oldMessage = email[0].userMessage;
    let comminMessage = req.body.message;
    let newMessage = oldMessage + comminMessage + '//and//';
    await NewUser.findOneAndUpdate({userEmail: req.body.email}, {userMessage: newMessage}, {new: true}, function(){
        res.end();
    }).clone().catch(function(err){console.log(err)});
});


module.exports = router;