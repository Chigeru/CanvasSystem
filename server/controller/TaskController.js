import { ObjectId } from "mongodb";
import Project from "../Models/Mongodb/Project.js";
import Task from "../Models/Task.js";

export const getTask_list = async (req, res) => {
  try {
    const { projectid } = req.params;
    const tasks = await Project.find({ _id: projectid }).select("tasks");

    res.status(200).json(tasks);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const getTask_details = async (req, res) => {
  try {
    const { projectid } = req.params;
    const { taskid } = req.params;
    const task = await Project.findOne({ _id: projectid }).findById(taskid);

    res.status(200).json(task);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const postTask = async (req, res) => {
  try {
    const { projectid } = req.params;
    const data = {
      _id: new ObjectId().toString(),
      title: req.body.title,
      workflow: req.body.worktype,
      description: req.body.description,
      labels: req.body.labels,
      users: req.body.users,
      deadline: new Date().toISOString(),
      startAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };

    await Project.findOneAndUpdate({ _id: projectid, $push: { tasks: data } });

    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { projectid } = req.params;
    const updatedEntity = {
      _id: req.body._id,
      title: req.body.title,
      workflow: req.body.worktype,
      description: req.body.description,
      labels: req.body.labels,
      users: req.body.users,
      deadline: req.body.deadline,
      startAt: req.body.startAt,
      updatedAt: new Date().toISOString(),
      createdAt: req.body.createdAt,
    };
    const result = await Project.updateOne({_id: projectid, "tasks._id": req.body._id}, {$set: {"tasks.$": updatedEntity}});
    

    res.status(200).send(updatedEntity);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { projectid } = req.params;

    const result = await Project.findOneAndUpdate({_id: projectid, $pull: { tasks: { _id: req.body._id } },});

    res.status(200).send(`Deleted: ${result}`);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};
