import { ObjectId } from "mongodb";
import Project from "../Models/Mongodb/Project.js";

/* Enum to check if the right inputed type exist */
const workflowTypes = {
  ready: "ready",
  open: "open",
  closed: "closed",
};

export const getTaskWorkflow_list = async (req, res) => {
  try {
    const { projectid } = req.params;
    const project = await Project.findById(projectid).select("workflows");
    res.status(200).json(project.workflows);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const getTaskWorkflow_details = async (req, res) => {
  try {
    const { projectid, name: workflowid } = req.params;
    const project = await Project.findById(projectid);

    let workflowData = {};
    project.workflows.forEach((workflow) => {
      if (workflowid == workflow._id) {
        workflowData = label;
      }
    });
    res.status(200).json(workflowData);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const postTaskWorkflow = async (req, res) => {
  
  try {
    const { projectid } = req.params;
    const data = {
      _id: new ObjectId().toString(),
      name: req.body.name,
      type: workflowTypes[req.body.type],
    };

    if (data.type === undefined) {
      res.status(404).json({ message: "Undefined data for workflows type" });
    } 
    else { 
      const result = await Project.findOneAndUpdate({ _id: projectid, $push: { workflows: data } });
      res.status(200).json(data);
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateTaskWorkflow = async (req, res) => {
  try {
    const { projectid } = req.params;
    const updatedEntity = {
      _id: req.body._id,
      name: req.body.name,
      type: workflowTypes[req.body.type]
    }    

    if (updatedEntity.type === undefined) {
      res.status(404).json({ message: "Undefined data for workflows type" });
    } else {
      const result = await Project.updateOne({ _id: projectid, "workflows._id": req.body._id}, {$set: { "workflows.$": updatedEntity } });
      res.status(200).send(result);
    }
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const deleteTaskWorkflow = async (req, res) => {
  try {
    const { projectid } = req.params;

    const result = await Project.findOneAndUpdate({_id: projectid, $pull: { workflows: { _id: req.body._id } }});

    res.status(200).send(result);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};
