//Define HTML elements
const board = document.querySelector('.game-board');
const logo = document.querySelector('.logo');
let score = document.querySelector('.score');
let highScore = document.querySelector('.highscore');
//Displayed buttons
const up = document.querySelector('.up-button');
const down = document.querySelector('.down-button');
const left = document.querySelector('.left-button');
const right = document.querySelector('.right-button');

//Define HTML variables
let snake = [{x:10, y:10}];
let gridSize = 20;  // total area of the game-board -->gridSize*gridSize
let food = generateFood();
let direction = 'right'; //To move the snake
let gameInterval; // For to maintain game speed iguess
let gameSpeedDelay = 300;
let gameStarted = false ;
let scoreText = 0;
let highScoreText = 0;


//To play Game

document.addEventListener('dblclick', () => {
    startGame();
})
up.addEventListener('click',() => {
    direction = 'up';
})
down.addEventListener('click',() => {
    direction = 'down';
})
left.addEventListener('click',() => {
    direction = 'left';
})
right.addEventListener('click',() => {
    direction = 'right';
})

//And
//To give direction to the snake from the keyboard
document.addEventListener('keydown',handleKeyPress);


//Generate food-->It needs to be random
function generateFood(){
    const x = Math.floor(Math.random()*gridSize)+1;
    const y = Math.floor(Math.random()*gridSize)+1;
    return {x,y};
}

//To draw snake and food on the board
function draw(){
    if(gameStarted){
        board.innerHTML ='';
    logo.style.display = 'none';
    drawSnake();
    drawFood();
    }
}

function drawSnake(){
    snake.forEach((segment) => {
        let snakeElement = createGameElement('div','snake');
        setPosition(snakeElement, segment);
        board.appendChild(snakeElement);
    });
}

function drawFood(){
    let foodElement = createGameElement('div','food');
    setPosition(foodElement,food);
    board.appendChild(foodElement);
}

//Creating HTML elements in the game board
function createGameElement(tag,className){
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

//To set position in the game board.i.e x and y value
//It uses the value(object) in the array snake (values x and y) to set position(at first the starting position in x=10 and y=10)
function setPosition(tag,position){
    tag.style.gridColumn = position.x;
    tag.style.gridRow = position.y;
}

//Testing draw function
//draw();


//Now we need to move the snake 
function move(){
    const head = {...snake[0]};
    switch (direction) {
        case 'right':
            head.x++;
            break;
        case 'left':
            head.x--;
            break;
        case 'up':
            head.y--;
            break;
        case 'down':
            head.y++;
            break;
    }

    // snake.unshift(head);//puts a new object at snake[0] with new position
    // snake.pop(); // deletes the last position element for eg: at first it deletes snake[1];

    //Refinement to increase length if eats food
    snake.unshift(head);

    if(head.x === food.x && head.y===food.y){
        clearInterval(gameInterval);
        food = generateFood();
        gameInterval = setInterval(() => {
            move();
            checkCollision();
            draw();
            updateScores();
        },gameSpeedDelay);
    }else {
        snake.pop();
    }
}

// //Testing move function
// setInterval(() => {
//     move(); //first move the snake
//     draw(); //then draw new element
// },1000);
// //success


//now to create a function that starts a game
function startGame(){
    gameStarted = true;
    clearInterval(gameInterval);
    gameInterval = setInterval(() => {
            move(); //first move the snake
            checkCollision();//check the collision
            draw();
            updateScores(); //then draw new element
    },gameSpeedDelay);
}

 

// //To give direction to the snake from the keyboard
// document.addEventListener('keydown',handleKeyPress);

function handleKeyPress(event){ 
    if(event.key === ' ' ||
    event.code === 'Space'){
        startGame();
    }
    switch (event.key) {
        case 'ArrowUp':
            direction='up';
            break;
        case 'ArrowDown':
            direction='down';
            break;
        case 'ArrowLeft':
            direction='left';
            break;
        case 'ArrowRight':
            direction='right';
            break;
    }
    if(event.key === 'Escape'){
        resetGame();
    }
}


//To check collision with itself or the walls
function checkCollision(){
    const head = snake[0];
    if(head.x < 1 || head.x > gridSize || head.y < 1 || head.y > gridSize ){
        updateHighScore();
        resetGame();
    }
    
    for(let i =1; i< snake.length; i++){
        if(head.x === snake[i].x && head.y === snake[i].y){
            updateHighScore(); 
            resetGame();
        }
    }
}

//stopGame and resetGame are kinda different but works together
function stopGame(){
    clearInterval(gameInterval);
    gameStarted = false;
    logo.style.display = 'flex';
}

function resetGame(){
    stopGame();
    snake = [{x:10,y:10}];
    direction = 'right';
    gameSpeedDelay= 200;
    food = generateFood();
}


//Now to update the scores
function updateScores(){
    scoreText = snake.length-1;
    score.innerHTML = scoreText.toString().padStart(3,0);
    if(scoreText > highScoreText){
        highScoreText = scoreText;
    }
}

//at the end we need to update the high score
function updateHighScore(){
    highScore.innerHTML = highScoreText.toString().padStart(3,0);
    console.log(highScore);
}




