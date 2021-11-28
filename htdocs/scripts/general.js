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
// TODO: store token in cookies, TEST
function setCookie() 
{
  var domainName = window.location.hostname;

// convert into UTC format (for the cookies):

  //var date = new Date(resp.expire); 
  //var expiration =  Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
  
  var expiration = new Date(resp.expire).toUTCString(); 



  //                 name=      value                    ; expires=            ; path=          

  document.cookie = "login=" + JSON.stringify(resp.login) + expiration + ";path=/; domain=." + domainName; 
  document.cookie = "lvl=" + JSON.stringify(resp.lvl) + expiration + ";path=/; domain=." + domainName; 
  document.cookie = "expire=" + JSON.stringify(resp.expire) + expiration + ";path=/; domain=." + domainName; 
  document.cookie = "accesstoken=" + JSON.stringify(resp.accesstoken) + expiration + ";path=/; domain=." + domainName; 
}







// GET cookies:
function getCookie(attr) 
{
  // attr can be: "login"    "lvl"    "expire"     "accesstoken" (token)
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
}





// -------------------------------------- check if user is logged in (based on valid token) + change header --------------------------------------------------
// TODO: test

function loggedIn()
{
  var user = getCookie("accesstoken");

  if(typeof user !== 'undefined' && user !== null) 
    {
      if(user !== "")
      {
        // user/admin (LOG OUT + MY PROFILE)
        document.getElementById("log_in").textContent = " LOG OUT";
        document.getElementById("sign_up").textContent = "MY PROFILE";

        return true;
      }

      // guest (LOG IN + SIGN UP) = no change
      document.getElementById("log_in").textContent = " LOG IN";
      document.getElementById("sign_up").textContent = "SIGN UP";

      return false;
    }
    
    // has not been created yet = not logged in 
    document.getElementById("log_in").textContent = " LOG IN";
    document.getElementById("sign_up").textContent = "SIGN UP";
    return false;
}








// ----------------------------------------------- pagination (for main and profile) ----------------------------------------------
//TODO: 
