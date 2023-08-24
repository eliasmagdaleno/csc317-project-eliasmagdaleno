var express = require("express");
const { getRecentPosts } = require("../middleware/posts");
const { isLoggedIn } = require("../middleware/auth");
var router = express.Router();

/* GET home page. */
router.get("/", getRecentPosts, function (req, res, next) {
  res.render("index", {
    title: "Home",
    name: "Elias Magdaleno",
  });
});

router.get("/login", function (req, res) {
  res.render("login", { title: "Login" });
});

router.get("/register", function (req, res) {
  res.render("register", { 
    js: ["registration.js"],
  });
});

router.get("/postvideo", isLoggedIn, function (req, res) {
  res.render("postvideo", { title: "Post a Video" });
});



module.exports = router;
