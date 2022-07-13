const game = document.querySelector('#game');
const menu = document.querySelector('#menu');
const canvas = document.querySelector('#board');
const ctx = canvas.getContext('2d');
const scale = 20;
const rows = canvas.height / scale;
const columns = canvas.width / scale;
var snake;

function setup() {
  let speed = 100;
  let second = 0;
  let minute = 0;
  let hour = 0;
  let timer = `${hour}:0${minute}:0${second}`;
  
  game.classList.toggle('hidden');
  menu.classList.toggle('hidden');

  snake = new Snake();
  fruit1 = new Fruit();
  fruit2 = new Fruit();
  fruit3 = new Fruit();
  fruit1.pickLocation();
  fruit2.pickLocation();
  fruit3.pickLocation();

  setInterval(() => {
    second++;
    if (second > 59) {
      second = 0;
      minute++;
    }
    if (minute > 59) {
      minute = 0;
      hour++;
    }
    if (second < 10) {
      timer = `${hour}:${minute}:0${second}`;
    }
    if (minute < 10) {
      timer = `${hour}:0${minute}:${second}`;
    }
    if (second < 10 && minute < 10) {
      timer = `${hour}:0${minute}:0${second}`;
    }
  }, 1000);

  const loop = setInterval(() => {
    speed = 100;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fruit1.draw();
    fruit2.draw();
    fruit3.draw();
    snake.update();
    snake.draw();

    if (snake.eat(fruit1)) {
      fruit1.pickLocation();
    }

    if (snake.eat(fruit2)) {
      fruit2.pickLocation();
    }

    if (snake.eat(fruit3)) {
      fruit3.pickLocation();
    }

    snake.checkFruitUnderTail(fruit1);
    snake.checkFruitUnderTail(fruit2);
    snake.checkFruitUnderTail(fruit3);
    snake.checkCollision(loop);
    document.querySelector('.score').innerText = 'Score: ' + snake.total;
    document.querySelector('.timer').innerText = 'Timer: ' + timer;
  }, speed);
}

function move(direction) {
  snake.changeDirection(direction);
}

window.addEventListener('keydown', (evt) => {
  const direction = evt.key.replace('Arrow', '');
  snake.changeDirection(direction);
});
