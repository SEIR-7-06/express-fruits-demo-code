const express = require('express');
const router = express.Router();

// DELETE LATER
// const fruits = require('../models/fruitModel.js');

const db = require('../models/index.js')

// Base Path - /fruits

router.get('/test/:firstName', (req, res) => {
  console.log(req.params);

  res.send('You hit the test route,')
})


// Index Route - Retrieve many/all fruits
router.get('/', (req, res) => {

  // const fruits = require('../models/fruitModel')


  db.Fruit.find({}, (err, allFruits) => {
    res.render('index.ejs', { allFruits: allFruits })
  })
  // res.render('index.ejs', { allFruits: fruits });
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
  // We need to harvest the data from the form
  console.log(req.body)

  // 1. Convert the data to the correct format
  if (req.body.readyToEat === 'on') {
    req.body.readyToEat = true;
  } else {
    req.body.readyToEat = false;
  }

  // 2. Add that new fruit data into our database
  db.Fruit.create(req.body, (err, createdFruit) => {
    // 3. Redirect back to fruits index.
    res.redirect('/fruits')
  });
})

// Delete Fruit Route - Delete a fruit from the database
router.delete('/:fruitId', (req, res) => {
  // Logic for deleting fruit
  const fruitId = req.params.fruitId;
  db.Fruit.findByIdAndDelete(fruitId, (err) => {
    if(err) return console.log(err)
    res.redirect('/fruits');
  })
})


// Fruit Edit Route - Serves a form to submit info for updating the fruit
router.get('/:fruitId/edit', (req, res) => {
  db.Fruit.findById(req.params.fruitId, (err, foundFruit) => {
    if(err) return console.log(err)
    res.render('edit.ejs', { oneFruit: foundFruit });
  })
});

// Create a route to handle a PUT to /fruits/:fruitIndex

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

  // Step 1: Search for a Fruit by its ID in the DB
  // Step 1b: Give the function the new data to replace the old
  // Step 2: Check for errors
  // Step 3: redirect back to the show page
  db.Fruit.findByIdAndUpdate(req.params.fruitId, req.body, (err, updatedFruit) => {
    if(err) return console.log(err)

    res.redirect(`/fruits/${req.params.fruitId}`)
  })
})

module.exports = router;

/*
C - Create
R - Read
U - Update
D - Delete
*/