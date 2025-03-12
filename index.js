const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { connectDb } = require("./config/db");
const tasksroutes = require("./routes/tasks.routes");

dotenv.config();
const app = express();

// Configure CORS to allow requests from your frontend
app.use(
  cors({
    origin: "https://bosetodo.netlify.app",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use(express.json());

connectDb();
app.use("/api", tasksroutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
