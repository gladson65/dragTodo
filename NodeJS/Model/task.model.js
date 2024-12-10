import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({

    task: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        required: true
    },
    id: {
        type: Number,
        required: true
    }
})

const taskModel = mongoose.model('tasks', taskSchema);
export default taskModel;