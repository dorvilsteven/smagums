const router = require("express").Router();

router.get("/", (req, res) => {
  console.log(req.session);
  res.render("homepage");
});

router.get("/login", (req, res) => {
  //if the session still stores your login as true, redirects to home after clicking login
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

module.exports = router;
