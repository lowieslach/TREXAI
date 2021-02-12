const GROUND = 430;
const DINOX = 50;

var highScore = 0;
var obsCounter = 0;

function updateGame(score) {
  //clear screen
  background(220);
  fill(0);

  //draw Ground
  rect(0, GROUND, width, 10);

  //draw score
  textAlign(CENTER);
  textSize(50);
  text(score, width / 2, 50);

  //sse new highscrore
  if (highScore < score) {
    highScore = score;
  }

  //draw highscore
  if (highScore !== 0) {
    textSize(25);
    textAlign(LEFT);
    text("Highscore: " + highScore, 10, 30);
  }

  //generate new obstacles
  newObstacle();

  //update and draw obstacles
  let closestObsDis = 100000;
  obstacles.forEach((o, i) => {
    o.move();
    o.draw();

    if (closestObsDis > o.x - DINOX && o.x - DINOX > 0) {
      closestObsDis = o.x - DINOX;
      obsCounter = i;
    }
  });
}

function checkCollision(dino) {
  for (o of obstacles) {
    if (
      collideRectRect(
        DINOX,
        dino.y,
        50,
        dino.height,
        o.x,
        o.y,
        o.width * o.amount + (o.amount - 1) * 25,
        o.height
      )
    ) {
      return true;
    }
  }
  return false;
}

function changeTarget(value, id) {
  document.getElementById(id).innerText = value;
}
