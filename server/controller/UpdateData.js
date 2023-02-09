import User from "../models/User.js";
import Task from "../Models/Task.js";
import TaskStatus from "../Models/TaskStatus.js";
import TaskCategory from "../Models/taskCategory.js";

/*
* Why does these two lines affect the other models?
* reference difficulties, maybe?
*/
import dotenv from "dotenv";
dotenv.config();

const SERVER_KEY = process.env.SECRET;

export const updateStatus = async (req, res) => {
  const {apiKey} = req.query;
  if(apiKey != SERVER_KEY) {
    return res.send(401);
  }
  else {

    try {
      const id = req.body._id;
      const updatedEntity = req.body;
      const options = { new: true };
      const result = await TaskStatus.findByIdAndUpdate(id, updatedEntity, options);
      
      res.status(200).send(result);
    } catch (error) {
      res.status(404).json({ message: error });
    }
  }
};

export const updateTask = async (req, res) => {
  const {apiKey} = req.query;
  if(apiKey != SERVER_KEY) {
    return res.send(401);
  }
  try {
    const id = req.body._id;
    const updatedEntity = req.body;
    const options = { new: true };
    const result = await Task.findByIdAndUpdate(id, updatedEntity, options);

    res.status(200).send(result);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const updateUser = async (req, res) => {
  const {apiKey} = req.query;
  if(apiKey != SERVER_KEY) {
    return res.send(401);
  }
  try {
    const id = req.body._id;
    const updatedEntity = req.body;
    const options = { new: true };
    const result = await User.findByIdAndUpdate(id, updatedEntity, options);

    res.status(200).send(result);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const updateTaskCategory = async (req, res) => {
  const {apiKey} = req.query;
  if(apiKey != SERVER_KEY) {
    return res.send(401);
  }
  try {
    const id = req.body._id;
    const updatedEntity = req.body;
    const options = { new: true };
    const result = await TaskCategory.findByIdAndUpdate(id, updatedEntity, options);

    res.status(200).send(result);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};
