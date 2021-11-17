<<<<<<< HEAD
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Code Here

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});
=======
const path = require('path');
const express = require("express");
const mysql = require("mysql2");
const exphbs = require('express-handlebars');
const routes = require('./controllers/');

const app = express();
const PORT = process.env.PORT || 3001;
const hbs = exphbs.create({});

// middleware
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Add routes
app.use(routes);

// Add api routes

// Helper functions:
// function searchProducts() {
//   if (query.brandName) {
//     // brandName
//   }
//   // productTypes
// }

// API routes:
// router.get(‘/api/products/:id’, callback function)
// router.get(‘/api/products’, callback function) {
//     searchProducts()
// }
// router.get(‘/api/favorites’, callback)

// router.get(‘/login’, callback)

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
>>>>>>> main
