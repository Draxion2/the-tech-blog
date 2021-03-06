const router = require("express").Router();
const sequelize = require("sequelize");
const { Post, User, Comment } = require("../models");
const authentication = require("../utils/authentication");

// find all posts
router.get("/", authentication, (req, res) => {
    Post.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: [
            "id",
            "title",
            "contents",
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
        res.render("dashboard", { posts, loggedIn: true });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// edit post
router.get("/edit/:id", authentication, (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            "id",
            "title",
            "contents",
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
        if (!dbPostData) {
            res.status(404).json({ message: "No post found with this id"});
            return;
        }
        const post = dbPostData.get({ plain: true });
        res.render("edit-post", {
            post,
            loggedIn: true
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;