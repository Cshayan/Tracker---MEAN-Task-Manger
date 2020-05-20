/*
 *  File for sending email for task reminder
 */

// Bring in dependencies
const express = require('express');
const router = express.Router();
const sgMail = require('@sendgrid/mail');
require('dotenv').config();

/*  POST /mail
 *  Send mail for task reminder
 */
router.post('/', (req, res) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    //Convert the sending date to UNIX timestamp
    const unixDate = parseInt((new Date(req.body.sendingDate).getTime() / 1000).toFixed(0));

    const msg = {
        to: req.body.email,
        from: 'iamshayan56@gmail.com',
        templateId: 'd-0467a762d51d4b56a043a2c9785e45fd',
        dynamic_template_data: {
            taskTitle: req.body.title
        },
        send_at: unixDate
    };
    if (!sgMail.send(msg)) {
        res.json({
            success: false,
            msg: 'Email cannot be sent'
        });
    } else {
        res.json({
            success: true,
            msg: 'Email will be sent at ' + req.body.sendingDate
        });
    }
});

module.exports = router;