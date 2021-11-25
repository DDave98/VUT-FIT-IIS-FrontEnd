






// --------------------------------------------- Conference Modal Boxes (= popup window) -----------------------------------------------

// NOT YET FUNCTIONAL

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn1 = document.getElementById("B1");
var btn2 = document.getElementById("B2");
var btn3 = document.getElementById("B3");
var btn4 = document.getElementById("B4");
var btn5 = document.getElementById("B5");
var btn6 = document.getElementById("B6");
var btn7 = document.getElementById("B7");
var btn8 = document.getElementById("B8");
var btn9 = document.getElementById("B9");
var btn10 = document.getElementById("B10");
var btn11 = document.getElementById("B11");
var btn12 = document.getElementById("B12");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn1.onclick = function() 
{ modal.style.display = "block";}

btn2.onclick = function() 
{ modal.style.display = "block";}

btn3.onclick = function() 
{ modal.style.display = "block";}

btn4.onclick = function() 
{ modal.style.display = "block";}

btn5.onclick = function() 
{ modal.style.display = "block";}

btn6.onclick = function() 
{ modal.style.display = "block";}

btn7.onclick = function() 
{ modal.style.display = "block";}

btn8.onclick = function() 
{ modal.style.display = "block";}

btn9.onclick = function() 
{ modal.style.display = "block";}

btn10.onclick = function() 
{ modal.style.display = "block";}

btn11.onclick = function() 
{ modal.style.display = "block";}

btn12.onclick = function() 
{ modal.style.display = "block";}

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
