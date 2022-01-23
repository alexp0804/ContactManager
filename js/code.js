
const urlBase = "http://cop4332-g1.xyz/api";
const extension = "php";

/* switch between forms */
$(function() {
    $('#signUp').on('click', function(e){
        $('.login').css('display', 'none');
        $('.signup').css('display', 'inline');
        //$('.signup').css('margin-top', '-70px');
        e.preventDefault();
    })
})

$(function() {
    $('#signIn').on('click', function(e){
        $('.login').css('display', 'inline');
        $('.signup').css('display', 'none');
        e.preventDefault();
    })
})

let passA = document.getElementById("registerPassword");
let passB = document.getElementById("confirmPassword");
let matchResult = document.getElementById("match-result");
let signUpButton = document.getElementById("signUpButton");

function checkPass() {
    if (passA.value != passB.value) {
        matchResult.innerText = "Passwords do not match.";
        matchResult.style.color = "red";
        signUpButton.disabled = true;
    }
    else {
        matchResult.innerText = "";
        signUpButton.disabled = false;
    }
}

passA.addEventListener('keyup', () => {
        if (passB.value.length != 0) checkPass();
});

passB.addEventListener('keyup', checkPass);

function doRegister() {
    let userId = 0;

    // Get registration info from document
    let first = document.getElementById("firstName").value; 
    let last = document.getElementById("lastName").value; 
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    // Hash password
    let hashed = md5(password);

    // Construct api endpoint url
    let url = urlBase + '/register.' + extension;
    
    // Convert info into json:
    let tmp = {first:first, last:last, login:login, password:hashed};
    let jsonPayload = JSON.stringify(tmp);

    // Send json to API
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    xhr.send(jsonPayload);
}
