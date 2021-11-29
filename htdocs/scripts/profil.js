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



//--------------------------------------------------------------- User + Admin ------------------------------------------------------------
// Delete (self) user = user needs to confirm pwd:
//TODO: test 

// for Delete Account:
document.getElementById("self_delete").onclick = function () { selfDEL() };  



function selfDEL()
{ 
    // pronpt box (user input):
    var heslo = prompt("Please confirm your current password", "Account Password");

    if (heslo === null || heslo === "") 
    {
        alert("ERR: You must confirm the correct account password first!")
    } 
     

    // DELETE request:
    // if not 200 = wrong pwd for this user (400)
    var requestD = new XMLHttpRequest();


    requestD.onreadystatechange = function () 
    {
        if (requestD.readyState === 4) 
        {
            if (requestD.status === 200) 
            {
                alert("Your account has been removed successfully.");

                return true;
            }

            else
            {
                alert("ERR: Incorrect password!");
                return (false)
            }
        }
    }

    //----------
    // opening a new connection (using DELETE request) 
    requestD.open("DELETE", url, true);
    requestD.setRequestHeader("Content-Type", "application/json");
    
    requestD.send(heslo);



    // delete cookies:
    var domainName = window.location.hostname;

    document.cookie = "login=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=." + domainName; 
    document.cookie = "lvl=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=." + domainName; 
    document.cookie = "expire=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=." + domainName; 
    document.cookie = "accesstoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=." + domainName; 
    
}


//---------------------------------------------------------------------------------------------------------------------------------------
//TODO:
// List user presentations 
// Edit presentation




//---------------------------------------------------------------------------------------------------------------------------------------
//TODO:
// List user conferences
// Edit conferences



//---------------------------------------------------------------------------------------------------------------------------------------
//TODO:
// List user reservations
// Edit reservation