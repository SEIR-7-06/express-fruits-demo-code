// Require Statements /////////////////////////////////////////////////
const express = require('express'); // Pulling in the express package into this file
const rowdy = require('rowdy-logger');
const methodOverride = require('method-override');
const fruitsController = require('./controllers/fruitsController.js');
const db = require('./models/index.js');

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

// Listening for when the signup form is submitted
// Sign Up a New User
app.post('/signup', (req, res) => {
  // 1. ✅ take in the username and password from the form
  console.log(req.body);
  // 2. ✅ Make a query to create a new User
  db.User.create(req.body, (err, createdUser) => {
    if (err) console.log(err);

    console.log(createdUser);
    // 3. ✅ Redirect to /login
    res.redirect('/login');
  });
})


// Login Route - Shows a Login Form
app.get('/login', (req, res) => {
  res.render('auth/login.ejs');
});



// Listen for when the login form is submitted
// Log the user in - track the user in a cookie on their browser
app.post('/login', (req, res) => {
  console.log(req.body);

  // 1. ✅ Check if the user passed in exists

  // 2. ✅ Check if the password passed in matches the one on file

  // 3. ✅ Track the user in a cookie on their browser

  res.send('You tried to log in!')
})


app.get('/logout', (req, res) => {
  res.send('You logged out!');
})


/* Start the Server */////////////////////////////////////////////////////
app.listen(port, () => {
  console.log(`Your server is running on port: ${port} 🚀`);
  rowdyResults.print()
});
