var sliderCounter = 1;
var sliderNumber = imageSliderImages.value.split(',').length;

var usedCurrency = '';
var currencyId = '';

if(document.querySelectorAll('#currencyDB').length == 0)
    usedCurrency = '$';
else{
    currencyId = currencyIdDB.value;
    usedCurrency = currencyDB.value;
}

if(imageSliderImages.value != "")
for(i = 1; i <= sliderNumber; i++){
    var img = document.createElement('img');
    img.id = 'imageSlide' + i;
    img.src = "/foodSlider/item" + i + ".jpg";
    foodSlider.appendChild(img);
}

if(sliderNumber > 1)
setTimeout(function(){
    if(window.matchMedia("(min-width: 1024px)").matches)
    imageSlideFunction(sliderCounter, "bottom", 1);
    else
    imageSlideFunction(sliderCounter, "left", 1);
});
else
imageSlideFunction(sliderCounter, "center", 1);



if(sliderNumber > 1)
setInterval(function(){
    sliderCounter ++;
    for(i = 1; i <= sliderNumber; i++){
        if(window.matchMedia("(min-width: 1024px)").matches)
        imageSlideFunction(i, "top", 0);
        else
        imageSlideFunction(i, "right", 0);
    }
    if(window.matchMedia("(min-width: 1024px)").matches)
    imageSlideFunction(sliderCounter, "bottom", 1);
    else
    imageSlideFunction(sliderCounter, "left", 1);
    if(sliderCounter > sliderNumber - 1){
        sliderCounter = 0;
    }
}, 5000);

function imageSlideFunction(n, p, o){
    document.getElementById('imageSlide' + n).style.opacity = o;
    document.getElementById('imageSlide' + n).style.objectPosition = p;
}



for(i = 0; i < document.getElementsByClassName('item_idDB').length; i++){
    let item = {
        idAddress: document.getElementsByClassName('item_idDB')[i].value,
        catigory: document.getElementsByClassName('catigoryDB')[i].value,
        title: document.getElementsByClassName('titleDB')[i].value,
        price: document.getElementsByClassName('priceDB')[i].value,
        description: document.getElementsByClassName('descriptionDB')[i].value
    }
    createItem(item, i);
    if(document.querySelectorAll('#' + item.catigory).length == 0)
    createFoodNav(item.catigory);
}



function createItem(prprty, i){
    let item = document.createElement('div');
    item.id = 'item' + i + 'Card';
    item.className = 'items';
    item.catigory = prprty.catigory;
    item.price = prprty.price;
    item.title = prprty.title;
    item.description = prprty.description;

    let setting3Buttons = document.createElement('div');
    setting3Buttons.id = 'item' + i;
    setting3Buttons.className = 'setting3Buttons';
    setting3Buttons.idAddress = prprty.idAddress;
    setting3Buttons.catigory = prprty.catigory;
    setting3Buttons.title = prprty.title;
    setting3Buttons.price = prprty.price;
    setting3Buttons.description = prprty.description;
        let point1 = document.createElement('div');
        let point2 = document.createElement('div');
        let point3 = document.createElement('div');
    setting3Buttons.appendChild(point1);
    setting3Buttons.appendChild(point2);
    setting3Buttons.appendChild(point3);

    let heartWrapper = document.createElement('div');
    heartWrapper.id = 'heartWrapper' + i;
    heartWrapper.className = 'heartWrapper';
    heartWrapper.title = prprty.title;
    heartWrapper.favoriteCase = 0;
        let heart0 = document.createElement('img');
        heart0.className = 'heart';
        heart0.src = '/icons/heart0.png';
    heartWrapper.appendChild(heart0);

    let itemImage = document.createElement('img');
    itemImage.className = 'itemImage';
    itemImage.src = '/food items/' + prprty.title + '.jpg';

    let div = document.createElement('div');
    div.style.pointerEvents = 'none';
        let title = document.createElement('h4');
        title.innerHTML = prprty.title;
        let price = document.createElement('b');
        price.innerHTML = prprty.price + ' ' + usedCurrency;
        let description = document.createElement('p');
        description.innerHTML = prprty.description;
    div.appendChild(title);
    div.appendChild(price);
    div.appendChild(description);

    if(window.location.href.includes('manage'))
    item.appendChild(setting3Buttons);
    else
    item.appendChild(heartWrapper);
    item.appendChild(itemImage);
    item.appendChild(div);

    itemContainer.appendChild(item);
}



function createFoodNav(n){
    let nav = document.createElement('h3');
    nav.id = n;
    nav.innerHTML = n;
    foodNav.appendChild(nav);
}

setTimeout(function(){
    foodNav.getElementsByTagName('h3')[0].click();
});


document.getElementById('foodNav').onclick = function(evt){
    if(evt.target.tagName == 'H3'){
        for(i = 0; i < document.getElementsByClassName('items').length; i++){
            if(document.getElementsByClassName('items')[i].catigory == evt.target.id)
            document.getElementsByClassName('items')[i].style.display = 'flex';
            else
            document.getElementsByClassName('items')[i].style.display = 'none';
        }
        for(i = 0; i < foodNav.getElementsByTagName('h3').length; i++)
        foodNav.getElementsByTagName('h3')[i].style.color = "#333";
        document.getElementById(evt.target.id).style.color = '#f30';
    }
}
