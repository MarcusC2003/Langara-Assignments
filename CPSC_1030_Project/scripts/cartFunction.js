// By Marcus Chan 
console.log(sessionStorage.getItem("cartCost"));
//runs the customerDisplay and insertRow function on load
window.onload = function(){customerDisplay();insertRow()}; 

//Prices for Each flower 
const flowerPrices = {
    rose: 7.99,
    tulip: 3.99,
    lavender: 9.99,
    sunflower: 12.99,
    succulent: 4.99,
    lily:5.99,
    orchid: 11.99,
    carnation: 10.99,
    monstera: 29.99,
    azalea: 12.99,
    paradise: 29.99,
    cactus: 4.99,
    hydrangea:19.99
};

//displays empty cart message if cartCost is 0
//otherwise displays the page and hides the empty cart message
function customerDisplay(){
    if(sessionStorage.getItem("cartCost") == null || sessionStorage.getItem("cartCost") <= 0 ){
        document.getElementById("receipt").style.display = "none";
        document.getElementById("billing").style.display = "none";
    }else{
        document.getElementById("emptyHeader").style.display = "none";
    }
}

//inserts Rows to the table
function insertRow() {
  let table = document.getElementById("receipt");
  let totalCost = document.getElementById("totalCost");

  //gets the cartItems from session storage and turns them into an object
  let cartItemsString = sessionStorage.getItem('cartItems');
  let cartItems = JSON.parse(cartItemsString);
  let cartArr = Object.keys(cartItems);

    //loops through all the keys in cartArr
    //if key has a value greater than 0, add the row
    var newRow, remove, numCol, plantCol, costCol;
    for(let i = 0; i < cartArr.length; i++){
        if(cartItems[cartArr[i]] > 0){
            newRow = table.insertRow(1);
            remove = newRow.insertCell(0)
            numCol = newRow.insertCell(1);
            plantCol = newRow.insertCell(2);
            costCol = newRow.insertCell(3);
            //adds the remove button
            //set button name as the item name
            remove.innerHTML = `<input type="button" id="removeItem" name="${cartArr[i]}" onclick="removeRow('${cartArr[i]}')">`;
            numCol.innerHTML = cartItems[cartArr[i]];
            plantCol.innerHTML = cartArr[i];
            let costColString = "$" + (flowerPrices[cartArr[i]] * cartItems[cartArr[i]]).toFixed(2);
            costCol.innerHTML = costColString;
        }
    }
    //print total
    totalCost.innerHTML = "$" + parseFloat(sessionStorage.getItem("cartCost")).toFixed(2);
}

//removes a row from the table
function removeRow(name){
    if(confirm("Would you like to remove " + name + "(s) from your cart?")){
        console.log(totalCost);
        //get object from session storage
        let cartItemsString = sessionStorage.getItem('cartItems');
        let cartItems = JSON.parse(cartItemsString);

        //get cart cost
        let cartCost = parseFloat(sessionStorage.getItem('cartCost'));
        //get cost of items
        let itemCost = cartItems[name] * Number(flowerPrices[name]);
        
        //subtract the removed cost from cart and set the new cartCost
        sessionStorage.setItem("cartCost", cartCost - itemCost);
        console.log(sessionStorage.getItem('cartCost'));
        cartItems[name] = 0;
        sessionStorage.setItem('cartItems', JSON.stringify(cartItems));

        //get the name of the deleted row removes it from table
        let rowIndex = document.getElementsByName(name)[0].parentNode.parentNode.rowIndex;
        document.getElementById("receipt").deleteRow(rowIndex);
        //reload page
        location.reload();
    }
}
//submits form and resets cart
function submitFunct(){
    let cartItemsString = sessionStorage.getItem('cartItems');
    let cartItems = JSON.parse(cartItemsString);
    let cartArr = Object.keys(cartItems);
    //resets cartItems in session storage
    for(let i = 0; i < cartArr.length; i++){
        cartArr[i] = 0;
    }
    sessionStorage.setItem('cartCost', 0);
    sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
    //sends customer to the thank you page
    window.location.href="paymentrecieved.html";
}
