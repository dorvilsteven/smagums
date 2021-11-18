const path = require("path");
const express = require("express");
const mysql = require("mysql2");
const exphbs = require("express-handlebars");
const routes = require("./controllers/");
const router = require("./controllers/home-routes");
const { REPL_MODE_SLOPPY } = require("repl");

const app = express();
const PORT = process.env.PORT || 3001;
const hbs = exphbs.create({});

// middleware
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Add routes
app.use(routes);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
