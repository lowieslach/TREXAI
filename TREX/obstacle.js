const OBSTACLEX = 640; //X-waarde beginpositie obstacle
const BUFFERX = 200; //X-waarde om te voorkomen dat obstacle te laat getekend word

var speedfactor = 1;
var generateThreshold = 100;
var generateTicks = 0;
var obstacles = [];

const OBSTACLES = [
  {
    name: "SmallCactus",
    height: 38,
    width: 2,
    x: OBSTACLEX + BUFFERX,
    y: [0],
    amount: [1, 2, 3],
  },
  {
    name: "Largecactus",
    height: 56,
    width: 2,
    x: OBSTACLEX + BUFFERX,
    y: [0],
    amount: [1, 2, 3],
  },
  {
    name: "Bird",
    height: 35,
    width: 2,
    x: OBSTACLEX + BUFFERX,
    y: [0, 31, 51],
    amount: [1],
  },
];

class Obstacle {
  constructor(ob) {
    this.name = ob.name;
    this.height = ob.height;
    this.width = ob.width;
    this.x = ob.x;
    this.y = ob.y[Math.floor(Math.random() * ob.y.length)];
    this.amount = ob.amount[Math.floor(Math.random() * ob.amount.length)];
  }

  move() {
    this.x -= 5 * speedfactor;
  }
  draw() {
    for (var i = 0; i < this.amount; i++) {
      rect(
        this.x + i * 25,
        GROUND - this.y - this.height,
        this.width,
        this.height
      );
      fill(0);
    }

    if (this.x <= -100) {
      obstacles.pop();
    }
  }
}

function newObstacle() {
  if (generateThreshold < generateTicks) {
    generateThreshold = 40 + Math.floor(Math.random() * 70);
    generateTicks = 0;
    obstacles.unshift(
      new Obstacle(OBSTACLES[Math.floor(Math.random() * OBSTACLES.length)])
    );
  } else {
    generateTicks++;
  }
}
