// By Marcus Chan 
function searchFunction(){
  //get input
  let input = document.getElementById("searchInput").value.toUpperCase();
  //collect all elements in displayBox class
  let plants = document.getElementsByClassName("displayBox");

  for(let i = 0; i < plants.length; i++){
    //get header element
    let header = plants[i].getElementsByTagName("h3")[0];
    
    //if theres a match, display otherwise dont
    if(header.innerHTML.toUpperCase().indexOf(input) > -1){
      plants[i].style.display = "";
    }else{
      // Otherwise, hide the displayBox
      plants[i].style.display = "none";
    }
  }
}

// Define prices
const flowerPrices = {
  rose: 7.99,
  tulip: 3.99,
  lavender: 9.99,
  sunflower: 12.99,
  succulent: 4.99,
  lily: 5.99,
  orchid: 11.99,
  carnation: 10.99,
  monstera: 29.99,
  azalea: 12.99,
  paradise: 29.99,
  cactus: 4.99,
  hydrangea: 19.99,
};

//if cart has not been initiallized, create the item
if (sessionStorage.getItem("cartCost") == null) {
  sessionStorage.setItem("cartCost", 0);
  let allItems = {
    rose: 0,
    tulip: 0,
    lavender: 0,
    sunflower: 0,
    succulent: 0,
    lily: 0,
    orchid: 0,
    carnation: 0,
    monstera: 0,
    azalea: 0,
    paradise: 0,
    cactus: 0,
    hydrangea: 0,
  };
  sessionStorage.setItem("cartItems", JSON.stringify(allItems));
}

function totalCost(item) {
  let itemNo = document.getElementById(item + "Items");
  // Retrieve cartCost
  let cartCost = parseFloat(sessionStorage.getItem("cartCost"));
  // Retrieve cartItems object
  let cartItemsJSON = sessionStorage.getItem("cartItems");
  let cartItems = JSON.parse(cartItemsJSON);
  if (itemNo.value > 0) {
    // Get cost and add it to the cart total cost
    let cost = flowerPrices[item] * Number(itemNo.value);
    cartCost += cost;
    sessionStorage.setItem("cartCost", cartCost);
    cartItems[item] += Number(itemNo.value);
    // Alert customer
    alert(
      `Added ${itemNo.value} x ${item.charAt(0).toUpperCase() +
        item.slice(1)}(s) to Cart\nYour total cost is: $${cartCost.toFixed(2)}`
    );
    // Reset itemNo value and update cartItems object
    itemNo.value = "";
    sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
  }
}
