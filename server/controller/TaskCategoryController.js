import TaskCategory from '../Models/taskCategory.js';




export const getTaskCategory_list = async (req, res) => {
  try {
    const statuses = await TaskCategory.find({});
    res.status(200).json(statuses);
  } catch (error) {
    res.status(404).json({message: error});
  }
}

export const getTaskCategory_details = async (req, res) => {
  try {
    const { _id } = req.params;
    const statuses = await TaskCategory.findById(_id);
    res.status(200).json(statuses);
  } catch (error) {
    res.status(404).json({message: error});
  }
}


export const postTaskCategory = async (req, res) => {

  const data = new TaskCategory({
    name: req.body.name
  });

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(404).json({message: error.message});
  }
}


export const updateTaskCategory = async (req, res) => {

  try {
    const id = req.body._id;
    const updatedEntity = req.body;
    const options = { new: true };
    const result = await TaskCategory.findByIdAndUpdate(id, updatedEntity, options);

    res.status(200).send(result);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};


export const deleteTaskCategory = async (req, res) => {

  try {
    const id = req.body._id;
    const result = await TaskCategory.findByIdAndDelete(id);
    res.status(200).send(`Deleted: ${result.name}`);
  } catch (error) {
    res.status(404).json({ message: error });
  }
}