/*
 * All routes for Register and Login
 */

// All dependencies
const router = require('express').Router();
const Joi = require('@hapi/joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var random = require('random-string-generator');
// const sgMail = require('@sendgrid/mail');
require('dotenv').config();


// User Model
const User = require('../models/User_model');

// Validation File
const {
    registerValidation
} = require('../validation/validation');

/* POST /users/register
 * Register the user and sends back the user id
 */
router.post('/register', async (req, res) => {

    // Validate the user before storing it database
    const {
        error
    } = registerValidation(req.body);
    if (error) return res.json({
        success: false,
        err: error.details[0].message
    });

    // Next check if the user with same email already exists in the database or not
    const alreadyExistingUser = await User.findOne({
        email: req.body.email
    });
    if (alreadyExistingUser) return res.json({
        success: false,
        err: 'User already exits with same email'
    });

    // Then hash the password and store that in database
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);


    // Create the user from the response received from front-end
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
    });

    // Atlast, save the user to database
    try {
        await user.save();
        res.json({
            success: true,
            user: user._id,
            msg: 'Account Created. Login to your account!'
        });
    } catch (error) {
        res.json(error);
    }

});

/* POST /users/login
 * Logins the user and sends back the JSONWebToken 
 */
router.post('/login', async (req, res) => {

    // Check if the user exits in database
    const user = await User.findOne({
        email: req.body.email
    });
    if (!user) return res.json({
        success: false,
        msg: 'Email is incorrect!'
    });

    // Check if password is valid
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.json({
        success: false,
        msg: 'Password is incorrect!'
    });

    // Generate JWT
    const token = jwt.sign({
        _id: user._id
    }, process.env.TOKEN_SECRET);
    res.header('auth-token', token);

    // Here send back the JSONWebToken as user has successfully logged in
    res.json({
        success: true,
        id: user._id,
        token: token
    });

});

/* POST users/details
 * Retrieves details about a specific user 
 */
router.post('/details', async (req, res) => {
    try {
        const user = await User.findOne({
            _id: req.body.userID
        });
        res.json({
            success: true,
            name: user.name,
            email: user.email
        });
    } catch (error) {
        res.json({
            success: false,
            err: error
        });
    }
});

// /**** Utility Functions ****/
// function sendEmail(email, verifyToken) {
//     sgMail.setApiKey(process.env.SENDGRID_API_KEY);
//     const msg = {
//         to: email,
//         from: 'iamshayan56@gmail.com',
//         templateId: 'd-f6e680d6ca814cdaa8ce233cc1b98159',
//         dynamic_template_data: {
//             verifyToken: verifyToken
//         },
//     };

//     // If email sent successfully
//     if (sgMail.send(msg)) {
//         console.log('Email sent!');
//         return true;
//     } else {
//         console.log('Email cannot be sent');
//         return false;
//     }
// }


// Export the router
module.exports = router;