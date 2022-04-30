const router = require("express").Router();
const { User, Post, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// get all users
router.get("/", (req, res) => {
    User.findAll({
        attributes: { exclude: ["password"] }
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// get a single user

// create a user

// update a user

// delete a user