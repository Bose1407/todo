const express = require('express'); // Importing the Express framework for building the application
const dotenv = require('dotenv'); // Importing dotenv to manage environment variables
const { connectDb } = require('./config/db'); // Importing the function to establish database connection
const cors = require('cors'); 
const tasksroutes = require('./routes/tasks.routes'); // Importing the task routes

dotenv.config(); // Loading environment variables from a .env file into process.env

const app = express(); // Initializing the Express application
app.use(cors());
app.use(express.json()); // Middleware to parse incoming JSON requests

// Defining a base route for the task-related routes
// All routes in tasks.routes will be prefixed with '/api'
app.use('/api', tasksroutes);

// Defining the server port
// Defaults to 5000 if process.env.Port is not set
const Port = 5000 || process.env.Port;

// Starting the server
app.listen(Port, () => {
    try {
        connectDb(); // Connecting to the database when the server starts
        console.log(`Server Running at port ${Port}`); // Logging success message
    } catch (error) {
        console.log(error.message); // Logging errors if database connection fails
    }
});
