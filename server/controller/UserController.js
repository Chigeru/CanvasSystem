import User from '../models/User.js';


export const getUser_list = async (req, res) => {
  try {
    const statuses = await User.find({}).populate('department', '-__v').select('-_id -email -password -__v');
    res.status(200).json(statuses);
  } catch (error) {
    res.status(404).json({message: error});
  }
}

export const getUser_details = async (req, res) => {
  try {
    const { _id } = req.params;
    const statuses = await User.findById(_id).populate('department', '-__v').select('-_id -email -password -__v');
    res.status(200).json(statuses);
  } catch (error) {
    res.status(404).json({message: error});
  }
}


export const postUser = async (req, res) => {

  const data = new User({
    name: req.body.name
  });
  
  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(404).json({message: error.message});
  }
}


export const updateUser = async (req, res) => {

  try {
    const id = req.body._id;
    const updatedEntity = req.body;
    const options = { new: false };
    const result = await User.findByIdAndUpdate(id, updatedEntity, options);

    res.status(200).send(result);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const deleteUser = async (req, res) => {

  try {
    const id = req.body._id;
    const result = await User.findByIdAndDelete(id);
    res.status(200).send(`Deleted: ${result.name}`);
  } catch (error) {
    res.status(404).json({ message: error });
  }
}