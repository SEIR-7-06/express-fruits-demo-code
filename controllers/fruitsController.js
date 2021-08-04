const express = require('express');
const db = require('../models/index.js')
const router = express.Router();

// Base Path - All routes in this file are prepended with /fruits


// Index Route - Retrieve many/all fruits
router.get('/', (req, res) => {
  db.Fruit.find({}, (err, allFruits) => {
    if(err) return console.log(err);

    res.render('index.ejs', { allFruits: allFruits })
  })
})


// New Route - Retrieve a form that can be used to create a new fruit
router.get('/new', (req, res) => {
  res.render('new.ejs')
})


// Show Route - Retrieve one fruit
router.get('/:fruitId', (req, res) => {
  db.Fruit.findById(req.params.fruitId, (err, foundFruit) => {
    if(err) return console.log(err);

    res.render('show.ejs', { oneFruit: foundFruit })
  })  
})


// Create Route - Send data to create a new fruit
router.post('/', (req, res) => {
  // 1. Convert the data to the correct format
  if (req.body.readyToEat === 'on') {
    req.body.readyToEat = true;
  } else {
    req.body.readyToEat = false;
  }

  // 2. Add that new fruit data into our database
  db.Fruit.create(req.body, (err, createdFruit) => {
    if (err) return console.log(err);

    // 3. Redirect back to fruits index.
    res.redirect('/fruits')
  });
})


// Delete Fruit Route - Delete a fruit from the database
router.delete('/:fruitId', (req, res) => {
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
