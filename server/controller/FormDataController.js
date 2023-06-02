import ProjectMongoose from '../Models/Mongodb/Project.js';
import DepartmentMongoose from '../Models/Mongodb/Department.js';

import mongoose from 'mongoose';

export const CreateProductWithExtendedData = async (req, res) => {
  try {

    const labelData = req.body.labels.map(label => {return CreateLabel(label);});
    const workflowsData = req.body.workflows.map(workflow => {return CreateWorkflow(workflow)});
    const projectData = CreateProduct(req.body, workflowsData, labelData);

    await DepartmentMongoose.updateOne({_id: req.body.departmentId}, {$push: {projects: projectData}});


    res.status(200);
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


async function CreateLabel(reqbody) {
  const data = new TaskLabelMongoose({
    name: reqbody.name,
    color: reqbody.color
  })

  await data.save();
  return data._id;
}

async function CreateWorkflow(reqbody) {
  const data = new WorkflowMongoose({
    _id: new mongoose.Types.ObjectId(),
    name: reqbody.name,
    type: reqbody.type,
    order: reqbody.order
  })

  await data.save();
  return data._id;
}

async function CreateProduct(reqbody, workflows = [], labels = []) {
  const data = new ProjectMongoose({
    _id: new mongoose.Types.ObjectId(),
    name : reqbody.name,
    description : reqbody.description,
    users : reqbody.users,
    workflows : workflows,
    labels: labels,
    active: reqbody.active,
    done: reqbody.done,
    deadline : reqbody.deadline,
    startedAt : reqbody.startedAt
  });

  await data.save();
  return data._id;
}