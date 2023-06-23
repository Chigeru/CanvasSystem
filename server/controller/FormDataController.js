import ProjectMongoose from '../Models/Mongodb/Project.js';
import DepartmentMongoose from '../Models/Mongodb/Department.js';
import WorkstateMongoose from '../Models/Mongodb/Workstate.js';
import TaskMongoose from '../Models/Mongodb/Task.js'

// import AddWorkstateTemplateToProject from '../Templates/WorkstateTemplate.js';
import TemplateSetup from '../Templates/TemplateSetup.js';


import mongoose from 'mongoose';

export const CreateProductWithExtendedData = async (req, res) => {
  try {
    var template = await TemplateSetup(req.body.template);
    const projectData = await CreateProduct(req.body, (await template));
    
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

export const CreateTask = async (req, res) => {
 try {
   const data = new TaskMongoose({
     title: req.body.title,
     description: req.body.description,
     labels: req.body.labels,
     users: req.body.users,
     weight: req.body.weight,
     priority: req.body.priority,
     deadline: new Date().toISOString(),
     startAt: new Date().toISOString(),
   });
   
   const savedData = await data.save();
   
   await WorkstateMongoose.updateOne({ _id: req.body.workstate }, { $push: { tasks: savedData._id } });
   
   res.status(200).json({message: "Testing"});
  } catch (error) {
    res.status(404).json({ message: error });
  }
}



/* -------- Helper functions ------------*/
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

async function CreateWorkstate(reqbody) {
  const data = new WorkstateMongoose({
    _id: new mongoose.Types.ObjectId(),
    name: reqbody.name,
    type: reqbody.type,
    order: reqbody.order
  })

  await data.save();
  return data._id;
}

async function CreateProduct(reqbody, templateInfo) {

  const usersData = ObjectIdConverterArray(reqbody.users);

  const data = new ProjectMongoose({
    _id: new mongoose.Types.ObjectId(),
    name : reqbody.name,
    users: usersData,
    description : reqbody.description,
    workstates : templateInfo.workstates,
    labels: templateInfo.labels,
    active: reqbody.active,
    done: false
  });

  await data.save();
  return data._id;
}
