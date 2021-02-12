var dinos = [];
var score = 0;
var neat;
var population;
var TotalPopulation;
var generation = 0;

var inputsTypes;

function reset() {
  let cros;
  switch ($("input[name=cros]:checked").val()) {
    case "RANDOM":
      cros = crossover.RANDOM;
      break;
    case "SLICE":
      cros = crossover.SLICE;
      break;
  }

  let mut;
  switch ($("input[name=mut]:checked").val()) {
    case "RANDOM":
      mut = mutate.RANDOM;
      break;
    case "EDIT":
      mut = mutate.EDIT;
      break;
  }

  let act;
  switch ($("input[name=act]:checked").val()) {
    case "SOFTMAX":
      act = activation.SOFTMAX;
      break;
    case "RELU":
      act = activation.RELU;
      break;
    case "TANH":
      act = activation.TANH;
      break;
    case "SIGMOID":
      act = activation.SIGMOID;
      break;
    case "LEAKY_RELU":
      act = activation.LEAKY_RELU;
      break;
  }

  inputsTypes = $("input:checkbox:checked")
    .map(function () {
      return $(this).val();
    })
    .get();

  TotalPopulation = $("#SliderPopulationSize").val();
  let mutRate = $("#SliderMutationRate").val();
  neat = new NEAT({
    model: [
      { nodeCount: inputsTypes.length, type: "input" },
      { nodeCount: 4, activationfunc: act },
      // { nodeCount: 6, activationfunc: act },
      { nodeCount: 3, type: "output", activationfunc: act },
    ],
    mutationRate: mutRate,
    crossoverMethod: cros,
    mutationMethod: mut,
    populationSize: TotalPopulation,
  });

  //reset obstacles
  obstacles = [new Obstacle(OBSTACLES[0])];
  //reset dinos
  for (let i = 0; i < TotalPopulation; i++) {
    dinos[i] = new Dino();
  }
  //reset population
  population = TotalPopulation;
  //reset score
  score = 0;
  //reset generation
  generation = 0;
}

function setup() {
  let canvas = createCanvas(640, 480);
  canvas.parent("canvas");
  reset();
}

function draw() {
  for (i = 0; i < $("#SliderSpeed").val(); i++) {
    score++;
    updateGame(score);
    drawTrainInfo();

    dinos.forEach((dino, i) => {
      if (dino.dead) return;
      neat.setInputs(dino.getInputs(obstacles[obsCounter]), i);
    });

    neat.feedForward();

    let desicions = neat.getDesicions();

    desicions.forEach((des, i) => {
      switch (des) {
        case 0:
          dinos[i].releaseDown();
          break;
        case 1:
          dinos[i].up();
          break;
        case 2:
          dinos[i].down();
          break;
      }
    });

    dinos.forEach((dino) => {
      if (!dino.dead) {
        dino.update();
        dino.draw();
        if (checkCollision(dino)) {
          dino.dead = true;
          dino.score = score;
          population--;
          // console.log(population);
          // if (population === 0) {
          //   doGen();
          //   return;
          // }
        }
      }
    });

    let dinoDead = true;
    dinos.forEach((dino) => {
      if (!dino.dead) {
        dinoDead = false;
        return;
      }
    });
    if (dinoDead) doGen();
  }
}

function doGen() {
  //set the fitness of all dinos
  dinos.forEach((dino, i) => {
    neat.setFitness(dino.score, i);
  });

  //next generation
  neat.doGen();
  generation++;

  //make new dinos
  dinos = [];
  for (let i = 0; i < TotalPopulation; i++) {
    dinos[i] = new Dino();
  }

  //make new obstacles
  obstacles = [new Obstacle(OBSTACLES[0])];
  generateTicks = 0;

  //reset vars
  score = 0;
  population = TotalPopulation;
}

function drawTrainInfo() {
  textAlign(RIGHT);
  textSize(25);
  text("Train Information:", width - 10, 30);
  text("Generation: " + generation, width - 10, 60);
  text("Population: " + population, width - 10, 90);
}

function download() {
  // neat.bestCreature()
  let jsonData = neat.export(dinos.findIndex((dino) => !dino.dead));
  console.log(jsonData);
  saveJSON(jsonData, "brain.json");
}
