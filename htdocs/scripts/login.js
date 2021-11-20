// button click event
document.getElementById("btn").onclick = function() {formData(event)};              // login
document.getElementById("btn2").onclick = function() {formDataREG(event)};          // register

// ----------------------------------------------------- for LOGIN ------------------------------------------------------------
// Handling submitions from form (w\ FormData API):     
function formData(event) 
{
    // prevents a page refresh
    event.preventDefault();
  
    const data = new FormData(document.getElementById("formId"));
  
    // passing 'entries' method output to 'Object.fromEntries', which returns a plain js object -> to use 'JSON.stringify' later
    const usrdata = Object.fromEntries(data.entries());


    //(for LOG IN): array in ' name="checkbox" '  contains all checked values (if there are any: "on" or [none])
    usrdata.checkbox = data.getAll("checkbox");


    // take data from form ("group" class selection)
    var jsonData = document.querySelector('.group');               

    // converting values to JSON (= ready to be sent to a server)
    jsonData = JSON.stringify(usrdata, null, 2);                    


    //check email format (regex):
    //TODO


  }
  



  // ---------------------------------------------- for SIGN UP (= same princip as with login fn) ---------------------------------------
  function formDataREG(event) 
{
    event.preventDefault();
  
    const data = new FormData(document.getElementById("formIdREG"));
  
    const usrdataR = Object.fromEntries(data.entries());

    var jsonDataR = document.querySelector('.group2');               

    jsonDataR = JSON.stringify(usrdataR, null, 2);                   



    //check email format (regex):
    //TODO

    //compare password strings:
    //TODO
  }
  




// __________________________________________________________________________________________________________________________________________
// send to server:
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