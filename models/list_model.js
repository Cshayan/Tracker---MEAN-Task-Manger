/* 
 * Model for MongoDB database
 */

// All Dependencies
const mongoose = require('mongoose');

// List Schema
const ListSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    userID: {
        type: mongoose.Types.ObjectId,
        required: true
    }
});

module.exports = mongoose.model('List', ListSchema);