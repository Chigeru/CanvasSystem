import ProjectMongoose from '../Models/Mongodb/Project.js';
import DepartmentMongoose from '../Models/Mongodb/Department.js';

export const getProject_list = async (req, res) => {
  try {
    
    const projects = typeof req.body.department === 'undefined' ? await ProjectMongoose.find({}) :await DepartmentMongoose.findById(req.body.department).select('projects').populate('projects');
    
    res.status(200).json(projects);
  } catch (error) {
    res.status(404).json({message: error});
  }
}

export const getProject_details = async (req, res) => {
  try {
    const { projectid }  = req.params;
    const project = await ProjectMongoose.findOne({_id: projectid}).populate("tasks workflows");
    
    res.status(200).json(project);
  } catch (error) {
    res.status(404).json({message: error});
  }
}

export const postProject = async (req, res) => {

  
  try {
    const data = new ProjectMongoose({
      name : req.body.name,
      users : req.body.users,
      deadline : req.body.deadline,
      startedAt : req.body.startedAt
    });
    const dataToSave = await data.save();


    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(404).json({message: error.message});
  }
}

export const updateProject = async (req, res) => {

  try {
    const id = req.body._id;
    const updatedEntity = req.body;
    const options = { new: false, returnOriginal: false };
    const result = await ProjectMongoose.findByIdAndUpdate(id, updatedEntity, options).select("name createdAt updatedAt users");

    res.status(200).send(result);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const deleteProject = async (req, res) => {

  try {
    const {projectid} = req.body;
    await ProjectMongoose.deleteOne({_id : projectid});
    res.status(200).send(`Deleted project`);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}