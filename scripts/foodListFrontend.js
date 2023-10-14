if(imageSliderImages.value == "")
foodSlider.style.display = "none";

let favoriteObject = '';

document.addEventListener('click', function(evt){
    if(evt.target.className == 'heartWrapper'){
        localStorage.favoriteList = '';
        if(evt.target.favoriteCase == 0){
            favoriteObject = '';
            document.getElementById(evt.target.id).getElementsByTagName('img')[0].src = '/icons/heart1.png';
            document.getElementById(evt.target.id).favoriteCase = 1;
            for(i = 0; i < document.getElementsByClassName('heartWrapper').length; i++){
                if(document.getElementsByClassName('heartWrapper')[i].favoriteCase == 1)
                favoriteObject += document.getElementsByClassName('heartWrapper')[i].title + ',';
            }
            localStorage.favoriteList = favoriteObject;
        }
        else{
            favoriteObject = '';
            document.getElementById(evt.target.id).getElementsByTagName('img')[0].src = '/icons/heart0.png';
            document.getElementById(evt.target.id).favoriteCase = 0;
            for(i = 0; i < document.getElementsByClassName('heartWrapper').length; i++){
                if(document.getElementsByClassName('heartWrapper')[i].favoriteCase == 1)
                favoriteObject += document.getElementsByClassName('heartWrapper')[i].title + ',';
            }
            localStorage.favoriteList = favoriteObject;
        }
    }
});

if(localStorage.favoriteList != undefined
&& localStorage.favoriteList != ''){
    for(j = 0; j < localStorage.favoriteList.split(',').length; j++){
        for(i = 0; i < document.getElementsByClassName('heartWrapper').length; i++){
            if(document.getElementsByClassName('heartWrapper')[i].title == localStorage.favoriteList.split(',')[j]){
                document.getElementsByClassName('heartWrapper')[i].getElementsByTagName('img')[0].src = '/icons/heart1.png';
                document.getElementsByClassName('heartWrapper')[i].favoriteCase = 1;
            }
        }
    }
}