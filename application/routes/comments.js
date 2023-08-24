var express = require("express");
var router = express.Router();
var { isLoggedIn } = require("../middleware/auth");
var db = require("../conf/database");
router.post("/create", isLoggedIn, async function (req, res, next) {
  var { userId, username } = req.session.user;
  var { postId, comment } = req.body;
  try {
    var [insertResult, _] = await db.execute(
      `INSERT INTO comments (text,fk_postId,fk_authorId) VALUE (?,?,?)`,
      [comment, postId, userId]
    );
    if (insertResult && insertResult.affectedRows == 1) {
      res.status(201).json({
        commentId: insertResult.insertId,
        username: username,
        commentText: comment,
      });
    } else {
      //add what to do when you cant insert for database reasons
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
