import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    workflow: { type: mongoose.Schema.ObjectId, ref: "Workflow"},
    labels: [{ type: mongoose.Schema.ObjectId, ref: "TaskLabel" }],
    users: [{ type: mongoose.Schema.ObjectId, ref: "Users" }],
    deadline: Date,
    startedAt: Date,
  },
  { timestamps: true, versionKey: false}
);


const Task = mongoose.model("Tasks", TaskSchema);
export default Task;
