import DepartmentMongoose from '../Models/Mongodb/Department.js';

export const getDepartment_list = async (req, res) => {
  try {
    const departments = await DepartmentMongoose.find({});
    
    res.status(200).json(departments);
  } catch (error) {
    res.status(404).json({message: error});
  }
}

export const getDepartment_details = async (req, res) => {
  try {
    const { id }  = req.params;
    const department = await DepartmentMongoose.findOne({_id: id}).populate([{path: "users", select: "-email -password", populate: {path: "accesslevel", select: "group"}},{path: "projects", populate: [{path: "workflows", populate: {path: "tasks"}}, {path: "users", select: "-email -password"}, {path: "labels"}]}])
    
    res.status(200).json(department);
  } catch (error) {
    res.status(404).json({message: error});
  }
}

export const getDepartmentExpanded_list = async (req, res) => {
  try {
    const department = await DepartmentMongoose.find({}).populate([{path: "users", select: "-email -password", populate: {path: "accesslevel", select: "group"}},{path: "projects", populate: [{path: "workflows", populate: {path: "tasks"}}, {path: "users", select: "-email -password"}, {path: "labels"}]}])
    
    res.status(200).json(department);
  } catch (error) {
    res.status(404).json({message: error});
  }
}


export const postDepartment = async (req, res) => {

  const data = new DepartmentMongoose({
    name : req.body.name,
    projects : req.body.projects,
    users: req.body.users
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
    const result = await DepartmentMongoose.findByIdAndUpdate(id, updatedEntity, options);

    res.status(200).send(result);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const deleteDepartment = async (req, res) => {

  try {
    const id = req.body._id;
    const result = await DepartmentMongoose.findByIdAndDelete(id);
    res.status(200).send(`Deleted: ${result.title}`);
  } catch (error) {
    res.status(404).json({ message: error });
  }
}