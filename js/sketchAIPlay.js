var dino;
var score = 0;
var gameOver = false;
let dinoImg;

let neat = new NEAT({
  model: [
    { nodeCount: 6, type: "input" },
    { nodeCount: 4, activationfunc: activation.SOFTMAX },
    { nodeCount: 3, type: "output", activationfunc: activation.SOFTMAX },
  ],
  mutationRate: 0.1,
  crossoverMethod: crossover.RANDOM,
  mutationMethod: mutate.EDIT,
  populationSize: 100,
});

function setup() {
  var canvas = createCanvas(640, 480);
  canvas.parent("canvas");
  dino = new Dino();
  obstacles = [new Obstacle(OBSTACLES[0])];
}

function draw() {
  if (gameOver) return;
  score++;
  updateGame(score);

  dino.speed();
  dino.update();
  dino.draw();
  

  // console.log(checkCollision(dino));
  if (checkCollision(dino)) {
    fill(0);
    textAlign(CENTER);
    text("Arrow up to restart", width / 2, 240);
    gameOver = true;
  }

  // dino.getInputs(obstacles[obsCounter]);
}

function resetGame() {
  dino = new Dino();
  obstacles = [new Obstacle(OBSTACLES[0])];
  score = 0;
  gameOver = false;
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    dino.up();
    if (gameOver) {
      resetGame();
      return;
    }
  } else if (keyCode === DOWN_ARROW) {
    dino.down();
  }
}

function touchStarted() {
  dino.up();
}

function keyReleased() {
  if (keyCode === DOWN_ARROW) {
    dino.releaseDown();
  }
}
