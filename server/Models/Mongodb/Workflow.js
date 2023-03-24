import mongoose from "mongoose";

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


const Workflow = mongoose.model('Workflows', WorkflowSchema);
export default Workflow;