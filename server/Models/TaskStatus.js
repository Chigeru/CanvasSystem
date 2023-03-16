import mongoose from "mongoose";

const TaskStatusSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    }
  }, {versionKey: false}
);

const TaskStatus = mongoose.model("Task_Status", TaskStatusSchema);
export default TaskStatus;