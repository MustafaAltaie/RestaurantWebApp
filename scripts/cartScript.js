let fromLocalToCart = {};

if(localStorage.mustafaAltaieRestaurantCart != undefined
&& localStorage.mustafaAltaieRestaurantCart != ''){
    for(j = 0; j < localStorage.mustafaAltaieRestaurantCart.split('//endItem//').length-1; j++){
        fromLocalToCart = {
            title: localStorage.mustafaAltaieRestaurantCart.split('//endItem//')[j].split('//and//')[0],
            price: localStorage.mustafaAltaieRestaurantCart.split('//endItem//')[j].split('//and//')[1],
            description: localStorage.mustafaAltaieRestaurantCart.split('//endItem//')[j].split('//and//')[2],
            amount: localStorage.mustafaAltaieRestaurantCart.split('//endItem//')[j].split('//and//')[3]
        }
        createCartItem(fromLocalToCart);
    }
}

let itemToCart = {};
var redCircleMove = 0;
var count = 0;

document.addEventListener('click', function(evt){
    if(evt.target.className == 'items'){
        itemDemo.style.display = 'flex';
        itemDemoImage.src = '/food items/' + evt.target.title + '.jpg';
        itemDemoTitle.innerHTML = evt.target.title;
        itemDemoDescription.innerHTML = evt.target.description;
        itemDemoPrice.innerHTML = evt.target.price + ' ' + usedCurrency;
        itemToCart = {
            catigory: evt.target.catigory,
            title: evt.target.title,
            description: evt.target.description,
            price: evt.target.price,
        }
    }
    else if(evt.target.id == 'addToCart'){
        var img = document.createElement('img');
        img.className = 'fadedImage';
        count++;
        img.id = 'fadedImage' + count;
        img.src = '/food items/' + itemToCart.title + '.jpg';
        img.style.width = itemDemoImage.offsetWidth + 'px';
        img.style.zIndex = 100;
        img.style.position = 'fixed';
        img.style.borderRadius = '20px';
        document.body.appendChild(img);
        var slideDuration = 0;
        if(window.matchMedia('(min-width: 1024px)').matches){
            document.getElementById('fadedImage' + count).style.top = itemDemo.offsetTop - document.getElementById('fadedImage' + count).offsetHeight/2 + 'px';
            document.getElementById('fadedImage' + count).style.left = itemDemo.offsetLeft - document.getElementById('fadedImage' + count).offsetWidth + 'px';
            slideDuration = 100;
        }
        else{
            document.getElementById('fadedImage' + count).style.zIndex = 400;
            document.getElementById('fadedImage' + count).style.top = itemDemo.offsetTop - document.getElementById('fadedImage' + count).offsetHeight + 'px';
            document.getElementById('fadedImage' + count).style.left = itemDemo.offsetLeft - document.getElementById('fadedImage' + count).offsetWidth/2 + 'px';
        }
        itemDemo.style.display = 'none';
        document.body.style.pointerEvents = 'none';
        setTimeout(function(){
            createCartItem(itemToCart);
            document.getElementById('fadedImage' + count).style.transition = '0.8s';
            document.getElementById('fadedImage' + count).style.width = cartWrapper.offsetWidth + 'px';
            document.getElementById('fadedImage' + count).style.top = cartWrapper.offsetTop - cartWrapper.offsetHeight/2 + 'px';
            document.getElementById('fadedImage' + count).style.left = cartWrapper.offsetLeft + 'px';
            var x = Math.ceil(Math.random()*360);
            if(x > 180) x = x*-1;
            var y = Math.ceil(Math.random()*180);
            if(y > 90) y = y*-1;
            var z = Math.ceil(Math.random()*180);
            if(z > 90) z = z*-1;
            document.getElementById('fadedImage' + count).style.transform = 'perspective(686px) rotateX(' + x + 'deg) rotateY(' + y + 'deg) rotateZ(' + z + 'deg)';
            setTimeout(function(){
                document.body.style.pointerEvents = '';
                document.getElementById('fadedImage' + count).style.transform = 'perspective(686px) rotateX(' + x*2 + 'deg) rotateY(' + y*2 + 'deg) rotateZ(' + z*2 + 'deg)';
                document.getElementById('fadedImage' + count).style.top = cartWrapper.offsetTop + cartWrapper.offsetHeight/3 + 'px';
                document.getElementById('fadedImage' + count).style.left = cartWrapper.offsetLeft + 20 + 'px';
                document.getElementById('fadedImage' + count).style.width = cartWrapper.offsetWidth/2 + 'px';
                if(window.matchMedia('(max-width: 1024px)').matches)
                document.getElementById('fadedImage' + count).style.zIndex = 0;
                setTimeout(function(){
                    document.getElementById('fadedImage' + count).style.transform = 'perspective(686px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)';
                    document.getElementById('fadedImage' + count).style.transition = 'unset';
                    document.getElementById('fadedImage' + count).style.display = 'none';
                    redCircle.style.display = 'flex';
                    redCircleNumber.innerHTML = parseInt(redCircleNumber.innerHTML) + 1;
                    setCartLocalStorage();
                    setIncButton();
                    setItemPrice();
                    emptyCart();
                }, 400);
            }, 700);
        }, slideDuration);
    }
    else
    itemDemo.style.display = 'none';

    if(evt.target.className == 'itemCartInfoMark'){
        var thisSlide = evt.target.id.slice(0, evt.target.id.length-3);
        for(i = 0; i < document.querySelectorAll('.itemCartInfo').length; i++){
            document.querySelectorAll('.itemCartInfo')[i].style.pointerEvents = 'unset';
            document.querySelectorAll('.itemCartInfo')[i].style.left = 0 + 'px';
        }
        document.getElementById(thisSlide).style.pointerEvents = 'none';
        document.getElementById(thisSlide).style.left = -270 + 'px';
    }
    else{
        for(i = 0; i < document.querySelectorAll('.itemCartInfo').length; i++){
            document.querySelectorAll('.itemCartInfo')[i].style.pointerEvents = 'unset';
            document.querySelectorAll('.itemCartInfo')[i].style.left = 0 + 'px';
        }
    }

    if(evt.target.className == 'itemCartDelete'){
        document.getElementById(evt.target.id + 'itemCartMainWrapper').style.left = - document.getElementById(evt.target.id + 'itemCartMainWrapper').offsetWidth*1.2 + 'px';
        setTimeout(function(){
            document.getElementById(evt.target.id + 'itemCartMainWrapper').remove();
            setCartLocalStorage();
            setCartNumber();
            setItemPrice();
            emptyCart();
        }, 500);
    }

    if(evt.target.className == 'itemCartIncDec'){
        if(evt.target.id.slice(evt.target.id.length-3, evt.target.id.length) == 'Inc'){
            thisItemId = document.getElementById(evt.target.id.slice(0, evt.target.id.length-3));
            thisItemId.innerHTML = parseInt(thisItemId.innerHTML) + 1;
            document.getElementById(evt.target.id.slice(0, evt.target.id.length-3) + 'Dec').style.pointerEvents = 'unset';
        }
        else if(evt.target.id.slice(evt.target.id.length-3, evt.target.id.length) == 'Dec'){
            thisItemId = document.getElementById(evt.target.id.slice(0, evt.target.id.length-3));
            thisItemId.innerHTML = parseInt(thisItemId.innerHTML) - 1;
            if(thisItemId.innerHTML == 1)
            document.getElementById(evt.target.id).style.pointerEvents = 'none';
        }
        setCartLocalStorage();
        setCartNumber();
        setItemPrice();
    }

    if(evt.target.id == 'cartWrapper'
    || evt.target.parentNode.className == 'itemCartInfo'
    || evt.target.parentNode.className == 'itemCartMainWrapper'
    || evt.target.className == 'itemCartMainWrapper'
    || evt.target.parentNode.className == 'itemCartIncDecWrapper'
    || evt.target.id == 'cartItemContainer'
    || evt.target.parentNode.className == 'itemCartInfoDescription')
    cartItemContainer.style.display = 'flex';
    else
    cartItemContainer.style.display = 'none';
});

