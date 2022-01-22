
const urlBase = "http://cop4331-g1.xyz/api";
const extension = "php";

/* switch between forms */
$(function() {
    $('#signUp').on('click', function(e){
        $('.login').css('display', 'none');
        $('.signup').css('display', 'inline');
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


function doRegister() {
    let userId = 0;

    // Get registration info from document
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let first = document.getElementById("firstName").value; 
    let last = document.getElementById("lastName").value; 

    // Hash password
    let hashed = md5(password);

    // Construct api endpoint url
    let url = urlBase + '/register.' + extension;
    
    // Convert info into json
    let tmp = {login:login, password:hashed};
    let jsonPayload = JSON.stringify(tmp);

    // Send json to API
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    xhr.send(jsonPayload);
}
