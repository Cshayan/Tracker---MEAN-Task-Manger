/*
 * All list routes
 */

// Dependencies and other files
const express = require('express');
const router = express.Router();
const List = require('../models/list_model');
const Task = require('../models/task_model');


/* POST /lists
 * Retrieves all the lists from the database specific to a userID
 */
router.post('/', async (req, res) => {
    try {
        const lists = await List.find({
            userID: req.body.userID
        });
        res.json(lists);
    } catch (error) {
        console.log('Error in retrieving all the lists:- ' + error);
    }
});

/* POST /lists
 * Posts/Creates any new list in the database specific to a user and retrieves all the current lists from it
 */
router.post('/create', async (req, res) => {
    const newList = new List({
        title: req.body.title,
        userID: req.body.userID
    });

    try {
        const lists = await newList.save();
        res.json(lists);
    } catch (error) {
        console.log('Error in posting the lists:- ' + error);
        res.json({
            success: false,
            message: 'Cannot post lists'
        });
    }
});

/* PATCH /lists/:id
 * Updates the title of any lists and sends back a success msg
 */
router.patch('/:id', async (req, res) => {
    try {
        await List.findByIdAndUpdate({
            _id: req.params.id,
            userID: req.body.userID
        }, {
            $set: {
                title: req.body.title
            }
        });

        res.json({
            success: true,
            message: 'Updated list successfully'
        });
    } catch (error) {
        console.log('Error in updating the lists:- ' + error);
        res.json({
            success: false,
            message: 'Cannot Update lists'
        });
    }
});

/* DELETE /lists/:id 
 * Deletes the list by id and sends back a success msg
 */
router.delete('/:id', async (req, res) => {
    try {
        await List.findByIdAndRemove({
            _id: req.params.id,
            userID: req.body.userID
        });

        res.json({
            success: true,
            message: 'Deleted successfully lists'
        });
    } catch (error) {
        console.log('Error in deleting the lists:- ' + error);
        res.json({
            success: false,
            message: 'Cannot Delete lists'
        });
    }
});

/* GET /lists/:listID/tasks 
 * Retrieves back all the tasks within a specified list
 */
router.get('/:listID/tasks', async (req, res) => {
    try {
        let allTasks = await Task.find({
            _listID: req.params.listID
        });
        res.json(allTasks);
    } catch (error) {
        console.log('Error in retrieving the tasks:- ' + error);
    }
});

/* GET /lists/:listID/tasks/:taskID 
 *  Retrieves back only single specified task within a specified list
 */
router.get('/:listID/tasks/:taskID', async (req, res) => {
    try {
        let task = await Task.findOne({
            _id: req.params.taskID,
            _listID: req.params.listID
        });

        res.json(task);
    } catch (error) {
        console.log('Error in retrieving the specific task:- ' + error);
    }
});

/* POST /lists/:listID/tasks
 * Creates all the task within a specified list and sends back the newly created task with listID
 */
router.post('/:listID/tasks', async (req, res) => {
    let newTask = new Task({
        title: req.body.title,
        _listID: req.params.listID
    })

    try {
        let task = await newTask.save();
        res.json(task);
    } catch (error) {
        console.log('Error in creating the tasks:- ' + error);
        res.json({
            success: false,
            message: 'Cannot create task'
        });
    }
})

/* PATCH /lists/:listID/tasks/:taskID/complete 
 * Updates a specific task within a specific list by making the complete true or false
 */
router.patch('/:listID/tasks/:taskID/complete', async (req, res) => {
    try {
        await Task.findByIdAndUpdate({
            _id: req.params.taskID,
            _listID: req.params.listID
        }, {
            $set: {
                completed: req.body.completed
            }
        });

        res.json({
            success: true,
            message: 'Marked or unmarked tasks successfully'
        });
    } catch (error) {
        console.log('Error in updating the tasks:- ' + error);
        res.json({
            success: false,
            message: 'Cannot Update task'
        });
    }
});


/* PATCH /lists/:listID/tasks/:taskID/important 
 * Updates a specific task within a specific list by making the isImportant true or false
 */
