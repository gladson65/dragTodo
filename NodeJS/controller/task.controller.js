import taskModel from "../Model/task.model.js";



// create new task
export function createTask(req, res) {

    const { task, completed, id } = req.body;

    const newTask = new taskModel({
        task: task,
        completed: completed,
        id: id
    })

    newTask.save().then((data) => {
        if(!data) {
            return res.status(400).json({message: "Something went wrong"});
        }

        return res.status(200).json({message: "Your task has been created successfully!"});
    }).catch((error)=> {
        return res.status(500).json({error: error.message})
    })
} 


// to fetch all tasks
export function getTasks(req, res) {

    taskModel.find().then((data)=> {
        if(!data) {
            return res.status(404).json({message: "No data found!"})
        }

        res.json(data);
    
    }).catch((error) => {
        return res.status(500).json({error: error.message})
    })
} 


// update task status
export function updateStatus(req, res) {

    const { status, id } = req.body;

    taskModel.findOneAndUpdate({id: id}, {completed: status}).then((data) => {

        if (!data) {
            return res.status(404).json({message: `No task found with this ID: ${id}`})
        }

        return res.status(201).json({message: "Task status successfuly updated"})
    
    }).catch((error) => {
        return res.status(500).json({error: error.message});
    }) 
}