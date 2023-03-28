import mongoose from "mongoose";
import TaskSchema from "./Task.js";
import WorkflowSchema from "./Workflow.js";

const Schema = mongoose.Schema;

const ProjectSchema = new Schema(
  {
    name: String,
    tasks: [{ type: mongoose.Schema.ObjectId, ref: "Tasks", default: () => [] }],
    workflows: [{ type: mongoose.Schema.ObjectId, ref: "Workflows", default: () => [] }],
    labels: [{ type: mongoose.Schema.ObjectId, ref: "TaskLabels", default: () => [] }],
    users: [{ type: mongoose.Schema.ObjectId, ref: "Users", default: () => [] }],
    deadline: Date,
    startedAt: Date,
  },
  { timestamps: true, versionKey: false }
);

ProjectSchema.pre(/(delete)\i/, async function (next) {
  try {
    const project = await this.model.findOne(this.getFilter());
    await TaskSchema.deleteMany({ _id: { $in: project.tasks } });
    await WorkflowSchema.deleteMany({ _id: { $in: project.workflow } });
    next();
  } catch (err) {
    next(err);
  }
});

const Project = mongoose.model("Projects", ProjectSchema);
export default Project;
