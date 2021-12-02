const router = require("express").Router();
const { User } = require("../../models");

router.get("/", (req, res) => {
  // SELECT *
  //expects { "username": "some", "email":"some@gmail.com", "password": "some"}
  User.findAll({
    //attributes: { exclude: ["password"] },
  })
    .then((data) => res.json(data))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// read a specific user by id: /api/users/1
router.get("/:id", (req, res) => {
  User.findOne({
    where: { id: req.params.id },
    //attributes: { exclude: ["password"] },
  })
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: "None found with this id" });
        return;
      }
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// create /api/users
router.post("/", (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  })
    .then((data) => res.json(data))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/login", (req, res) => {
  //expects {email: 'some@gmail.com', password: 'somepassword'}
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((data) => {
    if (!data) {
      res.status(400).json({ message: "No user with this email address" });
    }
    // res.json({ user: data });

    //Verify user
    const validPassword = data.checkPassword(req.body.password); //call checkPassword from model
    if (!validPassword) {
      res.status(400).json({ message: "Password incorrect" });
      return;
    }
    res.json({ user: data, message: "You're now logged in!" });
  });
});

// update /api/users/1
router.put("/:id", (req, res) => {
  User.update(req.body, {
    individualHooks: true, //goes with beoforeUpdate hooks
    where: {
      id: req.params.id,
    },
  })
    .then((data) => {
      if (!data[0]) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// destroy /api/users/1
router.delete("/:id", (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
