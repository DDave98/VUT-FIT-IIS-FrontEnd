// check token (cannot access profile without any kind of user rights):
if (loggedIn() === false)
{
    alert("ERR: Invalid access token!")
    window.location = "http://iss2021.infinityfreeapp.com/";
}





// if user is NOT an admin = hide user management button
//TODO: if user = admin  ->  show "uzivatele" button (otherwise hide it)
if (getCookie("lvl") !== "admin")
{
    document.getElementById("usersBTN").style.visibility = 'hidden';
}




// for Log Out:
document.getElementById("log_in").onclick = function () { logOUT() };  
//________________________________________________________________________________________________________________________________________












//TODO: individual button functions:

//------------------------------------------------------------------ Admin ------------------------------------------------------------------
// User management button:

// List all existing Users  // page default =1
// TODO: add panel / table with rows 

// Set User rights  = uses login + rights type

// Delete ANY User =uses logins



//------------------------------------------------------------------ User ------------------------------------------------------------------
// Delete (self) user = user needs to confirm pwd
//TODO: test <a> 

// for Delete Account:
document.getElementById("self_delete").onclick = function () { selfDEL() };  

function selfDEL()
{
    //
}



// List user presentations 
// Edit presentation





// List user conferences
// Edit conferences




// List user reservations
// Edit reservation