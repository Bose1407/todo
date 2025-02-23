const Task = require('../models/Task') // Importing the Task model from the models folder

// Controller to create a new task
const createTask = async (req, res) => {
    const { title, description, dueDate } = req.body; // Extracting fields from the request body

    // Validate that all required fields are provided
    if (!title || !description || !dueDate) {
        return res.status(400).json({ msg: "Parameters Missing to Create Task" });
    }

    try {
        // Creating a new task instance using the Task model
        const task = new Task({ title, description, dueDate });
        await task.save(); // Saving the task to the database

        res.status(201).json(task); // Sending the created task as a response
    } catch (err) {
        res.status(500).json({ msg: "Error Occurs at CreateTask Controller" }); // Handling any server errors
    }
}

// Controller to retrieve all tasks
const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({}); // Fetching all tasks from the database

        // If no tasks are found, send a 404 response
        if (!tasks) {
            return res.status(404).json({ msg: "No Tasks Found" });
        }

        res.status(200).json(tasks); // Sending the list of tasks as a response
    } catch (err) {
        res.status(500).json({ msg: "Error Occurred at getAllTasks Route" }); // Handling any server errors
    }
}

// Controller to retrieve a single task by its ID
const getSingleTask = async (req, res) => {
    try {
        const id = req.params.taskId; // Extracting the task ID from the request parameters

        // Check if the ID is provided
        if (!id) {
            return res.status(404).json({ msg: "Task id is not provided in the params" });
        }

        const task = await Task.findById({ _id: id }); // Fetching the task from the database using its ID

        // If the task is not found, send a 404 response
        if (!task) {
            return res.status(404).json({ msg: "Task Not Found" });
        }

        res.status(200).json(task); // Sending the task details as a response
    } catch (err) {
        res.status(500).json({ msg: "Error Occurred At getSingleTask Controller" }); // Handling any server errors
    }
}

// Controller to update a task by its ID
const updateTask = async (req, res) => {
    try {
        const id = req.params.taskId; // Extracting the task ID from the request parameters
        const { title, description, dueDate } = req.body; // Extracting updated fields from the request body

        // Check if the ID is provided
        if (!id) {
            return res.status(404).json({ msg: "Task id is not provided in the params" });
        }

        // Updating the task in the database
        const task = await Task.findByIdAndUpdate(
            id,
            {
                title,
                description,
                dueDate,
                updatedAt: Date.now() // Updating the updatedAt timestamp
            },
            { new: true } // Return the updated task
        );

        // If the task is not found, send a 400 response
        if (!task) {
            return res.status(400).json({ msg: "Task Not found To update it!!" });
        }

        res.status(200).json(task); // Sending the updated task as a response
    } catch (err) {
        res.status(500).json({ msg: "Error Occurred At updateTask Controller" }); // Handling any server errors
    }
}

// Controller to delete a task by its ID
const deleteTask = async (req, res) => {
    try {
        const id = req.params.taskId; // Extracting the task ID from the request parameters

        // Check if the ID is provided
        if (!id) {
            return res.status(404).json({ msg: "Task id is not provided in the params" });
        }

        // Deleting the task from the database
        const task = await Task.findByIdAndDelete({ _id: id });

        // If the task is not found, send a 400 response
        if (!task) {
            return res.status(400).json({ msg: "Task Not found To Delete it!!" });
        }

        res.status(200).json({ msg: "Task Deleted Successfully" }); // Sending a success message as a response
    } catch (err) {
        res.status(500).json({ msg: "Error Occurred At deleteTask Controller" }); // Handling any server errors
    }
}

// Exporting all task-related controllers
module.exports = {
    createTask,
    getAllTasks,
    getSingleTask,
    updateTask,
    deleteTask
}
