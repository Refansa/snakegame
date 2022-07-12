const game = document.querySelector('#game');
const menu = document.querySelector('#menu');
const canvas = document.querySelector('#board');
const ctx = canvas.getContext('2d');
const scale = 25;
const rows = canvas.height / scale;
const columns = canvas.width / scale;
var snake;

function setup() {
  game.classList.toggle('hidden');
  menu.classList.toggle('hidden');

  snake = new Snake();
  fruit = new Fruit();
  fruit.pickLocation();

  const loop = setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fruit.draw();
    snake.update();
    snake.draw();

    if (snake.eat(fruit)) {
      fruit.pickLocation();
    }

    snake.checkFruitUnderTail();
    snake.checkCollision(loop);
    document.querySelector('.score').innerText = 'Score: ' + (snake.total - 3);
  }, 100);
}

window.addEventListener('keydown', (evt) => {
  const direction = evt.key.replace('Arrow', '');
  snake.changeDirection(direction);
});
