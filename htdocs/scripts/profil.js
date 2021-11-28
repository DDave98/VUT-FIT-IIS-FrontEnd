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







//TODO: page scroll OR loading next/pev page content

//TODO: individual button functions