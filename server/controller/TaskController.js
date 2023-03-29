import ProjectMongoose from "../Models/Mongodb/Project.js";
import TaskMongoose from "../Models/Mongodb/Task.js";

export const getTask_list = async (req, res) => {
  try {
    const { projectid } = req.params;
    const projectTasks = await ProjectMongoose.findById(projectid).select("tasks").populate('tasks');

    res.status(200).json(projectTasks.tasks);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getTask_details = async (req, res) => {
  try {
    const { projectid, taskid } = req.params;
    const data = await TaskMongoose.findById(taskid).populate({path: "workflow", select: "-_id"});

    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const postTask = async (req, res) => {
  try {
    const { projectid } = req.params;
    const data = new TaskMongoose({
      title: req.body.title,
      workflow: req.body.worktype,
      description: req.body.description,
      labels: req.body.labels,
      users: req.body.users,
      deadline: new Date().toISOString(),
      startAt: new Date().toISOString()
    });
    
    const dataToSave = await data.save();
    await ProjectMongoose.findOneAndUpdate({ _id: projectid, $push: { tasks: dataToSave._id } });

    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const id = req.body._id;
    const updatedEntity = req.body;
    const options = {new: false};
    await TaskMongoose.findByIdAndUpdate(id, updatedEntity, options)
    

    res.status(200).send(updatedEntity);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { projectid } = req.params;

    const result = await ProjectMongoose.findOneAndUpdate({_id: projectid}, {$pull: { tasks: { $in: req.body._id } }});
    await TaskMongoose.deleteOne({_id: req.body._id});

    res.status(200).send(`Deleted task: <${req.body._id}>`);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};
