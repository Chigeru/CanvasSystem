import ProjectMongoose from '../Models/Mongodb/Project.js';
import DepartmentMongoose from '../Models/Mongodb/Department.js';
import WorkflowMongoose from '../Models/Mongodb/Workflow.js';
import AddWorkflowTemplateToProject from '../helper/WorkflowTemplating.js';

import mongoose from 'mongoose';

export const CreateProductWithExtendedData = async (req, res) => {

  var workflows = []
  try {
    
    if(typeof(req.body.workflows) === "string") {
      workflows = await AddWorkflowTemplateToProject(req.body.workflows);
    }

    const projectData = await CreateProduct(req.body, (await workflows));
    await DepartmentMongoose.findByIdAndUpdate(req.body.department, {$push: {projects: (await projectData).toString()}});

    res.status(200).json({message: "Testing"});
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


function ObjectIdConverter(str) {
  return mongoose.Types.ObjectId(str);
}

function ObjectIdConverterArray(arr) {
  return arr.map(element => ObjectIdConverter(element));
}

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

async function CreateProduct(reqbody, createdWorkflows) {

  const usersData = ObjectIdConverterArray(reqbody.users);

  const data = new ProjectMongoose({
    _id: new mongoose.Types.ObjectId(),
    name : reqbody.name,
    users: usersData,
    description : reqbody.description,
    workflows : createdWorkflows,
    active: reqbody.active,
    done: false
  });

  await data.save();
  console.log("Project workflow: ", data.workflows);
  return data._id;
}