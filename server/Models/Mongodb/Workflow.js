import mongoose from "mongoose";
import TaskSchema from "./Task.js";

const WorkflowSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ['ready', 'open', 'closed'],
      default: "ready",
      required: true
    }
  }, {versionKey: false}
);

// WorkflowSchema.pre(/delete\i/, async function(next) {
//   try {
//     const workflow = await this.model.findOne(this.getFilter());
//     await TaskSchema.deleteMany({workflow: workflow._id});
//     next();
//   } catch (err) {
//     next(err);
//   }
// })

const Workflow = mongoose.model('Workflows', WorkflowSchema);
export default Workflow;