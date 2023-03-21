import Project from '../Models/Mongodb/Project.js';
import Task from '../Models/Task.js';


export const getTask_list = async (req, res) => {
  const { projectid } = req.params; 
  try {
    const tasks = await Project.find({_id: projectid}).select("tasks");
    
    res.status(200).json(tasks);
  } catch (error) {
    res.status(404).json({message: error});
  }
}

export const getTask_details = async (req, res) => {
  try {
    const { projectid }  = req.params;
    const { taskid } = req.params;
    const task = await Project.findOne({_id: projectid}).findById(taskid);
    
    res.status(200).json(task);
  } catch (error) {
    res.status(404).json({message: error});
  }
}

export const postTask = async (req, res) => {

  const data = new Task({
    worktype: req.body.worktype,
    title: req.body.title,
    description: req.body.description,
    deadline: req.body.deadline,
    startAt: req.body.startAt,
    status: req.body.status,
    users: req.body.users
  });

  
  try {
    // const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(404).json({message: error.message});
  }
}

export const updateTask = async (req, res) => {

  try {
    const id = req.body._id;
    const updatedEntity = req.body;
    const options = { new: true };
    const result = await Task.findByIdAndUpdate(id, updatedEntity, options);

    res.status(200).send(result);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const deleteTask = async (req, res) => {

  try {
    const id = req.body._id;
    const result = await Task.findByIdAndDelete(id);
    res.status(200).send(`Deleted: ${result.title}`);
  } catch (error) {
    res.status(404).json({ message: error });
  }
}