import WorkflowMongoose from "../Models/Mongodb/Workflow.js";
import mongoose from "mongoose";

const workflowTypes = ["ready", "open", "waiting", "help", "closed"];

const progWorkflows = [
  { name: "unscheduled", type: workflowTypes[0] },
  { name: "Ready for development", type: workflowTypes[1] },
  { name: "In development", type: workflowTypes[1] },
  { name: "Ready for review", type: workflowTypes[2] },
  { name: "Help needed", type: workflowTypes[3] },
  { name: "Ready for deploy", type: workflowTypes[4] },
  { name: "Completed", type: workflowTypes[4] },
];

const infraWorkflow = [
  { name: "unscheduled", type: workflowTypes[0] },
  { name: "Ready for development", type: workflowTypes[1] },
  { name: "In development", type: workflowTypes[1] },
  { name: "Blocked", type: workflowTypes[2] },
  { name: "Help needed", type: workflowTypes[3] },
  { name: "Completed", type: workflowTypes[4] },
];

const simpleWorkflow = [
  { name: "Ready", type: workflowTypes[1] },
  { name: "In development", type: workflowTypes[1] },
  { name: "Help needed", type: workflowTypes[3] },
  { name: "Completed", type: workflowTypes[4] },
];

async function AddWorkflowTemplateToProject(chosenTemplate) {
  switch (chosenTemplate.toLowerCase()) {
    case "programmer":
      return AddWorkflowToDatabaseMulti(progWorkflows);

    case "network":
      return AddWorkflowToDatabaseMulti(infraWorkflow);

    case "simple":
      return AddWorkflowToDatabaseMulti(simpleWorkflow);

    default:
      return [];
  }
}

async function AddWorkflowToDatabaseMulti(workflows) {
  var temp = [];
  
  for (var i = 0; i < workflows.length; i++) {
    const data = new WorkflowMongoose({
      _id: new mongoose.Types.ObjectId(),
      name: workflows[i].name,
      type: workflows[i].type,
      order: i,
    });

    await data.save();
    temp.push(data._id);
  }

  return temp;
}

async function AddWorkflowToDatabase(workflow, key = 0) {
  const data = new WorkflowMongoose({
    _id: new mongoose.Types.ObjectId(),
    name: workflow.name,
    type: workflow.type,
    order: key,
  });

  await data.save();
  return data._id;
}

export default AddWorkflowTemplateToProject;
