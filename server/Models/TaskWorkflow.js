import mongoose from "mongoose";

const TaskWorkflowSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  }, {versionKey: false}
);

const TaskWorkflow = mongoose.model('Task_Workflow', TaskWorkflowSchema);
export default TaskWorkflow;