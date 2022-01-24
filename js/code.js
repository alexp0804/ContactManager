
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
        $('.login').css({
            'display': 'block',
            'margin-top': '18%',
        });
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


function doLogin()
{
	userId = 0;
	
	// Get username and password from HTML.
	var login = document.getElementById("username").value;
	var password = document.getElementById("password").value;
	//password = md5(password);
	
	document.getElementById("login-error").innerHTML = "";

	// Format the payload and set up the connection.
	var jsonPayload = '{"username" : "' + login + '", "password" : "' + password + '"}';
	var url = urlBase + '/login.' + extension;
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, false);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

	try
	{
		// Send and recieve the payload.
		xhr.send(jsonPayload);
		var jsonObject = JSON.parse(xhr.responseText);
		
		userId = jsonObject.id;
		if (userId < 1)
		{
			document.getElementById("login-error").innerHTML = jsonObject.error;
			return;
		}
		
		username = login;

		saveCookie();
	
		window.location.href = "contacts.html";
	}
	catch(err)
	{
		document.getElementById("login-error").innerHTML = err.message;
	}
}

function doRegister() {
    
    let userId = 0;

    // Get registration info from document
    let first = document.getElementById("firstName").value; 
    let last = document.getElementById("lastName").value; 
    let username = document.getElementById("registerUsername").value;
    let password = document.getElementById("registerPassword").value;

    // Hash password
    //let hashed = md5(password);

    // Format the payload and set up the connection.
	var jsonPayload = '{ "first" : "' + first + '", "last" : "' + last + '", "username" : "' + username + '", "password" : "' + password + '" }';
	var url = urlBase + '/register.' + extension;
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, false);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    
    try
	{
		// Send and recieve the payload.
		xhr.send(jsonPayload);
		var jsonObject = JSON.parse(xhr.responseText);

		// Check for error.
		if (jsonObject.error != "")
		{
			document.getElementById("register-error").innerHTML = jsonObject.error;
			return;
		}

		// Set fields.
		document.getElementById("username").value = login;
		document.getElementById("password").value = password;
		doLogin();
	}
	catch(err)
	{
		document.getElementById("register-error").innerHTML = err.message;
	}

}

function saveCookie()
{
	var minutes = 20;
	var date = new Date();
	date.setTime(date.getTime() + (minutes * 60 * 1000));	
	document.cookie = "username=" + username + ",userId=" + userId + ";expires=" + date.toGMTString();
}

