import { taskRoute } from './route/task.route.js';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

// create a basic server
const taskServer = new express();

taskServer.listen(9000, ()=> {
    console.log("server is running on port: 9000")
})

// parse middleware
taskServer.use(express.json());
// cors middleware
taskServer.use(cors());


// database connection
mongoose.connect("mongodb://localhost:27017/");

// check database connection
const taskDb = mongoose.connection;
taskDb.on("open", ()=> {
    console.log("database connection is successfull");
}) 
taskDb.on("error", ()=> {
    console.log("database connection is failed");
})

// passing taskServer into taskRoute
taskRoute(taskServer)
