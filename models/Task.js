const mongoose = require("mongoose")

const TaskSchema = new mongoose.Schema({
    title : {
        type :String,
        required : true
    },
    description :{
        type: String,
    },
    dueDate:{
        type:Date
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default : Date.now
    }
})

module.exports = mongoose.model("Task",TaskSchema)
