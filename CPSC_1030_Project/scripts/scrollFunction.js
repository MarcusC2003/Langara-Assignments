// By Marcus Chan 

//displays the toTop button after the user scrolls 300px down
document.addEventListener("DOMContentLoaded", function(){
    upArrow = document.getElementById("uparrow");
    window.onscroll = function() {
      if(document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        upArrow.style.display = "block";
      }else{
        upArrow.style.display = "none";
      }
    };
  });

//scrolls back to the top of the page
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0; 
  }