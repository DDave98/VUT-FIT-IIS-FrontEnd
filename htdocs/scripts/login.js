// button click event:
document.getElementById("btn").onclick = function () { requiredField() };              // log in
document.getElementById("btn2").onclick = function () { requiredFieldREG() };          // register



// --------------------------------------------------- Checking that the "required" fields are filled ----------------------------------------------
// For LOG IN:

function requiredField() 
{
  var empty = document.forms["form-login"]["email"].value;
  if (empty == "") 
  {
    alert("Please fill in all fields!");
    return false;
  }

  empty = document.forms["form-login"]["password"].value;
  if (empty == "") 
  {
    alert("Please fill in all fields!");
    return false;
  }

  // call fn to gather and work with the data
  formData(event);

  return true;
}




// For SIGN UP:
function requiredFieldREG() 
{
  var empty = document.forms["form-reg"]["email"].value;
  if (empty == "") 
  {
    alert("Please fill in all fields!");
    return false;
  }

  empty = document.forms["form-reg"]["username"].value;
  if (empty == "") 
  {
    alert("Please fill in all fields!");
    return false;
  }

  empty = document.forms["form-reg"]["familyname"].value;
  if (empty == "") 
  {
    alert("Please fill in all fields!");
    return false;
  }

  empty = document.forms["form-reg"]["password"].value;
  if (empty == "") 
  {
    alert("Please fill in all fields!");
    return false;
  }

  //-----
  empty = document.forms["form-reg"]["password_check"].value;
  if (empty == "") 
  {
    alert("Please fill in all fields!");
    return false;
  }

  // call fn to gather and work with the data
  formDataREG(event);

  return true;
}





// ------------------------------------------------- Handling submitions from form (using FormData API) ---------------------------------------------------
// For LOG IN:

function formData(event)
{
  // prevents a page refresh
  event.preventDefault();

  const data = new FormData(document.getElementById("formId"));

  // passing 'entries' method output to 'Object.fromEntries', which returns a plain js object -> to use 'JSON.stringify' later
  const usrdata = Object.fromEntries(data.entries());



  //check email format (if ok = proceed with turning into json):
  if (emailValidate(usrdata.email))
  {
    //array in ' name="checkbox" '  contains all checked values (if there are any: "on" or [none]) 
    if (data.getAll("keepSingnedIn").length === 0)
    {
      usrdata.keepSingnedIn = false;
    }
    else
    {
      usrdata.keepSingnedIn = true;
    }


    // take data from form ("group" class selection)
    var jsonData = document.querySelector('.group');

    // converting values to JSON (= ready to be sent to a server)
    jsonData = JSON.stringify(usrdata, null, 2);


    // create and send a request:
    req("https://iis-proj.herokuapp.com/api/Auth/singin", jsonData);
  }

  else 
    {
      alert("Passwords do not match!");
    }
}




// For SIGN UP:
function formDataREG(event) 
{
  event.preventDefault();

  const data = new FormData(document.getElementById("formIdREG"));
  const usrdataR = Object.fromEntries(data.entries());

  //check email format (if ok = proceed with turning into json):
  if (emailValidate(usrdataR.email))
  {
    if (String(usrdataR.password) === String(usrdataR.password_check)) 
    {
      //remove password_check before making the json
      delete usrdataR.password_check;

      var jsonDataR = document.querySelector('.group2');

      jsonDataR = JSON.stringify(usrdataR, null, 2);


      // create and send a request:
      req("https://iis-proj.herokuapp.com/api/Auth/singup", jsonDataR);
    } 

    else 
    {
      alert("Passwords do not match!");
    }
  }
}





// --------------------------------------------------------- Checking for valid email format (using regex)------------------------------------------------------
function emailValidate(mail)
{
  const format = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (format.test((String(mail))))
    {
      return (true)
    }
  else
    {
      alert("You have entered an invalid email address!")
      return (false)
    }
}






// ----------------------------------------------- Sending + receiving data (in JSON format) via POST method (using AJAX) -----------------------------------------------


function req(url, jdata)
{
  // Creating an XMLHttpRequest object (assigned to a var)
  var request = new XMLHttpRequest();


  //-----

  request.onreadystatechange = function () 
  {
    // the onreadystatechange event is triggered four times (1-4) -> skip to 4. = the request had been sent
    if (request.readyState === 4) 
    {
      // HTTP 200 OK success status response code = the request has succeeded
      if (request.status === 200) 
      {
        // turn json to js object to be able to use the data (save the response's body content to a var)
         resp = JSON.parse(this.response);

        // secondary check for SIGN UP response format
        if (resp === false) 
        {
          alert("There was an ERROR! Please try again!");
          return (false)
        }


        /* Example response (= resp): 

          {
            "login": "fse@ged.hfyjht",
            "lvl": "user",
            "expire": "2021-11-26T22:45:25.9514028Z",
            "accesstoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImZzZUBnZWQuaGZ5amh0Iiwicm9sZSI6InVzZXIiLCJuYmYiOjE2Mzc5NTk1MjUsImV4cCI6MTYzNzk2NjcyNSwiaWF0IjoxNjM3OTU5NTI1fQ.fF3C6dx1IllskECRK-K6GJo2TvxOX2vBpGfn1ndJ-KI",
            "refreshToken": null
          } */ 
          
        // pass / check token:
        loggedIn (resp.accesstoken);



        alert("Success! You may proceed.");

        // redirect to Main page (simulating user click):
        window.location.replace = "http://iss2021.infinityfreeapp.com/";

      }

      else
      {
        alert("There was an ERROR! Please try again!");
        return (false)
      }
    }
  }

  //----------

  // opening a new connection (using POST request) 
  request.open("POST", url, true);

  request.setRequestHeader("Content-Type", "application/json");
  
  // awnd request to server
  request.send(jdata);
}





// -------------------------------------------------------------------------------------------------------------------------------------------
