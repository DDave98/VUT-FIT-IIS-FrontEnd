// check token (cannot access profile without any kind of user rights):
if (loggedIn() === false)
{
    alert("ERR: Invalid access token!")
    window.location = "http://iss2021.infinityfreeapp.com/";
}





// if user is NOT an admin = hide user management button
//TODO: if user = admin  ->  show "uzivatele" button (otherwise hide it)
if (getCookie("lvl") != "admin")
{
    document.getElementById("usersBTN").style.visibility = 'hidden';
}




// for Log Out:
document.getElementById("log_in").onclick = function () { logOUT() };  
//________________________________________________________________________________________________________________________________________












//TODO: individual button functions:

//------------------------------------------------------------------ Admin ------------------------------------------------------------------
// List all existing Users  // page default = 1 :

// User management button:
document.getElementById("usersBTN").onclick = function () {  };  




// TODO: add panel / table with rows 







//---------------------------------------------------------------------------------------------------------------------------------------
//TODO:
// Set User rights  = uses login + rights type







//---------------------------------------------------------------------------------------------------------------------------------------
//TODO:
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
                return false;
            }
        }
    }

    //----------
    // opening a new connection (using DELETE request) 
    requestD.open("DELETE", "https://iis-proj.herokuapp.com/api/user/deleteAccount", true);
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
document.getElementById("myPRES").onclick = function () {  };  

// ...





//TODO: 
// Edit presentation










//---------------------------------------------------------------------------------------------------------------------------------------
//TODO: + pridat moznost zakladani conferenci pro uzivatele
// List user conferences
document.getElementById("myCONF").onclick = function () {  };  

// ...








// TODO:
// Edit conferences









//---------------------------------------------------------------------------------------------------------------------------------------
//TODO: test
// List user reservations
document.getElementById("myRES").onclick = function () { usr_RES() };  

// ...

function usr_RES()
{ 
    var requestRES = new XMLHttpRequest();


    requestRES.onreadystatechange = function () 
    {
        if (requestRES.readyState === 4) 
        {
            if (requestRES.status === 200) 
            {
                // TODO: get and list the reservations
                var respS = JSON.parse(this.response);

                return respS;
            }

            else
            {
                alert("There was an ERROR! Please try again!");
                return false;
            }
        }
    }

    //----------
    // GET request:
    requestRES.open("GET", "https://iis-proj.herokuapp.com/api/user/showMyRezervations", true);
    requestRES.setRequestHeader("Content-Type", "application/json");
    
    requestRES.send();
}













//TODO:
// Edit reservation