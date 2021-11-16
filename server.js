const mysql = require("mysql2");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Add api routes
app.get("/", (req, res) => {
  res.send("hi");
});

// Helper functions:
function searchProducts() {
  if (query.brandName) {
    // brandName
  }
  // productTypes
}

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
