import mongoose from "mongoose";
import TaskSchema from "./Task.js";

export const workstateTypes = ['ready', 'open', 'waiting', "help", 'closed'];

const WorkstateSchema = new mongoose.Schema(
  {
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

WorkstateSchema.pre(/delete\i/, async function(next) {
  try {
    const workstate = await this.model.findOne(this.getFilter());
    await TaskSchema.deleteMany({ _id: { $in: workstate.tasks } });
    next();
  } catch (err) {
    next(err);
  }
})

const Workstate = mongoose.model('Workstates', WorkstateSchema);
export default Workstate;