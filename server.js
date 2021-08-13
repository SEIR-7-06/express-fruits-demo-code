// Require Statements /////////////////////////////////////////////////
const express = require('express'); // Pulling in the express package into this file
const rowdy = require('rowdy-logger');
const methodOverride = require('method-override');
const fruitsController = require('./controllers/fruitsController.js');


// Configuration ///////////////////////////////////////////////////////
const app = express(); // Creating an instance of an express app
const port = 4000;
const rowdyResults = rowdy.begin(app);
app.set('view engine', 'ejs');


// Middleware //////////////////////////////////////////////////////////
// Allows us to convert POST requests to PUT and DELETE requests
app.use(methodOverride('_method'));
// Checks if form data was sent in the request and adds to req.body
app.use(express.urlencoded({ extended: false }));


// Controllers /////////////////////////////////////////////////////////
app.use('/fruits', fruitsController);


// Routes //////////////////////////////////////////////////////////////
// Homepage Route
app.get('/', (req, res) => {
  res.render('home.ejs');
});


// Signup Route - Shows a Signup Form
app.get('/signup', (req, res) => {
  res.render('auth/signup.ejs');
});


// Login Route - Shows a Login Form
app.get('/login', (req, res) => {
  res.render('auth/login.ejs');
});


app.get('/logout', (req, res) => {
  res.send('You logged out!');
})


/* Start the Server */////////////////////////////////////////////////////
app.listen(port, () => {
  console.log(`Your server is running on port: ${port} 🚀`);
  rowdyResults.print()
});
