import Department from '../Models/Mongodb/Department.js';

export const getDepartment_list = async (req, res) => {
  try {
    const departments = await Department.find({});
    
    res.status(200).json(departments);
  } catch (error) {
    res.status(404).json({message: error});
  }
}

export const getDepartment_details = async (req, res) => {
  try {
    const { id }  = req.params;
    const department = await Department.findOne({_id: id});
    
    res.status(200).json(department);
  } catch (error) {
    res.status(404).json({message: error});
  }
}

export const postDepartment = async (req, res) => {

  const data = new Department({
    name : req.body.name,
    projects : req.body.projects
  });

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(404).json({message: error.message});
  }
}

export const updateDepartment = async (req, res) => {

  try {
    const id = req.body._id;
    const updatedEntity = req.body;
    const options = { new: true };
    const result = await Department.findByIdAndUpdate(id, updatedEntity, options);

    res.status(200).send(result);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const deleteDepartment = async (req, res) => {

  try {
    const id = req.body._id;
    const result = await Department.findByIdAndDelete(id);
    res.status(200).send(`Deleted: ${result.title}`);
  } catch (error) {
    res.status(404).json({ message: error });
  }
}