import { createTask, getTasks, updateStatus } from "../controller/task.controller.js"


export function taskRoute(taskServer) {
    taskServer.post("/api/create", createTask),
    taskServer.get("/api/tasks", getTasks),
    taskServer.put("/api/update", updateStatus)
}