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
          
// -------------------------------------- check if user is logged in (based on valid token) --------------------------------------------------
// TODO: make fn, ADD THIS SCRIPT TO ALL HTML FILES, test

function loggedIn (access_token)
{
  if(typeof resp !== 'undefined' && resp !== null) // no object has been created yet
  {
    // checking if resp object is empty = no accesstoken AND checking that the token given matches the one of the user
      if(Object.keys(resp).length !== 0 && access_token === resp.accesstoken) // valid token
      {
          return true;
      }

      return false;
  }

  return false;
}


// TODO: store token in cookies?
// TODO: make DELETE token fn,  test


//----------------------------------------------- if user is logged in - change header options ----------------------------------------------
//TODO
function header(t_f)
{ 
  // -> using "toggle" apply dark-theme class styles  instead of the light-theme ones
  //document.body.classList.toggle('dark-theme')   

  // user/admin (LOG OUT + MY PROFILE)
  if (loggedIn (resp.accesstoken) === true)
    {
    
      document.getElementById("log_in").textContent = " LOG OUT";
      document.getElementById("sign_up").textContent = "MY PROFILE";
    }

  // guest (LOG IN + SIGN UP) = no change
    
}









// ----------------------------------------------- pagination (for main and profile) ----------------------------------------------
//TODO: 
