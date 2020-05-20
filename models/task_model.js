/* 
 * Model for MongoDB database
 */

// All Dependencies
const mongoose = require('mongoose');

// Task Schema
const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    _listID: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    isImportant: {
        type: Boolean,
        default: false
    }, 
    description: {
        type: String,
        required: true,
        default: 'No description of the task is present!'
    },
    startingDate: {
        type: Date,
        default: '',
    },
    endingDate: {
        type: Date,
        default: '',
    },
    priority: {
        type: Number
    },
    label: {
        type: String,
        default: ''
    }
});

module.exports = mongoose.model('Task', TaskSchema);