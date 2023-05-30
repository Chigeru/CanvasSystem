import ProjectMongoose from "../Models/Mongodb/Project.js";
import TaskLabelMongoose from "../Models/Mongodb/TaskLabel.js";

export const getTaskLabel_list = async (req, res) => {
  try {
    const { projectid } = req.params;
    const project = await ProjectMongoose.findById(projectid).select("labels").populate("labels");
    res.status(200).json(project.labels);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getTaskLabel_details = async (req, res) => {
  try {
    const { labelid } = req.params;
    const project = await TaskLabelMongoose.findById(labelid);
    
    let labelData = {};
    project.labels.forEach(label => {
      if(labelid == label._id) {
        labelData = label;
      }
    })
    res.status(200).json(labelData);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const postTaskLabel = async (req, res) => {
  try {
    const { projectid } = req.params;

    const data = new TaskLabelMongoose({
      name: req.body.name,
      color: req.body.color
    })

    const dataToSave = await data.save();
    await ProjectMongoose.updateOne({ _id: projectid}, {$push: { labels: dataToSave } });

    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateTaskLabel = async (req, res) => {
  try {
    const { projectid } = req.params;
    const updatedEntity = req.body;

    const result = await ProjectMongoose.updateOne({_id: projectid, "labels._id": req.body._id}, {$set: {"labels.$": updatedEntity}});

    res.status(200).send(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteTaskLabel = async (req, res) => {
  try {
    const { projectid } = req.params;
    
    await TaskLabelMongoose.findByIdAndDelete(req.body._id);
    const result = await ProjectMongoose.findOneAndUpdate({ _id: projectid, $pull: { labels: { $in: req.body._id} } });
    res.status(200).send(`Deleted: ${result}`);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
