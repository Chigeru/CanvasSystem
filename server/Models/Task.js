import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    worktype: {
      type: mongoose.Schema.ObjectId,
      ref: "Task_Category",
      required: true,
    },
    title: String,
    description: String,
    deadline: Date,
    startedAt: Date,
    status: {
      type: mongoose.Schema.ObjectId,
      ref: "Task_Status",
      required: true,
    },
    users: [{ type: mongoose.Schema.ObjectId, ref: "Users" }],
  },
  { timestamps: true, versionKey: false}
);

const Task = mongoose.model("Task", TaskSchema);
export default Task;
