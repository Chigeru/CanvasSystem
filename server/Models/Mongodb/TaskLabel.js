import mongoose from "mongoose";
import Task from "./Task.js"

const TaskLabelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    color: String
  }, {versionKey: false}
);

TaskLabelSchema.pre(/(delete)\i/, async function (next) {
  try {
    const label = await this.model.findOne(this.getFilter());

    // pull the label from Tasks that has it
    // pull the label from The Project that has it

    // await Department.updateMany({projects: project._id}, {$pull: {}})
    next();
  } catch (err) {
    next(err);
  }
});

const TaskLabel = mongoose.model("TaskLabels", TaskLabelSchema);
export default TaskLabel;