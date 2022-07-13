class Snake {
  constructor() {
    this.total = 6;
    this.nextLevel = 10;
    this.x = (this.total - 3) * scale;
    this.y = 3 * scale;
    this.xSpeed = scale * 1;
    this.ySpeed = 0;
    this.tail = [];
    this.currentDirection = 'Right';

    this.draw = function () {
      ctx.fillStyle = '#4876ec';
      for (let i = 0; i < this.tail.length; i++) {
        ctx.fillRect(this.tail[i].x, this.tail[i].y, scale, scale);
      }

      ctx.fillRect(this.x, this.y, scale, scale);
    };

    this.update = function () {
      for (let i = 0; i < this.tail.length - 1; i++) {
        this.tail[i] = this.tail[i + 1];
      }

      this.tail[this.total - 1] = { x: this.x, y: this.y };

      this.x += this.xSpeed;
      this.y += this.ySpeed;

      if (this.x > canvas.width - scale) {
        this.x = 0;
      }

      if (this.y > canvas.height - scale) {
        this.y = 0;
      }

      if (this.x < 0) {
        this.x = canvas.width;
      }

      if (this.y < 0) {
        this.y = canvas.height;
      }
    };

    this.changeDirection = function (direction) {
      switch (direction) {
        case 'Up':
        case 'w':
          if (this.currentDirection !== 'Down') {
            this.currentDirection = 'Up';
            this.xSpeed = 0;
            this.ySpeed = -scale * 1;
          }
          break;
        case 'Down':
        case 's':
          if (this.currentDirection !== 'Up') {
            this.currentDirection = 'Down';
            this.xSpeed = 0;
            this.ySpeed = scale * 1;
          }
          break;
        case 'Left':
        case 'a':
          if (this.currentDirection !== 'Right') {
            this.currentDirection = 'Left';
            this.xSpeed = -scale * 1;
            this.ySpeed = 0;
          }
          break;
        case 'Right':
        case 'd':
          if (this.currentDirection !== 'Left') {
            this.currentDirection = 'Right';
            this.xSpeed = scale * 1;
            this.ySpeed = 0;
          }
      }
    };

    this.eat = function (fruit) {
      if (this.x === fruit.x && this.y === fruit.y) {
        this.total++;
        return true;
      }

      return false;
    };

    this.checkCollision = function (loop) {
      for (var i = 0; i < this.tail.length; i++) {
        if (this.x === this.tail[i].x && this.y === this.tail[i].y) {
          clearInterval(loop);
          alert('Game Over!\nScore: ' + this.total + '\nTimer: ' + timer);
          menu.classList.toggle('hidden');
          game.classList.toggle('hidden');
        }
      }
    };

    this.checkFruitUnderTail = function (fruit) {
      for (var i = 0; i < this.tail.length; i++) {
        if (fruit.x === this.tail[i].x && fruit.y === this.tail[i].y) {
          fruit.pickLocation();
        }
      }
    };
  }
}
