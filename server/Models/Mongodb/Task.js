import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    workflow: { type: mongoose.Schema.ObjectId, ref: "Workflows"},
    labels: [{ type: mongoose.Schema.ObjectId, ref: "TaskLabels" }],
    users: [{ type: mongoose.Schema.ObjectId, ref: "Users" }],
    deadline: Date,
    startedAt: Date,
  },
  { timestamps: true, versionKey: false}
);


const Task = mongoose.model("Tasks", TaskSchema);
export default Task;
