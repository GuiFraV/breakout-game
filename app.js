const grid = document.querySelector('.grid');
const blockWidth = 100;
const blockHeight = 20;
const boardWith = 570;
const ballDiameter = 20;
const boardHeight = 300;
let timerId;
let xDirection = 2;
let yDirection = 2;

const userStart = [230, 10]; 
let currentPosition = userStart;

const ballStart = [270, 40];
let ballCurrentPosition = ballStart;

class Block {
    constructor(xAxis, yAxis){
        this.bottomLeft = [xAxis, yAxis];
        this.bottomRight = [xAxis + blockWidth, yAxis];
        this.topLeft = [xAxis, yAxis + blockHeight];
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight];
    }
}

const blocks = [
    new Block(10, 27),
    new Block(120, 27),
    new Block(230, 27),
    new Block(340, 27),
    new Block(450, 27),
    new Block(10, 60),
    new Block(120, 60),
    new Block(230, 60),
    new Block(340, 60),
    new Block(450, 60),
    new Block(10, 92),
    new Block(120, 92),
    new Block(230, 92),
    new Block(340, 92),
    new Block(450, 92),


]


function addBlock() {
    
    for(let i = 0; i < blocks.length; i++){
        const block = document.createElement('div');
        block.classList.add('block');
        block.style.left = blocks[i].bottomLeft[0] + 'px';
        block.style.top = blocks[i].bottomLeft[1] + 'px';
        grid.appendChild(block);
    }
}

addBlock();

const user = document.createElement('div');
user.classList.add('user');
drawUser();
grid.appendChild(user);

function drawUser() {
    user.style.left = currentPosition[0] + 'px';
    user.style.bottom = currentPosition[1] + 'px';
}

function drawBall(){
    ball.style.left = ballCurrentPosition[0] + 'px';
    ball.style.bottom = ballCurrentPosition[1] + 'px';
}

function moveUser(e) {
    switch(e.key){
        case 'ArrowLeft':
            if(currentPosition[0] > 0){
                currentPosition[0] -= 10;
                drawUser();
            }
            break;
        case 'ArrowRight':
            if(currentPosition[0] < boardWith - blockWidth){
                currentPosition[0] += 10;
                drawUser();
            }
            break;
    }
}

document.addEventListener('keydown', moveUser);

const ball = document.createElement('div');
ball.classList.add('ball');
drawBall();
grid.appendChild(ball);

function moveBall(){
    ballCurrentPosition[0] += xDirection;
    ballCurrentPosition[1] += yDirection;
    drawBall();
    console.log(ballCurrentPosition);
}

timerId = setInterval(moveBall, 30);

function checkForCollisions(){
    if(ballCurrentPosition[0] >= (boardWith - ballDiameter) || ballCurrentPosition[1] >= (boardHeight - ballDiameter)){
        changeDirection();
    }
}

function changeDirection(){
    if(xDirection === 2 && yDirection === 2){
        xDirection = -2;
        return;
    }
    
    if(xDirection === -2 && yDirection === 2){
        yDirection = -2;
        return;
    }
    
    if(xDirection === -2 && yDirection === -2){
        xDirection = 2;
        return;
    }
    
    if(xDirection === 2 && yDirection === -2){
        yDirection = 2;
        return;
    }
}

//how to make changedirection when there are a colision ?