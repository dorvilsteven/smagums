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

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
