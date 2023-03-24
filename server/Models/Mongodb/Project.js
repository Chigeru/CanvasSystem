import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    name: String,
    tasks: [{type: mongoose.Schema.ObjectId, ref: "Tasks", default: () => []}],
    workflows: [{ type: mongoose.Schema.ObjectId, ref: "Workflows", default: () => [] }],
    labels: [{ type: mongoose.Schema.ObjectId, ref: "TaskLabels", default: () => [] }],
    users: [{ type: mongoose.Schema.ObjectId, ref: "Users", default: () => [] }],
    deadline: Date,
    startedAt: Date,
  },
  { timestamps: true, versionKey: false}
);

const Project = mongoose.model("Projects", ProjectSchema);
export default Project;
