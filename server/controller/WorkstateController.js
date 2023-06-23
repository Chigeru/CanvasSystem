import ProjectMongoose from "../Models/Mongodb/Project.js";
import WorkstateMongoose from "../Models/Mongodb/Workstate.js";
import mongoose from "mongoose";

/* Enum to check if the right inputed type exist */
const workstateTypes = {
  ready: "ready",
  open: "open",
  waiting: "waiting",
  help: "help",
  closed: "closed",
};

export const getWorkstate_list = async (req, res) => {
  try {
    const { projectid } = req.params;
    const foundProject = await ProjectMongoose.findById(projectid).select("workstates").populate({path: "workstates", populate: {path: "tasks"}});
    res.status(200).json(foundProject.workstates);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const getWorkstate_details = async (req, res) => {
  try {
    const { workstateid } = req.params;
    const workstate = await WorkstateMongoose.findById(workstateid).populate("tasks");

    res.status(200).json(workstate);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const postWorkstate = async (req, res) => {
  
  try {
    const { projectid } = req.params;

    const data = new WorkstateMongoose({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      type: req.body.type,
      order: req.body.order
    })

    const dataToSave = await data.save();


    const result = await ProjectMongoose.updateOne({ _id: projectid}, {$push: { workstates: data._id } });
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateWorkstate = async (req, res) => {
  try {
    const updatedEntity = {
      _id: req.body._id,
      name: req.body.name,
      type: workstateTypes[req.body.type]
    }    

    if (updatedEntity.type === undefined) {
      res.status(404).json({ message: "Undefined data for workstates type" });
    } else {
      await WorkstateMongoose.updateOne({_id: updatedEntity.id}, updatedEntity);
      res.status(200).send(result);
    }
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const deleteWorkstate = async (req, res) => {
  try {
    const { projectid } = req.params;

    const result = await ProjectMongoose.findOneAndUpdate({_id: projectid, $pull: { workstates: { $in: req.body._id } }});
    await WorkstateMongoose.findByIdAndDelete(req.body._id);

    res.status(200).send(result);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};
