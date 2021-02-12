let config = {
  model: [
    { nodeCount: 5, type: "input" },
    { nodeCount: 3, type: "output", activationfunc: activation.SOFTMAX },
  ],
  mutationRate: 0.1,
  crossoverMethod: crossover.RANDOM,
  mutationMethod: mutate.EDIT,
  populationSize: 100,
};

let neat = new NEAT(config);

//loop---------------------------

neat.setInputs(inputs, index);
// inputs array of inputs values between 0 and 1
// index of agent

neat.feedForward();
// push the inputs through the neural network

let desicions = neat.getDesicions();
// desicions array of desicion fo every index

//------------------------------------

//if everyone is dead--------------------

neat.setFitness(fitness, index);
// fitness --> mark that determines how good it was (bv. score)
// index of agent

neat.doGen();
// makes a new generation

//------------------------------------------

//EXTRA

let index = neat.bestCreature();
//gives list of best agent

let jsonData = neat.export(index);
// gives neural network in json data

neat.importOneModel(uploadedModel);
// import nearal network
