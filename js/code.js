var urlBase = 'http://cop4331-g1.xyz/api';
var extension = 'php';

var userId = 0;
var username = "";

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
        $('.login').css({
            'display': 'block',
            'margin-top': '18%',
        });
        $('.signup').css('display', 'none');
        e.preventDefault();
    })
})

$(function() {
    $('#btnAddContact').on('click', function(e){
		$('.searchContacts').css('display', 'none');
		$('.displayContactContainer').css('display', 'none');
		$('.aboutProject').css('display', 'none');
		$('.editContact').css('display', 'none');
		$('.addContact').css({
            'display': 'block',
            'margin-top': '10%',
        });
        e.preventDefault();
    })
})

$(function() {
    $('#btnEditContact').on('click', function(e){
		$('.searchContacts').css('display', 'none');
		$('.addContact').css('display', 'none');
		$('.displayContactContainer').css('display', 'none');
		$('.aboutProject').css('display', 'none');
		$('.editContact').css({
            'display': 'block',
            'margin-top': '10%',
        });
        e.preventDefault();
        doSearch("");
    })
})

$(function() {
    $('#btnDisplayContacts').on('click', function(e){
		$('.searchContacts').css('display', 'none');
		$('.addContact').css('display', 'none');
		$('.aboutProject').css('display', 'none');
		$('.editContact').css('display', 'none');
		$('.displayContactContainer').css({
            'display': 'block',
            'margin-top': '10%',
        });
        e.preventDefault();
        doSearch("");
    })
})

$(function() {
    $('#logo').on('click', function(e){
		$('.searchContacts').css('display', 'none');
		$('.addContact').css('display', 'none');
		$('.aboutProject').css('display', 'none');
		$('.editContact').css('display', 'none');
		$('.displayContactContainer').css({
            'display': 'block',
            'margin-top': '10%',
        });
        e.preventDefault();
    })
})


$(function() {
    $('#btnInfo').on('click', function(e){
		$('.displayContactContainer').css('display', 'none');
		$('.addContact').css('display', 'none');
		$('.searchContacts').css('display', 'none');
		$('.editContact').css('display', 'none');
		$('.aboutProject').css({
            'display': 'block',
            'margin-top': '10%',
        });
        e.preventDefault();
    })
})

// Hitting enter while selecting the search field emulates clicking the search button
document.getElementById("SearchInput")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("SubmitSearch").click();
    }
});

// If search field becomes empty refresh the table
var SearchInput = document.getElementById("SearchInput");
SearchInput.addEventListener("input", (event) => {
    doSearch(SearchInput.value);
});


window.onload=function(){
	doSearch("");

    let passA = document.getElementById("registerPassword");
	let passB = document.getElementById("confirmPassword");
	let matchResult = document.getElementById("match-result");
	let signUpButton = document.getElementById("register-submit");

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


}

// remove spaces & allow using 'enter' to submit form
$(function() {
	$("input#username").on({
		keydown: function(e) {
			// 13 is ascii for enter
			if (e.which === 13)
				return document.getElementById("login-submit").click();

			// 32 is ascii for space
			if (e.which === 32)
				return false;
		},
		// remove spaces w/ regex
		change: function() {
			this.value = this.value.replace(/\s/g, "");
		}
	})

	$("input#registerUsername").on({
		keydown: function(e) {
			if (e.which === 13)
				document.getElementById("register-submit").click();

			if (e.which === 32)
				return false;
		},
		change: function() {
			this.value = this.value.replace(/\s/g, "");
		}
	})

	$("input#password").on({
		keydown: function(e) {
			if (e.which === 13)
				document.getElementById("login-submit").click();

			if (e.which === 32)
				return false;
		},
		change: function() {
			this.value = this.value.replace(/\s/g, "");
		}
	})

	$("input#registerPassword").on({
		keydown: function(e) {
			if (e.which === 13)
				document.getElementById("register-submit").click();

			if (e.which === 32)
				return false;
		},
		change: function() {
			this.value = this.value.replace(/\s/g, "");
		}
	})

	$("input#confirmPassword").on({
		keydown: function(e) {
			if (e.which === 13)
				document.getElementById("register-submit").click();

			if (e.which === 32)
				return false;
		},
		change: function() {
			this.value = this.value.replace(/\s/g, "");
		}
	})

	document.getElementById('contactTable').addEventListener('keydown', (evt) => {
		if (evt.keyCode === 13) {
			evt.preventDefault();
		}
	});
});

