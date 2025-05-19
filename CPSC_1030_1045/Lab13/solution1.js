//////////////Solution 1//////////////////////
function calculateTip(){
    let initial = document.getElementById("amount").value;
    let result = document.getElementById("result");
    result.innerHTML = initial * 1.2;
}
//////////////Solution 2//////////////////////
function changeColorY(){
    document.body.style.backgroundColor = "lightyellow";
}
function changeColorG(){
    document.body.style.backgroundColor = "lightgreen";
}
//////////////Solution 3//////////////////////
function changeDegrees(){
    var tempF = prompt("Script Prompt\nEnter Fahrenheit temperature");
    let tempC = (tempF - 32) * (5/9);
    alert("Farenheit temperature is " + tempF + "\n Celsius temperature is " + tempC);
}
//////////////Solution 4//////////////////////
function add(){
    //+is parseInt shortcut
    let num1 = +document.getElementById("number1").value;
    let num2 = +document.getElementById("number2").value;
    let sum = num1 + num2;
    document.getElementById("result2").value = sum;
}
function sub(){
    //+is parseInt shortcut
    let num1 = +document.getElementById("number1").value;
    let num2 = +document.getElementById("number2").value;
    let sum = num1 - num2;
    document.getElementById("result2").value = sum;
}
function mul(){
    //+is parseInt shortcut
    let num1 = +document.getElementById("number1").value;
    let num2 = +document.getElementById("number2").value;
    let sum = num1 * num2;
    document.getElementById("result2").value = sum;
}
function div(){
    //+is parseInt shortcut
    let num1 = +document.getElementById("number1").value;
    let num2 = +document.getElementById("number2").value;
    let sum = num1 / num2;
    document.getElementById("result2").value = sum;
}
function clearForm(){
    document.getElementById("number1").value = "";
    document.getElementById("number2").value = "";
    document.getElementById("result2").value = "";
}