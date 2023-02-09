import mongoose from "mongoose";

const TaskStatusSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    }
  }
);

const TaskStatus = mongoose.model("TaskStatus", TaskStatusSchema);
export default TaskStatus;