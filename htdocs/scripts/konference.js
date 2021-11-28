
// ----------------------------------------------- button click event:

//Get the button that opens the modal:
document.getElementById("B1").onclick = function () { document.getElementById("myModal").style.display = "block"; popup () };     
document.getElementById("B2").onclick = function () { document.getElementById("myModal").style.display = "block"; popup () };     
document.getElementById("B3").onclick = function () { document.getElementById("myModal").style.display = "block"; popup () };     
document.getElementById("B4").onclick = function () { document.getElementById("myModal").style.display = "block"; popup () };     
document.getElementById("B5").onclick = function () { document.getElementById("myModal").style.display = "block"; popup () };     
document.getElementById("B6").onclick = function () { document.getElementById("myModal").style.display = "block"; popup () };     
document.getElementById("B7").onclick = function () { document.getElementById("myModal").style.display = "block"; popup () };     
document.getElementById("B8").onclick = function () { document.getElementById("myModal").style.display = "block"; popup () };     
document.getElementById("B9").onclick = function () { document.getElementById("myModal").style.display = "block"; popup () };     
document.getElementById("B10").onclick = function () { document.getElementById("myModal").style.display = "block"; popup () };     
document.getElementById("B11").onclick = function () { document.getElementById("myModal").style.display = "block"; popup () };     
document.getElementById("B12").onclick = function () { document.getElementById("myModal").style.display = "block"; popup () };        
 
// Reservation button:
document.getElementById("btnn").onclick = function () { requiredField_S() };              



// --------------------------------------- change header based on if there is a valid token:
loggedIn();


// -------------------------------------------------- Page Load - Filter ------------------------------------------------------
// TODO









// -------------------------------------------------- Slider Counter ------------------------------------------------------
// = in index.html (due to connection issues)






// --------------------------------------------- Conference Modal Boxes (= popup window) -----------------------------------------------
function popup () 
{
  // Get the modal
  var modal = document.getElementById("myModal");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];
  //---------

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() 
  {
    modal.style.display = "none";
  }


  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) 
  {
    if (event.target == modal) 
    {
      modal.style.display = "none";
    }
  }
}




// --------------------------------------------------- Checking that the "required" fields are filled ----------------------------------------------
// For LOG IN:

function requiredField_S() 
{
  empty = document.forms["form-res"]["jmeno"].value;
  if (empty == "") 
  {
    alert("Please fill in all fields!");
    return false;
  }

  empty = document.forms["form-res"]["prijmeni"].value;
  if (empty == "") 
  {
    alert("Please fill in all fields!");
    return false;
  }

  var empty = document.forms["form-res"]["login"].value;
  if (empty == "") 
  {
    alert("Please fill in all fields!");
    return false;
  }

  // call fn to gather and work with the data
  formData_S(event);

  return true;
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




// ------------------------------------------------- Handling submitions from form (using FormData API) ---------------------------------------------------
function formData_S(event) 
{
  
  event.preventDefault();

  const data = new FormData(document.getElementById("formRES"));
  const usrdataS = Object.fromEntries(data.entries());

  //check email format (if ok = proceed with turning into json):
  if (emailValidate(usrdataS.email))
  {
    // take data from form ("group" class selection) = user
    var userS = document.querySelector('.groupr');    
    
    // getting conference id = cid
    // TODO: get and add 'cid' (conference id), TEST!!! : 
    var cidS  ;
    
    // making the final object
    const jsonDataS = 
    {
      cid: cidS,
      pocet: 1,
      user: userS 
    };
    


    // converting values to JSON (= ready to be sent to a server)
    jsonDataS = JSON.stringify(usrdataS, null, 2);

    // create and send a request:
    reqS("https://iis-proj.herokuapp.com/api/guest/addNewRezervation", jsonDataS);
  }

  else 
  {
    alert("Passwords do not match!");
  }

  
}

// ----------------------------------------------- Sending + receiving data (in JSON format) -----------------------------------------------
// TODO: not tested!

function reqS(url, data) 
{  
  var requestS = new XMLHttpRequest();
  
  

  //-----

  requestS.onreadystatechange = function () 
  {
    if (requestS.readyState === 4) 
    {
      if (requestS.status === 200) 
      {


        // turn json to js object to be able to use the data (save the response's body content to a var)
         var respS = JSON.parse(this.response);

       
        alert("Your reservation was successful.");

        return respS;
      }

      else
      {
        alert("There was an ERROR! Please try again!");
        return (false)
      }
    }
  }

  //----------





  // opening a new connection (using PUT request) 
  request.open("PUT", url, true);
  request.setRequestHeader("Content-Type", "application/json");
  
  request.send(jdata);
  
}