// button click event:
document.getElementById("btn").onclick = function () { requiredField() };              // log in
document.getElementById("btn2").onclick = function () { requiredFieldREG() };          // register



// --------------------------------------------------- Checking that the "required" fields are filled ----------------------------------------------
// For LOG IN:

function requiredField() 
{
  var empty = document.forms["form-login"]["email"].value;
  if (empty == "") {
    alert("Please fill in all fields!");
    return false;
  }

  empty = document.forms["form-login"]["password"].value;
  if (empty == "") {
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
  if (empty == "") {
    alert("Please fill in all fields!");
    return false;
  }

  empty = document.forms["form-reg"]["username"].value;
  if (empty == "") {
    alert("Please fill in all fields!");
    return false;
  }

  empty = document.forms["form-reg"]["familyname"].value;
  if (empty == "") {
    alert("Please fill in all fields!");
    return false;
  }

  empty = document.forms["form-reg"]["password"].value;
  if (empty == "") {
    alert("Please fill in all fields!");
    return false;
  }

  //-----
  empty = document.forms["form-reg"]["password_check"].value;
  if (empty == "") {
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











// ______________________________________________________________________________________________________________________________________
// sending JSON (request) to server:
//TODO





// receiving JSON (answer) from server:
// ( NOTE: must turn back to js object to be able to use the data)
//TODO















// receiveng requests:
/*

// Create a request variable and assign a new XMLHttpRequest object to it.
var request = new XMLHttpRequest()

// Open a new connection, using the POST request on the URL endpoint
request.open('POST', 'http://iis-proj.herokuapp.com/', true)

request.onload = function ()
{
  // Begin accessing JSON data here

    var data = JSON.parse(this.response)


    data.forEach(movie => {
    // Log each movie's title
    console.log(movie.title)
    })

}

// Send request
request.send()

*/