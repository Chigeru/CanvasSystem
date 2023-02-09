import User from '../models/User.js';
import Task from '../Models/Task.js';
import TaskStatus from '../Models/TaskStatus.js';
import TaskCategory from '../Models/taskCategory.js';



const SERVER_KEY = process.env.SECRET;

export const postTask = async (req, res) => {
  const {apiKey} = req.query;
  if(apiKey != SERVER_KEY) {
    return res.send(401);
  }
  const data = new Task({
    worktype: req.body.worktype,
    title: req.body.title,
    description: req.body.description,
    deadline: req.body.deadline,
    startAt: req.body.startAt,
    status: req.body.status,
    users: req.body.users
  });

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(404).json({message: error.message});
  }
}

export const postUser = async (req, res) => {
  const {apiKey} = req.query;
  if(apiKey != SERVER_KEY) {
    return res.send(401);
  }
  const data = new User({
    name: req.body.name
  });
  
  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(404).json({message: error.message});
  }
}

export const postStatus = async (req, res) => {
  const {apiKey} = req.query;
  if(apiKey != SERVER_KEY) {
    return res.send(401);
  }
  const data = new TaskStatus({
    name: req.body.name
  });

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(404).json({message: error.message});
  }
}

export const postTaskCategory = async (req, res) => {
  const {apiKey} = req.query;
  if(apiKey != SERVER_KEY) {
    return res.send(401);
  }
  const data = new TaskCategory({
    name: req.body.name
  });

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(404).json({message: error.message});
  }
}
