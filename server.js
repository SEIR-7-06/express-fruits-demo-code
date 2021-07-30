/* Keywords */
// Node - An environment that allows us to run our JavaScript outside of a browser and gives us some helpful server capabilities.
// Express - A tool / package to help us build our server application.
// NPM - Node Package Manager
// package.json - A file that keeps a running list of all of our packages
// node_modules - A directory that holds all of our packages
// nodemon - Node Monitor - Listens for when we save our file and restarts the node process (restarts our server)

/* Required Modules*/
const express = require('express'); // Pulling in the express package into this file

// Database & Models
const fruits = require('./models/fruitModel.js') // The "database"

/* Variables */
const app = express(); // Creating an instance of an express app
const port = 4000;

/* Middleware */
app.set('view engine', 'ejs');

/* Routes */
// Homepage Route
app.get('/', (request, response) => {
  // Listen for requests on the '/' route, and when they are received
  // call this callback function
  response.send('Welcome to the Fruits App');
})

// Index Fruit Route
app.get('/fruits', (req, res) => {
  res.send(fruits)
})

app.get('/fruits/:fruitIndex', (req, res) => {
  res.render('show.ejs', {
    oneFruit: fruits[req.params.fruitIndex]
  })
})


/* Old routes used for in-class examples  */
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


/* Start the Server */
app.listen(port, () => {
  // Start up our server
  // Start the server on the specified port
  // After it starts, call the callback function
  console.log(`Your server is running on port: ${port} 🚀`);
});
