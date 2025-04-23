let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

//cat image 1
let catImage = new Image();
catImage.src = "images/cat.png";
//cat image 2
let catDeadImage = new Image();
catDeadImage.src = "images/cat_dead.png";

//person running left
let playerLeft = new Image();
playerLeft.src = "images/run_left.png";

//person standing still
let playerStill = new Image();
playerStill.src = "images/still.png";

//person running right
let playerRight = new Image();
playerRight.src = "images/run_right.png";

//person catch cat
let playerCatch = new Image();
playerCatch.src = "images/catch.png";



//global variables
canvasWidth = window.innerWidth;
canvasHeight = window.innerHeight;
canvasWidthDifference = canvasWidth / 800.0
canvasHeightDifference = canvasHeight / 900.0


class Cat {
    constructor() {
        this.sizeX = 100 * canvasWidthDifference;
        this.sizeY = 70 * canvasHeightDifference;
        this.x = ((Math.random() * (canvasWidth - this.sizeX)) + 20 * canvasWidthDifference);
        this.y = 0;
        this.speed = (Math.random() * (3 * canvasHeightDifference)) + 1;
        this.exists = true;
        this.image = catImage;
        this.collision = true;
    }
    draw() {
        ctx.drawImage(this.image, this.x, this.y, this.sizeX, this.sizeY);
    }
    reDraw() {
        this.y = this.y + this.speed;
        ctx.drawImage(this.image, this.x, this.y, this.sizeX, this.sizeY);
    }
    dead() {
        this.image = catDeadImage;
    }
}
class Box {
    constructor() {
        this.sizeX = 50 * canvasWidthDifference;
        this.sizeY = 50 * canvasHeightDifference;
        this.x = ((Math.random() * (canvasWidth - this.sizeX)) + 20 * canvasWidthDifference);
        this.y = 0;
        this.speed = (Math.random() * (3 * canvasWidthDifference)) + 1 * canvasWidthDifference;
        this.exists = true;
        this.collision = true;
    }

    draw() {
        ctx.fillStyle = "beige";
        ctx.beginPath()
        ctx.rect(this.x, this.y, this.sizeX, this.sizeY);
        ctx.stroke();
        ctx.fill();
    }
    reDraw() {
        ctx.fillStyle = "beige";
        ctx.beginPath()
        ctx.rect(this.x, this.y, this.sizeX, this.sizeY);
        ctx.stroke();
        ctx.fill();
        this.y += this.speed;
    }
}

class Player {
    constructor() {
        this.sizeX = 110 * canvasWidthDifference;
        this.sizeY = 150 * canvasHeightDifference;
        this.x = ((canvasWidth / 2) - this.sizeX / 2);
        this.y = (canvasHeight - this.sizeY - 10 * canvasHeightDifference);
        this.speed = 8 * canvasHeightDifference;
        this.image = playerStill;
    }

    draw() {
        ctx.drawImage(this.image, this.x, this.y, this.sizeX, this.sizeY);
    }

    setDefault() {
        this.image = playerStill;;
    }
    moveRight() {
        if ((this.x + this.sizeX + this.speed) <= canvasWidth)
            this.x += this.speed;
        this.image = playerRight;
    }
    moveLeft() {
        if ((this.x - this.speed) >= 0)
            this.x -= this.speed;
        this.image = playerLeft;
    }
    animateCatch() {
        this.image = playerCatch;;
    }
    increaseSpeed() {
        if (this.speed + 2 <= 16)
            this.speed += 2;
    }
    decreaseSpeed() {
        if (this.speed - 2 >= 16)
            this.speed -= 2;
    }
}

const scoreboard = {
    score: 0,
    lives: 9,
    addPoint: function () {
        this.score += 1;
    },
    death: function () {
        if (this.lives > 0)
            this.lives -= 1;
    },
    draw: function () {
        ctx.fillStyle = "black"
        ctx.font = "25px Arial";
        ctx.fillText("Cats Saved: " + this.score, 10 * canvasWidthDifference, 90 * canvasHeightDifference);
        ctx.fillText("Lives: " + this.lives, 10 * canvasWidthDifference, 110 * canvasHeightDifference);
    },
};

