const express = require('express');
const router = express.Router();
const fruits = require('../models/fruitModel.js');


router.get('/test/:firstName', (req, res) => {
  console.log(req.params);

  res.send('You hit the test route,')
})


// Index Route - Retrieve many/all fruits
router.get('/', (req, res) => {
  res.render('index.ejs', { allFruits: fruits });
})

// New Route - Retrieve a form that can be used to create a new fruit
router.get('/new', (req, res) => {
  res.render('new.ejs')
})

// Show Route - Retrieve one fruit
router.get('/:fruitIndex', (req, res) => {
  res.render('show.ejs', {
    oneFruit: fruits[req.params.fruitIndex]
  })
})

// Create Route - Send data to create a new fruit
router.post('/', (req, res) => {
  // We need to harvest the data from the form
  console.log(req.body)
  // Add that new fruit data into our database
  fruits.push(req.body)
  res.redirect('/fruits') // redirects to the index route
})

// Steps to delete a fruit
// 1. Crete a route to handle deleting the fruit
// 2. Create a Form to handle the delete request
router.delete('/:fruitIndex', (req, res) => {
  // Logic for deleting fruit
  const fruitIndex = req.params.fruitIndex;

  fruits.splice(fruitIndex, 1);

  res.redirect('/fruits');
})


// Fruit Edit Route - Serves a form to submit info for updating the fruit
router.get('/:fruitIndex/edit', (req, res) => {
  res.render('edit.ejs', {
    oneFruit: fruits[req.params.fruitIndex],
    index: req.params.fruitIndex
  });
});

// Create a route to handle a PUT to /fruits/:fruitIndex

// Fruit Update Route - Update the data for a particular fruit
router.put('/:fruitIndex', (req, res) => {
  console.log(req.body);

  // 1. Convert the data to the correct format
  if (req.body.readyToEat === 'on') {
    req.body.readyToEat = true;
  } else {
    req.body.readyToEat = false;
  }

  console.log(req.body);

  // 2. Update the data in database
  fruits[req.params.fruitIndex] = req.body;

  // 3. Redirect to the show page for that particular fruit
  res.redirect('/fruits/' + req.params.fruitIndex);
})

module.exports = router;

/*
C - Create
R - Read
U - Update
D - Delete
*/