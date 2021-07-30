// Node - An environment that allows us to run our JavaScript outside of a browser and gives us some helpful server capabilities.

// Express - A tool / package to help us build our server application.

// NPM - Node Package Manager

// package.json - A file that keeps a running list of all of our packages

// node_modules - A directory that holds all of our packages

// nodemon - Node Monitor - Listens for when we save our file and restarts the node process (restarts our server)

////////////////////// CONFIGURATION /////////////////////

// Pulling in the express package into this file
const express = require('express');

// Creating an instance of an express app
const app = express();

const port = 4000;

// Temperary, simulated database
//              0        1       2
const fruits = ['apple', 'kiwi', 'orange'];


/////////////////////////// ROUTES ///////////////////////

// Homepage Route
// Listen for requests on the '/' route, and when they are recieved
// call this callback function
app.get('/', (request, response) => {
  response.send('Welcome to the Fruits App');
})


// Show Fruit Route
app.get('/fruits/:fruitIndex', (request, response) => {
  response.send(fruits[request.params.fruitIndex]);
});


// app.get('/about', (request, response) => {
//   response.send('All about my website');
// })

// app.get('/fruits/:fruitIndex/:clientName', (request, response) => {
//   console.log(fruits[request.params.fruitIndex]);

//   const fruitIndex = request.params.fruitIndex;
//   const clientName = request.params.clientName;

//   const message = `Hello ${clientName}, here is your ${fruits[fruitIndex]}`

//   response.send(message);
// });

// app.get('/fruits/0', (request, response) => {
//   response.send(fruits[0]);
// })

// app.get('/fruits/1', (request, response) => {
//   response.send(fruits[1]);
// })

// app.get('/fruits/2', (request, response) => {
//   response.send(fruits[2]);
// })

///////////////////// STARTING THE SERVER /////////////////
// Start up our server
// Start the server on the specified port
// After it starts, call the callback function
app.listen(port, () => {
  console.log(`Your server is running on port: ${port} 🚀`);
});
