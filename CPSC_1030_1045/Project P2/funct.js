let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let colorList = [];
let cycleStatus = false;

//brush object
const brush = {
    xPos: undefined,
    yPos: undefined,
    size: 1,
    drawingEnabled: false,
};

function draw(event) {
    let x = event.offsetX;
    let y = event.offsetY;

    if (brush.drawingEnabled === true) {
        ctx.strokeStyle = document.getElementById("colorPicker").value;
        ctx.lineWidth = brush.size;

        if (brush.xPos === undefined || brush.yPos === undefined) {
            ctx.beginPath();
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
            ctx.stroke();
        }
        brush.xPos = x;
        brush.yPos = y;
    }
}

//remember function --> adds colors to array
function rememberMe() {
    let color = document.getElementById("colorPicker").value;
    colorList.push(color);
    document.getElementById("colorList").innerHTML = "Color List: " + colorList;
}

//cycle colors
function cycle() {
    let listCount = 0;
    const interval = setInterval(() => {
        if (listCount >= colorList.length)
            listCount = 0;
        if (cycleStatus == false)
            clearInterval(interval);
        else {
            ctx.fillStyle = colorList[listCount];
            ctx.fillRect(0, 0, 600, 600);
            listCount += 1;
        }
    }, 2000);
}


document.getElementById("canvas").addEventListener("mousedown", function () {
    brush.drawingEnabled = true;
});

//mouse up --> xPos and yPos == undefined
document.getElementById("canvas").addEventListener("mouseup", function () {
    brush.drawingEnabled = false;
    brush.xPos = undefined;
    brush.yPos = undefined;
});
document.getElementById("canvas").addEventListener("mousemove", draw);

document.getElementById("rememberMe").addEventListener("click", rememberMe);

//reset
document.addEventListener("keydown", function (event) {
    if (event.code == "KeyR") {
        ctx.clearRect(0, 0, 600, 600);
    }
});
//clear colorList
document.addEventListener("keydown", function (event) {
    if (event.code == "KeyE") {
        colorList = [];
        document.getElementById("colorList").innerHTML = "No colors stored!";
    }
});
//brush size
document.addEventListener("keydown", function (event) {
    if (event.code == "ArrowDown") {
        if (brush.size >= 1) brush.size -= 1;
    }
});
document.addEventListener("keydown", function (event) {
    if (event.code == "ArrowUp") {
        brush.size += 1;
    }
});

document.getElementById("cycle").addEventListener("click", function () {
    cycleStatus = true;
    if (colorList.length < 1)
        alert("The color list is empty");
    else
        cycle();
});
document.getElementById("stop").addEventListener("click", function () {
    cycleStatus = false;
});
