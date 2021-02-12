//teste

class Dino {
  constructor() {
    this.height = 50;
    this.width = 50;
    this.y = 0;

    this.velocity = 0;
    this.gravity = -0.5;
    this.jumping = false;
    this.allowJump = true;
    this.inputs = [];

    this.dead = false;
  }

  draw() {
    fill(0, 0, 0, 10);
    rect(DINOX, GROUND - this.y - this.height, this.width, this.height);
    // image(
    //   dinoImg,
    //   DINOX,
    //   GROUND - this.y - this.height,
    //   this.width,
    //   this.height
    // );
  }

  update() {
    if (this.jumping) {
      this.velocity += this.gravity;
      this.y += this.velocity;
      if (this.y <= 0) {
        this.jumping = false;
        this.y = 0;
      }
    } else {
      this.y = 0;
    }
  }

  up() {
    if (!this.jumping && this.allowJump === true) {
      this.jumping = true;
      this.velocity = 12;
    }
  }

  down() {
    //Down- & vault-functie
    this.velocity = -12;
    this.height = 30;
    this.allowJump = false;
  }

  releaseDown() {
    this.height = 50;
    this.allowJump = true;
  }

  getInputs(obs) {
    this.inputs = [];
    this.insertInput(0, map(this.velocity, -15, 15, 0, 1));
    this.insertInput(1, map(obs.x, 0, width + BUFFERX, 0, 1));
    this.insertInput(2, map(obs.y, 0, 60, 0, 1));
    this.insertInput(
      3,
      map(obs.width * obs.amount + (obs.amount - 1) * 25, 0, 50, 0, 1)
    );
    this.insertInput(4, map(obs.height, 0, 60, 0, 1));
    this.insertInput(5, map(speedfactor, 0, 10, 0, 1));
    return this.inputs;
  }
  insertInput(id, input) {
    if (inputsTypes.includes(id.toString())) this.inputs.push(input);
  }
}
