const express = require("express");
const User = require("../models/UserModel");
//express.Router -> used to create new object to handle the request and also helps manage the diff. multiple request
const router = express.Router();
//validator -> helps to apply checks on models values;
const { body, validationResult } = require('express-validator');
//helps to protect the password from the hackers
//we can use hash,salt with the help of bcryptjs
const bcrypt = require("bcryptjs");
//jwt -> helps to facilitate secure connection between client and server;
var jwt = require('jsonwebtoken');
const JWT_SECRET = require("../JWTsecret");
var fetchuser = require("../middleware/fetchuser");

//api -> /api/auth/creatuser -> creating the new user -> no login required
router.post('/createuser', [
    //in form of array all validators can be apply;
    body('name', 'Min. 2 characters').isLength({ min: 2 }),
    body('email', 'Email is incorrect').isEmail(),
    body('password', 'Min. 8 characters').isLength({ min: 8 }),
    //.custom -> is used to make our own validation
    body('ConfirmPassword', 'Password mismatched,Kindly check the password').custom((value, { req }) => {
        if (value !== req.body.password) {
            console.log("Password mismatched");
            return false;
        } else {
            return true;
        }
    })
], async (req, res) => {
    //after validation some value mismatched
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() })
    }
    //check wether the email is already exist or not
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "Please check the email, this email is already exist" });
        }

        //salt -> this add the more characters on its own with the password in backend
        //genSalt -> its a function helps to add the salt (10) means add 10 characters
        let salt = await bcrypt.genSalt(10);
        //hash -> convert password in the random string and store in the db
        let securePass = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: securePass,
            ConfirmPassword: securePass
        })

        const data = {
            user: {
                id: user.id
            }
        }

        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({ authtoken });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error occured");
    }
});


//Authnticating user with creds, api -> /api/auth/login -> no login required
router.post('/login', [
    body('email', 'Entered email is invalid').isEmail(),
    //exists -> check weather the field of the password is blank or not
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
    //error
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() })
    }

    //destructuring
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Please try to login with correct credentials" });
        }

        //comapre -> check entered string and hash string from db is same or not and return boolean
        let passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ error: "Please try to login with correct credentials" });
        }

        //if password is correct then send payload and then sign and send jwt;
        const data = {
            user: {
                id: user.id
            }
        }

        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({ authtoken });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Internal error occured");
    }

});

////get user with , api -> /api/auth/getuser -> login required
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
});
module.exports = router;