function createCartItem(n){
    let randomId = Math.ceil(Math.random()*9999999999);
    let itemCartMainWrapper = document.createElement('div');
    itemCartMainWrapper.className = 'itemCartMainWrapper';
    itemCartMainWrapper.id = 'itemCartInfo' + randomId + 'Del' + 'itemCartMainWrapper';
    itemCartMainWrapper.title = n.title;
    itemCartMainWrapper.price = n.price;
    itemCartMainWrapper.description = n.description;
    
    let itemCartInfoDescription = document.createElement('div');
    itemCartInfoDescription.className = 'itemCartInfoDescription';
    itemCartInfoDescription.style.width = '300px';
        let p = document.createElement('p');
        p.id = 'itemCartInfo' + randomId + 'Des' + 'P';
        p.innerHTML = n.description;
    itemCartInfoDescription.appendChild(p);

    let itemCartInfo = document.createElement('div');
    itemCartInfo.className = 'itemCartInfo';
    itemCartInfo.id = 'itemCartInfo' + randomId;
        let img = document.createElement('img');
        img.id = 'itemCartInfoImage' + randomId;
        img.src = '/food items/' + n.title + '.jpg';

        let itemCartInfoMark = document.createElement('p');
        itemCartInfoMark.className = 'itemCartInfoMark';
        itemCartInfoMark.id = 'itemCartInfo' + randomId + 'Des';
        itemCartInfoMark.innerHTML = '?';

        let itemCartInfoPrise = document.createElement('p');
        itemCartInfoPrise.id = 'itemCartAmount' + randomId + 'Price';
        itemCartInfoPrise.className = 'itemCartInfoPrise';
        itemCartInfoPrise.style.whiteSpace = 'nowrap';
        itemCartInfoPrise.style.width = '45px';
        itemCartInfoPrise.price = n.price;
        itemCartInfoPrise.innerHTML = n.price + ' ' + usedCurrency;

        let itemCartInfoTitle = document.createElement('p');
        itemCartInfoTitle.class = 'itemCartInfoTitle';
        itemCartInfoTitle.id = 'itemCartInfoTitle' + randomId;
        itemCartInfoTitle.style.color = '#0464fc';
        itemCartInfoTitle.style.borderRight = '1px solid #079';
        itemCartInfoTitle.style.borderLeft = '1px solid #079';
        itemCartInfoTitle.style.padding = '10px';
        itemCartInfoTitle.style.width = '160px';
        itemCartInfoTitle.style.whiteSpace = 'nowrap';
        itemCartInfoTitle.style.textAlign = 'center';
        if(n.title.length > 15)
        itemCartInfoTitle.innerHTML = n.title.slice(0, 13) + '...';
        else
        itemCartInfoTitle.innerHTML = n.title;

        let itemCartAmount = document.createElement('p');
        itemCartAmount.id = 'itemCartAmount' + randomId;
        itemCartAmount.className = 'itemCartAmount';
        if(n.amount)
        itemCartAmount.innerHTML = n.amount;
        else
        itemCartAmount.innerHTML = '1';

        let itemCartIncDecWrapper = document.createElement('div');
        itemCartIncDecWrapper.className = 'itemCartIncDecWrapper';
            let itemCartInc = document.createElement('p');
            itemCartInc.className = 'itemCartIncDec';
            itemCartInc.id = 'itemCartAmount' + randomId + 'Inc';
            itemCartInc.innerHTML = '+';

            let itemCartDec = document.createElement('p');
            itemCartDec.id = 'itemCartAmount' + randomId + 'Dec';
            itemCartDec.className = 'itemCartIncDec';
            itemCartDec.innerHTML = '-';
        itemCartIncDecWrapper.appendChild(itemCartInc);
        itemCartIncDecWrapper.appendChild(itemCartDec);

        let itemCartDelete = document.createElement('h1');
        itemCartDelete.id = 'itemCartInfo' + randomId + 'Del';
        itemCartDelete.className = 'itemCartDelete';
        itemCartDelete.innerHTML = 'X';

    itemCartInfo.appendChild(img);
    itemCartInfo.appendChild(itemCartInfoMark);
    itemCartInfo.appendChild(itemCartInfoPrise);
    itemCartInfo.appendChild(itemCartInfoTitle);
    itemCartInfo.appendChild(itemCartAmount);
    itemCartInfo.appendChild(itemCartIncDecWrapper);
    itemCartInfo.appendChild(itemCartDelete);

    itemCartMainWrapper.appendChild(itemCartInfoDescription);
    itemCartMainWrapper.appendChild(itemCartInfo);

    var addPermit = 1;

    for(i = 0; i < document.getElementsByClassName('itemCartMainWrapper').length; i++){
        if(document.getElementsByClassName('itemCartMainWrapper')[i].title == n.title){
            addPermit = 0;
            thisAmount = document.getElementsByClassName('itemCartMainWrapper')[i].getElementsByClassName('itemCartAmount')[0].innerHTML;
            document.getElementsByClassName('itemCartMainWrapper')[i].getElementsByClassName('itemCartAmount')[0].innerHTML = parseInt(thisAmount) + 1;
            setCartLocalStorage();
            break;
        }
    }
    if(addPermit == 1)
    cartItemContainer.appendChild(itemCartMainWrapper);
}