let updateInterval;
let addCat1;
let addCat2;
let player;
let catArray = [];
let boxArray = []
let currentAction = "Still";

function removeCats() {
    catArray = catArray.filter(cat => cat.exists == true);
}
function removeBoxes() {
    boxArray = boxArray.filter(cat => cat.exists == true);
}

function addCat() {
    let cat = new Cat();
    catArray.push(cat);
    cat.draw();
}
function addBox() {
    let box = new Box();
    boxArray.push(box);
    box.draw();
}


function startGame() {
    console.log("Starting the game...");
    window.onload = () => {
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        player = new Player();
        player.draw();
        updateGame();
        addCat1 = setInterval(addCat, 2000);
        addCat2 = setInterval(addCat, 3000);
        addBox1 = setInterval(addBox, 3000);
    }
}

function checkMovement(event) {
    switch (event.code) {
        case "KeyD":
            currentAction = "Right";
            break;
        case "KeyA":
            currentAction = "Left";
    }
}
function changeSpeed(event) {
    switch (event.code) {
        case "ArrowUp":
            player.increaseSpeed();
            break;
        case "ArrowDown":
            player.decreaseSpeed();
            break;
    }
}

function updateGame() {
    console.log("Redrawing...");
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    player.draw();
    switch (currentAction) {
        case "Right":
            player.moveRight();
            break;
        case "Left":
            player.moveLeft();
            break;
        case "Still":
            if (player.currentAction != "Catch") {
                player.setDefault();
            }
            break;
    }
    for (let cat of catArray) {
        if (checkCollision(player, cat) && cat.collision == true) {
            cat.exists = false;
            scoreboard.addPoint();
            player.animateCatch();
            currentAction = "Catch";
        }
        //if cat hits the ground --> switchd to dead cat image for 3 sec 
        else if (cat.y >= canvasHeight - cat.sizeY) {
            cat.dead();
            if (cat.collision == true) {
                scoreboard.death();
            }
            cat.collision = false;
            setTimeout(() => { cat.exists = false }, 3000);
            cat.draw();
        } else {
            cat.reDraw();
        }
    }
    for (let box of boxArray) {
        if (checkCollision(player, box) && box.collision == true) {
            scoreboard.lives = 0;
            box.draw();
        }
        else if (box.y >= canvasHeight - box.sizeY) {
            box.collision = false;
            setTimeout(() => { box.exists = false }, 2000);
            box.draw();
        } else {
            box.reDraw();
        }
    }

    scoreboard.draw();
    removeCats()
    removeBoxes();
    if (scoreboard.lives <= 0) {
        clearInterval(updateInterval);
        clearInterval(addCat1);
        clearInterval(addCat2);
        clearInterval(addBox1);
        // clearInterval(addBox2);
        ctx.font = "60px Arial";
        ctx.fillText("YOU LOST!!!", 310 * canvasWidthDifference, 400 * canvasHeightDifference);
    } else {
        window.requestAnimationFrame(updateGame);
    }
}

//check collision
function checkCollision(obj1, obj2) {
    //obj1 dimensions
    obj1Left = obj1.x + 20;
    obj1Right = obj1.x + obj1.sizeX - 5;
    obj1Top = obj1.y + 5;
    obj1Bottom = obj1.y + obj1.sizeY;

    //obj2 dimensions
    obj2Left = obj2.x;
    obj2Right = obj2.x + obj2.sizeX;
    obj2Top = obj2.y - 5;
    obj2Bottom = obj2.y + obj2.sizeY;

    if (obj1Left < obj2Right && obj1Right > obj2Left && obj1Top < obj2Bottom && obj1Bottom > obj2Top
    ) {
        return true;
    }
    return false;
}
startGame();


//event handlers
document.addEventListener("keydown", checkMovement);
document.addEventListener("keydown", changeSpeed);
document.addEventListener("keyup", () => { currentAction = "Still" });
document.addEventListener("keydown", (event) => { if (event.code == "KeyR") location.reload() });
window.addEventListener("resize", function () { location.reload(); });
