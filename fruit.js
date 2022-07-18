class Fruit {
  constructor(num_fruit) {
    this.fruits = [];

    for (let i = 0; i < num_fruit; i++) {
      this.fruits[i] = {
        x: 0,
        y: 0,
        second: 0,
      };
    }

    setInterval(() => {
      if (isPaused) return;
      this.fruits.forEach((fruit, index) => {
        this.fruits[index].second++;
        if (fruit.second > 5) {
          this.fruits[index].second = 0;
          this.pickLocation(index);
        }
      });
    }, 1000);

    this.pickLocation = function (index) {
      if (index === -1) {
        this.fruits.forEach((fruit) => {
          fruit.x = (Math.floor(Math.random() * columns - 1) + 1) * scale;
          fruit.y = (Math.floor(Math.random() * rows - 1) + 1) * scale;
          fruit.second = 0;
        });
      } else {
        this.fruits[index] = {
          x: (Math.floor(Math.random() * columns - 1) + 1) * scale,
          y: (Math.floor(Math.random() * rows - 1) + 1) * scale,
          second: 0,
        };
      }
    };

    this.draw = function () {
      this.fruits.forEach((fruit) => {
        ctx.fillStyle = '#e7471d';
        ctx.fillRect(fruit.x, fruit.y, scale, scale);
      });
    };
  }
}
