const express = require("express");
const Blog = require("../models/blog");

const router = express.Router();

router.get("/", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { title: "All Blogs", blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/", (req, res) => {
  console.log(req.body);
  const blog = new Blog(req.body);
  blog
    .save()
    .then((result) => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/create", (req, res) => {
  res.render("create", { title: "create" });
});

router.get("/:id", (req, res) => {
  console.log(req.params.id);
  Blog.findById(req.params.id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

// Obviously you need a button and a fetch call on the front end to make this happen, but given the situation I have and how I don't want to create the ejs, I'm not gonna test this, but that it works.
// router.delete("/:id", (req, res) => {
router.get("/delete-single/:id", (req, res) => {
  console.log(req.params.id);
  Blog.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
