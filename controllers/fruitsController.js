const express = require('express');
const db = require('../models/index.js')
const router = express.Router();

// Base Path - All routes in this file are prepended with /fruits


// Index Route - Retrieve many/all fruits
router.get('/', (req, res) => {
  // If the user is not logged in, send them to the login page
  if (!req.session.currentUser) {
    return res.redirect('/login');
  }

  // Find all the fruits that match the id for the logged user
  db.Fruit.find({ user: req.session.currentUser._id }, (err, allFruits) => {
    if(err) return console.log(err);

    res.render('index.ejs', { allFruits: allFruits })
  })
})


// New Route - Retrieve a form that can be used to create a new fruit
router.get('/new', (req, res) => {
  // if user is not logged in, send them to the login page
  if (!req.session.currentUser) {
    return res.redirect('/login');
  }

  res.render('new.ejs')
})


// Show Route - Retrieve one fruit
router.get('/:fruitId', (req, res) => {
  if (!req.session.currentUser) {
    return res.redirect('/login');
  }

  db.Fruit.findById(req.params.fruitId, (err, foundFruit) => {
    if(err) return console.log(err);

    res.render('show.ejs', { oneFruit: foundFruit })
  })  
})


// Create Route - Send data to create a new fruit
router.post('/', (req, res) => {

  if (!req.session.currentUser) {
    return res.redirect('/login');
  }

  // The user's information is stored inside of req.session
  console.log(req.session);

  // 1. Convert the data to the correct format
  if (req.body.readyToEat === 'on') {
    req.body.readyToEat = true;
  } else {
    req.body.readyToEat = false;
  }

  console.log('req.body ==>', req.body);

  // Getting the user's id stored in the cookie
  // adding to the req.body object
  req.body.user = req.session.currentUser._id;

  // 2. Add that new fruit data into our database
  db.Fruit.create(req.body, (err, createdFruit) => {
    if (err) return console.log(err);

    console.log(createdFruit);

    // 3. Redirect back to fruits index.
    res.redirect('/fruits')
  });
})


// Delete Fruit Route - Delete a fruit from the database
router.delete('/:fruitId', (req, res) => {
  if (!req.session.currentUser) {
    return res.redirect('/login');
  }
  
  db.Fruit.findByIdAndDelete(req.params.fruitId, (err) => {
    if(err) return console.log(err);

    res.redirect('/fruits');
  })
})


// Fruit Edit Route - Serves a form to submit info for updating the fruit
router.get('/:fruitId/edit', (req, res) => {
  db.Fruit.findById(req.params.fruitId, (err, foundFruit) => {
    if(err) return console.log(err);

    res.render('edit.ejs', { oneFruit: foundFruit });
  })
});


// Fruit Update Route - Update the data for a particular fruit
router.put('/:fruitId', (req, res) => {
  console.log(req.body);

  // 1. Convert the data to the correct format
  if (req.body.readyToEat === 'on') {
    req.body.readyToEat = true;
  } else {
    req.body.readyToEat = false;
  }

  console.log(req.body);

  db.Fruit.findByIdAndUpdate(req.params.fruitId, req.body, (err, updatedFruit) => {
    if(err) return console.log(err);

    res.redirect(`/fruits/${req.params.fruitId}`)
  })
})


module.exports = router;
