// button click event
document.getElementById("btn").onclick = function() {formData(event)};


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


                                                                   //CHANGES LOG ()

    // take data from form ("group" class selection)
    var jsonData = document.querySelector('.group');               // previosly: const...

    // converting values to JSON (= ready to be sent to a server)
    jsonData = JSON.stringify(usrdata, null, 2);                    // previously: jsonData.innerText....




    //compare password strings:
    //TODO
  }
  
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