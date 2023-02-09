import User from '../models/User.js';
import Task from '../Models/Task.js';
import TaskStatus from '../Models/TaskStatus.js';
import TaskCategory from '../Models/taskCategory.js';

const SERVER_KEY = process.env.SECRET;

export const deleteStatus = async (req, res) => {
  const {apiKey} = req.query;
  if(apiKey != SERVER_KEY) {
    return res.send(401);
  }
  try {
    const id = req.body._id;
    const result = await TaskStatus.findByIdAndDelete(id);
    res.status(200).send(`Deleted: ${result.name}`);
  } catch (error) {
    res.status(404).json({ message: error });
  }
}

export const deleteUser = async (req, res) => {
  const {apiKey} = req.query;
  if(apiKey != SERVER_KEY) {
    return res.send(401);
  }
  try {
    const id = req.body._id;
    const result = await User.findByIdAndDelete(id);
    res.status(200).send(`Deleted: ${result.name}`);
  } catch (error) {
    res.status(404).json({ message: error });
  }
}

export const deleteTask = async (req, res) => {
  const {apiKey} = req.query;
  if(apiKey != SERVER_KEY) {
    return res.send(401);
  }
  try {
    const id = req.body._id;
    const result = await Task.findByIdAndDelete(id);
    res.status(200).send(`Deleted: ${result.title}`);
  } catch (error) {
    res.status(404).json({ message: error });
  }
}

export const deleteTaskCategory = async (req, res) => {
  const {apiKey} = req.query;
  if(apiKey != SERVER_KEY) {
    return res.send(401);
  }
  try {
    const id = req.body._id;
    const result = await TaskCategory.findByIdAndDelete(id);
    res.status(200).send(`Deleted: ${result.name}`);
  } catch (error) {
    res.status(404).json({ message: error });
  }
}