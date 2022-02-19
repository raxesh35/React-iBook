const express = require('express');
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const JWT_TOKEN = "raxkareactmind";

// Route 1 :: Created new User using :: POST "/api/auth/createnewuser"

router.post('/createnewuser', [
    body('name', 'Please enter a valid name').isLength({ min: 3 }),
    body('email', 'Please enter a valid email').isEmail(),
    body('password', 'Password must have minimum 5 characters').isLength({ min: 5 }),
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ errors: "Sorry email is already exists" });
        }
        const salt = await bcrypt.genSaltSync(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        })
        const data = {
            user : {
                id:user.id
            }
        };
        const authToken = jwt.sign(data, JWT_TOKEN);
        res.json({authToken})
        //res.json(user)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some errors occured (" + error.message + ")");
    }

});


// Route 2 :: Login User using :: POST "/api/auth/login"

router.post('/login', [
    body('email', 'Please enter a valid email').isEmail(),
    body('password', 'Password must have minimum 5 characters').exists(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const {email,password} = req.body;
        let user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({ errors: 'Please try to login with correct email id' });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ errors: 'Please try to login with correct password' });
        }

        const data = {
            user : {
                id:user.id
            }
        };
        const authToken = jwt.sign(data, JWT_TOKEN);
        res.json({authToken})
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some errors occured (" + error.message + ")");
    }
});

// Route 3 :: Get user info by token :: POST "/api/auth/login"

router.post('/getuserinfo', fetchuser ,async (req, res) => {
    try {
        const userId = req.user.id;
        const getUsr = await User.findById(userId).select('-password');
        res.send(getUsr);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some errors occured (" + error.message + ")");
    }
});

module.exports = router;