const board = document.querySelector(".board");
const startButton = document.querySelector(".start-game");
const modal = document.querySelector(".modal");
const startGame = document.querySelector(".start-game");
const gameOver = document.querySelector(".game-over");
const buttonRestart = document.querySelector(".btn-restart");

const highScoreElement = document.querySelector("#high-score");
const socreElement = document.querySelector("#score");
const timeElement = document.querySelector("#time");

const blockHight = 40;
const blockWeidth = 40;

let highScore = localStorage.getItem("highScore") || 0;
let score = 0;
let time = `00-00`;
highScoreElement.innerText = highScore;
const rows = Math.floor(board.clientHeight / blockHight);
const cols = Math.floor(board.clientWidth / blockWeidth);
console.log("Rows:", rows, "Cols:", cols);

const blocks = [];
let food = {
  x: Math.floor(Math.random() * rows),
  y: Math.floor(Math.random() * cols),
};
console.log("food", food);
let snake = [
  {
    x: 1,
    y: 2,
  },
  {
    x: 1,
    y: 3,
  },
  {
    x: 1,
    y: 4,
  },
];

let direction = "down";
let id = null;
let timeId = null;
for (let i = 0; i < rows; i++) {
  for (let j = 0; j < cols; j++) {
    let block = document.createElement("div");
    block.classList.add("block");
    board.appendChild(block);
    blocks[`${i}-${j}`] = block;
  }
}

function render() {
  let head = null;

  blocks[`${food.x}-${food.y}`].classList.add("food");

  if (direction === "left") {
    head = { x: snake[0].x, y: snake[0].y - 1 };
  } else if (direction === "right") {
    head = { x: snake[0].x, y: snake[0].y + 1 };
  } else if (direction === "down") {
    head = { x: snake[0].x + 1, y: snake[0].y };
  } else if (direction === "up") {
    head = { x: snake[0].x - 1, y: snake[0].y };
  }

  if (head.x < 0 || head.x > rows || head.y < 0 || head.y > cols) {
    clearInterval(id);
    modal.style.display = "flex";
    startGame.style.display = "none";
    gameOver.style.display = "flex";
  }
  if (head.x == food.x && head.y == food.y) {
    snake.push(food);
    score+=10;
    socreElement.innerText = score;
    if(score>highScore){
        highScore = score;
        localStorage.setItem("highScore",highScore.toString());
    }



    blocks[`${food.x}-${food.y}`].classList.remove("food");
    food = {
      x: Math.floor(Math.random() * rows),
      y: Math.floor(Math.random() * cols),
    };
    blocks[`${food.x}-${food.y}`].classList.add("food");
  }

  snake.forEach((value) => {
    blocks[`${value.x}-${value.y}`].classList.remove("fill");
  });
  snake.unshift(head);
  snake.pop();

  snake.forEach((value) => {
    blocks[`${value.x}-${value.y}`].classList.add("fill");
  });
}


window.addEventListener("keydown", (event) => {
  console.log("Key pressed:", event.key);
  if (event.key == "ArrowUp") {
    direction = "up";
  } else if (event.key == "ArrowDown") {
    direction = "down";
  } else if (event.key == "ArrowLeft") {
    direction = "left";
  } else if (event.key == "ArrowRight") {
    direction = "right";
  }
});

startButton.addEventListener("click", () => {
  modal.style.display = "none";
  timeId = setInterval(()=>{
    let [m,s] = time.split("-").map(Number);
    if(s>59){
        m+=1;
    }else{
        s+=1;
    }
    time = `${m}-${s}`;
    console.log(time);
    timeElement.innerText = time;

  },1000)

  id = setInterval(() => {
    render();
  }, 300);
});

buttonRestart.addEventListener("click", restartGame);

function restartGame() {
  modal.style.display = "none";
  score = 0;
  time = `00-00`;
  socreElement.innerText = score;
  timeElement.innerText = time;
  highScoreElement.innerHTML = highScore;



  direction = "down";
  snake = [
    {
      x: 5,
      y: 5,
    },
  ];
snake.forEach((value) => {
    blocks[`${value.x}-${value.y}`].classList.remove("fill");
  });
blocks[`${food.x}-${food.y}`].classList.remove("food");
  food = {
    x: Math.floor(Math.random() * rows),
    y: Math.floor(Math.random() * cols),
  };
  id = setInterval(() => {
    render();
  }, 300);
}
