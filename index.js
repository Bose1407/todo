const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { connectDb } = require("./config/db");
const tasksroutes = require("./routes/tasks.routes");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

connectDb();
app.use("/api", tasksroutes);


app.listen(5000,()=>{
    console.log("server is listening....");
    
})
