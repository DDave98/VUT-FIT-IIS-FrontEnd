// ----------------------------------------------- button click event:             
 
// Reservation button:
document.getElementById("btnn").onclick = function () { requiredField_S() };   

// for Log Out:
document.getElementById("log_in").onclick = function () { logOUT() };  



// --------------------------------------- change header based on if there is a valid token:
loggedIn();


// -------------------------------------------------- Page Load - Filter ------------------------------------------------------

const baseURL = "https://iis-proj.herokuapp.com";
const elementSearch = document.getElementById("SearchFilter");
const dateFrom = document.getElementById("dateFrom");
const dateTo = document.getElementById("dateTo");
const free = document.getElementById("free");
const confLocation = document.getElementById("ElementLocation");
const prezCountSlider = document.getElementById("prezCountSlider");
var actualFilter = {};
var actualConfPages;
var NumOfPages = 0;

// metoda inicializuje filter
function InitFilter()
{
  console.log("init filter start");
  actualConfPages = {};

  $.ajax({
    url: baseURL + "/api/guest/getFilterValue",
    type: 'GET',
    contentType: 'application/json',
    success: function (response) {
      InitSlider(response.prezentationCount);
      console.log("init filter end");
      SetFilter();
    },
    error: function (error) {
        alert("nelze inicializovat filter");
    }
 });
}

function InitSlider(num)
{
  prezCountSlider.innerHTML = '<input  type="range" min="0" max="' + num + '" value="0" class="w-2/3 mt-3" id="range"><p> <span id="num"></span></p>';
  const slider = document.getElementById("range");
  const output = document.getElementById("num");
  output.innerHTML = slider.value;

  slider.oninput = function() 
  {
    output.innerHTML = this.value;
  }
}

function SetFilter()
{
  actualFilter =
  {
    "name": elementSearch.value == "" ? null : elementSearch.value,
    "available": false,
    "free": free.value == "on" ? false : true,
    "prezentationCount": Number(document.getElementById("range").value),
    "from": dateFrom.value == "" ? null : dateFrom.value,
    "to": dateTo.value == "" ? null : dateTo.value,
    "adress": confLocation.val == "" ? null : confLocation.value,
    "page": 1
  };
  actualConfPages = {};
  GetConfFiltred(1);
}

// metoda načte konference podle filtru
function GetConfFiltred(page)
{
  if(actualConfPages[page] != null) ShowConfPage(page);

  console.log("get page start");
  var filter = actualFilter;
  filter.page = page;

  $.ajax({
    url: baseURL + "/api/guest/getConfList",
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(filter),
    success: function (response) {
        console.log("conflist success");
        if(response != null)
        {
          actualConfPages[page] = response.conferences;
          InitCounter(response.pages);
          ShowConfPage(page);
        }
        else 
        {
          alert("nelze načíst konference");
        }
    },
    error: function (error) {
        
    }
 });

}

// funkce načte stránku
function ShowConfPage(page)
{
  if(NumOfPages < page) return;

  var container = document.getElementById("ConfStack");
  container.innerHTML = "";
  var counter = 0;
  var page = actualConfPages[page];

  for(i = 0; i < Object.keys(page).length; i++)
  {
    item = page[i];
    var id = "B"+counter;
    counter++;
    container.innerHTML += 
    `
    <button type="button" onclick="javascript:popupMymodal()">
    <div class="flex flex-col justify-between overflow-auto text-justify  transition-shadow duration-200 bg-white rounded shadow-xl group hover:shadow-2xl">
      <div class="p-5">
        <p class="mb-2 font-bold">` + item.nazev + `</p>
        <p class="text-sm leading-5 text-gray-900">Popis:` + item.popis + `</p>
        <p class="text-sm leading-5 text-gray-900">Tema:` + item.tema + `</p>
        <p class="text-sm leading-5 text-gray-900">Adresa:` + item.adresa + `</p>
        <p class="text-sm leading-5 text-gray-900">vstupne:` + item.vstupne + `</p>
      </div>
      <div class="w-full h-1 ml-auto duration-300 origin-left transform scale-x-0 bg-deep-purple-accent-400 group-hover:scale-x-100"></div>
    </div>
  </button>
  `
  };
}

function popupMymodal()
{
  document.getElementById('myModal').style.display = 'block';
  popup ();
}

// -------------------------------------------------- Slider Counter ------------------------------------------------------

function InitCounter(pages)
{
  NumOfPages = pages;
  var container = document.getElementById("PageNumCounter");
  container.innerHTML = "";

  for(i = 1; i <= NumOfPages; i++)
  {
    container.innerHTML +=
    `
    <button onclick="javascript:GetConfFiltred(`+i+`)" type="button" class="text-purple-500 bg-transparent border border-solid border-purple-500 hover:bg-purple-500 hover:text-white active:bg-purple-600 font-bold uppercase text-xs px-4 py-2 outline-none focus:outline-none mb-1 ease-linear transition-all duration-150">` + i +`</button>
    `;
  }
}


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
  requestS.open("PUT", url, true);
  requestS.setRequestHeader("Content-Type", "application/json");
  
  requestS.send(data);
  
}