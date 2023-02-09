import User from '../models/User.js';
import Task from '../Models/Task.js';
import TaskStatus from '../Models/TaskStatus.js';
import TaskCategory from '../Models/taskCategory.js';

/* Routes functionality*/
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({})
    res.status(200).json(tasks);
  } catch (error) {
    res.status(404).json({message: error});
  }
}

export const getTask = async (req, res) => {
  try {
    const { id }  = req.params;
    const task = await Task.findById(id);
    res.status(200).json(task);
  } catch (error) {
    res.status(404).json({message: error});
  }
}

export const getStatuses = async (req, res) => {
  try {
    const statuses = await TaskStatus.find({});
    res.status(200).json(statuses);
  } catch (error) {
    res.status(404).json({message: error});
  }
}

export const getStatus = async (req, res) => {
  try {
    const { _id } = req.params;
    const statuses = await TaskStatus.findById(_id);
    res.status(200).json(statuses);
  } catch (error) {
    res.status(404).json({message: error});
  }
}

export const getUsers = async (req, res) => {
  try {
    const statuses = await User.find({});
    res.status(200).json(statuses);
  } catch (error) {
    res.status(404).json({message: error});
  }
}

export const getUser = async (req, res) => {
  try {
    const { _id } = req.params;
    const statuses = await User.findById(_id);
    res.status(200).json(statuses);
  } catch (error) {
    res.status(404).json({message: error});
  }
}

export const getTaskCategories = async (req, res) => {
  try {
    const statuses = await TaskCategory.find({});
    res.status(200).json(statuses);
  } catch (error) {
    res.status(404).json({message: error});
  }
}

export const getTaskCategory = async (req, res) => {
  try {
    const { _id } = req.params;
    const statuses = await TaskCategory.findById(_id);
    res.status(200).json(statuses);
  } catch (error) {
    res.status(404).json({message: error});
  }
}



/* Side functions */
const fetchUser = async (id) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({message: error});
  }
}