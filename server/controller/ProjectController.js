import Project from '../Models/Mongodb/Project.js';
import Department from '../Models/Mongodb/Department.js';

export const getProject_list = async (req, res) => {
  try {
    
    const projects = typeof req.body.department === 'undefined' ? await Project.find({}) :await Department.findById(req.body.department).select('projects').populate('projects');
    
    res.status(200).json(projects);
  } catch (error) {
    res.status(404).json({message: error});
  }
}

export const getProject_details = async (req, res) => {
  try {
    const { projectid }  = req.params;
    const project = await Project.findOne({_id: projectid});
    
    res.status(200).json(project);
  } catch (error) {
    res.status(404).json({message: error});
  }
}

export const postProject = async (req, res) => {

  
  try {
    const data = new Project({
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
    const id = req.params.projectId;
    const updatedEntity = req.body;
    const options = { new: false };
    const result = await Project.findByIdAndUpdate(id, updatedEntity, options);

    res.status(200).send(result);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const deleteProject = async (req, res) => {

  try {
    const {projectid, departmentid} = req.body;
    const result = await Department.findOneAndUpdate({_id: departmentid}, {$pull: { projects: { $in: projectid } }});
    
    await Project.findByIdAndDelete(projectid);
    res.status(200).send(`Deleted: ${projectid} from ${departmentid}`);
  } catch (error) {
    res.status(404).json({ message: error });
  }
}