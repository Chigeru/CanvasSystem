import mongoose from "mongoose";
import TaskSchema from "./Task.js";


const WorkflowSchema = new mongoose.Schema(
  {
    _id: String,
    name: {
      type: String,
      required: true
    },
    tasks: [{ type: mongoose.Schema.ObjectId, ref: "Tasks", default: () => [] }],
    type: {
      type: String,
      enum: ['ready', 'open', 'waiting', "help", 'closed'],
      default: "ready",
      required: true
    }, 
    order: Number
  }, {versionKey: false}
);

WorkflowSchema.pre(/delete\i/, async function(next) {
  try {
    const workflow = await this.model.findOne(this.getFilter());
    await TaskSchema.deleteMany({ _id: { $in: workflow.tasks } });
    next();
  } catch (err) {
    next(err);
  }
})

const Workflow = mongoose.model('Workflows', WorkflowSchema);
export default Workflow;