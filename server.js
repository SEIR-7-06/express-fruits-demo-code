/* Keywords */
// Node - An environment that allows us to run our JavaScript outside of a browser and gives us some helpful server capabilities.
// Express - A tool / package to help us build our server application.
// NPM - Node Package Manager
// package.json - A file that keeps a running list of all of our packages
// node_modules - A directory that holds all of our packages
// nodemon - Node Monitor - Listens for when we save our file and restarts the node process (restarts our server)

/* Required Modules*/
const express = require('express'); // Pulling in the express package into this file
const rowdy = require('rowdy-logger')
const methodOverride = require('method-override');

// Database & Models
const fruits = require('./models/fruitModel.js') // The "database"
const fruitsController = require('./controllers/fruitsController.js');
/* Variables */
const app = express(); // Creating an instance of an express app
const port = 4000;
const rowdyResults = rowdy.begin(app)

/* Middleware */
app.set('view engine', 'ejs');

// Checks if form data was sent in the request.
// If so adds it to the request body (req.body)
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false })) 
app.use('/fruits', fruitsController);

app.get('/potato', (req, res) => {
  res.send('this is not a fruit!');
})

/* Routes */
// Homepage Route
app.get('/', (req, res) => {
  // Listen for requests on the '/' route, and when they are received
  // call this callback function
  res.send('Welcome to the Fruits App');
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
  // Start the server on the specified port
  // After it starts, call the callback function
  console.log(`Your server is running on port: ${port} 🚀`);
  rowdyResults.print()
});
