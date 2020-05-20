/*
 *  File to validate the response submitted from front-end for Registration purpose
 */

// All dependencies
const Joi = require('@hapi/joi');

// Register Validation Schema
const registerValidation = (data) => {
    // Create the schema
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required().min(6).max(1024)
    });

    // return the schema
    return schema.validate(data);
};

// export to use in other file
module.exports.registerValidation = registerValidation;