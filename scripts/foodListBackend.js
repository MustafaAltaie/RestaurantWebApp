
localStorage.mustafaAltaieRestaurantusedCurrency = usedCurrency;

const imageType = ".jpg .bmp .png jpeg .JPG .BMP .PNG JPEG";

document.addEventListener('click', function(evt){
    if(evt.target.id == 'foodSliderSettingButton')
    foodSliderSettings.style.display = "flex";
    else
    foodSliderSettings.style.display = "none";

    if(evt.target.id == 'itemContainerSettingButton')
    itemContainerSettings.style.display = "flex";
    else
    itemContainerSettings.style.display = "none";

    if(evt.target.id == 'foodSliderSettingsRemove'
    || evt.target.parentNode.id == 'sliderImageView'
    || evt.target.id == 'sliderImageView')
    sliderImageView.style.display = "flex";
    else
    sliderImageView.style.display = "none";

    if(evt.target.className == 'sliderImageViewImg'){
        if(confirm("Delete this image?") == true){
            sliderImageViewDeleteText.value = evt.target.address;
            sliderImageViewDeleteSubmit.click();
        }
    }

    if(evt.target.id == 'itemSettingsSaveChanges') {
        itemCatigoryText.value = itemSettingCatigoryText.value;
        itemTitleText.value = itemSettingTitleText.value;
        itemPriceText.value = itemSettingPriceText.value;
        itemDescriptionText.value = itemSettingDescriptionText.value;
        addItemSubmit.click();
        itemSettings.style.display = "none";
    }
});


document.addEventListener('mousedown', function(evt){
    if(evt.target.className == 'setting3Buttons'
    && evt.target.parentNode.className == 'items'){
        selectedItemId = evt.target.id;
        itemSettings.style.display = "flex";
        itemSettings.style.top = event.clientY + document.body.scrollTop - 50 + 'px';
        itemSettings.style.left = event.clientX + 20 + 'px';
        itemSettingIdText.value = evt.target.idAddress;

        itemSettingCatigoryText.value = evt.target.catigory;
        itemSettingTitleText.value = evt.target.title;
        itemSettingPriceText.value = evt.target.price;
        itemSettingDescriptionText.value = evt.target.description;

        selectedItem.catigory = evt.target.catigory;
        selectedItem.title = evt.target.title;
        selectedItem.price = evt.target.price;
        selectedItem.description = evt.target.description;

        itemIdText.value = evt.target.idAddress;
        itemCatigoryText.value = evt.target.catigory;
        itemTitleText.value = evt.target.title;
        itemPriceText.value = evt.target.price;
        itemDescriptionText.value = evt.target.description;
    }
    else{
        if(evt.target.parentNode.id != 'itemSettings'
        && evt.target.id != 'itemSettings'){
            itemSettings.style.display = "none";
            itemSettingsSaveChanges.style.display = 'none';
            for(i = 0; i < itemSettings.querySelectorAll('.itemSettingsInput').length; i++)
            itemSettings.querySelectorAll('.itemSettingsInput')[i].style.display = 'none';
        }
    }

    if(evt.target.id == 'addNewItem'
    || evt.target.parentNode.id == 'addNewItemForm'
    || evt.target.id == 'addNewItemForm'){
        addUpdateItemCase = 'AddItem';
        addNewItemForm.style.display = 'flex';
        if(evt.target.id == 'addNewItem')
        for(i = 0; i < addNewItemForm.getElementsByTagName('input').length; i++)
        addNewItemForm.getElementsByTagName('input')[i].value = '';
    }
    else{
        addUpdateItemCase = '';
        addNewItemForm.style.display = 'none';
    }
});


itemSettings.addEventListener('click', function(evt){
    if(evt.target.className != 'itemSettingsInput')
    for(i = 0; i < itemSettings.querySelectorAll('.itemSettingsInput').length; i++)
    itemSettings.querySelectorAll('.itemSettingsInput')[i].style.display = 'none';
    if(evt.target.tagName == 'P')
    document.getElementById(evt.target.id + 'Text').style.display = 'block';
});



document.getElementById('itemImageButton').onclick = function(){
    if(itemImageButton.innerHTML == 'Item image')
    itemFileText.click();
    else{
        if(itemCatigoryText.value != ""
        &&itemTitleText.value != ""
        && itemPriceText.value != ""
        && itemDescriptionText.value != ""
        && itemFileText.value != ""){
            addItemSubmit.click();
            addNewItemForm.style.display = "none";
        }
    }
}