// login
function doLogin() {
	userId = 0;
	
	var login = document.getElementById("username").value;
	var password = document.getElementById("password").value;
	password = md5(password);
	
	document.getElementById("login-error").innerHTML = "";

	// format json payload + setup connection
	var jsonPayload = '{"username" : "' + login + '", "password" : "' + password + '"}';
	var url = urlBase + '/Login.' + extension;
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

function doRegister()
{
	userId = 0;
	
	var firstName = document.getElementById("firstName").value;
	var lastName = document.getElementById("lastName").value;
	var login = document.getElementById("registerUsername").value;
	var password = document.getElementById("registerPassword").value;
	var confirmPassword = document.getElementById("confirmPassword").value;
	var tempPass = password;
	
	password = md5(password);
	confirmPassword = md5(confirmPassword);
	
	document.getElementById("register-error").innerHTML = "";

	var jsonPayload = '{ "regFirstname" : "' + firstName + '", "regLastname" : "' + lastName + '", "regUsername" : "' + login + '", "regPassword" : "' + password + '", "regPasswordConf" : "' + confirmPassword + '" }';
	var url = urlBase + '/Register.' + extension;
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, false);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

	try
	{
		xhr.send(jsonPayload);
		var jsonObject = JSON.parse(xhr.responseText);

		if (jsonObject.error != "")
		{
			document.getElementById("register-error").innerHTML = jsonObject.error;
			return;
		}

		document.getElementById("username").value = login;
		document.getElementById("password").value = tempPass;
		doLogin();
	}
	catch(err)
	{
		document.getElementById("register-error").innerHTML = err.message;
	}
}

function doAddContact()
{
    userId = readCookie();

	var firstname = document.getElementById("addFirstName").value;
	var lastname = document.getElementById("addLastName").value;
	var email = document.getElementById("addEmail").value;
	var phoneNum = document.getElementById("phone").value;
	
    var jsonPayload = '{"contUserID" : ' + userId + ', "contFirstName" : "' + firstname + '", "contLastName" : "' + lastname + '", "contEmail" :     "' + email + '", "contPhone" : "' + phoneNum + '"}';
	var url = urlBase + '/AddContact.' + extension;
	
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				var jsonObject = JSON.parse(xhr.responseText);
				
					if (jsonObject.error == "")
					{
						document.getElementById("addingResult").innerHTML = "You have successfully added a contact!";
						$('#addingResult').removeClass('d-none');
						//clears up the alert after 5 seconds
						setTimeout(function() {
							//document.getElementById("addingResult").innerHTML = "";
							$('#addingResult').addClass('d-none');
						}, 5000);
					}
					else
					{
						document.getElementById("addingResult").innerHTML = jsonObject.error;
					}
			}
      
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("addingResult").innerHTML = err.message;
	}
}

function saveCookie()
{
	var minutes = 20;
	var date = new Date();
	date.setTime(date.getTime()+(minutes*60*1000));	
	document.cookie = "username=" + username + ",userId=" + userId + ";expires=" + date.toGMTString();
}

function doLogout()
{
	userId = 0;
	username = "";
	document.cookie = "username= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	window.location.href = "index.html";
}

function readCookie()
{
	userId = -1;
	var data = document.cookie;
	var splits = data.split(",");

	for(var i = 0; i < splits.length; i++) 
	{
		var thisOne = splits[i].trim();
		var tokens = thisOne.split("=");
		if (tokens[0] == "username")
		{
			username = tokens[1];
		}
		else if (tokens[0] == "userId")
		{
			userId = parseInt(tokens[1].trim());
		}
	}
	
	if (userId < 0)
	{
		return null;
	}

	return userId;
}

function callSearch()
{
    doSearch(document.getElementById("SearchInput").value);
}

function doSearch(search)
{
    userId = readCookie();

    // Call search API and get resulting json
    var jsonPayload = '{ "userID": "' + userId + '", "search": "' + search + '" }';

    var  url = urlBase + '/SearchContacts.' + extension;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, false);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    try
    {
        xhr.onreadystatechange = function() 
        {
            if (this.readyState == 4 && this.status == 200) 
            {
                var jsonObject = JSON.parse(xhr.responseText);
                
                if (jsonObject.error == "")
                {
                    // Clear table
                    var table = document.getElementById("contactTable");
                    $("#displayContacts tbody tr").remove();

                    // Fill table with contacts
                    var contacts = jsonObject.results;
                    var info_fields = ["FIRSTNAME", "LASTNAME", "EMAIL", "PHONENUMBER", "ID", "USERID"];

                    // For each of the contacts
                    for (var i = 0; i < contacts.length; i++)
                    {
                        // Create a new row
                        var row = table.insertRow(0);

                        // Fill the row with the relevant information
                        for (const field of info_fields)
                        {
                            var cell = row.insertCell(-1); 
                            cell.innerHTML = contacts[i][field];
                            if (field == "ID" || field == "USERID")
                            {
                                cell.style.display = "none";
                            }
						}
						
						var editIcon = row.insertCell(6);
                        editIcon.innerHTML = '<td>'
                                                 + '<div id="edit">'
                                                     + '<i onclick="doEdit(this);" style="color:rgb(100,100,100); cursor: pointer;" class="fas fa-pencil"></i>'
                                                     + '<i onclick="finishEdit(this);" style="display:none; color:#5ac47a; cursor: pointer;" class="fas fa-check-square"></i>'
                                                 + '</div>'
                                             + '</td>';


                        var deleteIcon = row.insertCell(7);
                        deleteIcon.innerHTML = '<td>'
                                                 + '<div id="delete">'
                                                     + '<i onclick="doDelete(this);" style="color:rgb(196,90,90); cursor: pointer;" class="fas fa-trash-alt"></i>'
                                                 + '</div>'
                                             + '</td>';
                    }
                }
            }
        };

        xhr.send(jsonPayload);
    }
    catch(err)
    {
        return;	
    }
}

