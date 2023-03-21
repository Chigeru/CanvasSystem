import Project from '../Models/Mongodb/Project.js';
import TaskCategory from '../Models/TaskWorkflow.js';


export const getProject_list = async (req, res) => {
  try {
    const projects = await Project.find({});
    
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

  const data = new Project({
    name : req.body.name,
    tasks : req.body.tasks,
    users : req.body.users,
    deadline : req.body.deadline,
    startedAt : req.body.startedAt,
    taskCategories : req.body.taskCategories,
    taskStatuses : req.body.taskStatuses
  });

  try {
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
    const id = req.body._id;
    await Project.findByIdAndDelete(id);
    res.status(200).send(`Deleted: ${id}`);
  } catch (error) {
    res.status(404).json({ message: error });
  }
}