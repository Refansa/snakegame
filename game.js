const game = document.getElementById('game');
const menu = document.getElementById('menu');
const canvas = document.getElementById('canvas');

const ctx = canvas.getContext('2d');
const canvasWidth = 960;
const canvasHeight = 600;

const scale = canvasWidth / 48;
const rows = canvasHeight / scale;
const columns = canvasWidth / scale;
const intervalSpeed = 100;
let timer = {
  second: 0,
  minute: 0,
  hour: 0,
};
let formattedTimer = timerFormat(timer);

let isPaused = true;

const snake = new Snake(scale);
const fruits = new Fruit(Math.floor(Math.random() * 2) + 3);

canvas.setAttribute('width', canvasWidth);
canvas.setAttribute('height', canvasHeight);

function start() {
  isPaused = false;
  toggleGame();

  snake.reset();
  fruits.pickLocation(-1);

  setInterval(() => {
    if (isPaused) return;
    timer.second++;
    formattedTimer = timerFormat(timer);
  }, 1000);

  const loop = setInterval(() => {
    if (isPaused) return;
    clearCanvas();

    fruits.draw();

    fruits.fruits.forEach((fruit, index) => {
      if (snake.eat(fruit)) fruits.pickLocation(index);
    });

    snake.changingDirection = false;
    snake.update();
    snake.draw();
    snake.checkWallCollision();
    snake.checkBodyCollision(loop);

    fruits.fruits.forEach((fruit, index) => {
      if (snake.checkFruitUnderBody(fruit)) fruits.pickLocation(index);
    });

    document.querySelector('#score').innerText = 'Score: ' + snake.total;
    document.querySelector('#timer').innerText = 'Timer: ' + formattedTimer;
  }, intervalSpeed);
}

function toggleGame() {
  game.classList.toggle('hidden');
  menu.classList.toggle('hidden');
}

function timerFormat(timer) {
  if (timer.second > 59) {
    timer.second = 0;
    timer.minute++;
  }
  if (timer.minute > 59) {
    timer.minute = 0;
    timer.hour++;
  }
  if (timer.second < 10 && timer.minute < 10) {
    return `${timer.hour}:0${timer.minute}:0${timer.second}`;
  }
  if (timer.second < 10) {
    return `${timer.hour}:${timer.minute}:0${timer.second}`;
  }
  if (timer.minute < 10) {
    return `${timer.hour}:0${timer.minute}:${timer.second}`;
  }
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
}

addEventListener('keydown', (e) => snake.changeDirection(e));
addEventListener('keyup', () => (snake.changingDirection = false));
