import mongoose from "mongoose";
import TaskSchema from "./Task.js";
// var ObjectID = require('mongodb').ObjectID;

// var objectId = new ObjectID();

const WorkflowSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: new mongoose.Types.ObjectId()
    },
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
    }
  }, {versionKey: false}
);

WorkflowSchema.pre(/delete\i/, async function(next) {
  try {
    const workflow = await this.model.findOne(this.getFilter());
    await TaskSchema.deleteMany({workflow: workflow._id});
    next();
  } catch (err) {
    next(err);
  }
})

const Workflow = mongoose.model('Workflows', WorkflowSchema);
export default Workflow;