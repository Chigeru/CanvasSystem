import { ObjectId } from "mongodb";
import Project from "../Models/Mongodb/Project.js";

export const getTaskLabel_list = async (req, res) => {
  try {
    const { projectid } = req.params;
    const project = await Project.findById(projectid).select("labels");
    res.status(200).json(project.labels);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const getTaskLabel_details = async (req, res) => {
  try {
    const { projectid, labelid } = req.params;
    const project = await Project.findById(projectid);
    
    let labelData = {};
    project.labels.forEach(label => {
      if(labelid == label._id) {
        labelData = label;
      }
    })
    res.status(200).json(labelData);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const postTaskLabel = async (req, res) => {
  try {
    const { projectid } = req.params;
    const label = {
      _id: new ObjectId().toString(),
      name: req.body.name,
      color: req.body.color,
    };
    await Project.findOneAndUpdate({ _id: projectid, $push: { labels: label } });

    res.status(200).json();
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const updateTaskLabel = async (req, res) => {
  try {
    const { projectid } = req.params;
    const updatedEntity = req.body;

    const result = await Project.updateOne({_id: projectid, "labels._id": req.body._id}, {$set: {"labels.$": updatedEntity}});

    res.status(200).send(result);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const deleteTaskLabel = async (req, res) => {
  try {
    const { projectid } = req.params;
    
    const result = await Project.findOneAndUpdate({ _id: projectid, $pull: { labels: {_id: req.body._id} } });
    res.status(200).send(`Deleted: ${result}`);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};
