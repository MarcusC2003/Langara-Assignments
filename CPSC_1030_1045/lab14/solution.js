function selectSports(){
    let task1 = document.getElementsByName("task1");
    let para1 = document.getElementById("para1");
    let sports = "";
    for (let i = 0; i < task1.length; i++) {
        if (task1[i].checked) {
            sports += task1[i].value + "<br>";
        }
    }
    para1.innerHTML = sports;
}
function selectColors(){
    let task2 = document.getElementById("task2")
    let option = task2.selectedOptions[0].value;
    let t2_h4 = document.getElementById("t2_h4");

    t2_h4.innerHTML = "You selected the color: " + option;

}