import AccessLevel from "../Models/Mongodb/AccessLevel.js";



export const getAccessLevel_list = async (req, res) => {
  try {
    const statuses = await AccessLevel.find({}).select('group');
    res.status(200).json(statuses);
  } catch (error) {
    res.status(404).json({message: error});
  }
}

export const getAccessLevel_details = async (req, res) => {
  try {
    const { _id } = req.params;
    const statuses = await AccessLevel.findById(_id).select('group');
    res.status(200).json(statuses);
  } catch (error) {
    res.status(404).json({message: error});
  }
}


export const postAccessLevel = async (req, res) => {

  const data = new AccessLevel({
    group: req.body.group,
    level: req.body.level
  });

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(404).json({message: error.message});
  }
}


export const updateAccessLevel  = async (req, res) => {

  try {
    const id = req.body._id;
    const updatedEntity = req.body;
    const options = { new: true };
    const result = await AccessLevel.findByIdAndUpdate(id, updatedEntity, options);

    res.status(200).send(result);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};


export const deleteAccessLevel = async (req, res) => {

  try {
    const id = req.body._id;
    const result = await AccessLevel.findByIdAndDelete(id);
    res.status(200).send(`Deleted: ${result.name}`);
  } catch (error) {
    res.status(404).json({ message: error });
  }
}