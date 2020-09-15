const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const {signout, signup, signin, isSignedIn} = require("../controllers/auth");
const User = require("../models/user");


router.post("/signup",[
    check("name").isLength({min: 2}).withMessage("Name must be atleat 2 char long."),
    check("email")
    .isEmail().withMessage("email is required")
    .custom(value => {
        return User.findOne({email: value}).then(usr => {
          if (usr) {
            return Promise.reject("Email already in use");
          }
        });
      }),
    check("password").isLength({min:3}).withMessage("password must be atleat 3 char long.")
],
signup);

router.post("/signin",[
    check("email").isEmail(),
    check("password").isLength({min:3}).withMessage("password field is required and must be atleast 3 char long.")
],
signin);

router.get("/signout", signout);


module.exports = router;