function setCartLocalStorage(){
    localStorage.mustafaAltaieRestaurantCart = '';
    for(i = 0; i < document.getElementsByClassName('itemCartMainWrapper').length; i++){
        var item = document.getElementsByClassName('itemCartMainWrapper')[i];
        localStorage.mustafaAltaieRestaurantCart += item.title + '//and//' + item.price + '//and//' + item.description + '//and//' + item.getElementsByClassName('itemCartAmount')[0].innerHTML + '//and//' + '//endItem//';
    }
}


function setCartNumber(){
    redCircleNumber.innerHTML = 0;
    for(i = 0; i < document.querySelectorAll('.itemCartMainWrapper').length; i++)
    redCircleNumber.innerHTML = parseInt(redCircleNumber.innerHTML) + parseInt(document.querySelectorAll('.itemCartMainWrapper')[i].getElementsByClassName('itemCartAmount')[0].innerHTML);
    if(redCircleNumber.innerHTML == 0)
    redCircle.style.display = 'none';
    else
    redCircle.style.display = 'flex';

}
setCartNumber();


function setIncButton(){
    for(i = 0; i < document.getElementsByClassName('itemCartIncDec').length; i++){
        var thisId = document.getElementsByClassName('itemCartIncDec')[i].id;
        if(document.getElementById(thisId.slice(0, thisId.length-3)).innerHTML > 1)
        document.getElementById(thisId.slice(0, thisId.length-3) + 'Dec').style.pointerEvents = 'unset';
        else
        document.getElementById(thisId.slice(0, thisId.length-3) + 'Dec').style.pointerEvents = 'none';
    }
}
setIncButton();

let totalPrice = 0;

function setItemPrice(){
    totalPrice = 0;
    for(i = 0; i < document.getElementsByClassName('itemCartInfoPrise').length; i++){
        var thisItem = document.getElementsByClassName('itemCartInfoPrise')[i];
        thisItem.innerHTML = thisItem.price * document.getElementById(thisItem.id.slice(0, thisItem.id.length-5)).innerHTML + ' ' + usedCurrency;;
        totalPrice = totalPrice + parseInt(thisItem.innerHTML);
    }
    if(totalPrice != 0){
        completeOrder.innerHTML = 'Complete order : ' + totalPrice + ' ' + usedCurrency;
        completeOrder.style.display = 'block';
    }
    else
    completeOrder.style.display = 'none';
}
setItemPrice();


function emptyCart(){
    let h1 = document.createElement('h1');
    h1.innerHTML = 'Cart is empty';
    h1.id = 'emptyCartText';
    if(document.querySelectorAll('.itemCartMainWrapper').length == 0)
    cartItemContainer.appendChild(h1);
    else
    emptyCartText.remove();
}
emptyCart();