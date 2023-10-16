const express = require('express');
const taskController = require('../controllers/taskController')
const verifyToken = require('../middleware/verifyToken')
const router = express.Router();
// Get all tasks
router.get('',verifyToken ,taskController.getAllTasks);

// Get a task by ID
router.get('/:id',verifyToken, taskController.getTaskById);

// Create a new task
router.post('',verifyToken, taskController.createTask);

// Update a task by ID
router.put('/:id',verifyToken, taskController.updateTask);

// Delete a task by ID
router.delete('/:id',verifyToken, taskController.deleteTask);

module.exports = router;
