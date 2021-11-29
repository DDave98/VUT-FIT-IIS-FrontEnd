// resp = global var (from login.js) containing response after login
var resp;

/* Example response (= resp): 

          {
            "login": "fse@ged.hfyjht",
            "lvl": "user",
            "expire": "2021-11-26T22:45:25.9514028Z",
            "accesstoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImZzZUBnZWQuaGZ5amh0Iiwicm9sZSI6InVzZXIiLCJuYmYiOjE2Mzc5NTk1MjUsImV4cCI6MTYzNzk2NjcyNSwiaWF0IjoxNjM3OTU5NTI1fQ.fF3C6dx1IllskECRK-K6GJo2TvxOX2vBpGfn1ndJ-KI",
            "refreshToken": null
          } */
          




// -------------------------------------------------- store resp in cookies ---------------------------------------------------------
// SET cookies:
function setCookie() 
{
  var domainName = window.location.hostname;

// convert into UTC / GMT format (for the cookies):
  var expiration = new Date(resp.expire).toUTCString(); 


  //                 name=      value                    ; expires=            ; path=          

  document.cookie = "login=" + JSON.stringify(resp.login) + ";" + expiration + ";path=/; domain=." + domainName; 
  document.cookie = "lvl=" + JSON.stringify(resp.lvl) + ";" + expiration + ";path=/; domain=." + domainName; 
  document.cookie = "expire=" + JSON.stringify(resp.expire) + ";" + expiration + ";path=/; domain=." + domainName; 
  document.cookie = "accesstoken=" + JSON.stringify(resp.accesstoken) + ";" + expiration + ";path=/; domain=." + domainName; 
}







// GET cookies:
function getCookie(attr) 
{
  // attr can be: "login"    "lvl"    "expire"     "accesstoken" (token)
  //--------


  
  var name = attr + "=";

  // cookies are stored as: c1 = v1; c2 = v2; ...   => get to the needed attribute 
  var decodeC = decodeURIComponent(document.cookie);
  var co = decodeC.split(';');


  for(let i = 0; i < co.length; i++) 
  {
    var c = co[i];

    while (c.charAt(0) == ' ') 
    {
      c = c.substring(1);
    }

    if (c.indexOf(name) == 0)
     {
      return c.substring(name.length, c.length);
    }
  }
  return "";
  
  // ---------------------
    
  /*
    let cookie = {};
    document.cookie.split('; ').forEach(
        function(el) 
        {
            let [key,value] = el.split('=');
            cookie[key.trim()] = value;

            if(key === attr)
            {
    
              return cookie[attr];
            }
        }
        
    )
*/
    
    
}





// -------------------------------------- check if user is logged in (based on valid token) + change header --------------------------------------------
function loggedIn()
{
  var user = getCookie("accesstoken");

  if(typeof user !== 'undefined' && user !== null) 
    {
      if(user !== "")
      {
        // user/admin (LOG OUT + MY PROFILE)
        document.getElementById("log_in").textContent = "LOG OUT";

        document.getElementById("sign_up").textContent = "MY PROFILE";
        document.getElementById("sign_up").href="./profil.html"; 

        return true;
      }

      // guest (LOG IN + SIGN UP) = no change
      document.getElementById("log_in").textContent = "LOG IN";

      document.getElementById("sign_up").textContent = "SIGN UP";
      document.getElementById("sign_up").href="./login.html";

      return false;
    }
    
    // has not been created yet = not logged in 
    document.getElementById("log_in").textContent = "LOG IN";

    document.getElementById("sign_up").textContent = "SIGN UP";
    document.getElementById("sign_up").href="./login.html";

    return false;
}





// --------------------------------------------------------- Log out -------------------------------------------------------------
function logOUT() 
{
  // check current <a> writing
  var text = document.getElementById("log_in").textContent;
  if(text !== "LOG OUT")
  {
    return false;
  }
  
  // if "LOG OUT" then proceed (detele cookies = setting the parameter to a past date):
  var domainName = window.location.hostname;

  document.cookie = "login=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=." + domainName; 
  document.cookie = "lvl=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=." + domainName; 
  document.cookie = "expire=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=." + domainName; 
  document.cookie = "accesstoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=." + domainName; 

  window.location = "http://iss2021.infinityfreeapp.com/";
}





// ----------------------------------------------- pagination (for main and profile) ----------------------------------------------
//TODO: 
