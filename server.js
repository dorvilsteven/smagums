const path = require("path");
const express = require("express");
const mysql = require("mysql2");
const exphbs = require("express-handlebars");
const routes = require("./controllers/");
const sequelize = require("./config/connection");
const { REPL_MODE_SLOPPY } = require("repl");
const session = require("express-session");

const app = express();
const PORT = process.env.PORT || 3001;
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const { SESS_NAME = "sid", SESS_SECRET = "canyouguessmysecret" } = process.env;

const hbs = exphbs.create({});

// middleware

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// use session for authentication
app.use(
  session({
    secret: SESS_SECRET,
    name: SESS_NAME,
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize,
    }),
  })
);

// Add routes
app.use(routes);

// turn on connection to db with Sequelize, and then server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });
});
