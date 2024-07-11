const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchUser')

const JWT_SECTRET = 'dhruvdhruvdhruv';

// Route 1 : Create a User using : POST "/api/auth/createUser". No login required
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter a valid password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success = false;
    // if there are error return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //check whether the user with this email exists already
    try {
      let user = await User.findOne({success, email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry a user with this email already exists" });
      }
      // hashing of the password
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password,salt);
      //create a new user
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });
      const data = {
        user:{
            id : user.id,
        }
      }
     const authtoken = jwt.sign(data,JWT_SECTRET);
     success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server Error");
    }
  }
);

//Route 2 : authenticate a User using : POST "/api/auth/login". No login required

router.post(
    "/login",
    [
      body("email", "Enter a valid email").isEmail(),
      body("password", "Password Cannot be blank").exists(),
    //   body("password", "Enter a valid password").isLength({ min: 5 }),
    ],
    async (req, res) => {
     let success = false;
    // if there are error return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {email , password} = req.body;
    try {
        let user = await User.findOne({email:email});
        if(!user){
          success = false;
            return res.status(400).json({error : "Please try to login with correct credentials"})
        }

        const passwordCompare = await bcrypt.compare(password,user.password);
        if(!passwordCompare){
          success = false;
            return res.status(400).json({success,error : "Please try to login with correct credentials"})
        }
        const data = {
            user:{
                id : user.id,
            }
          }
         const authtoken = jwt.sign(data,JWT_SECTRET);
         success = true;
          res.json({success, authtoken });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server Error");
    }
    })

//Route 3 : Get loggedin user details using : POST "/api/auth/getuser".login required

router.post("/getuser" , fetchUser, async (req, res) => {
    try {
        let userId = req.user.id;
        const user  = await User.findById(userId).select("-password");
        res.send(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server Error");
    }
})


module.exports = router;

