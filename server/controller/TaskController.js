import { ObjectId } from "mongodb";
import Project from "../Models/Mongodb/Project.js";
import Task from "../Models/Mongodb/Task.js";

export const getTask_list = async (req, res) => {
  try {
    const { projectid } = req.params;
    const projectTasks = await Project.findById(projectid).select("tasks").populate('tasks');

    res.status(200).json(projectTasks.tasks);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getTask_details = async (req, res) => {
  try {
    const { projectid } = req.params;
    const { taskid } = req.params;
    // const task = await Project.findOne({ _id: projectid }).findById(taskid);
    const data = await Task.findById(taskid);

    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const postTask = async (req, res) => {
  try {
    const { projectid } = req.params;
    // const data = {
    //   _id: new ObjectId().toString(),
    //   title: req.body.title,
    //   workflow: req.body.worktype,
    //   description: req.body.description,
    //   labels: req.body.labels,
    //   users: req.body.users,
    //   deadline: new Date().toISOString(),
    //   startAt: new Date().toISOString(),
    //   updatedAt: new Date().toISOString(),
    //   createdAt: new Date().toISOString(),
    // };
    const data = new Task({
      title: req.body.title,
      workflow: req.body.worktype,
      description: req.body.description,
      labels: req.body.labels,
      users: req.body.users,
      deadline: new Date().toISOString(),
      startAt: new Date().toISOString()
    });
    
    const dataToSave = await data.save();
    await Project.findOneAndUpdate({ _id: projectid, $push: { tasks: dataToSave._id } });

    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const updatedEntity = req.body;
    const options = {new: false};
    await Task.findByIdAndUpdate(updatedEntity._id, updatedEntity, options)
    

    res.status(200).send(updatedEntity);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { projectid } = req.params;

    const result = await Project.findOneAndUpdate({_id: projectid}, {$pull: { tasks: { $in: req.body._id } }});
    await Task.deleteOne({_id: req.body._id});

    res.status(200).send(`Deleted: <${req.body._id}> \n\n ${result}`);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};
