class Snake {
  constructor(scale) {
    this.reset = function () {
      this.x = (this.total - 3) * scale;
      this.y = 3 * scale;
      this.xSpeed = scale * 1;
      this.ySpeed = 0;
      this.changingDirection = false;
      this.currentDirection = 'Right';

      this.body = [];
      this.total = 6;
    };

    this.draw = function () {
      ctx.fillStyle = '#fff';
      ctx.strokeStyle = '#aaa';

      this.body.forEach((body) => {
        ctx.fillRect(body.x, body.y, scale, scale);
        ctx.strokeRect(body.x, body.y, scale, scale);
      });
    };

    this.update = function () {
      // Update the position of the body
      this.body.unshift({
        x: this.x,
        y: this.y,
      });
      this.body.pop();

      // Always add body based on the total score
      this.body[this.total] = {
        x: this.x,
        y: this.y,
      };

      this.x += this.xSpeed;
      this.y += this.ySpeed;
    };

    this.checkWallCollision = function () {
      if (this.x > canvasWidth - scale) {
        this.x = 0;
      }

      if (this.y > canvasHeight - scale) {
        this.y = 0;
      }

      if (this.x < 0) {
        this.x = canvasWidth;
      }

      if (this.y < 0) {
        this.y = canvasHeight;
      }
    };

    this.checkBodyCollision = function (loop) {
      this.body.forEach((body) => {
        if (this.x === body.x && this.y === body.y) {
          clearInterval(loop);
          alert('Game Over!');
          toggleGame();
        }
      });
    };

    this.checkFruitUnderBody = function (fruit) {
      this.body.forEach((body) => {
        if (fruit.x === body.x && fruit.y === body.y) {
          console.log('Fruit under body');
          return true;
        }
        return false;
      });
    };

    this.eat = function (fruit) {
      if (this.x === fruit.x && this.y === fruit.y) {
        this.total++;
        return true;
      }
      return false;
    };

    this.changeDirection = function (e) {
      if (isPaused) return;
      if (this.changingDirection) return;
      this.changingDirection = true;

      switch (e.key) {
        case 'a':
        case '65':
          if (this.currentDirection !== 'Right') {
            this.currentDirection = 'Left';
            this.xSpeed = -scale * 1;
            this.ySpeed = 0;
          }
          break;
        case 'd':
        case '68':
          if (this.currentDirection !== 'Left') {
            this.currentDirection = 'Right';
            this.xSpeed = scale * 1;
            this.ySpeed = 0;
          }
          break;
        case 'w':
        case '87':
          if (this.currentDirection !== 'Down') {
            this.currentDirection = 'Up';
            this.xSpeed = 0;
            this.ySpeed = -scale * 1;
          }
          break;
        case 's':
        case '83':
          if (this.currentDirection !== 'Up') {
            this.currentDirection = 'Down';
            this.xSpeed = 0;
            this.ySpeed = scale * 1;
          }
          break;

        default:
          break;
      }
    };

    this.reset();
  }
}
