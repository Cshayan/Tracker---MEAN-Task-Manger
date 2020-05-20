/*
 *  File for account token verification
 */

// Bring in the dependencies
const express = require('express');
const router = express.Router();

// Bring in the model
let User = require('../models/User_model');

router.post('/', async (req, res) => {
    try {
        // Find the user from the database
        const user = await User.findOne({
            email: req.body.email
        });

        // If no such user exists, display error
        if (!user) return res.json({
            success: false,
            err: 'No account with such email exists'
        });

        // Check the token for matching
        if (user.verifyToken !== req.body.verifyToken)
            return res.json({
                success: false,
                err: 'Invalid token provided!'
            });
        
        // Here the token is verified, so update the verified status of the user to true
        try {
             await User.findByIdAndUpdate({
                _id: user._id,
                email: user.email
            }, {
                    $set: {
                    verified: true,
                    verifyToken: ''    
                }
            });

            res.json({
                success: true,
                msg: 'Account verified successfully!'
            });
        } catch (error) {
            res.json({
                success: false,
                err: 'Error in updating the user:-  ' + error
            });
        }

    } catch (error) {
        res.json({
            success: false,
            err: 'Error in finding the user:-  ' + error
        });
    }
});

// Export the router
module.exports = router;