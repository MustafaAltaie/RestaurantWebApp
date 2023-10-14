document.addEventListener('click', function(evt){
    if(evt.target.tagName == 'B'){
        if(evt.target.className == 'gotoSignin'){
            if(window.matchMedia('(min-width: 1024px)').matches)
            signUpForm.style.transform = "perspective(800px) rotateY(90deg)";
            else
            signUpForm.style.transform = "perspective(1900px) rotateY(90deg)";
            actionCase = 'login';
            setTimeout(function(){
                if(window.matchMedia('(min-width: 1024px)').matches)
                signInForm.style.transform = "perspective(800px) rotateY(0deg)";
                else
                signInForm.style.transform = "perspective(1900px) rotateY(0deg)";
            }, 300);
        }
        else{
            if(window.matchMedia('(min-width: 1024px)').matches)
            signInForm.style.transform = "perspective(800px) rotateY(-90deg)";
            else
            signInForm.style.transform = "perspective(1900px) rotateY(-90deg)";
            actionCase = 'signup';
            setTimeout(function(){
                if(window.matchMedia('(min-width: 1024px)').matches)
                signUpForm.style.transform = "perspective(800px) rotateY(0deg)";
                else
                signUpForm.style.transform = "perspective(1900px) rotateY(0deg)";
            }, 300);
        }
    }
});

let actionCase = 'signup';

document.addEventListener('keydown', function(e){
    if(e.key == 'Enter'){
        if(actionCase == 'signup')
        signupBtn.click();
        else if(actionCase == 'login')
        loginBtn.click();
    }
});


document.addEventListener('click', function(evt){
    if(evt.target.tagName == 'BUTTON'){
        if(evt.target.innerHTML == 'Signup'){
            if(firstNameText.value != ""
            && lastNameText.value != ""
            && emailText.value != ""
            && numberText.value != ""
            && passwordText.value != ""){
                if(emailText.value.includes('@') && emailText.value.includes('.')){
                    userFirstName.value = firstNameText.value;
                    userLastName.value = lastNameText.value;
                    userNumber.value = numberText.value;
                    userEmail.value = emailText.value;
                    userAddress.value = addressText.value;
                    userPassword.value = passwordText.value;
                    signupFromSubmit.click();
                }
                else
                alert('Email is not correct!');
            }
            else
            alert('Fill all the texts');
        }
        if(evt.target.innerHTML == 'Login'){
            if(loginEmail.value != ''
            && loginPassword.value != ""){
                signingSubmit.click();
            }
            else
            alert('Fill all the texts');
        }
    }

    if(evt.target.id == 'addPicture')
    userPicture.click();
});

const imageType = ".jpg .bmp .png jpeg .JPG .BMP .PNG JPEG";

document.getElementById('userPicture').onchange = function(){
    if(imageType.includes(userPicture.value.substr(userPicture.value.length-4, userPicture.value.length))){
        addPicture.innerHTML = 'Picture added :)';
        addPicture.style.color = '#080';
    }
    else{
        addPicture.innerHTML = 'File is not image!';
        addPicture.style.color = '#d00';
    }
}

$(document).ready(function(){
    $("#signupFrom").on("submit", function(evt){
        evt.preventDefault();
        $.ajax({
            url: '/newUser',
            method: 'post',
            contentType: false,
            data: new FormData(this),
            processData: false,
            success: function(){
                document.getElementsByClassName('gotoSignin')[0].click();
                loginEmail.value = emailText.value;
                loginPassword.value = passwordText.value;
            },
            error: function(){
                alert('Email is already existed!');
            }
        });
    });

    $("#signing").on("submit", function(evt){
        evt.preventDefault();
        $.ajax({
            url: "/signing",
            method: "post",
            contentType: "application/json",
            data: JSON.stringify({
                email: loginEmail.value,
                password: loginPassword.value
            }),
            success: function(){
                window.location.href = '/test';
            }
        });
    });
});