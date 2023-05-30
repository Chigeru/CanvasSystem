import ProjectMongoose from "../Models/Mongodb/Project.js";
import WorkflowMongoose from "../Models/Mongodb/Workflow.js";
import mongoose from "mongoose";

/* Enum to check if the right inputed type exist */
const workflowTypes = {
  ready: "ready",
  open: "open",
  waiting: "waiting",
  help: "help",
  closed: "closed",
};

export const getWorkflow_list = async (req, res) => {
  try {
    const { projectid } = req.params;
    const foundProject = await ProjectMongoose.findById(projectid).select("workflows").populate({path: "workflows", populate: {path: "tasks"}});
    res.status(200).json(foundProject.workflows);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const getWorkflow_details = async (req, res) => {
  try {
    const { workflowid } = req.params;
    const workflow = await WorkflowMongoose.findById(workflowid).populate("tasks");

    res.status(200).json(workflow);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const postWorkflow = async (req, res) => {
  
  try {
    const { projectid } = req.params;

    const data = new WorkflowMongoose({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      type: req.body.type,
      order: req.body.order
    })

    const dataToSave = await data.save();


    const result = await ProjectMongoose.updateOne({ _id: projectid}, {$push: { workflows: data._id } });
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateWorkflow = async (req, res) => {
  try {
    const updatedEntity = {
      _id: req.body._id,
      name: req.body.name,
      type: workflowTypes[req.body.type]
    }    

    if (updatedEntity.type === undefined) {
      res.status(404).json({ message: "Undefined data for workflows type" });
    } else {
      await WorkflowMongoose.updateOne({_id: updatedEntity.id}, updatedEntity);
      res.status(200).send(result);
    }
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const deleteWorkflow = async (req, res) => {
  try {
    const { projectid } = req.params;

    const result = await ProjectMongoose.findOneAndUpdate({_id: projectid, $pull: { workflows: { $in: req.body._id } }});
    await WorkflowMongoose.findByIdAndDelete(req.body._id);

    res.status(200).send(result);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};
