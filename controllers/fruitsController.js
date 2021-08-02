const express = require('express');
const router = express.Router();
const fruits = require('../models/fruitModel.js');


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
  // console.log(req.body)
  // Add that new fruit data into our database
  fruits.push(req.body)
  res.redirect('/fruits') // redirects to the index route
})

// Steps to delete a fruit
// 1. Crete a route to handle deleting the fruit
// 2. Create a Form to handle the delete request
router.delete('/:fruitIndex', (req, res) => {
  // Logic for deleting fruit
  res.send('You deleted the fruit with the index' + req.params.fruitIndex);
})

module.exports = router;