router.patch('/:listID/tasks/:taskID/important', async (req, res) => {
    try {
        await Task.findByIdAndUpdate({
            _id: req.params.taskID,
            _listID: req.params.listID
        }, {
            $set: {
                isImportant: req.body.isImportant
            }
        });

        res.json({
            success: true,
            message: 'Marked or unmarked tasks as Important or umiportant successfully'
        });
    } catch (error) {
        console.log('Error in updating the tasks:- ' + error);
        res.json({
            success: false,
            message: 'Cannot Update task'
        });
    }
});


/* PATCH /lists/:listID/tasks/:taskID 
 * Updates a specific task within a specific list by changing the title
 */
router.patch('/:listID/tasks/:taskID', async (req, res) => {
    try {
        await Task.findByIdAndUpdate({
            _id: req.params.taskID,
            _listID: req.params.listID
        }, {
            $set: {
                title: req.body.title
            }
        });

        res.json({
            success: true,
            message: 'Updated title of the tasks successfully'
        });
    } catch (error) {
        console.log('Error in updating the tasks:- ' + error);
        res.json({
            success: false,
            message: 'Cannot Update task'
        });
    }
});

/* DELETE /:listID/tasks/:taskID 
 *  Delete a specified task within a specified list
 */
router.delete('/:listID/tasks/:taskID', async (req, res) => {
    try {
        await Task.findByIdAndRemove({
            _id: req.params.taskID,
            _listID: req.params.listID
        });

        res.json({
            success: true,
            message: 'Deleted tasks successfully'
        });
    } catch (error) {
        console.log('Error in deleting the tasks:- ' + error);
        res.json({
            success: false,
            message: 'Cannot Delete task'
        });
    }
});

/*  GET /lists/:listID/tasks/:taskID/get-description
 *  Retrieves back the description of a specified task of a specified list
 */
router.get('/:listID/tasks/:taskID/get-description', async (req, res) => {
    try {
        const task = await Task.find({
            _id: req.params.taskID,
            _listID: req.params.listID
        });

        res.json({
            success: true,
            msg: task
        });
    } catch (error) {
        res.json({
            success: false,
            err: 'Error in retrieving the decription of the task:- ' + error
        });
    }
});

/* PATCH /lists/:listID/tasks/:taskID/add-description
 * Updates the current description of the specified task of a specified list
 */
router.patch('/:listID/tasks/:taskID/add-description', async (req, res) => {
    try {
        await Task.findByIdAndUpdate({
            _id: req.params.taskID,
            _listID: req.params.listID
        }, {
            $set: {
                description: req.body.description
            }
        });

        res.json({
            success: true,
            msg: 'Description saved successfully'
        });
    } catch (error) {
        res.json({
            success: false,
            err: 'Error in saving the decription of the task:- ' + error
        });
    }
});

/* PATCH lists/:listID/tasks/:taskID/add-deadline
 * Add deadline and priority to a specified task 
 */
router.patch('/:listID/tasks/:taskID/add-deadline', async (req, res) => {
    try {
        await Task.findByIdAndUpdate({
            _id: req.params.taskID,
            _listID: req.params.listID
        }, {
            $set: {
                startingDate: req.body.startingDate,
                endingDate: req.body.endingDate,
                priority: req.body.priority
            }
        });

        res.json({
            success: true,
            msg: 'Deadline added!'
        });
    } catch (error) {
        res.json({
            success: false,
            err: 'Error in saving the deadline of the task:- ' + error
        });
    }
});

/* GET lists/:listID/tasks/:taskID/get-deadline
 * Retrieves back the deadline of any task
 */
router.get('/:listID/tasks/:taskID/get-deadline', async (req, res) => {
    try {
        const task = await Task.find({
            _id: req.params.taskID,
            _listID: req.params.listID
        });
    
        res.json({
            success: true,
            msg: task
        });
    } catch (error) {
        res.json({
            success: false,
            msg: 'Error in getting the deadline of the tasks' + error
        });
    }
});

module.exports = router;