$(document).ready(function(){
    $("#addNewItemForm").on("submit", function(evt){
        evt.preventDefault();
        $.ajax({
            url: '/newItem',
            method: 'post',
            contentType: false,
            data: new FormData(this),
            processData: false,
            success: function(){
                itemImageButton.style.background = "#ccc";
                itemImageButton.innerHTML = "Item image";
                for(i = 0; i < addNewItemForm.querySelectorAll('INPUT').length; i++)
                addNewItemForm.getElementsByTagName('INPUT')[i].value = "";
                if(addUpdateItemCase != 'AddItem'){
                    document.getElementById(selectedItemId + 'Card').getElementsByTagName('H4')[0].innerHTML = itemSettingTitleText.value;
                    document.getElementById(selectedItemId + 'Card').getElementsByTagName('B')[0].innerHTML = itemSettingPriceText.value + ' ' + usedCurrency;
                    document.getElementById(selectedItemId + 'Card').getElementsByTagName('P')[0].innerHTML = itemSettingDescriptionText.value;
                }
                else
                window.location.reload();
            }
        });
    });

    $("#sliderImageViewAdd").on("submit", function(evt){
        evt.preventDefault();
        $.ajax({
            url: '/addImageSlide',
            method: 'post',
            contentType: false,
            data: new FormData(this),
            processData: false,
            success: function(){
                // $('#foodSlider')[0].reset()
                // $("#foodSlider").load(location.href + " #foodSlider");
            }
        });
    });

    $("#sliderImageViewDelete").on("submit", function(evt){
        evt.preventDefault();
        $.ajax({
            url: "/deleteImageSlide",
            method: "post",
            contentType: "application/json",
            data: JSON.stringify({
                imageName: sliderImageViewDeleteText.value,
                imageNum: sliderImageViewDeleteText.value.substr(4, sliderImageViewDeleteText.value.length)
            }),
            success: function(){
                sliderImageView.style.display = "none";
            }
        });
    });

    $("#currencyForm").on("submit", function(evt){
        evt.preventDefault();
        $.ajax({
            url: "/currencyType",
            method: "post",
            contentType: "application/json",
            data: JSON.stringify({
                _id: currencyId,
                currency: currency.value
            }),
            success: function(){
                for(i = 0; i < document.querySelectorAll('.items').length; i++)
                document.querySelectorAll('.items')[i].getElementsByTagName('B')[0].innerHTML = document.getElementsByClassName('items')[i].price + ' ' + currency.value;
            }
        });
    });

    $("#deleteItemFrom").on("submit", function(evt){
        evt.preventDefault();
        $.ajax({
            url: "/deleteItem",
            method: "post",
            contentType: "application/json",
            data: JSON.stringify({
                _id: itemSettingIdText.value,
                title: itemSettingTitleText.value
            }),
            success: function(){
                document.getElementById(selectedItemId + 'Card').remove();
            }
        });
    });
});


let addUpdateItemCase = '';

document.getElementById('itemFileText').onchange = function(){
    if(imageType.includes(itemFileText.value.substr(itemFileText.value.length-4, itemFileText.value.length))){
        if(addUpdateItemCase == 'AddItem'){
            itemImageButton.style.background = "#9fa";
            itemImageButton.innerHTML = "Add item";
        }
        else{
            itemSettingsSaveChanges.style.display = 'block';
        }
    }
    else{
        alert('File is not image!');
        itemFileText.value = "";
    }
}


if(imageSliderImages.value != "")
for(i = 1; i <= imageSliderImages.value.split(',').length; i++){
    var img = document.createElement('img');
    img.id = 'sliderImageView' + i;
    img.className = 'sliderImageViewImg';
    img.src = "/foodSlider/item" + i + ".jpg";
    img.address = "item" + i;
    sliderImageView.appendChild(img);
}
else{
    foodSlider.style.height = "50px";
    foodSliderSettingsRemove.style.display = "none";
}


document.getElementById('sliderImageViewAddText').onchange = function(){
    if(imageType.includes(sliderImageViewAddText.value.substr(sliderImageViewAddText.value.length-4, sliderImageViewAddText.value.length)))
    sliderImageViewAddSubmit.click();
    else{
        alert('File is not image!');
        sliderImageViewAddText.value = "";
    }
}


let selectedItem = {
    catigory: '',
    title: '',
    price: '',
    description: ''
}

document.addEventListener('input', function(evt){
    if(evt.target.className == 'itemSettingsInput'){
        if(itemSettingCatigoryText.value == selectedItem.catigory
        && itemSettingTitleText.value == selectedItem.title
        && itemSettingPriceText.value == selectedItem.price
        && itemSettingDescriptionText.value == selectedItem.description){
            itemSettingsSaveChanges.style.display = 'none';
            itemOldTitleText.value = '';
        }
        else{
            itemSettingsSaveChanges.style.display = 'block';
            if(itemSettingTitleText.value != selectedItem.title){
                itemOldTitleText.value = selectedItem.title;
                itemTitleText.value = itemSettingTitleText.value;
            }
            else
            itemOldTitleText.value = '';
        }
    }
});