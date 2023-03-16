import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    name: String,
    tasks: [{ type: mongoose.Schema.ObjectId, ref: "Task" }],
    deadline: Date,
    startedAt: Date,
    taskCategories: [{ type: mongoose.Schema.ObjectId, ref: "Task_Category" }],
    taskStatuses: [{ type: mongoose.Schema.ObjectId, ref: "Task_Status" }],
    users: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
  },
  { timestamps: true, versionKey: false}
);

const Project = mongoose.model("Project", ProjectSchema);
export default Project;
