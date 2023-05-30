
import ProjectMongoose from '../Models/Mongodb/Project.js';
import DepartmentMongoose from '../Models/Mongodb/Department.js';
// import WorkflowMongoose from '../Models/Mongodb/Workflow.js';
// import TaskMongoose from '../Models/Mongodb/Task.js';

import mongoose from 'mongoose';


export const getAllDataForProjectCreation = async (req, res) => {
  // project, labels, workflows, department, users
  try {
    // const departments = await DepartmentMongoose.find({}).populate({path: "projects", populate: [{path: "workflows", populate: {path: "tasks"}}, {path: "users"} ]});
    res.status(200).json(departments);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const CreateProductWithExtendedData = async (req, res) => {
  try {
    const data = new ProjectMongoose({
      _id: new mongoose.Types.ObjectId(),
      name : req.body.name,
      description : req.body.description,
      users : req.body.users,
      // workflows : req.body.workflows,
      // labels: req.body.labels.
      deadline : req.body.deadline,
      startedAt : req.body.startedAt
    });
    const dataToSave = await data.save();

    await DepartmentMongoose.updateOne({_id: req.body.departmentId}, {$push: {projects: data._id}});


    res.status(200).json(statuses);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const CreateUserAndAttatchToDepartment = async (req, res) => {
  try {
    res.status(200).json(statuses);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};


