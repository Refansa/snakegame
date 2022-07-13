class Fruit {
  constructor() {
    this.x;
    this.y;
    this.second = 0;

    setInterval(() => {
      this.second++;
      if (this.second > 5) {
        this.second = 0;
        this.pickLocation();
        this.draw();
      }
    }, 1000);

    this.pickLocation = function () {
      this.x = (Math.floor(Math.random() * columns - 1) + 1) * scale;
      this.y = (Math.floor(Math.random() * rows - 1) + 1) * scale;
    };

    this.draw = function () {
      ctx.fillStyle = '#e7471d';
      ctx.fillRect(this.x, this.y, scale, scale);
    };
  }
}
