if(localStorage.mustafaAltaieRestaurantMyEmail != undefined
&& localStorage.mustafaAltaieRestaurantMyEmail != '')
accountPicture.src = '/user pictures/' + localStorage.mustafaAltaieRestaurantMyEmail + '.jpg';


document.addEventListener('click', function(evt){
    if(evt.target.id == 'accountPictureContainer'){
        if(localStorage.mustafaAltaieRestaurantMyEmail != undefined
        && localStorage.mustafaAltaieRestaurantMyEmail != ''){
            accountOptionList.style.display = 'block';
            accountOptionList.style.top = accountPictureContainer.offsetTop + accountOptionList.offsetHeight + 'px';
            accountOptionList.style.left = evt.target.offsetLeft + evt.target.offsetWidth/2 - accountOptionList.offsetWidth/2 + 'px';
        }
        else
        window.location.href='/account';
    }
    else
    accountOptionList.style.display = 'none';

    if(evt.target.id == 'signInout'){
        localStorage.mustafaAltaieRestaurantMyIdDB = '';
        localStorage.mustafaAltaieRestaurantMyFirstName = '';
        localStorage.mustafaAltaieRestaurantMyLastName = '';
        localStorage.mustafaAltaieRestaurantMyEmail = '';
        localStorage.mustafaAltaieRestaurantMyNumber = '';
        localStorage.mustafaAltaieRestaurantMyAddress = '';
        localStorage.mustafaAltaieRestaurantMyPassword = '';
        accountPicture.src = '/icons/account.png';
    }
});


function goToManageAccount(){
    window.location.href = '/manageAccount/' + localStorage.mustafaAltaieRestaurantMyEmail;
}