function doEdit(element)
{
    var row = element.parentNode.parentNode.parentNode;
    row.style.background = "#e9e9e9";
    var cells = row.children;

    // -4 to not make ID, userID, edit or delete button editable
    for (var i = 0; i < cells.length - 4; i++)
        cells[i].setAttribute("contenteditable", "true"); 

    // Remove the edit button and replace with confirm button
    var buttons = element.parentNode.children;
    element.style.display = "none";
    buttons[1].style.display = "";


}

function finishEdit(element)
{
    var row = element.parentNode.parentNode.parentNode;
    row.style.background = "#f0f0f0";
    var cells = row.children;

    for (var i = 0; i < cells.length - 4; i++)
        cells[i].setAttribute("contenteditable", "false");
    
    // Remove confirmation button and replace with edit button
    var buttons = element.parentNode.children;
    element.style.display = "none";
    buttons[0].style.display = "";
    
    // Remove all <br> from innerHTMLs
    for (var i = 0; i < cells.length - 4; i++)
        cells[i].innerHTML == cells[i].innerHTML.replace(/\<br\>/g, "");

    // Package info into json
    var tmp = { newFirstName: cells[0].innerHTML, 
                newLastName: cells[1].innerHTML,
                newEmail: cells[2].innerHTML,
                newPhone: cells[3].innerHTML,
                contID: cells[4].innerHTML,
                userID: cells[5].innerHTML };

    var jsonPayload = JSON.stringify(tmp);

	var url = urlBase + '/EditContact.' + extension;
	var xhr = new XMLHttpRequest();
 	xhr.open("POST", url, false);
 	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

	try
	{
		// Send and recieve the payload.
		xhr.send(jsonPayload);
		var jsonObject = JSON.parse(xhr.responseText);
        if (jsonObject.error != "")
        {
            return false;
        }
		xhr.send(jsonPayload);
		
		document.getElementById("finishEdit").innerHTML = "You have successfully updated the contact";
		$('#finishEdit').removeClass('d-none');
		//clears up the alert after 5 seconds
		setTimeout(function() {
			//document.getElementById("addingResult").innerHTML = "";
			$('#finishEdit').addClass('d-none');
		}, 5000);
	}
	catch(err)
	{
        return false;
	}
}

function doDelete(element)
{
    if (!confirm("Delete this contact?")) {
        return;
    }

    var row = element.parentNode.parentNode.parentNode;
    var cells = row.children;

    // Hide row
	row.setAttribute("hidden", "hidden");
	
	document.getElementById("deletingResult").innerHTML = "You have deleted the contact.";
	$('#deletingResult').removeClass('d-none');
	//clears up the alert after 5 seconds
	setTimeout(function() {
		//document.getElementById("addingResult").innerHTML = "";
		$('#deletingResult').addClass('d-none');
	}, 5000);

    // Delete from database
    var tmp = { contFirstName: cells[0].innerHTML, 
                contLastName: cells[1].innerHTML,
                contEmail: cells[2].innerHTML,
                contPhone: cells[3].innerHTML,
                contUserID: cells[5].innerHTML };

    var jsonPayload = JSON.stringify(tmp);
    jsonPayload = jsonPayload.replace(/\<br\>/g, "");
    
    var url = urlBase + '/DeleteContact.' + extension;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, false);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try
    {
        xhr.send(jsonPayload);
    }
    catch(err)
    {
        return;
    }

}

function clearForms()
{
    forms = ["addFirstName", "addLastName", "addEmail", "phone"];

    for (const form of forms)
    {
        var el = document.getElementById(form);
        el.value = "";
    }

    return false;
}
