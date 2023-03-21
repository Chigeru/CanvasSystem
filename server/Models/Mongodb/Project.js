import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    name: String,
    tasks: [{type: Object}],
    deadline: Date,
    startedAt: Date,
    workflows: [{ type: Object }],
    labels: [{ type: Object }],
    users: [{ type: mongoose.Schema.ObjectId, ref: "Users" }],
  },
  { timestamps: true, versionKey: false}
);

const Project = mongoose.model("Project", ProjectSchema);
export default Project;
