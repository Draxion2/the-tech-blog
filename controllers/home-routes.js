const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment } = require("../models");

// display all posts
router.get("/", (req, res) => {
    Post.findAll({
        attributes: [
            "id",
            "title",
            "contents",
            "user_id",
            "created_at"
        ],
        include: [
            {
                model: Comment,
                attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
                include: {
                    model: User,
                    attributes: ["username"]
                }
            },
            {
                model: User,
                attributes: ["username"]
            }
        ]
    })
    .then(dbPostData => {
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render("homepage", {
            posts,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// login
router.get("/login", (req, res) => {
    if (req.session.loggedIn) {
        res.redirect("/");
        return;
    }
    res.render("login");
});

// display one post
router.get("/post/id", (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            "id",
            "title",
            "comments",
            "created_at"
        ],
        include: [
            {
                model: Comment,
                attributes: ["id", "comment_text", "post_id", "created_at"],
                include: [
                    {
                        model: User,
                        attributes: ["username"]
                    }
                ]
            },
            {
                model: User,
                attributes: ["username"]
            }
        ]
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status.json({ message: "No post found with his id"});
            return;
        }
        const post = dbPostData.get({ plain: true });
        res.render("single-post", {
            post,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;