import TaskStatus from "../Models/TaskStatus.js";

export const getTaskStatus_list = async (req, res) => {
  try {
    const statuses = await TaskStatus.find({});
    res.status(200).json(statuses);
  } catch (error) {
    res.status(404).json({message: error});
  }
}

export const getTaskStatus_details = async (req, res) => {
  try {
    const { _id } = req.params;
    const statuses = await TaskStatus.findById(_id);
    res.status(200).json(statuses);
  } catch (error) {
    res.status(404).json({message: error});
  }
}

export const postTaskStatus = async (req, res) => {

  const data = new TaskStatus({
    name: req.body.name
  });

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(404).json({message: error.message});
  }
}

export const updateTaskStatus = async (req, res) => {

  try {
    const id = req.body._id;
    const updatedEntity = req.body;
    const options = { new: true };
    const result = await TaskStatus.findByIdAndUpdate(id, updatedEntity, options);
    
    res.status(200).send(result);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const deleteTaskStatus = async (req, res) => {

  try {
    const id = req.body._id;
    const result = await TaskStatus.findByIdAndDelete(id);
    res.status(200).send(`Deleted: ${result.name}`);
  } catch (error) {
    res.status(404).json({ message: error });
  }
}