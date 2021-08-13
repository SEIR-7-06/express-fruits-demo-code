const db = require('./models/index.js');

// A query to delete all of the fruits
db.Fruit.deleteMany({}, (err) => {
  console.log('Deleted all fruits!');
});