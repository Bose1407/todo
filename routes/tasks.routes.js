const express = require("express"); // Importing Express to create a router
const router = express.Router(); // Creating a router instance

const Task = require('../models/Task'); // Importing the Task model (not used here directly but may be useful for middleware)

const { 
    createTask, 
    getSingleTask, 
    getAllTasks, 
    updateTask, 
    deleteTask 
} = require('../controllers/task.controllers'); // Importing the task controller functions

// Route to create a new task
// Endpoint: POST /tasks
// This route calls the `createTask` controller to handle the creation of a task
router.post('/tasks', createTask);

// Route to get all tasks
// Endpoint: GET /tasks
// This route calls the `getAllTasks` controller to fetch all tasks from the database
router.get('/tasks', getAllTasks);

// Route to get a single task by its ID
// Endpoint: GET /tasks/:taskId
// This route calls the `getSingleTask` controller to fetch a specific task by its ID
router.get('/tasks/:taskId', getSingleTask);

// Route to update a task by its ID
// Endpoint: PUT /tasks/:taskId
// This route calls the `updateTask` controller to handle task updates
router.put('/tasks/:taskId', updateTask);

// Route to delete a task by its ID
// Endpoint: DELETE /tasks/:taskId
// This route calls the `deleteTask` controller to delete a specific task
router.delete('/tasks/:taskId', deleteTask);

module.exports = router; // Exporting the router to use in other parts of the application
