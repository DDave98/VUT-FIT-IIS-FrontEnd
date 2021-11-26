// resp = global var (from login.js) containing response after login

/* Example response (= resp): 

          {
            "login": "fse@ged.hfyjht",
            "lvl": "user",
            "expire": "2021-11-26T22:45:25.9514028Z",
            "accesstoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImZzZUBnZWQuaGZ5amh0Iiwicm9sZSI6InVzZXIiLCJuYmYiOjE2Mzc5NTk1MjUsImV4cCI6MTYzNzk2NjcyNSwiaWF0IjoxNjM3OTU5NTI1fQ.fF3C6dx1IllskECRK-K6GJo2TvxOX2vBpGfn1ndJ-KI",
            "refreshToken": null
          } */
          
// -------------------------------------------

// check if user is logged in (based on valid token)
// TODO: make fn, ADD THIS SCRIPT TO ALL HTML FILES, test
function loggedIn (access_token)
{
    if(access_token === resp.accesstoken) // valid token
    {
        // ...
        return true;
    }

    alert("ERR: Invalid access token!")
    return false;
}



// TODO: make DELETE token fn,  test
