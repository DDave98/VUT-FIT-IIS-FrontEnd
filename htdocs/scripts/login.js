// Handling submitions from form (w\ FormData API)     
// = logging values upon 'sign up'
function formData(event) 
{
    // prevents a page refresh
    event.preventDefault();
  
    const data = new FormData(event.target);
  
    // passing 'entries' method output to 'Object.fromEntries', which returns a plain js object -> to use 'JSON.stringify'
    const usrdata = Object.fromEntries(data.entries());


    // (for LOG IN) array in ' name="checkbox" '  containg all checked values (if there are any)
    usrdata.checkbox = data.getAll("checkbox");



    // take data from form area (class selection)
    const jsonData = document.querySelector('.group');

    // converting values to JSON (= ready to be sent to a server)
    jsonData.innerText = JSON.stringify(usrdata, null, 2);

  }
  

  const reformData = document.querySelector(".login-space");
  
  // on click call fn formData()
  reformData.addEventListener("submit", formData);


















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