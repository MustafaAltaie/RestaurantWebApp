footer.style.background = 'rgb(189, 205, 146)';

var usedCurrency = '';
var currencyId = '';

if(document.querySelectorAll('#currencyDB').length == 0)
    usedCurrency = '$';
else{
    currencyId = currencyIdDB.value;
    usedCurrency = currencyDB.value;
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
    heartWrapper.favoriteCase = 1;
    heartWrapper.cartNumber = 'item' + i + 'Card';
        let heart0 = document.createElement('img');
        heart0.className = 'heart';
        heart0.src = '/icons/heart1.png';
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

    let heartFrame = document.createElement('img');
    heartFrame.className = 'heartFrame';
    heartFrame.src = '/icons/heartFrame.png';

    item.appendChild(heartWrapper);
    item.appendChild(itemImage);
    item.appendChild(div);
    item.appendChild(heartFrame);

    if(localStorage.favoriteList != undefined
    && localStorage.favoriteList != ''){
        for(i = 0; i < localStorage.favoriteList.split(',').length; i++){
            if(prprty.title == localStorage.favoriteList.split(',')[i]){
                favoriteContainer.appendChild(item);
            }
        }
    }
}


let favoriteObject = '';

document.addEventListener('click', function(evt){
    if(evt.target.className == 'heartWrapper'){
        favoriteObject = '';
        document.getElementById(evt.target.id).getElementsByTagName('img')[0].src = '/icons/heart0.png';
        document.getElementById(evt.target.id).favoriteCase = 0;
        document.getElementById(evt.target.cartNumber).style.opacity = 0;
        setTimeout(function(){
            document.getElementById(evt.target.cartNumber).remove();
        }, 400);
        for(i = 0; i < document.getElementsByClassName('heartWrapper').length; i++){
            if(document.getElementsByClassName('heartWrapper')[i].favoriteCase == 1)
            favoriteObject += document.getElementsByClassName('heartWrapper')[i].title + ',';
        }
        localStorage.favoriteList = favoriteObject;
    }
});