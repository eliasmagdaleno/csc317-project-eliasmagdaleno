var validator = require("validator");
var db = require("../conf/database");
module.exports = {
  usernameCheck: function (req, res, next) {
    var { username } = req.body;
    username = username.trim();
    if (!validator.isLength(username, { min: 3 })) {
      req.flash("error", "username must be 3 or more characters");
    }

    if (!/[a-zA-Z]/.test(username.charAt(0))) {
      req.flash("error", "username must begin with a character");
    }
    if (req.session.flash.error) {
      res.redirect("/register");
    } else {
      next();
    }
  },
  passwordCheck: function (req, res, next) {
    var { password } = req.body;
    password = password.trim();
    if (!validator.isLength(password, { min: 8 })) {
      req.flash("error", "password must be at least 8 characters");
    }

    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[/\-*+!@#$^&~\[\]])/;

    if (!regex.test(password)) {
      req.flash(
        "error",
        "password must contain at least 1 uppercase letter, 1 number, and 1 of the following special characters: / * - + ! @ # $ ^ & ~ [ ]"
      );
    }

    if (req.session.flash.error) {
      res.redirect("/register");
    } else {
      next();
    }
  },
  emailCheck: function (req, res, next) {
    var { email } = req.body;
    email = email.trim();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      req.flash("error", "email is invalid");
    }
    if (req.session.flash.error) {
      res.redirect("/register");
    } else {
      next();
    }
  },
  tosCheck: function (req, res, next) {
    var { tosCheck } = req.body;
    if (tosCheck.checked == false) {
      req.flash("error", "TOS must be checked");
    }
    if (req.session.flash.error == false) {
      res.redirect("/register");
    } else {
      next();
    }
  },
  ageCheck: function (req, res, next) {
    var { ageCheck } = req.body;
    if (ageCheck.checked) {
      req.flash("error", "you must be at least 13 or older to register");
    }
    if (req.session.flash.error) {
      res.redirect("/register");
    } else {
      next();
    }
  },
  isUsernameUnique: async function (req, res, next) {
    var { username } = req.body;
    try {
      //username check
      var [rows, fields] = await db.execute(
        `select id from users where username=?;`,
        [username]
      );
      if (rows && rows.length > 0) {
        req.flash("error", `${username} is already taken`);
        return req.session.save(function (err) {
          return res.redirect("/register");
        });
      } else {
        next();
      }
    } catch (error) {
      next(error);
    }
  },
  isEmailUnique: async function (req, res, next) {
    var { email } = req.body;
    try {
      //email check
      var [rows, fields] = await db.execute(
        `select id from users where email=?;`,
        [email]
      );
      console.log(rows);
      if (rows && rows.length > 0) {
        req.flash("error", `${email} is already taken`);
        return req.session.save(function (err) {
          return res.redirect("/register");
        });
      }
    } catch (error) {
      next();
    }
  },
};
